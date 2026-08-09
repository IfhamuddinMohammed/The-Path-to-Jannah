// How the 11 canonical SalahStep rows actually sequence into a real prayer. This is fixed
// liturgical structure, not admin-editable content, so it lives here as static data rather than
// in the entity — matching the existing convention (src/data/hadithCollections.js,
// src/data/mushafBoundaries.js) of keeping fixed/structural data out of Base44 entities.
//
// Sourced against "My Prayer — the Second Pillar of Islam" (IMAN Projects / New Muslim Care),
// which the user provided as a reference. Two deliberate simplifications from a maximal
// step list, matching that same booklet's approach and this app's "very understandable for
// everyone" goal: no separate mandatory "Sana" (opening dua) step — Takbir goes straight into
// seeking refuge (Ta'awwudh); and no separate "dua before salam" step — Salawat flows straight
// into the closing Salam. Both are still real, valid Sunnah additions some people include —
// callable out in the Salawat step's own content rather than tracked as their own steps.

export const STEP_KEYS = {
  TAKBIR_AL_IHRAM: "takbir_al_ihram",
  TAAWWUDH: "taawwudh",
  AL_FATIHA: "al_fatiha",
  SURAH_AFTER_FATIHA: "surah_after_fatiha",
  RUKU: "ruku",
  RISING_FROM_RUKU: "rising_from_ruku",
  SUJOOD: "sujood",
  SITTING_BETWEEN_SUJOOD: "sitting_between_sujood",
  TASHAHHUD: "tashahhud",
  SALAWAT_IBRAHIMIYYAH: "salawat_ibrahimiyyah",
  SALAM: "salam",
  EID_TAKBIRS: "eid_takbirs",
};

// Which posture silhouette to show for a given step — several recitation steps share the same
// physical posture (e.g. both Sujood dhikr steps look the same; sitting-between-Sujood and
// Tashahhud are both the seated posture).
export const STEP_POSTURES = {
  [STEP_KEYS.TAKBIR_AL_IHRAM]: "standing",
  [STEP_KEYS.TAAWWUDH]: "standing",
  [STEP_KEYS.AL_FATIHA]: "standing",
  [STEP_KEYS.SURAH_AFTER_FATIHA]: "standing",
  [STEP_KEYS.RUKU]: "ruku",
  [STEP_KEYS.RISING_FROM_RUKU]: "standing",
  [STEP_KEYS.SUJOOD]: "sujood",
  [STEP_KEYS.SITTING_BETWEEN_SUJOOD]: "sitting",
  [STEP_KEYS.TASHAHHUD]: "sitting",
  [STEP_KEYS.SALAWAT_IBRAHIMIYYAH]: "sitting",
  [STEP_KEYS.SALAM]: "sitting",
  [STEP_KEYS.EID_TAKBIRS]: "standing",
};

function rakahSteps({ isFirst, includesSurah }) {
  return [
    ...(isFirst ? [STEP_KEYS.TAKBIR_AL_IHRAM, STEP_KEYS.TAAWWUDH] : []),
    STEP_KEYS.AL_FATIHA,
    ...(includesSurah ? [STEP_KEYS.SURAH_AFTER_FATIHA] : []),
    STEP_KEYS.RUKU,
    STEP_KEYS.RISING_FROM_RUKU,
    STEP_KEYS.SUJOOD,
    STEP_KEYS.SITTING_BETWEEN_SUJOOD,
    STEP_KEYS.SUJOOD,
  ];
}

const SITTING_STEPS = {
  middle: [STEP_KEYS.TASHAHHUD],
  final: [STEP_KEYS.TASHAHHUD, STEP_KEYS.SALAWAT_IBRAHIMIYYAH, STEP_KEYS.SALAM],
};

// Builds the rak'ah-by-rak'ah structure for a prayer with `rakahCount` Fard rak'ahs (2, 3, or
// 4 — the only counts any of the 5 daily Fard prayers use). A middle (short) sitting happens
// after rak'ah 2 only when there are more rak'ahs still to come; the final (full) sitting
// always happens after the last rak'ah — flagged here for a scholar/content review pass, since
// getting this branching wrong would be a code bug, not a fixable content edit.
export function buildRakahSequence(rakahCount) {
  const rakahs = [];
  for (let n = 1; n <= rakahCount; n++) {
    const isLast = n === rakahCount;
    let sittingAfter = null;
    if (isLast) sittingAfter = "final";
    else if (n === 2 && rakahCount > 2) sittingAfter = "middle";
    rakahs.push({
      rakahNumber: n,
      steps: rakahSteps({ isFirst: n === 1, includesSurah: n <= 2 }),
      sittingAfter,
    });
  }
  return rakahs;
}

// Flattens the rak'ah structure into one linear list the live tracker walks through with a
// single index — this is what absorbs all the "middle Tashahhud" branching, so the walkthrough
// component itself never needs special-case logic, just advance-by-one like WuduTutorial.
export function flattenRakahSequence(rakahSequence) {
  const flat = [];
  for (const rakah of rakahSequence) {
    for (const stepKey of rakah.steps) {
      flat.push({ stepKey, rakahNumber: rakah.rakahNumber, groupLabel: `Rak'ah ${rakah.rakahNumber}` });
    }
    if (rakah.sittingAfter) {
      const label = rakah.sittingAfter === "final" ? "Final Sitting" : "Sitting (Tashahhud)";
      for (const stepKey of SITTING_STEPS[rakah.sittingAfter]) {
        flat.push({ stepKey, rakahNumber: rakah.rakahNumber, groupLabel: label });
      }
    }
  }
  return flat;
}

// The 5 daily Fard prayers this phase covers — Sunnah/Nafl/Witr/Jummah/Eid etc. are deferred to
// a later phase, but slot into this same engine by rak'ah count without a redesign.
export const DAILY_FARD_STRUCTURE = [
  { key: "fajr", label: "Fajr", arabic: "الفجر", rakahCount: 2, recitationNote: "Recited aloud in both rak'ahs." },
  { key: "dhuhr", label: "Dhuhr", arabic: "الظهر", rakahCount: 4, recitationNote: "Recited silently throughout." },
  { key: "asr", label: "Asr", arabic: "العصر", rakahCount: 4, recitationNote: "Recited silently throughout." },
  {
    key: "maghrib",
    label: "Maghrib",
    arabic: "المغرب",
    rakahCount: 3,
    recitationNote: "Recited aloud in the first 2 rak'ahs, silently in the 3rd.",
  },
  {
    key: "isha",
    label: "Isha",
    arabic: "العشاء",
    rakahCount: 4,
    recitationNote: "Recited aloud in the first 2 rak'ahs, silently in the 3rd and 4th.",
  },
];

// The Eid prayer (identical mechanics for both Eid ul-Fitr and Eid ul-Adha) is genuinely
// different from an ordinary rak'ah, not just a different rak'ah count — it has no Adhan or
// Iqamah before it, and inserts 3 extra Takbirs (Hanafi; other schools count differently — see
// the eid_takbirs SalahStep's madhab_notes) at two different points: before recitation in the
// 1st rak'ah, but after recitation (right before Ruku') in the 2nd. That insertion point moves
// depending on the rak'ah, which the generic rakahSteps()/buildRakahSequence() above has no way
// to express — so this is a dedicated, hardcoded flat sequence rather than a variation of it.
export function buildEidSequence() {
  return [
    { stepKey: STEP_KEYS.TAKBIR_AL_IHRAM, rakahNumber: 1, groupLabel: "Rak'ah 1" },
    { stepKey: STEP_KEYS.EID_TAKBIRS, rakahNumber: 1, groupLabel: "Rak'ah 1" },
    { stepKey: STEP_KEYS.TAAWWUDH, rakahNumber: 1, groupLabel: "Rak'ah 1" },
    { stepKey: STEP_KEYS.AL_FATIHA, rakahNumber: 1, groupLabel: "Rak'ah 1" },
    { stepKey: STEP_KEYS.SURAH_AFTER_FATIHA, rakahNumber: 1, groupLabel: "Rak'ah 1" },
    { stepKey: STEP_KEYS.RUKU, rakahNumber: 1, groupLabel: "Rak'ah 1" },
    { stepKey: STEP_KEYS.RISING_FROM_RUKU, rakahNumber: 1, groupLabel: "Rak'ah 1" },
    { stepKey: STEP_KEYS.SUJOOD, rakahNumber: 1, groupLabel: "Rak'ah 1" },
    { stepKey: STEP_KEYS.SITTING_BETWEEN_SUJOOD, rakahNumber: 1, groupLabel: "Rak'ah 1" },
    { stepKey: STEP_KEYS.SUJOOD, rakahNumber: 1, groupLabel: "Rak'ah 1" },
    { stepKey: STEP_KEYS.AL_FATIHA, rakahNumber: 2, groupLabel: "Rak'ah 2" },
    { stepKey: STEP_KEYS.SURAH_AFTER_FATIHA, rakahNumber: 2, groupLabel: "Rak'ah 2" },
    { stepKey: STEP_KEYS.EID_TAKBIRS, rakahNumber: 2, groupLabel: "Rak'ah 2" },
    { stepKey: STEP_KEYS.RUKU, rakahNumber: 2, groupLabel: "Rak'ah 2" },
    { stepKey: STEP_KEYS.RISING_FROM_RUKU, rakahNumber: 2, groupLabel: "Rak'ah 2" },
    { stepKey: STEP_KEYS.SUJOOD, rakahNumber: 2, groupLabel: "Rak'ah 2" },
    { stepKey: STEP_KEYS.SITTING_BETWEEN_SUJOOD, rakahNumber: 2, groupLabel: "Rak'ah 2" },
    { stepKey: STEP_KEYS.SUJOOD, rakahNumber: 2, groupLabel: "Rak'ah 2" },
    { stepKey: STEP_KEYS.TASHAHHUD, rakahNumber: 2, groupLabel: "Final Sitting" },
    { stepKey: STEP_KEYS.SALAWAT_IBRAHIMIYYAH, rakahNumber: 2, groupLabel: "Final Sitting" },
    { stepKey: STEP_KEYS.SALAM, rakahNumber: 2, groupLabel: "Final Sitting" },
  ];
}

export const EID_WALKTHROUGH_ENTRIES = [
  {
    key: "eid_fitr",
    label: "Eid ul-Fitr",
    arabic: "عيد الفطر",
    rakahCount: 2,
    isEid: true,
    recitationNote: "Recited aloud, with 6 extra Takbirs (Hanafi) — no Adhan or Iqamah before this prayer.",
  },
  {
    key: "eid_adha",
    label: "Eid ul-Adha",
    arabic: "عيد الأضحى",
    rakahCount: 2,
    isEid: true,
    recitationNote: "Recited aloud, with 6 extra Takbirs (Hanafi) — no Adhan or Iqamah before this prayer.",
  },
];

// Jummah's Farz is a plain 2 rak'ah prayer — mechanically identical to Fajr's — so it slots into
// the same rak'ah-walkthrough engine above with no changes; only the Sunnah/Nafl around it
// (covered in namazFormat.js) differs from an ordinary day.
export const JUMMAH_WALKTHROUGH_ENTRY = {
  key: "jummah",
  label: "Jummah",
  arabic: "الجمعة",
  rakahCount: 2,
  recitationNote: "Recited aloud in both rak'ahs, led by an Imam after the Khutbah — replaces that day's Dhuhr.",
};

// Anywhere a user picks "which prayer to walk through, rak'ah by rak'ah" should offer Jummah
// alongside the 5 daily Fard prayers — use this list for that picker, not DAILY_FARD_STRUCTURE
// alone, since Jummah itself isn't one of the 5 daily obligations (it replaces Dhuhr on Fridays).
export const WALKTHROUGH_PRAYERS = [...DAILY_FARD_STRUCTURE, JUMMAH_WALKTHROUGH_ENTRY, ...EID_WALKTHROUGH_ENTRIES];
