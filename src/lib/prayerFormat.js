import { Star, Sunrise, Sun, Sunset, Moon, Clock } from "lucide-react";

const PRAYER_ICONS = {
  Fajr: Star,
  Sunrise: Sunrise,
  Dhuhr: Sun,
  Asr: Sun,
  Maghrib: Sunset,
  Isha: Moon,
};

export function getPrayerIcon(prayerName) {
  return PRAYER_ICONS[prayerName] || Clock;
}

export function formatCountdown(minutes) {
  if (minutes < 0) return "Now";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
