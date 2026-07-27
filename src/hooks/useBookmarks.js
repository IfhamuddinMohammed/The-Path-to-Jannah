import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "quran_bookmarks";

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : {};
    return {
      verses: Array.isArray(parsed.verses) ? parsed.verses : [],
      surahs: Array.isArray(parsed.surahs) ? parsed.surahs : [],
    };
  } catch {
    return { verses: [], surahs: [] };
  }
}

/**
 * Manages Quran bookmarks (verses and surahs) in localStorage.
 * Persists across sessions for the current browser/device.
 */
export function useBookmarks() {
  const [data, setData] = useState(loadFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore storage errors
    }
  }, [data]);

  const isVerseBookmarked = useCallback(
    (surahNumber, ayahNumber) =>
      data.verses.some(
        (v) => v.surahNumber === surahNumber && v.ayahNumber === ayahNumber
      ),
    [data.verses]
  );

  const isSurahBookmarked = useCallback(
    (surahNumber) => data.surahs.some((s) => s.surahNumber === surahNumber),
    [data.surahs]
  );

  const toggleVerseBookmark = useCallback((verseData) => {
    setData((prev) => {
      const exists = prev.verses.some(
        (v) =>
          v.surahNumber === verseData.surahNumber &&
          v.ayahNumber === verseData.ayahNumber
      );
      if (exists) {
        return {
          ...prev,
          verses: prev.verses.filter(
            (v) =>
              !(
                v.surahNumber === verseData.surahNumber &&
                v.ayahNumber === verseData.ayahNumber
              )
          ),
        };
      }
      return {
        ...prev,
        verses: [...prev.verses, { ...verseData, savedAt: new Date().toISOString() }],
      };
    });
  }, []);

  const toggleSurahBookmark = useCallback((surahData) => {
    setData((prev) => {
      const exists = prev.surahs.some(
        (s) => s.surahNumber === surahData.surahNumber
      );
      if (exists) {
        return {
          ...prev,
          surahs: prev.surahs.filter(
            (s) => s.surahNumber !== surahData.surahNumber
          ),
        };
      }
      return {
        ...prev,
        surahs: [...prev.surahs, { ...surahData, savedAt: new Date().toISOString() }],
      };
    });
  }, []);

  const savedVersesForSurah = useCallback(
    (surahNumber) => data.verses.filter((v) => v.surahNumber === surahNumber),
    [data.verses]
  );

  return {
    verseBookmarks: data.verses,
    surahBookmarks: data.surahs,
    isVerseBookmarked,
    isSurahBookmarked,
    toggleVerseBookmark,
    toggleSurahBookmark,
    savedVersesForSurah,
  };
}