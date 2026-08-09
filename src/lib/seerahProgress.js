const STORAGE_KEY = "sirat-seerah-last-read";

// Where the reader last stopped in the Seerah Page View — checkpointed continuously while
// turning pages (not just on exit), the same pattern as quranProgress.js, so force-closing the
// app or navigating away some other way still remembers the spot.
export function saveLastRead({ eventTitle, era }) {
  if (!eventTitle) return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ eventTitle, era, savedAt: Date.now() })
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
    return parsed?.eventTitle ? parsed : null;
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
