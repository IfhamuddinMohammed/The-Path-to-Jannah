import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
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

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

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
    navigate(createPageUrl(url));
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-full md:w-64 px-3 py-2 text-sm text-muted-foreground bg-muted hover:bg-secondary rounded-lg transition-colors"
      >
        <Search className="w-4 h-4 shrink-0" />
        <span className="hidden md:inline">Search the platform…</span>
        <span className="md:hidden">Search…</span>
        <kbd className="hidden md:inline ml-auto text-xs bg-card border border-border rounded px-1.5 py-0.5">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search surahs, articles, duas, FAQs, hadiths…"
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.trim().length < 2 && (
            <CommandEmpty>Type at least 2 characters to search content…</CommandEmpty>
          )}
          {query.trim().length >= 2 && !hasResults && !searching && (
            <CommandEmpty>No results found for "{query}".</CommandEmpty>
          )}
          {query.trim().length >= 2 && !hasResults && searching && (
            <CommandEmpty>
              <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
              Searching…
            </CommandEmpty>
          )}

          {pageResults.length > 0 && (
            <CommandGroup heading="Pages">
              {pageResults.map((page) => (
                <CommandItem key={page.url} onSelect={() => handleSelect(page.url)}>
                  <page.icon className="w-4 h-4 mr-2 text-primary" />
                  <span>{page.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {surahResults.length > 0 && (
            <CommandGroup heading="Qur'an Surahs">
              {surahResults.map((surah) => (
                <CommandItem key={surah.id} onSelect={() => handleSelect("Quran")}>
                  <BookOpen className="w-4 h-4 mr-2 text-primary" />
                  <span>
                    {surah.id}. {surah.name} — {surah.transliteration}
                  </span>
                  <span className="ml-auto text-sm arabic-font text-primary">{surah.arabic}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {entityResults.length > 0 && (
            <CommandGroup heading="Content">
              {entityResults.map((result) => (
                <CommandItem key={result.key} onSelect={() => handleSelect(result.page)}>
                  <result.icon className="w-4 h-4 mr-2 text-primary" />
                  <span className="flex-1 truncate">{result.title}</span>
                  <span className="text-xs text-muted-foreground ml-2 shrink-0">{result.type}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}