import { PAGE_STARTS, SAJDA_AYAHS } from "@/data/mushafBoundaries";

function compareRef(a, b) {
  return a[0] - b[0] || a[1] - b[1];
}

// 1-indexed real Mushaf page number that a given [surah, ayah] falls within — used to find
// which page to open Page View on when entering from a selected surah. Once inside Page View
// itself, page/juz/hizb/ruku/manzil/sajdah numbers come straight from the per-verse API data
// (quran.com's by_page endpoint), so no further boundary lookups are needed there.
export function getPageAt(surahId, ayah) {
  const ref = [surahId, ayah];
  let page = 1;
  for (let i = 0; i < PAGE_STARTS.length; i++) {
    if (compareRef(PAGE_STARTS[i], ref) <= 0) page = i + 1;
    else break;
  }
  return page;
}

// quran.com's per-verse data flags whether an ayah is a sajdah at all (sajdah_number), but not
// the obligatory-vs-recommended distinction — that nuance stays sourced from our own verified
// data (see mushafBoundaries.js) since it varies by school of thought, not by typography.
export function isObligatorySajda(surahId, ayah) {
  const entry = SAJDA_AYAHS.find((ref) => ref[0] === surahId && ref[1] === ayah);
  return entry ? entry[2] : false;
}

// Traditional Quranic annotation (waqf/pause) marks, keyed by their Unicode codepoint as
// already embedded in the Uthmani text. Meanings follow the standard tajweed convention for
// these specific glyphs — worth double-checking against a qualified teacher, since these are
// religious pause rules, not just decoration.
export const WAQF_MARKS = {
  "ۖ": { label: "صلے", name: "Waqf Muraqqabah (better to continue)", meaning: "Pausing is allowed, but continuing is preferred." },
  "ۗ": { label: "قلى", name: "Waqf Awla (better to stop)", meaning: "Stopping is preferred, though continuing is allowed." },
  "ۙ": { label: "لا", name: "La Waqf (do not stop)", meaning: "Do not pause here — keep reading." },
  "ۚ": { label: "ج", name: "Waqf Jaiz (optional stop)", meaning: "Pausing or continuing are both fine." },
  "ۛ": { label: "؞", name: "Mu'anaqah (paired stop)", meaning: "Pause at this mark or its matching pair nearby — not both." },
  "ۜ": { label: "س", name: "Saktah (brief pause)", meaning: "A short silent pause, without breaking your breath." },
  "ۢ": { label: "م", name: "Waqf Lazim (mandatory stop)", meaning: "You must stop here." },
};

// Splits Arabic verse text into plain-text and waqf-mark segments so marks can be rendered as
// separately tappable spans while everything else stays plain inline text.
export function splitWaqfMarks(text) {
  const segments = [];
  let buffer = "";
  for (const ch of text) {
    const mark = WAQF_MARKS[ch];
    if (mark) {
      if (buffer) segments.push({ type: "text", value: buffer });
      buffer = "";
      segments.push({ type: "waqf", value: ch, ...mark });
    } else {
      buffer += ch;
    }
  }
  if (buffer) segments.push({ type: "text", value: buffer });
  return segments;
}
