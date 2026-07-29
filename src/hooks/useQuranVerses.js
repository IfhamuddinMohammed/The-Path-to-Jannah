import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { getSurah, getAudio } from "@/lib/quranDB";
import { getVoiceAudioUrl, getVoiceKey } from "@/lib/quranAudio";

function stripBismillah(text, surahNumber, isFirstAyah) {
  if (!isFirstAyah || surahNumber === 1 || surahNumber === 9) return text;
  if (text.startsWith("بِسْمِ")) {
    const marker = "الرَّحِيمِ";
    const idx = text.indexOf(marker);
    if (idx !== -1) {
      const stripped = text.substring(idx + marker.length).trim();
      return stripped || text;
    }
  }
  return text;
}

export function useQuranVerses(surahNumber, reciter, audioLanguage = "arabic") {
  const [rawData, setRawData] = useState(null);
  const [offlineVerses, setOfflineVerses] = useState(null);
  const [isOffline, setIsOffline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchKey, setFetchKey] = useState(0);
  const blobUrlsRef = useRef([]);

  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  useEffect(() => {
    if (!surahNumber) {
      setRawData(null);
      setOfflineVerses(null);
      setIsOffline(false);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;

    async function loadData() {
      blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      blobUrlsRef.current = [];

      setLoading(true);
      setError(null);
      setOfflineVerses(null);
      setRawData(null);
      setIsOffline(false);

      // Try IndexedDB (offline) first — text is shared across voices, but each
      // voice (Arabic reciter, Urdu, English) caches its own audio separately.
      try {
        const surahData = await getSurah(surahNumber);
        if (cancelled) return;

        if (surahData && surahData.verses) {
          const voiceKey = getVoiceKey({ language: audioLanguage, reciter });
          const verses = await Promise.all(
            surahData.verses.map(async (verse, i) => {
              const audioKey = `${voiceKey}-${verse.number}`;
              const blob = await getAudio(audioKey);
              let audioUrl;
              if (blob) {
                audioUrl = URL.createObjectURL(blob);
                blobUrlsRef.current.push(audioUrl);
              } else {
                audioUrl = getVoiceAudioUrl(surahNumber, verse.numberInSurah, {
                  language: audioLanguage,
                  reciter,
                });
              }
              return {
                ...verse,
                arabic: stripBismillah(verse.arabic, surahNumber, i === 0),
                audio: audioUrl,
              };
            })
          );

          if (cancelled) return;
          setOfflineVerses(verses);
          setIsOffline(true);
          setLoading(false);
          return;
        }
      } catch {
        // IndexedDB not available — fall through to API
      }

      if (cancelled) return;

      // Fetch from API
      fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,en.transliteration,ur.jalandhry`
      )
        .then((res) => {
          if (!res.ok) throw new Error("Network error");
          return res.json();
        })
        .then((data) => {
          if (cancelled) return;
          if (data.code === 200 && data.data && data.data.length >= 4) {
            setRawData(data.data);
          } else {
            setError("Unable to load verses. Please try again.");
          }
        })
        .catch(() => {
          if (!cancelled) {
            setError(
              "Failed to load verses. Please check your connection and try again."
            );
          }
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [surahNumber, reciter, audioLanguage, fetchKey]);

  const verses = useMemo(() => {
    if (offlineVerses) return offlineVerses;
    if (!rawData) return null;

    const arabicEdition = rawData[0];
    const englishEdition = rawData[1];
    const transliterationEdition = rawData[2];

    return arabicEdition.ayahs.map((ayah, i) => {
      const arabicText = stripBismillah(ayah.text, surahNumber, i === 0);
      return {
        number: ayah.number,
        numberInSurah: ayah.numberInSurah,
        arabic: arabicText,
        translation: englishEdition.ayahs[i]?.text || "",
        transliteration: transliterationEdition.ayahs[i]?.text || "",
        urdu: rawData[3]?.ayahs[i]?.text || "",
        audio: getVoiceAudioUrl(surahNumber, ayah.numberInSurah, {
          language: audioLanguage,
          reciter,
        }),
      };
    });
  }, [offlineVerses, rawData, reciter, audioLanguage, surahNumber]);

  const retry = useCallback(() => {
    setFetchKey((k) => k + 1);
  }, []);

  return { verses, loading, error, retry, isOffline };
}