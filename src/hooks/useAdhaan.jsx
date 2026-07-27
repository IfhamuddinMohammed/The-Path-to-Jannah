import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

const AdhaanContext = createContext(null);
const STORAGE_KEY = "adhaan_settings";

export const ADHAN_SOUNDS = [
  { id: "a9", name: "Mishary Al-Afasy", url: "https://cdn.aladhan.com/audio/adhans/a9.mp3" },
  { id: "a1", name: "Ahmad al-Nafees", url: "https://cdn.aladhan.com/audio/adhans/a1.mp3" },
  { id: "a2", name: "Hafiz Mustafa Özcan", url: "https://cdn.aladhan.com/audio/adhans/a2.mp3" },
  { id: "a4", name: "Mishary Al-Afasy (Dubai)", url: "https://cdn.aladhan.com/audio/adhans/a4.mp3" },
  { id: "a7", name: "Mishary Al-Afasy (Alt)", url: "https://cdn.aladhan.com/audio/adhans/a7.mp3" },
  { id: "a11", name: "Mansour Al-Zahrani", url: "https://cdn.aladhan.com/audio/adhans/a11-mansour-al-zahrani.mp3" },
];

export const CALCULATION_METHODS = [
  { id: 3, name: "Muslim World League (MWL)" },
  { id: 2, name: "Islamic Society of North America (ISNA)" },
  { id: 4, name: "Umm Al-Qura University, Makkah" },
  { id: 5, name: "Egyptian General Authority of Survey" },
  { id: 1, name: "University of Islamic Sciences, Karachi" },
  { id: 8, name: "Gulf Region" },
  { id: 9, name: "Kuwait" },
  { id: 10, name: "Qatar" },
  { id: 12, name: "France" },
  { id: 13, name: "Turkey (Diyanet)" },
  { id: 17, name: "Malaysia (JAKIM)" },
  { id: 20, name: "Indonesia (KEMENAG)" },
];

export const PRAYER_INFO = {
  Fajr: { arabic: "الفجر", english: "Fajr", description: "Dawn Prayer" },
  Dhuhr: { arabic: "الظهر", english: "Dhuhr", description: "Noon Prayer" },
  Asr: { arabic: "العصر", english: "Asr", description: "Afternoon Prayer" },
  Maghrib: { arabic: "المغرب", english: "Maghrib", description: "Sunset Prayer" },
  Isha: { arabic: "العشاء", english: "Isha", description: "Night Prayer" },
};

const DEFAULT_SETTINGS = {
  enabled: false,
  useGeolocation: true,
  city: "",
  country: "",
  lat: null,
  lng: null,
  method: 3,
  prayers: { Fajr: true, Dhuhr: true, Asr: true, Maghrib: true, Isha: true },
  adhanSoundId: "a9",
  browserNotifications: false,
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

function parseTimeToToday(timeStr) {
  if (!timeStr) return null;
  const clean = timeStr.split(" ")[0];
  const [h, m] = clean.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

export function AdhaanProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeAdhaan, setActiveAdhaan] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const audioRef = useRef(null);
  const lastTriggeredRef = useRef("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const updateSettings = useCallback((partial) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  const fetchPrayerTimes = useCallback(async () => {
    const hasLocation = settings.useGeolocation
      ? settings.lat != null && settings.lng != null
      : !!(settings.city && settings.country);

    if (!hasLocation) {
      setPrayerTimes(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let url;
      if (settings.useGeolocation) {
        url = `https://api.aladhan.com/v1/timings?latitude=${settings.lat}&longitude=${settings.lng}&method=${settings.method}`;
      } else {
        url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
          settings.city
        )}&country=${encodeURIComponent(settings.country)}&method=${settings.method}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.code === 200 && data.data) {
        const t = data.data.timings;
        setPrayerTimes({
          Fajr: parseTimeToToday(t.Fajr),
          Sunrise: parseTimeToToday(t.Sunrise),
          Dhuhr: parseTimeToToday(t.Dhuhr),
          Asr: parseTimeToToday(t.Asr),
          Maghrib: parseTimeToToday(t.Maghrib),
          Isha: parseTimeToToday(t.Isha),
        });
        setLocationInfo({
          hijriDate: data.data.date?.hijri?.date,
          hijriDay: data.data.date?.hijri?.day,
          hijriMonth: data.data.date?.hijri?.month?.en,
          hijriYear: data.data.date?.hijri?.year,
          timezone: data.data.meta?.timezone,
          method: data.data.meta?.method?.name,
        });
      } else {
        setError("Could not fetch prayer times. Please check your location settings.");
      }
    } catch {
      setError("Failed to fetch prayer times. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, [
    settings.useGeolocation,
    settings.city,
    settings.country,
    settings.lat,
    settings.lng,
    settings.method,
  ]);

  useEffect(() => {
    fetchPrayerTimes();
  }, [fetchPrayerTimes]);

  const triggerAdhaan = useCallback(
    (prayer) => {
      const sound =
        ADHAN_SOUNDS.find((s) => s.id === settings.adhanSoundId) || ADHAN_SOUNDS[0];

      setActiveAdhaan({ prayer, soundUrl: sound.url, time: new Date() });

      if (audioRef.current) {
        audioRef.current.src = sound.url;
        audioRef.current.volume = 1;
        audioRef.current.play().catch(() => {});
      }

      if (
        settings.browserNotifications &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        const info = PRAYER_INFO[prayer] || PRAYER_INFO.Fajr;
        try {
          new Notification(`${info.english} — Prayer Time`, {
            body: `It is time for ${info.english} prayer (${info.description}).`,
            tag: "adhaan",
            requireInteraction: true,
          });
        } catch {
          // ignore
        }
      }
    },
    [settings.adhanSoundId, settings.browserNotifications]
  );

  const stopAdhaan = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setActiveAdhaan(null);
  }, []);

  const testAdhaan = useCallback(() => {
    triggerAdhaan("Fajr");
  }, [triggerAdhaan]);

  const requestNotificationPermission = useCallback(async () => {
    if (!("Notification" in window)) return false;
    if (Notification.permission === "granted") return true;
    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }
    return false;
  }, []);

  useEffect(() => {
    if (!settings.enabled || !prayerTimes) return;

    const checkTime = () => {
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      const today = now.toDateString();
      const prayerKeys = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

      for (const prayer of prayerKeys) {
        if (!settings.prayers[prayer]) continue;
        const pt = prayerTimes[prayer];
        if (!pt) continue;
        const prayerMinutes = pt.getHours() * 60 + pt.getMinutes();
        if (nowMinutes === prayerMinutes) {
          const key = `${prayer}-${today}`;
          if (lastTriggeredRef.current !== key) {
            lastTriggeredRef.current = key;
            triggerAdhaan(prayer);
          }
        }
      }
    };

    const timer = setInterval(checkTime, 15000);
    checkTime();
    return () => clearInterval(timer);
  }, [settings.enabled, settings.prayers, prayerTimes, triggerAdhaan]);

  const nextPrayer = useMemo(() => {
    if (!prayerTimes) return null;
    const prayerKeys = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    for (const key of prayerKeys) {
      if (prayerTimes[key] > currentTime) {
        const minutesUntil = Math.floor(
          (prayerTimes[key] - currentTime) / 60000
        );
        return { name: key, time: prayerTimes[key], minutesUntil };
      }
    }

    const tomorrowFajr = new Date(prayerTimes.Fajr);
    tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
    const minutesUntil = Math.floor((tomorrowFajr - currentTime) / 60000);
    return { name: "Fajr", time: tomorrowFajr, minutesUntil };
  }, [prayerTimes, currentTime]);

  const value = {
    settings,
    prayerTimes,
    nextPrayer,
    activeAdhaan,
    loading,
    error,
    locationInfo,
    updateSettings,
    stopAdhaan,
    testAdhaan,
    requestNotificationPermission,
    refetch: fetchPrayerTimes,
  };

  return (
    <AdhaanContext.Provider value={value}>
      <audio ref={audioRef} onEnded={() => setActiveAdhaan(null)} />
      {children}
    </AdhaanContext.Provider>
  );
}

export function useAdhaan() {
  const ctx = useContext(AdhaanContext);
  if (!ctx) throw new Error("useAdhaan must be used within AdhaanProvider");
  return ctx;
}