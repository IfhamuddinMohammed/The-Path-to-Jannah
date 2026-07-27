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
