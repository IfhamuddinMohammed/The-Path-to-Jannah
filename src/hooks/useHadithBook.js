import { useState, useEffect } from "react";

const API_BASE = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions";

// In-memory cache — sections are small (tens of KB), so caching avoids
// re-fetching when the user switches back to a previously-viewed book.
const sectionCache = new Map();

async function fetchSection(editionKey, bookNumber) {
  const cacheKey = `${editionKey}:${bookNumber}`;
  if (sectionCache.has(cacheKey)) return sectionCache.get(cacheKey);
  const promise = fetch(`${API_BASE}/${editionKey}/sections/${bookNumber}.json`).then((res) => {
    if (!res.ok) throw new Error(`Failed to load ${editionKey} section ${bookNumber}`);
    return res.json();
  });
  sectionCache.set(cacheKey, promise);
  try {
    return await promise;
  } catch (err) {
    sectionCache.delete(cacheKey);
    throw err;
  }
}

// These editions embed the narrator inside the hadith text itself, in various
// phrasings ("Narrated 'Umar: ...", "Ibn `Umar narrated that: ...", "It was
// narrated from X that the Prophet said: ..."). The colon doesn't reliably
// mark the end of just the narrator's name — sometimes a whole clause ("that
// the Prophet (ﷺ) said") sits between the name and the colon. Rather than
// risk mis-splitting a narrator name that actually includes half a sentence,
// only accept a match that looks like a name (short, no verb-like words) and
// otherwise show the full text unsplit.
const NARRATOR_PATTERNS = [
  /^(?:Narrated|It was narrated (?:that|from|on the authority of))\s+([^:]+?)\s*:\s*/i,
  /^([A-Z][^:]{2,60}?)\s+narrated(?:\s+(?:that|from))?\s*:\s*/,
];
const SUSPICIOUS_WORDS = /\b(said|reported|stated|narrated|that|asked|added)\b/i;

function splitNarrator(text) {
  if (!text) return { narrator: null, body: "" };
  for (const pattern of NARRATOR_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      const narrator = match[1].trim();
      if (narrator.length <= 50 && !SUSPICIOUS_WORDS.test(narrator)) {
        return { narrator, body: text.slice(match[0].length).trim() };
      }
    }
  }
  return { narrator: null, body: text.trim() };
}

// Bukhari and Muslim are, by scholarly consensus, considered Sahih in their
// entirety — the API's own grading data is only meaningful (and present) for
// the other four collections, which contain a real mix of gradings.
function deriveAuthenticity(grades, collectionKey) {
  if (collectionKey === "bukhari" || collectionKey === "muslim") return "Sahih";
  if (!grades || grades.length === 0) return null;
  const text = grades.map((g) => g.grade).join(" ").toLowerCase();
  if (text.includes("da'if") || text.includes("daif") || text.includes("weak")) return "Da'if";
  if (text.includes("hasan")) return "Hasan";
  if (text.includes("sahih")) return "Sahih";
  return null;
}

export function useHadithBook(collectionKey, bookNumber, needsUrdu) {
  const [state, setState] = useState({ hadiths: [], loading: false, error: null });

  useEffect(() => {
    if (!collectionKey || bookNumber == null) {
      setState({ hadiths: [], loading: false, error: null });
      return;
    }

    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));

    async function load() {
      try {
        const [arabicData, englishData, urduData] = await Promise.all([
          fetchSection(`ara-${collectionKey}`, bookNumber),
          fetchSection(`eng-${collectionKey}`, bookNumber),
          needsUrdu ? fetchSection(`urd-${collectionKey}`, bookNumber) : Promise.resolve(null),
        ]);

        if (cancelled) return;

        const arabicByNumber = new Map(arabicData.hadiths.map((h) => [h.hadithnumber, h]));
        const urduByNumber = urduData
          ? new Map(urduData.hadiths.map((h) => [h.hadithnumber, h]))
          : null;

        const hadiths = englishData.hadiths.map((h) => {
          const { narrator, body } = splitNarrator(h.text);
          const urduEntry = urduByNumber?.get(h.hadithnumber);
          return {
            id: `${collectionKey}-${h.hadithnumber}`,
            hadithnumber: h.hadithnumber,
            narrator,
            english: body,
            arabic: arabicByNumber.get(h.hadithnumber)?.text || "",
            urdu: urduEntry ? splitNarrator(urduEntry.text).body : null,
            grades: h.grades || [],
            authenticity: deriveAuthenticity(h.grades, collectionKey),
          };
        });

        setState({ hadiths, loading: false, error: null });
      } catch {
        if (!cancelled) {
          setState({
            hadiths: [],
            loading: false,
            error: "Failed to load these hadiths. Please check your connection and try again.",
          });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [collectionKey, bookNumber, needsUrdu]);

  return state;
}
