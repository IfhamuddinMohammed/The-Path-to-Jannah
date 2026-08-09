import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "seerah_bookmarks";

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Bookmarks a whole Seerah event (there's no finer-grained unit to bookmark within one, unlike
// Quran verses) — keyed by title, the same stable join key seedBackfill.js uses to match rows.
export function useSeerahBookmarks() {
  const [bookmarks, setBookmarks] = useState(loadFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch {
      // ignore storage errors
    }
  }, [bookmarks]);

  const isEventBookmarked = useCallback(
    (title) => bookmarks.some((b) => b.title === title),
    [bookmarks]
  );

  const toggleEventBookmark = useCallback((eventData) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.title === eventData.title);
      if (exists) {
        return prev.filter((b) => b.title !== eventData.title);
      }
      return [...prev, { ...eventData, savedAt: new Date().toISOString() }];
    });
  }, []);

  return { bookmarks, isEventBookmarked, toggleEventBookmark };
}
