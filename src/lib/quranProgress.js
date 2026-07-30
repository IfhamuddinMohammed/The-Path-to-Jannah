const STORAGE_KEY = "sirat-quran-last-read";

// Where the reader last stopped in Page View — checkpointed continuously while scrolling (not
// just on exit) so force-closing the app or navigating away some other way still remembers the
// spot, the same way a Kindle or podcast app checkpoints playback position.
export function saveLastRead({ surahId, surahName, surahArabic, ayah, pageNumber }) {
  if (!surahId || !pageNumber) return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ surahId, surahName, surahArabic, ayah, pageNumber, savedAt: Date.now() })
    );
  } catch {
    // ignore (private browsing / storage disabled)
  }
}

export function getLastRead() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.surahId && parsed?.pageNumber ? parsed : null;
  } catch {
    return null;
  }
}

export function clearLastRead() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
