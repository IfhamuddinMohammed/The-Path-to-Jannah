import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const PrayerPreferencesContext = createContext(null);
const STORAGE_KEY = "prayer_academy_preferences";

export const MADHABS = [
  { id: "hanafi", name: "Hanafi" },
  { id: "shafii", name: "Shafi'i" },
  { id: "maliki", name: "Maliki" },
  { id: "hanbali", name: "Hanbali" },
];

// Shared default so the Academy hub and Wudu tutorial don't each reset their own
// language toggle independently.
const DEFAULT_SETTINGS = {
  madhab: "hanafi",
  contentLanguage: "english", // "english" | "roman_urdu"
};

function loadSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch {
    // ignore
  }
  return DEFAULT_SETTINGS;
}

export function PrayerPreferencesProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  const updateSettings = useCallback((partial) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  const value = { settings, updateSettings };

  return (
    <PrayerPreferencesContext.Provider value={value}>
      {children}
    </PrayerPreferencesContext.Provider>
  );
}

export function usePrayerPreferences() {
  const ctx = useContext(PrayerPreferencesContext);
  if (!ctx) throw new Error("usePrayerPreferences must be used within PrayerPreferencesProvider");
  return ctx;
}
