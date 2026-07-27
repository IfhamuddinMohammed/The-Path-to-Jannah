import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { getRomanUrdu, saveRomanUrdu } from "@/lib/quranDB";

const BATCH_SIZE = 15;
const LLM_TIMEOUT_MS = 60000;

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

      // 1. Check database entity (shared across ALL users — no per-user LLM calls)
      try {
        const cached = await base44.entities.RomanUrduSurah.filter({
          surah_number: surahNumber,
        });
        if (!cancelled && cached && cached.length > 0) {
          const versesData = JSON.parse(cached[0].verses_data);
          const romanUrduVerses = verses.map((v) => {
            const match = versesData.find(
              (vd) => vd.ayah === v.numberInSurah
            );
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
        // fall through to LLM generation
      }

      // 3. Generate via LLM (first-time only — result gets saved to DB for all future users)
      const urduTexts = verses.map((v) => v.urdu).filter(Boolean);
      if (urduTexts.length === 0) {
        if (!cancelled) {
          setError("Urdu translation not available for this surah.");
          setLoading(false);
        }
        return;
      }

      try {
        const allTransliterations = [];

        for (let i = 0; i < urduTexts.length; i += BATCH_SIZE) {
          const batch = urduTexts.slice(i, i + BATCH_SIZE);
          const result = await withTimeout(
            base44.integrations.Core.InvokeLLM({
              prompt: `You are an expert in Urdu-to-Roman-Urdu transliteration.

Convert the following Urdu verses (in Arabic/Urdu script) to Roman Urdu (Latin script).

Rules:
- Use common South Asian Roman Urdu spelling conventions
- Examples: "khuda" (خدا), "rasool" (رسول), "iman" (ایمان), "namaz" (نماز), "roza" (روزہ), "quran" (قرآن), "zindagi" (زندگی), "mabood" (معبود), "paighambar" (پیغمبر)
- Keep the meaning and sentence structure intact
- Add parenthetical alternatives for ambiguous words where helpful (e.g., "peeng(oongh)")

Return a JSON object: { "verses": ["roman urdu verse 1", "roman urdu verse 2", ...] }

Urdu verses to transliterate:
${JSON.stringify(batch)}`,
              response_json_schema: {
                type: "object",
                properties: {
                  verses: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
              },
            }),
            LLM_TIMEOUT_MS
          );

          if (cancelled) return;

          const transliterations =
            result?.verses || (Array.isArray(result) ? result : []);
          allTransliterations.push(...transliterations);
        }

        if (cancelled) return;

        const romanUrduVerses = verses.map((v, i) => ({
          ...v,
          romanUrdu: allTransliterations[i] || "",
        }));

        // Save to database so ALL future users get it instantly (no LLM call needed)
        try {
          const versesData = verses.map((v, i) => ({
            ayah: v.numberInSurah,
            roman_urdu: allTransliterations[i] || "",
          }));
          await base44.entities.RomanUrduSurah.create({
            surah_number: surahNumber,
            surah_name: verses[0]?.surahName || "",
            verses_data: JSON.stringify(versesData),
          });
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
              : "Failed to generate Roman Urdu translation. Please try again later."
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