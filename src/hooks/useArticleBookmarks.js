import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "guidance_bookmarks";

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Manages Guidance article bookmarks (by article id) in localStorage.
export function useArticleBookmarks() {
  const [bookmarked, setBookmarked] = useState(loadFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarked));
    } catch {
      // ignore storage errors
    }
  }, [bookmarked]);

  const isBookmarked = useCallback((id) => bookmarked.includes(id), [bookmarked]);

  const toggleBookmark = useCallback((id) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((existing) => existing !== id) : [...prev, id]
    );
  }, []);

  return { bookmarked, isBookmarked, toggleBookmark };
}
