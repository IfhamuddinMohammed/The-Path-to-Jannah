import { surahs } from "@/data/quranData";
import { appParams } from "@/lib/app-params";

// cdn.islamic.network doesn't send Access-Control-Allow-Origin, so `fetch()` (needed to
// download/cache audio as a Blob) fails with a CORS error — only <audio src> streaming
// works there. everyayah.com serves the same recitations with `Access-Control-Allow-Origin: *`,
// so it works for both in-app playback and Blob-based download/caching.
export const RECITER_FOLDERS = {
  mishary: "Alafasy_128kbps",
  sudais: "Abdurrahmaan_As-Sudais_192kbps",
  husary: "Husary_128kbps",
  minshawi: "Minshawy_Murattal_128kbps",
};

export function getAyahAudioUrl(surahNumber, numberInSurah, reciter) {
  const folder = RECITER_FOLDERS[reciter] || RECITER_FOLDERS.mishary;
  const surah = String(surahNumber).padStart(3, "0");
  const ayah = String(numberInSurah).padStart(3, "0");
  return `https://everyayah.com/data/${folder}/${surah}${ayah}.mp3`;
}

// Spoken audio translations, served by alquran.cloud (the same free API this
// app already uses for Arabic/English/Urdu text) via the islamic.network CDN.
export const TRANSLATION_AUDIO_EDITIONS = {
  urdu: { id: "ur.khan", bitrate: 64, narrator: "Shamshad Ali Khan" },
  english: { id: "en.walk", bitrate: 192, narrator: "Ibrahim Walk" },
};

export const AUDIO_LANGUAGES = [
  { id: "arabic", label: "Arabic Recitation" },
  { id: "urdu", label: "Urdu Translation" },
  { id: "english", label: "English Translation" },
];

// islamic.network addresses ayahs by their absolute position in the whole
// Qur'an (1-6236), not by surah + ayah-in-surah — so translation-audio URLs
// need a running offset of verse counts for every surah before this one.
function getGlobalAyahNumber(surahNumber, numberInSurah) {
  let total = 0;
  for (const s of surahs) {
    if (s.id >= surahNumber) break;
    total += s.verses;
  }
  return total + numberInSurah;
}

export function getTranslationAudioUrl(surahNumber, numberInSurah, language) {
  const edition = TRANSLATION_AUDIO_EDITIONS[language];
  if (!edition) return null;
  const globalNumber = getGlobalAyahNumber(surahNumber, numberInSurah);
  return `https://cdn.islamic.network/quran/audio/${edition.bitrate}/${edition.id}/${globalNumber}.mp3`;
}

// Single entry point for "what should this ayah's audio src be," so Arabic
// recitation and Urdu/English translation-audio share one code path.
export function getVoiceAudioUrl(surahNumber, numberInSurah, { language, reciter }) {
  return language === "arabic" || !language
    ? getAyahAudioUrl(surahNumber, numberInSurah, reciter)
    : getTranslationAudioUrl(surahNumber, numberInSurah, language);
}

// A stable string key identifying an audio track's source — used to key the
// offline (IndexedDB) cache per surah+voice, so downloading Urdu audio doesn't
// collide with or get confused for Arabic/English downloads of the same ayah.
export function getVoiceKey({ language, reciter } = {}) {
  return language && language !== "arabic" ? language : reciter || "mishary";
}

// everyayah.com (Arabic recitation) sends CORS headers, so it can be fetched
// directly as a Blob for offline caching. cdn.islamic.network (translation
// audio) does not — so downloads for Urdu/English go through this app's own
// `quranAudioProxy` backend function, which re-fetches the file server-side
// (no CORS restriction between servers) and re-serves it with CORS enabled.
export function getVoiceDownloadUrl(surahNumber, numberInSurah, voice) {
  if (voice.language === "arabic" || !voice.language) {
    return getAyahAudioUrl(surahNumber, numberInSurah, voice.reciter);
  }
  const globalNumber = getGlobalAyahNumber(surahNumber, numberInSurah);
  return `${appParams.appBaseUrl}/functions/quranAudioProxy?ayah=${globalNumber}&language=${voice.language}`;
}
