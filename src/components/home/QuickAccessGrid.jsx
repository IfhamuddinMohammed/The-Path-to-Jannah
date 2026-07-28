import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  BookOpen,
  MessageSquare,
  Clock,
  Moon,
  Compass,
  Star,
  Sun,
  BookUser,
  CircleDashed,
} from "lucide-react";

const quickAccessItems = [
  { title: "Qur'an", icon: BookOpen, url: "Quran" },
  { title: "Hadith", icon: MessageSquare, url: "Hadith" },
  { title: "Prayer Times", icon: Clock, url: "PrayerTimes" },
  { title: "Duas", icon: Moon, url: "Duas" },
  { title: "Qibla", icon: Compass, url: "Qibla" },
  { title: "99 Names", icon: Star, url: "Names" },
  { title: "Tasbeeh", icon: CircleDashed, url: "Tasbeeh" },
  { title: "Guidance", icon: Sun, url: "Guidance" },
  { title: "Stories", icon: BookUser, url: "Stories" },
];

export default function QuickAccessGrid() {
  const scrollToExplore = () =>
    document.getElementById("explore-section")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-semibold text-primary">Quick Access</h2>
        <button
          type="button"
          onClick={scrollToExplore}
          className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
        >
          See All
        </button>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
        {quickAccessItems.map((item, idx) => (
          <Link
            key={item.title}
            to={createPageUrl(item.url)}
            className="group flex flex-col items-center gap-2.5 px-3 py-4 rounded-2xl bg-card border border-border glow-shadow hover:border-accent/30 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#F4F7F4] dark:bg-white/5 border border-[#E5ECE6] dark:border-white/10 group-hover:shadow-sm group-hover:border-amber-400/50 group-active:border-amber-400/70 group-hover:scale-105 transition-all duration-300">
              <item.icon
                className={`w-7 h-7 ${
                  idx % 2 === 0
                    ? "text-emerald-900 dark:text-emerald-400"
                    : "text-amber-700 dark:text-amber-500"
                }`}
                strokeWidth={1.5}
              />
            </div>
            <span className="text-xs font-medium text-primary text-center leading-tight">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
