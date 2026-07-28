import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Moon,
  FileText,
  Sparkles,
  Clock,
  Compass,
  Star,
  Heart,
  Video,
  Brain,
  Baby,
  Scale,
  Users,
  Sun,
  BookUser,
  Loader2,
  X,
  CircleDashed,
} from "lucide-react";
import { createPageUrl } from "@/utils";
import { surahs as quranSurahs } from "@/data/quranData";
import { Article, Dua, FAQ, Hadith } from "@/entities/all";

const searchPages = [
  { title: "Home", url: "Home", icon: Sparkles },
  { title: "Qur'an", url: "Quran", icon: BookOpen },
  { title: "Hadith", url: "Hadith", icon: MessageSquare },
  { title: "Stories", url: "Stories", icon: BookUser },
  { title: "Guidance", url: "Guidance", icon: Sun },
  { title: "Prayer Times", url: "PrayerTimes", icon: Clock },
  { title: "Qibla", url: "Qibla", icon: Compass },
  { title: "99 Names", url: "Names", icon: Star },
  { title: "Tasbeeh", url: "Tasbeeh", icon: CircleDashed },
  { title: "Seerah", url: "Seerah", icon: Heart },
  { title: "Videos", url: "Videos", icon: Video },
  { title: "Duas", url: "Duas", icon: Moon },
  { title: "Quiz", url: "Quiz", icon: Brain },
  { title: "Kids Corner", url: "Kids", icon: Baby },
  { title: "New Muslims", url: "NewMuslims", icon: Heart },
  { title: "Fiqh Rulings", url: "Fiqh", icon: Scale },
  { title: "FAQ", url: "FAQ", icon: HelpCircle },
  { title: "Community", url: "Community", icon: Users },
];

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [entityResults, setEntityResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Keyboard shortcut ⌘K / Ctrl+K, Escape to close
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close the suggestions panel when clicking outside of it
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Debounced entity search
  useEffect(() => {
    if (!open) return;
    if (!query || query.trim().length < 2) {
      setEntityResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    const timer = setTimeout(async () => {
      const q = query.trim();
      try {
        const [articles, duas, faqs, hadiths] = await Promise.all([
          Article.filter({ title: { $regex: q, $options: "i" } }, "-created_date", 4).catch(() => []),
          Dua.filter({ title: { $regex: q, $options: "i" } }, "-created_date", 4).catch(() => []),
          FAQ.filter({ question: { $regex: q, $options: "i" } }, "-created_date", 4).catch(() => []),
          Hadith.filter({ english_text: { $regex: q, $options: "i" } }, "-created_date", 4).catch(() => []),
        ]);

        const results = [];
        articles.forEach((a) =>
          results.push({
            key: `article-${a.id}`,
            type: "Article",
            title: a.title,
            subtitle: a.category,
            icon: FileText,
            page: "Guidance",
          })
        );
        duas.forEach((d) =>
          results.push({
            key: `dua-${d.id}`,
            type: "Dua",
            title: d.title,
            subtitle: d.category,
            icon: Moon,
            page: "Duas",
          })
        );
        faqs.forEach((f) =>
          results.push({
            key: `faq-${f.id}`,
            type: "FAQ",
            title: f.question,
            subtitle: f.category,
            icon: HelpCircle,
            page: "FAQ",
          })
        );
        hadiths.forEach((h) =>
          results.push({
            key: `hadith-${h.id}`,
            type: "Hadith",
            title: h.english_text?.length > 80 ? h.english_text.substring(0, 80) + "…" : h.english_text,
            subtitle: h.collection,
            icon: MessageSquare,
            page: "Hadith",
          })
        );
        setEntityResults(results);
      } catch {
        setEntityResults([]);
      }
      setSearching(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [query, open]);

  const surahResults =
    query.trim().length >= 2
      ? quranSurahs
          .filter(
            (s) =>
              s.name.toLowerCase().includes(query.toLowerCase()) ||
              s.transliteration.toLowerCase().includes(query.toLowerCase()) ||
              s.arabic.includes(query)
          )
          .slice(0, 5)
      : [];

  const pageResults =
    query.trim().length >= 1
      ? searchPages.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
      : [];

  const hasResults = pageResults.length > 0 || surahResults.length > 0 || entityResults.length > 0;

  const handleSelect = (url) => {
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
    navigate(createPageUrl(url));
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`flex items-center gap-2 w-full px-3 py-2 text-sm bg-muted rounded-lg transition-colors ${
          open ? "ring-2 ring-accent/40 bg-secondary" : ""
        }`}
      >
        <Search className="w-4 h-4 shrink-0 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Search Qur'an, Hadith, Duas…"
          className="flex-1 min-w-0 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
        />
        {query ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <kbd className="hidden md:inline shrink-0 text-xs bg-card border border-border rounded px-1.5 py-0.5 text-muted-foreground">
            ⌘K
          </kbd>
        )}
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-popover text-popover-foreground border border-border rounded-xl shadow-lg overflow-hidden">
          <div className="max-h-[60vh] overflow-y-auto py-2">
            {query.trim().length < 2 && (
              <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                Keep typing to search surahs, articles, duas & more
              </p>
            )}
            {query.trim().length >= 2 && !hasResults && !searching && (
              <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                No results found for "{query}".
              </p>
            )}
            {query.trim().length >= 2 && searching && (
              <p className="px-4 py-6 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Searching…
              </p>
            )}

            {pageResults.length > 0 && (
              <div className="px-2 pb-2">
                <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Pages
                </p>
                {pageResults.map((page) => (
                  <button
                    key={page.url}
                    type="button"
                    onClick={() => handleSelect(page.url)}
                    className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-left hover:bg-accent/10 transition-colors"
                  >
                    <page.icon className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate">{page.title}</span>
                  </button>
                ))}
              </div>
            )}

            {surahResults.length > 0 && (
              <div className="px-2 pb-2">
                <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Qur'an Surahs
                </p>
                {surahResults.map((surah) => (
                  <button
                    key={surah.id}
                    type="button"
                    onClick={() => handleSelect("Quran")}
                    className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-left hover:bg-accent/10 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-primary shrink-0" />
                    <span className="flex-1 truncate">
                      {surah.id}. {surah.name} — {surah.transliteration}
                    </span>
                    <span className="text-sm arabic-font text-primary shrink-0">{surah.arabic}</span>
                  </button>
                ))}
              </div>
            )}

            {entityResults.length > 0 && (
              <div className="px-2 pb-2">
                <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Content
                </p>
                {entityResults.map((result) => (
                  <button
                    key={result.key}
                    type="button"
                    onClick={() => handleSelect(result.page)}
                    className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-left hover:bg-accent/10 transition-colors"
                  >
                    <result.icon className="w-4 h-4 text-primary shrink-0" />
                    <span className="flex-1 truncate">{result.title}</span>
                    <span className="text-xs text-muted-foreground ml-2 shrink-0">{result.type}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
