import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { getRomanUrdu, saveRomanUrdu } from "@/lib/quranDB";

// Resource 831 on quran.com: Abul Ala Maududi's published Roman Urdu translation
// (authentic, human-translated Latin-script Urdu — not LLM-generated).
const ROMAN_URDU_RESOURCE_ID = 831;
const FETCH_TIMEOUT_MS = 60000;

function stripHtml(text) {
  return (text || "").replace(/<[^>]+>/g, "");
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), ms)
    ),
  ]);
}

export function useRomanUrdu(surahNumber, verses, enabled) {
  const [romanUrdu, setRomanUrdu] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Clear when surah changes
  useEffect(() => {
    setRomanUrdu(null);
    setError(null);
    setLoading(false);
  }, [surahNumber]);

  useEffect(() => {
    if (!surahNumber || !verses || verses.length === 0 || !enabled) {
      return;
    }

    let cancelled = false;

    async function loadRomanUrdu() {
      setLoading(true);
      setError(null);

      // 1. Check database entity (shared across ALL users — no per-user LLM calls).
      // One row per verse, so a long surah never risks hitting the per-field size
      // limit a single JSON-blob-per-surah row would.
      try {
        const cached = await base44.entities.RomanUrduSurah.filter({
          surah_number: surahNumber,
        });
        if (!cancelled && cached && cached.length >= verses.length) {
          const romanUrduVerses = verses.map((v) => {
            const match = cached.find((c) => c.ayah_number === v.numberInSurah);
            return { ...v, romanUrdu: match?.roman_urdu || "" };
          });
          setRomanUrdu(romanUrduVerses);
          setLoading(false);
          // Mirror to local IndexedDB for offline use
          try {
            await saveRomanUrdu(surahNumber, romanUrduVerses);
          } catch {}
          return;
        }
      } catch {
        // fall through to local cache
      }

      // 2. Check IndexedDB (local offline cache)
      try {
        const localCached = await getRomanUrdu(surahNumber);
        if (!cancelled && localCached) {
          setRomanUrdu(localCached);
          setLoading(false);
          return;
        }
      } catch {
        // fall through to fetching the translation
      }

      // 3. Fetch the published Roman Urdu translation (first-time only — result
      // gets saved to DB for all future users)
      try {
        const res = await withTimeout(
          fetch(
            `https://api.quran.com/api/v4/quran/translations/${ROMAN_URDU_RESOURCE_ID}?chapter_number=${surahNumber}`
          ),
          FETCH_TIMEOUT_MS
        );
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        const translations = data?.translations || [];

        if (cancelled) return;

        const romanUrduVerses = verses.map((v, i) => ({
          ...v,
          romanUrdu: stripHtml(translations[i]?.text),
        }));

        // Save to database so ALL future users get it instantly (no external fetch needed).
        // One row per verse (see the comment above on why not one blob per surah),
        // written in a single bulk request so a 286-ayah surah doesn't fire 286
        // concurrent requests and trip the API's rate limit.
        try {
          await base44.entities.RomanUrduSurah.bulkCreate(
            verses.map((v, i) => ({
              surah_number: surahNumber,
              ayah_number: v.numberInSurah,
              roman_urdu: stripHtml(translations[i]?.text),
            }))
          );
        } catch {}

        // Save to IndexedDB (local offline cache)
        try {
          await saveRomanUrdu(surahNumber, romanUrduVerses);
        } catch {}

        if (!cancelled) setRomanUrdu(romanUrduVerses);
      } catch (err) {
        if (!cancelled) {
          setError(
            err?.message?.includes("timed out")
              ? "The request timed out. Please try again."
              : "Failed to load Roman Urdu translation. Please try again later."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadRomanUrdu();

    return () => {
      cancelled = true;
    };
  }, [surahNumber, verses?.length, enabled]);

  return { romanUrdu, loading, error };
}