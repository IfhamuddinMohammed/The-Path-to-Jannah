import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { createPageUrl } from "@/utils";

const routeLabels = {
  "/": "Home",
  "/Home": "Home",
  "/Quran": "Qur'an",
  "/Hadith": "Hadith",
  "/Stories": "Stories",
  "/Guidance": "Guidance",
  "/PrayerTimes": "Prayer Times",
  "/Qibla": "Qibla",
  "/Names": "99 Names",
  "/Seerah": "Seerah",
  "/Videos": "Videos",
  "/Duas": "Duas",
  "/Quiz": "Quiz",
  "/Kids": "Kids Corner",
  "/NewMuslims": "New Muslims",
  "/Fiqh": "Fiqh Rulings",
  "/FAQ": "FAQ",
  "/Community": "Community",
};

export default function Breadcrumbs() {
  const location = useLocation();
  const path = location.pathname;
  const label = routeLabels[path];

  if (path === "/" || path === "/Home" || !label) return null;

  return (
    <nav className="flex items-center gap-1 text-sm min-w-0">
      <Link
        to={createPageUrl("Home")}
        className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors shrink-0"
      >
        <Home className="w-3.5 h-3.5" />
      </Link>
      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
      <span className="font-medium text-primary truncate">{label}</span>
    </nav>
  );
}