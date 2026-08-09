// The full daily rak'ah format (Sunnah + Farz + Nafl + Witr), not just the Farz-only structure
// in salahStructure.js — that file deliberately deferred this ("Sunnah/Nafl/Witr/Jummah/Eid...
// are deferred to a later phase"). This is that phase.
//
// Rak'ah counts and classifications researched against:
// - The Farz counts and the 12-rak'ah Sunnah Mu'akkadah (confirmed Sunnah) are agreed upon
//   across the Sunni schools and are drawn directly from hadith: Sahih Muslim 728 (Umm
//   Habibah, RA) and Sunan Ibn Majah 1140 list exactly 4 before Dhuhr + 2 after, 2 after
//   Maghrib, 2 after Isha, and 2 before Fajr = 12. Sahih Muslim 725 separately emphasizes the
//   2 before Fajr ("better than the whole world").
// - The 4 rak'ah before Asr are a recommended (not confirmed) Sunnah: Sunan Abu Dawud 1271
//   ("Allah have mercy on one who prays 4 before Asr"), graded hasan by Al-Albani — weaker than
//   the confirmed 12, which is why it's classified separately below.
// - Witr's ruling is the one genuine point of difference between schools, and is called out
//   explicitly rather than papered over: this file follows the Hanafi classification (Witr as
//   Wajib, 3 rak'ah joined in one unit with a single salam and Qunoot in the 3rd) since that's
//   this app's default madhab (see usePrayerPreferences.js) and matches the reference chart the
//   content was checked against. The other three Sunni schools treat Witr as a strongly
//   recommended Sunnah, not Wajib, usually prayed as separate odd-numbered rak'ahs (e.g. 2 then
//   1, each with its own salam) rather than one joined 3-rak'ah unit — see WITR_MADHAB_NOTE.
// - Nafl rak'ahs (voluntary, beyond the confirmed/recommended Sunnah above) have no fixed count
//   by definition — the counts below reflect common practice, not an obligation to pray exactly
//   that many.

export const RAKAH_TYPES = {
  SUNNAH_MUAKKADAH: "sunnah_muakkadah",
  SUNNAH_GHAIR_MUAKKADAH: "sunnah_ghair_muakkadah",
  FARZ: "farz",
  WITR_WAJIB: "witr_wajib",
  NAFL: "nafl",
  EID_PRAYER: "eid_prayer",
};

export const RAKAH_TYPE_META = {
  [RAKAH_TYPES.SUNNAH_MUAKKADAH]: {
    label: "Sunnah",
    fullLabel: "Sunnah Mu'akkadah",
    description: "Confirmed Sunnah — consistently prayed by the Prophet ﷺ; part of the 12 daily rak'ahs of Sunnah Mu'akkadah.",
  },
  [RAKAH_TYPES.SUNNAH_GHAIR_MUAKKADAH]: {
    label: "Sunnah",
    fullLabel: "Sunnah Ghair Mu'akkadah",
    description: "Recommended Sunnah — encouraged, but not as emphasized or consistently practiced as Sunnah Mu'akkadah.",
  },
  [RAKAH_TYPES.FARZ]: {
    label: "Farz",
    fullLabel: "Farz",
    description: "Obligatory — the core prayer itself.",
  },
  [RAKAH_TYPES.WITR_WAJIB]: {
    label: "Witr",
    fullLabel: "Witr (Wajib)",
    description: "Wajib per the Hanafi school — see the note below on how other schools classify Witr.",
  },
  [RAKAH_TYPES.NAFL]: {
    label: "Nafl",
    fullLabel: "Nafl",
    description: "Voluntary — extra reward, no fixed or required count.",
  },
  [RAKAH_TYPES.EID_PRAYER]: {
    label: "Eid",
    fullLabel: "Eid Prayer (Wajib)",
    description: "Wajib per the Hanafi school — see the note below on how other schools classify it.",
  },
};

export const PRAYER_RAKAH_CHART = [
  {
    key: "fajr",
    label: "Fajr",
    arabic: "الفجر",
    segments: [
      { type: RAKAH_TYPES.SUNNAH_MUAKKADAH, count: 2 },
      { type: RAKAH_TYPES.FARZ, count: 2 },
    ],
  },
  {
    key: "dhuhr",
    label: "Dhuhr",
    arabic: "الظهر",
    segments: [
      { type: RAKAH_TYPES.SUNNAH_MUAKKADAH, count: 4 },
      { type: RAKAH_TYPES.FARZ, count: 4 },
      { type: RAKAH_TYPES.SUNNAH_MUAKKADAH, count: 2 },
      { type: RAKAH_TYPES.NAFL, count: 2 },
    ],
  },
  {
    key: "asr",
    label: "Asr",
    arabic: "العصر",
    segments: [
      { type: RAKAH_TYPES.SUNNAH_GHAIR_MUAKKADAH, count: 4 },
      { type: RAKAH_TYPES.FARZ, count: 4 },
    ],
  },
  {
    key: "maghrib",
    label: "Maghrib",
    arabic: "المغرب",
    segments: [
      { type: RAKAH_TYPES.FARZ, count: 3 },
      { type: RAKAH_TYPES.SUNNAH_MUAKKADAH, count: 2 },
      { type: RAKAH_TYPES.NAFL, count: 2 },
    ],
  },
  {
    key: "isha",
    label: "Isha",
    arabic: "العشاء",
    segments: [
      { type: RAKAH_TYPES.SUNNAH_GHAIR_MUAKKADAH, count: 4 },
      { type: RAKAH_TYPES.FARZ, count: 4 },
      { type: RAKAH_TYPES.SUNNAH_MUAKKADAH, count: 2 },
      { type: RAKAH_TYPES.NAFL, count: 2 },
      { type: RAKAH_TYPES.WITR_WAJIB, count: 3, note: "Prayed as one joined unit — Tashahhud (no salam) after the 2nd rak'ah, Qunoot in the 3rd, then salam." },
      { type: RAKAH_TYPES.NAFL, count: 2, note: "Optional — many instead follow the Sunnah of making Witr the last prayer of the night (Sahih al-Bukhari 998)." },
    ],
  },
];

// Jummah replaces that day's Dhuhr for whoever is obligated to attend it — it is not an
// additional prayer layered on top of Dhuhr.
export const JUMMAH_STRUCTURE = {
  key: "jummah",
  label: "Jummah",
  arabic: "الجمعة",
  appliesTo:
    "Fard on every adult, sane, free, resident (non-traveling) male. It replaces that day's Dhuhr for him — he does not also pray Dhuhr. Women, travelers, the sick, and others with a valid excuse are not obligated to attend; they pray Dhuhr as usual, though attending Jummah is still permitted and rewarded for them.",
  segments: [
    { type: RAKAH_TYPES.SUNNAH_MUAKKADAH, count: 4, caption: "Before the Khutbah" },
    { type: "khutbah", label: "Khutbah (two sermons)", note: "Listened to in silence — required for Jummah to be valid, unlike the daily Fard prayers." },
    { type: RAKAH_TYPES.FARZ, count: 2, caption: "Congregational", note: "Must be prayed in Jama'ah led by an Imam." },
    { type: RAKAH_TYPES.SUNNAH_MUAKKADAH, count: 4, caption: "After the Farz", note: "Sahih Muslim 881: \"Whoever among you prays after Jumu'ah, let him pray four.\"" },
    { type: RAKAH_TYPES.NAFL, count: 2, note: "Optional, beyond the confirmed 4." },
  ],
};

// Both Eid prayers share the exact same rak'ah/Takbir structure — only the surrounding Sunnahs
// (see the "Eid ul-Fitr"/"Eid ul-Adha" lessons) differ. Unlike the daily prayers above, there is
// no established Sunnah or Nafl immediately before or after the Eid prayer itself.
export const EID_STRUCTURE = {
  key: "eid",
  label: "Eid ul-Fitr / Eid ul-Adha",
  arabic: "عيد الفطر / عيد الأضحى",
  note: "No Adhan or Iqamah is called before this prayer.",
  segments: [
    {
      type: RAKAH_TYPES.EID_PRAYER,
      count: 2,
      caption: "+ 6 extra Takbirs (Hanafi)",
      note: "3 extra Takbirs before Al-Fatihah in the 1st rak'ah, 3 more before Ruku' in the 2nd.",
    },
    {
      type: "khutbah",
      label: "Khutbah (two sermons)",
      note: "Delivered after the prayer — Sunnah, not a condition for the prayer's validity (the reverse of Jummah).",
    },
  ],
};

export const EID_MADHAB_NOTE =
  "As with Witr, the Eid prayer's ruling differs by school: Hanafi holds it to be Wajib, while Shafi'i, Maliki, and Hanbali hold it to be a strongly recommended Sunnah. The number of extra Takbirs differs too — Hanafi prescribes 6 total (3 in each rak'ah); Shafi'i, Maliki, and Hanbali commonly prescribe 12 (7 in the 1st rak'ah, 5 in the 2nd), though scholars record more than ten distinct counts among early authorities.";

export const SUNNAH_MUAKKADAH_NOTE =
  "The 12 daily Sunnah Mu'akkadah rak'ahs (2 before Fajr, 4 before + 2 after Dhuhr, 2 after Maghrib, 2 after Isha) are described in Sahih Muslim 728: whoever prays them every day, Allah builds a house for them in Paradise.";

export const WITR_MADHAB_NOTE =
  "Witr's ruling is one of the few places the schools genuinely differ. The Hanafi school (this app's default) holds Witr to be Wajib — obligatory, but a rank below Farz — and prays its 3 rak'ahs joined as one unit with a single salam. The Shafi'i, Maliki, and Hanbali schools hold Witr to be a strongly recommended Sunnah rather than Wajib, and typically pray it as separate odd-numbered rak'ahs (commonly 1, or 3 prayed as 2 then 1, each ending in its own salam) rather than one joined unit.";
