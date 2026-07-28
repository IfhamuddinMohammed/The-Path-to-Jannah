import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Sparkles, BookOpen, MessageSquare, Clock, Moon } from "lucide-react";

const navItems = [
  { title: "Home", url: createPageUrl("Home"), icon: Sparkles },
  { title: "Qur'an", url: createPageUrl("Quran"), icon: BookOpen },
  { title: "Hadith", url: createPageUrl("Hadith"), icon: MessageSquare },
  { title: "Prayer", url: createPageUrl("PrayerTimes"), icon: Clock },
  { title: "Duas", url: createPageUrl("Duas"), icon: Moon },
];

export default function MobileBottomNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border pb-safe">
      <div className="flex items-center justify-around px-2 pt-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <Link
              key={item.title}
              to={item.url}
              className={`flex flex-col items-center justify-center gap-0.5 py-2 px-2 rounded-lg transition-colors no-select ${
                isActive
                  ? "text-emerald-900 dark:text-emerald-400"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "drop-shadow-sm" : ""}`} />
              <span className={`text-[10px] ${isActive ? "font-bold" : "font-medium"}`}>
                {item.title}
              </span>
              <span
                className={`w-1 h-1 rounded-full transition-opacity ${
                  isActive ? "opacity-100 bg-emerald-900 dark:bg-emerald-400" : "opacity-0"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}