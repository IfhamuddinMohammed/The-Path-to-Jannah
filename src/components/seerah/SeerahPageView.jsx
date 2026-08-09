import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Minus, Plus, Bookmark, BookmarkCheck, Lightbulb, BookMarked, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { saveLastRead } from "@/lib/seerahProgress";

const FONT_SCALE_KEY = "sirat-seerah-page-font-scale";
const FONT_SCALE_MIN = 0.8;
const FONT_SCALE_MAX = 1.6;
const FONT_SCALE_STEP = 0.1;
const FONT_SCALE_BASE_REM = 1;

const THEMES = {
  parchment: { label: "Parchment", bg: "#FDFBF7", overlayBg: "#FDFBF7F2", gold: "#D4AF37", goldBorder: "#D4AF3740", goldBorderStrong: "#D4AF3780", goldFaint: "#D4AF3722", text: "#064E3B", textMuted: "#064E3B99" },
  night: { label: "Night", bg: "#0B1F1A", overlayBg: "#0B1F1AF2", gold: "#E4C468", goldBorder: "#E4C46840", goldBorderStrong: "#E4C46880", goldFaint: "#E4C46822", text: "#F2ECD9", textMuted: "#F2ECD999" },
  sepia: { label: "Sepia", bg: "#F1E7D0", overlayBg: "#F1E7D0F2", gold: "#B8863B", goldBorder: "#B8863B40", goldBorderStrong: "#B8863B80", goldFaint: "#B8863B22", text: "#4A3826", textMuted: "#4A382699" },
};
const THEME_ORDER = ["parchment", "night", "sepia"];
const THEME_KEY = "sirat-seerah-page-theme";

const ERA_LABELS = { early: "Early Life", prophethood: "Prophethood", medina: "Medina Era" };

function loadTheme() {
  if (typeof window === "undefined") return "parchment";
  const stored = window.localStorage.getItem(THEME_KEY);
  return THEMES[stored] ? stored : "parchment";
}

function loadFontScale() {
  if (typeof window === "undefined") return 1;
  const stored = Number(window.localStorage.getItem(FONT_SCALE_KEY));
  return Number.isFinite(stored) && stored > 0 ? stored : 1;
}

function clampFontScale(value) {
  return Math.min(FONT_SCALE_MAX, Math.max(FONT_SCALE_MIN, +value.toFixed(3)));
}

const DRAG_CONSTRAINTS = { left: 0, right: 0 };
const ENTER_EXIT_TRANSITION = { duration: 0.22, ease: "easeOut" };

function ThemeSwatch({ themeKey, active, onClick }) {
  const t = THEMES[themeKey];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${t.label} theme`}
      title={t.label}
      className="relative w-6 h-6 rounded-full shrink-0"
      style={{ backgroundColor: t.bg, border: `1.5px solid ${t.gold}` }}
    >
      {active && <Check className="absolute inset-0 m-auto w-3.5 h-3.5" style={{ color: t.gold }} strokeWidth={3} />}
    </button>
  );
}

// Full-page, Mushaf-style reader for the Seerah timeline — one event per "page," with the same
// swipe/arrow-key/button page-turn, font-zoom, and theme chrome as the Qur'an Page View, so the
// reading experience feels consistent across the app. Bookmarking and "continue reading" are
// at the event level (not sub-paginated within one) since an event isn't further subdivided the
// way a surah is into individually-addressable ayahs.
//
// isEventBookmarked/onToggleBookmark are passed down from the parent's single useSeerahBookmarks
// call rather than called again here — two independent hook instances each hold their own
// localStorage-backed state with no shared reactivity, so a bookmark toggled in here would never
// show up in the parent's "Bookmarked Events" list until an unrelated re-render happened to
// re-read storage. One source of truth, passed down, avoids that.
export default function SeerahPageView({ events, initialIndex = 0, onExit, isEventBookmarked, onToggleBookmark }) {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [fontScale, setFontScale] = useState(loadFontScale);
  const [themeKey, setThemeKey] = useState(loadTheme);

  const palette = THEMES[themeKey];
  const event = events[index];
  const hasPrev = index > 0;
  const hasNext = index < events.length - 1;

  useEffect(() => {
    window.localStorage.setItem(FONT_SCALE_KEY, String(fontScale));
  }, [fontScale]);

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, themeKey);
  }, [themeKey]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Checkpoint continuously (like a Kindle or podcast app), not only on exit, so force-closing
  // or navigating away some other way still remembers the spot.
  useEffect(() => {
    if (event) saveLastRead({ eventTitle: event.title, era: event.era });
  }, [event]);

  const goToPage = (dir, target) => {
    if (target < 0 || target >= events.length) return;
    setDirection(dir);
    setIndex(target);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onExit();
      else if (e.key === "ArrowLeft" && hasPrev) goToPage(-1, index - 1);
      else if (e.key === "ArrowRight" && hasNext) goToPage(1, index + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, hasPrev, hasNext]);

  const adjustFont = (delta) => setFontScale((s) => clampFontScale(s + delta));

  if (typeof document === "undefined" || !event) return null;

  const bookmarked = isEventBookmarked(event.title);
  const paragraphs = (event.detailedText || "").split(/\n\n+/).filter(Boolean);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col" style={{ backgroundColor: palette.bg }}>
      <div className="absolute inset-x-0 top-0 z-20 h-[3px]" style={{ backgroundColor: palette.goldFaint }}>
        <div
          className="h-full transition-[width] duration-150 ease-out"
          style={{ width: `${(events.length > 1 ? index / (events.length - 1) : 0) * 100}%`, backgroundColor: palette.gold }}
        />
      </div>

      <div
        className={cn(
          "absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 px-4 py-3",
          "backdrop-blur-md border-b transition-transform duration-300",
          showControls ? "translate-y-0" : "-translate-y-full"
        )}
        style={{ backgroundColor: palette.overlayBg, borderColor: palette.goldBorder }}
      >
        <button
          type="button"
          onClick={onExit}
          className="flex items-center gap-1.5 text-sm font-medium shrink-0"
          style={{ color: palette.text }}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="text-center min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: palette.text }}>
            {ERA_LABELS[event.era] || event.era}
          </p>
          <p className="text-xs" style={{ color: palette.textMuted }}>
            Page {index + 1} / {events.length}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onToggleBookmark({ title: event.title, yearCE: event.yearCE, era: event.era })}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark this event"}
          className="shrink-0"
          style={{ color: bookmarked ? palette.gold : palette.text }}
        >
          {bookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ x: direction >= 0 ? 80 : -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction >= 0 ? -80 : 80, opacity: 0 }}
            transition={ENTER_EXIT_TRANSITION}
            drag="x"
            dragConstraints={DRAG_CONSTRAINTS}
            dragElastic={0.15}
            dragMomentum={false}
            dragSnapToOrigin
            onDragEnd={(_e, info) => {
              if (info.offset.x < -60 && hasNext) goToPage(1, index + 1);
              else if (info.offset.x > 60 && hasPrev) goToPage(-1, index - 1);
            }}
            onTap={() => setShowControls((v) => !v)}
            className="absolute inset-0 overflow-y-auto pt-16 pb-8 px-4 md:px-8"
          >
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full border"
                  style={{ borderColor: palette.goldBorderStrong, color: palette.text }}
                >
                  {event.yearCE}
                </span>
                {event.yearAH && (
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: palette.goldFaint, color: palette.text }}
                  >
                    {event.yearAH}
                  </span>
                )}
              </div>

              <h1
                className="font-display text-2xl md:text-3xl font-semibold mb-1"
                style={{ color: palette.text }}
              >
                {event.title}
              </h1>
              {event.titleArabic && (
                <p className="text-xl arabic-font mb-3" style={{ color: palette.gold }}>
                  {event.titleArabic}
                </p>
              )}
              <p className="italic mb-6 pb-6 border-b" style={{ color: palette.textMuted, borderColor: palette.goldBorder }}>
                {event.description}
              </p>

              <div
                className="space-y-4"
                style={{ color: palette.text, fontSize: `${FONT_SCALE_BASE_REM * fontScale}rem`, lineHeight: 1.8 }}
              >
                {paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {event.keyLessons?.length > 0 && (
                <div
                  className="mt-8 p-4 rounded-lg border"
                  style={{ backgroundColor: palette.goldFaint, borderColor: palette.goldBorder }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4" style={{ color: palette.gold }} />
                    <p className="text-sm font-semibold" style={{ color: palette.text }}>
                      Key Wisdoms &amp; Lessons
                    </p>
                  </div>
                  <ul className="space-y-1.5">
                    {event.keyLessons.map((lesson, i) => (
                      <li key={i} className="text-sm flex items-start gap-2" style={{ color: palette.text }}>
                        <span className="mt-1" style={{ color: palette.gold }}>•</span>
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.authenticSources?.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookMarked className="w-4 h-4" style={{ color: palette.gold }} />
                    <p className="text-sm font-semibold" style={{ color: palette.text }}>
                      Authentic Sources
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {event.authenticSources.map((source, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-full border"
                        style={{ borderColor: palette.goldBorder, color: palette.textMuted }}
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-10 flex items-center justify-center gap-2 px-4 py-3",
          "backdrop-blur-md border-t transition-transform duration-300",
          showControls ? "translate-y-0" : "translate-y-full"
        )}
        style={{ backgroundColor: palette.overlayBg, borderColor: palette.goldBorder }}
      >
        <button
          type="button"
          onClick={() => adjustFont(-FONT_SCALE_STEP)}
          disabled={fontScale <= FONT_SCALE_MIN}
          aria-label="Decrease text size"
          className="rounded-full w-9 h-9 flex items-center justify-center disabled:opacity-40"
          style={{ border: `1px solid ${palette.goldBorderStrong}`, color: palette.text }}
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-xs w-10 text-center tabular-nums" style={{ color: palette.textMuted }}>
          {Math.round(fontScale * 100)}%
        </span>
        <button
          type="button"
          onClick={() => adjustFont(FONT_SCALE_STEP)}
          disabled={fontScale >= FONT_SCALE_MAX}
          aria-label="Increase text size"
          className="rounded-full w-9 h-9 flex items-center justify-center disabled:opacity-40"
          style={{ border: `1px solid ${palette.goldBorderStrong}`, color: palette.text }}
        >
          <Plus className="w-4 h-4" />
        </button>

        <div className="w-px h-6 mx-1" style={{ backgroundColor: palette.goldBorder }} aria-hidden="true" />

        <button
          type="button"
          onClick={() => goToPage(-1, index - 1)}
          disabled={!hasPrev}
          aria-label="Previous event"
          className="rounded-full w-9 h-9 flex items-center justify-center disabled:opacity-40"
          style={{ border: `1px solid ${palette.goldBorderStrong}`, color: palette.text }}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => goToPage(1, index + 1)}
          disabled={!hasNext}
          aria-label="Next event"
          className="rounded-full w-9 h-9 flex items-center justify-center disabled:opacity-40"
          style={{ border: `1px solid ${palette.goldBorderStrong}`, color: palette.text }}
        >
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="w-px h-6 mx-1" style={{ backgroundColor: palette.goldBorder }} aria-hidden="true" />

        <div className="flex items-center gap-1.5" role="group" aria-label="Reading theme">
          {THEME_ORDER.map((key) => (
            <ThemeSwatch key={key} themeKey={key} active={themeKey === key} onClick={() => setThemeKey(key)} />
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
