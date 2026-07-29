import { useState, useEffect, useCallback } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import {
  saveSurah,
  deleteSurah,
  saveAudio,
  deleteAudio,
  getDownloadedSurahNumbers,
  getSurah,
  getAudio,
} from "@/lib/quranDB";
import { getVoiceAudioUrl, getVoiceDownloadUrl, getVoiceKey } from "@/lib/quranAudio";

// Surahs downloaded before per-voice tracking only ever stored a single
// Arabic `reciter` string — read that back as this voice's one downloaded key.
function getDownloadedVoiceKeys(surahData) {
  if (!surahData) return [];
  if (surahData.downloadedVoices) return surahData.downloadedVoices;
  if (surahData.reciter) return [surahData.reciter];
  return [];
}

const BATCH_SIZE = 5;

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Saves a generated file (audio/PDF) so the user can actually find it afterwards.
// Native WebViews don't support the `<a download>` blob trick real browsers use —
// Android silently no-ops it, so the old code was reporting "success" for a file
// that was never written anywhere. On native we write to the app's cache dir and
// hand off to the OS share sheet, letting the user pick Downloads/Drive/Files, etc.
// On web, the `<a download>` trick still works fine, so keep it as the fallback.
async function saveBlobToDevice(blob, filename) {
  if (Capacitor.isNativePlatform()) {
    const base64Data = await blobToBase64(blob);
    await Filesystem.writeFile({
      path: filename,
      data: base64Data,
      directory: Directory.Cache,
    });
    const { uri } = await Filesystem.getUri({ path: filename, directory: Directory.Cache });
    await Share.share({ title: filename, url: uri, dialogTitle: `Save "${filename}"` });
    return { native: true };
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return { native: false };
}

export function useQuranDownloads() {
  // { [surahNumber]: Set<voiceKey> } — which voices (Arabic reciter, or
  // "urdu"/"english") have been downloaded for each surah.
  const [downloadedVoicesBySurah, setDownloadedVoicesBySurah] = useState({});
  const [downloadProgress, setDownloadProgress] = useState(null);
  const [deviceDownloadProgress, setDeviceDownloadProgress] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const surahNumbers = await getDownloadedSurahNumbers();
        const entries = await Promise.all(
          surahNumbers.map(async (surahNumber) => {
            const data = await getSurah(surahNumber);
            return [surahNumber, new Set(getDownloadedVoiceKeys(data))];
          })
        );
        setDownloadedVoicesBySurah(Object.fromEntries(entries));
      } catch {
        // ignore
      }
    })();
  }, []);

  // Without a voice, reports whether ANY voice has been downloaded for this
  // surah (used for the surah-list checkmark). With a voice, reports whether
  // that specific voice is downloaded (used for the "Offline" badge/button,
  // which reflects whichever language/reciter is currently selected).
  const isDownloaded = useCallback(
    (surahNumber, voice) => {
      const voices = downloadedVoicesBySurah[surahNumber];
      if (!voices || voices.size === 0) return false;
      return voice ? voices.has(getVoiceKey(voice)) : true;
    },
    [downloadedVoicesBySurah]
  );

  // Helper: get verse data from IndexedDB or API
  const getVersesData = useCallback(async (surahNumber) => {
    try {
      const surahData = await getSurah(surahNumber);
      if (surahData?.verses) return surahData.verses;
    } catch {
      // fall through to API
    }

    const res = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,en.transliteration,ur.jalandhry`
    );
    const data = await res.json();

    if (data.code !== 200 || !data.data || data.data.length < 4) {
      throw new Error("Failed to fetch surah data");
    }

    return data.data[0].ayahs.map((ayah, i) => ({
      number: ayah.number,
      numberInSurah: ayah.numberInSurah,
      arabic: ayah.text,
      translation: data.data[1].ayahs[i]?.text || "",
      transliteration: data.data[2].ayahs[i]?.text || "",
      urdu: data.data[3]?.ayahs[i]?.text || "",
    }));
  }, []);

  // Download surah text + this voice's audio to IndexedDB (offline mode within
  // the app). `voice` is { language, reciter } — text is shared across voices,
  // but each voice's audio is fetched and cached separately.
  const downloadSurah = useCallback(async (surahNumber, voice) => {
    try {
      const res = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,en.transliteration,ur.jalandhry`
      );
      const data = await res.json();

      if (data.code !== 200 || !data.data || data.data.length < 4) {
        throw new Error("Failed to fetch surah data");
      }

      const arabicEdition = data.data[0];
      const englishEdition = data.data[1];
      const transliterationEdition = data.data[2];

      const verses = arabicEdition.ayahs.map((ayah, i) => ({
        number: ayah.number,
        numberInSurah: ayah.numberInSurah,
        arabic: ayah.text,
        translation: englishEdition.ayahs[i]?.text || "",
        transliteration: transliterationEdition.ayahs[i]?.text || "",
        urdu: data.data[3]?.ayahs[i]?.text || "",
      }));

      setDownloadProgress({ surahNumber, current: 0, total: verses.length });

      const voiceKey = getVoiceKey(voice);
      for (let i = 0; i < verses.length; i += BATCH_SIZE) {
        const batch = verses.slice(i, i + BATCH_SIZE);
        await Promise.all(
          batch.map(async (verse) => {
            const audioUrl = getVoiceDownloadUrl(surahNumber, verse.numberInSurah, voice);
            const audioKey = `${voiceKey}-${verse.number}`;
            try {
              const audioRes = await fetch(audioUrl);
              if (!audioRes.ok) throw new Error(`HTTP ${audioRes.status}`);
              const blob = await audioRes.blob();
              await saveAudio(audioKey, blob);
            } catch {
              // skip failed downloads
            }
          })
        );
        setDownloadProgress({
          surahNumber,
          current: Math.min(i + BATCH_SIZE, verses.length),
          total: verses.length,
        });
      }

      const existing = await getSurah(surahNumber);
      const downloadedVoices = new Set(getDownloadedVoiceKeys(existing));
      downloadedVoices.add(voiceKey);
      await saveSurah(surahNumber, { verses, downloadedVoices: Array.from(downloadedVoices) });

      setDownloadedVoicesBySurah((prev) => ({ ...prev, [surahNumber]: downloadedVoices }));
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloadProgress(null);
    }
  }, []);

  // Download full surah audio as a single MP3 file to the user's device.
  // Returns a result summary so the caller can surface success/failure to the user
  // instead of a single flaky verse silently voiding the whole download.
  const downloadSurahToDevice = useCallback(
    async (surahNumber, voice, surahName) => {
      try {
        const verses = await getVersesData(surahNumber);
        setDeviceDownloadProgress({ current: 0, total: verses.length });

        const blobs = [];
        let failedCount = 0;
        const voiceKey = getVoiceKey(voice);

        for (let i = 0; i < verses.length; i += BATCH_SIZE) {
          const batch = verses.slice(i, i + BATCH_SIZE);
          const batchResults = await Promise.all(
            batch.map(async (verse) => {
              try {
                // Try IndexedDB first (already downloaded offline)
                let blob = await getAudio(`${voiceKey}-${verse.number}`);
                if (!blob) {
                  const audioRes = await fetch(
                    getVoiceDownloadUrl(surahNumber, verse.numberInSurah, voice)
                  );
                  if (!audioRes.ok) throw new Error(`HTTP ${audioRes.status}`);
                  blob = await audioRes.blob();
                }
                return blob;
              } catch {
                return null;
              }
            })
          );
          for (const blob of batchResults) {
            if (blob) blobs.push(blob);
            else failedCount += 1;
          }
          setDeviceDownloadProgress({
            current: Math.min(i + BATCH_SIZE, verses.length),
            total: verses.length,
          });
        }

        if (blobs.length === 0) {
          return { success: false, failedCount, totalCount: verses.length };
        }

        // Concatenate all audio blobs into a single MP3 (these are elementary MPEG
        // streams with no ID3 header, so back-to-back concatenation plays cleanly).
        const combinedBlob = new Blob(blobs, { type: "audio/mpeg" });
        const { native } = await saveBlobToDevice(combinedBlob, `${surahName} - Full Recitation.mp3`);

        return { success: true, native, failedCount, totalCount: verses.length };
      } catch (error) {
        console.error("Device audio download failed:", error);
        return { success: false, failedCount: null, totalCount: null };
      } finally {
        setDeviceDownloadProgress(null);
      }
    },
    [getVersesData]
  );

  // Download surah text as a PDF file — renders through the browser's own DOM/font
  // engine (via html2canvas, which jsPDF's .html() uses internally) so Arabic script
  // gets correct shaping/ligatures for free, instead of trying to draw Arabic glyphs
  // directly with jsPDF's text APIs (which only support simple Latin fonts).
  const downloadSurahPDF = useCallback(
    async (surahNumber, surahName, surahArabic) => {
      let wrapper = null;
      try {
        const verses = await getVersesData(surahNumber);
        const isBismillahExempt = surahNumber === 1 || surahNumber === 9;

        // html2canvas can render a fully blank canvas when its target sits far
        // off-screen (e.g. `left: -10000px`) — it clones the element into its own
        // render window and that window doesn't extend to the offset position.
        // Keeping the container at the natural (0,0) origin, but nested inside a
        // zero-size `overflow: hidden` wrapper, keeps it invisible to the user
        // while still being a normal, fully-renderable element for html2canvas.
        wrapper = document.createElement("div");
        wrapper.style.position = "fixed";
        wrapper.style.top = "0";
        wrapper.style.left = "0";
        wrapper.style.width = "0";
        wrapper.style.height = "0";
        wrapper.style.overflow = "hidden";

        const container = document.createElement("div");
        container.style.width = "760px";
        container.style.padding = "32px";
        container.style.backgroundColor = "#ffffff";
        container.style.color = "#1f2937";
        container.style.fontFamily = "Inter, system-ui, sans-serif";

        const verseBlocks = verses
          .map(
            (v) => `
            <div style="margin-bottom:20px; padding-bottom:16px; border-bottom:1px solid #e5e7eb; page-break-inside:avoid;">
              <div style="font-size:12px; font-weight:bold; color:#0f3d2e; margin-bottom:6px;">Verse ${v.numberInSurah}</div>
              <p style="font-size:22px; direction:rtl; text-align:right; font-family:'Amiri', serif; line-height:1.9; margin:0 0 8px; color:#111827;">${v.arabic}</p>
              ${
                v.transliteration
                  ? `<p style="font-style:italic; color:#6b7280; margin:0 0 6px; font-size:13px;">${v.transliteration}</p>`
                  : ""
              }
              <p style="color:#1f2937; margin:0; font-size:14px;">${v.translation}</p>
            </div>`
          )
          .join("");

        container.innerHTML = `
          <div style="text-align:center; margin-bottom:24px; border-bottom:2px solid #b8942f; padding-bottom:16px;">
            <h1 style="font-size:26px; margin:0 0 8px; color:#0f3d2e;">${surahName}</h1>
            ${
              surahArabic
                ? `<p style="font-size:24px; margin:0; direction:rtl; font-family:'Amiri', serif; color:#a8791f;">${surahArabic}</p>`
                : ""
            }
          </div>
          ${
            !isBismillahExempt
              ? `<div style="text-align:center; margin-bottom:24px;">
                  <p style="font-size:20px; direction:rtl; font-family:'Amiri', serif; color:#a8791f; margin:0 0 4px;">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                  <p style="font-size:12px; color:#6b7280; font-style:italic; margin:0;">In the name of Allah, the Most Gracious, the Most Merciful</p>
                </div>`
              : ""
          }
          ${verseBlocks}
        `;

        wrapper.appendChild(container);
        document.body.appendChild(wrapper);

        const canvas = await html2canvas(container, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        });

        const pdf = new jsPDF({ unit: "pt", format: "a4" });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 24;
        const usableWidth = pageWidth - margin * 2;
        const usableHeight = pageHeight - margin * 2;

        // Slice the single tall canvas into page-sized chunks and add each as its
        // own PDF page, so long surahs correctly span multiple pages.
        const pxPerPage = Math.floor((usableHeight * canvas.width) / usableWidth);
        let renderedPx = 0;
        let pageIndex = 0;

        while (renderedPx < canvas.height) {
          const sliceHeightPx = Math.min(pxPerPage, canvas.height - renderedPx);

          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = canvas.width;
          pageCanvas.height = sliceHeightPx;
          pageCanvas
            .getContext("2d")
            .drawImage(canvas, 0, renderedPx, canvas.width, sliceHeightPx, 0, 0, canvas.width, sliceHeightPx);

          const sliceHeightPt = (sliceHeightPx * usableWidth) / canvas.width;

          if (pageIndex > 0) pdf.addPage();
          pdf.addImage(pageCanvas.toDataURL("image/jpeg", 0.92), "JPEG", margin, margin, usableWidth, sliceHeightPt);

          renderedPx += sliceHeightPx;
          pageIndex += 1;
        }

        const pdfBlob = pdf.output("blob");
        const { native } = await saveBlobToDevice(pdfBlob, `${surahName}.pdf`);
        return { success: true, native };
      } catch (error) {
        console.error("PDF download failed:", error);
        return { success: false };
      } finally {
        if (wrapper && wrapper.parentNode) {
          wrapper.parentNode.removeChild(wrapper);
        }
      }
    },
    [getVersesData]
  );

  // Removes only the given voice's cached audio. If no voice is left
  // downloaded for this surah afterwards, the cached text is removed too.
  const removeDownload = useCallback(async (surahNumber, voice) => {
    try {
      const surahData = await getSurah(surahNumber);
      const voiceKey = getVoiceKey(voice);

      if (surahData?.verses) {
        for (const verse of surahData.verses) {
          await deleteAudio(`${voiceKey}-${verse.number}`);
        }
      }

      const remainingVoices = new Set(getDownloadedVoiceKeys(surahData));
      remainingVoices.delete(voiceKey);

      if (remainingVoices.size === 0) {
        await deleteSurah(surahNumber);
      } else {
        await saveSurah(surahNumber, {
          verses: surahData.verses,
          downloadedVoices: Array.from(remainingVoices),
        });
      }

      setDownloadedVoicesBySurah((prev) => ({ ...prev, [surahNumber]: remainingVoices }));
    } catch (error) {
      console.error("Remove failed:", error);
    }
  }, []);

  return {
    isDownloaded,
    downloadSurah,
    removeDownload,
    downloadProgress,
    downloadSurahToDevice,
    downloadSurahPDF,
    deviceDownloadProgress,
  };
}