import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Pause, Minus, Plus, AlertCircle, BookOpen, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { surahs as quranSurahs } from "@/data/quranData";
import { usePageVerses } from "@/hooks/usePageVerses";
import { useQuranVerses } from "@/hooks/useQuranVerses";
import { useQuranAudio } from "@/hooks/useQuranAudio";
import { getPageAt, isObligatorySajda, splitWaqfMarks } from "@/lib/mushaf";
import { saveLastRead } from "@/lib/quranProgress";

const ARABIC_INDIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
function toArabicNumeral(num) {
  return String(num)
    .split("")
    .map((d) => ARABIC_INDIC_DIGITS[Number(d)] ?? d)
    .join("");
}

const FONT_SCALE_KEY = "sirat-quran-page-font-scale";
const FONT_SCALE_MIN = 0.75;
const FONT_SCALE_MAX = 1.75;
const FONT_SCALE_STEP = 0.125;
const FONT_SCALE_BASE_REM = 2;
const MUSHAF_FONT = "'Amiri Quran', 'Amiri', serif";
const LINE_HEIGHT_EM = 2.2;
const HIZB_QUARTER_LABELS = ["", "ربع", "نصف", "ثلاثة أرباع"];

const THEMES = {
  parchment: {
    label: "Parchment",
    bg: "#FDFBF7",
    overlayBg: "#FDFBF7F2",
    gold: "#D4AF37",
    goldBorder: "#D4AF3740",
    goldBorderStrong: "#D4AF3780",
    goldFaint: "#D4AF3722",
    goldDark: "#8a6d1a",
    ruleLine: "#D4AF3766",
    text: "#064E3B",
    textMuted: "#064E3B99",
    textFaint: "#064E3B60",
    error: "#b91c1c",
  },
  night: {
    label: "Night",
    bg: "#0B1F1A",
    overlayBg: "#0B1F1AF2",
    gold: "#E4C468",
    goldBorder: "#E4C46840",
    goldBorderStrong: "#E4C46880",
    goldFaint: "#E4C46822",
    goldDark: "#E4C468",
    ruleLine: "#E4C46855",
    text: "#F2ECD9",
    textMuted: "#F2ECD999",
    textFaint: "#F2ECD960",
    error: "#f87171",
  },
  sepia: {
    label: "Sepia",
    bg: "#F1E7D0",
    overlayBg: "#F1E7D0F2",
    gold: "#B8863B",
    goldBorder: "#B8863B40",
    goldBorderStrong: "#B8863B80",
    goldFaint: "#B8863B22",
    goldDark: "#8a6222",
    ruleLine: "#B8863B66",
    text: "#4A3826",
    textMuted: "#4A382699",
    textFaint: "#4A382660",
    error: "#b91c1c",
  },
};
const THEME_ORDER = ["parchment", "night", "sepia"];
const THEME_KEY = "sirat-quran-page-theme";

function loadTheme() {
  if (typeof window === "undefined") return "parchment";
  const stored = window.localStorage.getItem(THEME_KEY);
  return THEMES[stored] ? stored : "parchment";
}

// Stable references — recreating these as inline object literals on every render causes
// framer-motion to treat them as "changed", which can freeze a drag gesture mid-flight.
const DRAG_CONSTRAINTS = { left: 0, right: 0 };
const ENTER_EXIT_TRANSITION = { duration: 0.22, ease: "easeOut" };

function loadFontScale() {
  if (typeof window === "undefined") return 1;
  const stored = Number(window.localStorage.getItem(FONT_SCALE_KEY));
  return Number.isFinite(stored) && stored > 0 ? stored : 1;
}

function clampFontScale(value) {
  return Math.min(FONT_SCALE_MAX, Math.max(FONT_SCALE_MIN, +value.toFixed(3)));
}

function CornerOrnament({ className, color }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("w-6 h-6 md:w-8 md:h-8 absolute", className)}
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 14 V3 H14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M9 9 Q3 9 3 3" stroke={color} strokeWidth="1.25" />
      <circle cx="3" cy="3" r="2.25" fill={color} />
    </svg>
  );
}

function HizbQuarterGlyph({ quarterInHizb, color }) {
  const fraction = quarterInHizb / 4;
  return (
    <span
      aria-hidden="true"
      className="inline-block rounded-full align-middle mx-0.5"
      style={{
        width: "0.85em",
        height: "0.85em",
        border: `1.5px solid ${color}`,
        background: fraction === 0 ? "transparent" : `conic-gradient(${color} ${fraction * 360}deg, transparent 0deg)`,
      }}
    />
  );
}

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

function parseVerseKey(verseKey) {
  const [surah, ayah] = verseKey.split(":").map(Number);
  return { surah, ayah };
}

// Draws the Mushaf ruled lines from the text's *actual* rendered line boxes instead of a
// synthetic CSS background pattern. A background-image guess (repeating every `line-height`)
// drifts from where the browser really wraps text — Amiri Quran's tall diacritics don't
// occupy exactly the assumed line-height — and that drift is proportional to font size, so it's
// invisible at 100% but compounds into visible overlap at high zoom. Measuring real line
// fragments via Range.getClientRects() is zoom/DPR/reflow-invariant by construction, so it stays
// correct at any font scale, container width, or browser zoom level.
function useLineRulings(containerRef, deps) {
  const [lineBottoms, setLineBottoms] = useState([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = null;
    const measure = () => {
      frame = null;
      const containerRect = container.getBoundingClientRect();
      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
      const rects = [];
      let node;
      while ((node = walker.nextNode())) {
        if (!node.textContent || !node.textContent.trim()) continue;
        // Block-level elements (surah banners, manzil labels) lay out their own lines and
        // aren't part of the continuous ruled-line paragraph — skip their text nodes.
        if (node.parentElement?.closest("[data-no-rule]")) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        for (const rect of range.getClientRects()) {
          if (rect.width > 0 && rect.height > 0) rects.push(rect);
        }
      }
      if (!rects.length) {
        setLineBottoms([]);
        return;
      }
      // Cluster rects into visual lines by vertical position — a single wrapped line can be
      // made of several rects (verse spans, ayah-number badges, waqf buttons) whose tops don't
      // perfectly match due to mixed inline content, so a small tolerance groups them together.
      const sorted = rects.slice().sort((a, b) => a.top - b.top);
      const TOLERANCE = 6;
      const clusters = [];
      for (const rect of sorted) {
        const last = clusters[clusters.length - 1];
        if (last && rect.top - last.top < TOLERANCE) {
          last.bottom = Math.max(last.bottom, rect.bottom);
        } else {
          clusters.push({ top: rect.top, bottom: rect.bottom });
        }
      }
      setLineBottoms(clusters.map((c) => c.bottom - containerRect.top));
    };

    const scheduleMeasure = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    scheduleMeasure();
    document.fonts?.ready?.then(scheduleMeasure).catch(() => {});
    const ro = new ResizeObserver(scheduleMeasure);
    ro.observe(container);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, deps);

  return lineBottoms;
}

// Measures a glyph's true rendered ink width via a detached <canvas>, independent of any DOM
// layout box. This matters here specifically: an `inline-block` with `white-space: nowrap` and
// no explicit width shrink-to-fits against its container, and — since `overflow` is left
// `visible` so the glyph can paint past that box — `element.scrollWidth` reports back close to
// that *clamped* shrink-to-fit width in most browsers, not the true unclamped content width.
// That under-measurement was the actual bug: it produced a computed scale near 1 (no shrink at
// all) for a glyph that genuinely needed to shrink by roughly half, matching the exact symptom
// (the ligature rendering at full size and simply getting hard-clipped at the container edge).
// Canvas `measureText` has no such box to clamp against, so it always reports the real width.
function measureTextWidth(text, font) {
  if (typeof document === "undefined") return 0;
  const canvas = measureTextWidth.canvas ?? (measureTextWidth.canvas = document.createElement("canvas"));
  const ctx = canvas.getContext("2d");
  ctx.font = font;
  const metrics = ctx.measureText(text);
  // `actualBoundingBoxLeft/Right` measure the real ink extent (not just the advance width),
  // which matters for an ornate calligraphic ligature whose strokes commonly overshoot its
  // nominal advance box.
  const left = metrics.actualBoundingBoxLeft ?? 0;
  const right = metrics.actualBoundingBoxRight ?? metrics.width;
  return Math.max(metrics.width, left + right) || metrics.width;
}

// The Bismillah ligature (U+FDFD) is one wide, unbreakable decorative glyph — at a fixed
// font-size it fits a wide desktop banner but overflows a narrow phone width entirely (there's
// no word to wrap, just one oversized character). Rather than guess a breakpoint-based size,
// measure the glyph's actual rendered width against the space really available and shrink it to
// fit — `transform: scale()` doesn't affect layout metrics, so re-measuring after a resize
// always reads the glyph's true natural (unscaled) size, no reset-then-remeasure dance needed.
function AutoFitBismillah({ color }) {
  const wrapRef = useRef(null);
  const glyphRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const glyph = glyphRef.current;
    if (!wrap || !glyph) return;

    const fit = () => {
      const available = wrap.clientWidth;
      if (!available) return;
      const computed = window.getComputedStyle(glyph);
      const font = `${computed.fontStyle} ${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`;
      const natural = measureTextWidth("﷽", font);
      if (!natural) return;
      setScale(Math.min(1, available / natural));
    };

    fit();
    // The very first `fit()` can run before the Amiri Quran webfont has actually loaded (both
    // canvas and DOM text measurement fall back to a narrower substitute font until then) —
    // re-measuring once fonts are ready, and again whenever any font finishes loading later,
    // catches the width jump that follows.
    document.fonts?.ready?.then(fit).catch(() => {});
    document.fonts?.addEventListener?.("loadingdone", fit);
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    return () => {
      document.fonts?.removeEventListener?.("loadingdone", fit);
      ro.disconnect();
    };
  }, []);

  return (
    <span ref={wrapRef} className="block mt-3 overflow-hidden">
      <span
        ref={glyphRef}
        className="inline-block whitespace-nowrap"
        style={{
          fontFamily: MUSHAF_FONT,
          color,
          fontSize: "1.3em",
          transform: `scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        ﷽
      </span>
    </span>
  );
}

export default function PageView({
  initialPageNumber,
  initialVerseKey,
  totalPages,
  onExit,
  reciter,
  audioLanguage,
}) {
  const [pageNumber, setPageNumber] = useState(initialPageNumber);
  const appliedInitialScrollRef = useRef(false);
  const [showControls, setShowControls] = useState(false);
  const [direction, setDirection] = useState(0);
  const [fontScale, setFontScale] = useState(loadFontScale);
  const [themeKey, setThemeKey] = useState(loadTheme);
  const [isPinching, setIsPinching] = useState(false);
  const [activeWaqf, setActiveWaqf] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [liveVerseKey, setLiveVerseKey] = useState(null);
  const pinchStateRef = useRef({ startDistance: null, startScale: 1 });
  const scrollFrameRef = useRef(null);
  const textContainerRef = useRef(null);

  const palette = THEMES[themeKey];
  const { verses, loading, error, retry } = usePageVerses(pageNumber);
  const lineBottoms = useLineRulings(textContainerRef, [verses, fontScale, pageNumber]);

  const hasPrevPage = pageNumber > 1;
  const hasNextPage = pageNumber < totalPages;

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

  useEffect(() => {
    if (!activeWaqf) return;
    const timer = setTimeout(() => setActiveWaqf(null), 4500);
    return () => clearTimeout(timer);
  }, [activeWaqf]);

  // A new page always starts fresh at its first ayah / 0% scrolled.
  useEffect(() => {
    setLiveVerseKey(null);
    setScrollProgress(0);
  }, [pageNumber]);

  const goToPage = (dir, target) => {
    if (target < 1 || target > totalPages) return;
    setDirection(dir);
    setPageNumber(target);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") handleExit();
      else if (e.key === "ArrowLeft" && hasNextPage) goToPage(1, pageNumber + 1);
      else if (e.key === "ArrowRight" && hasPrevPage) goToPage(-1, pageNumber - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, hasNextPage, hasPrevPage]);

  // Redundant with the continuous checkpoint above, but cheap insurance against exiting the
  // instant the page opens, before the scroll-driven save has had a chance to fire.
  const handleExit = () => {
    if (liveVerse && liveRef && liveSurahMeta) {
      saveLastRead({
        surahId: liveSurahMeta.id,
        surahName: liveSurahMeta.name,
        surahArabic: liveSurahMeta.arabic,
        ayah: liveRef.ayah,
        pageNumber,
      });
    }
    onExit();
  };

  const adjustFont = (delta) => setFontScale((s) => clampFontScale(s + delta));

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      setIsPinching(true);
      const [a, b] = e.touches;
      pinchStateRef.current = {
        startDistance: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY),
        startScale: fontScale,
      };
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && pinchStateRef.current.startDistance) {
      const [a, b] = e.touches;
      const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const ratio = distance / pinchStateRef.current.startDistance;
      setFontScale(clampFontScale(pinchStateRef.current.startScale * ratio));
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) {
      setIsPinching(false);
      pinchStateRef.current.startDistance = null;
    }
  };

  // Tracks reading progress and which ayah is currently in view (by real API fields, not a
  // recomputed boundary lookup) so the Juz/Hizb header and surah name in the top bar reflect
  // the exact point scrolled to — a single page can legitimately span two surahs.
  const handleScroll = (e) => {
    if (scrollFrameRef.current) return;
    const target = e.currentTarget;
    scrollFrameRef.current = requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      const maxScroll = target.scrollHeight - target.clientHeight;
      setScrollProgress(maxScroll > 0 ? Math.min(1, Math.max(0, target.scrollTop / maxScroll)) : 0);

      const rect = target.getBoundingClientRect();
      const probeY = rect.top + 84;
      const hit = document.elementFromPoint(rect.left + rect.width / 2, probeY);
      const verseEl = hit?.closest("[data-verse-key]");
      if (verseEl) setLiveVerseKey(verseEl.getAttribute("data-verse-key"));
    });
  };

  useEffect(() => {
    return () => {
      if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);
    };
  }, []);

  const liveVerse = (verses && (verses.find((v) => v.verse_key === liveVerseKey) ?? verses[0])) || null;
  const liveRef = liveVerse ? parseVerseKey(liveVerse.verse_key) : null;
  const liveSurahMeta = liveRef ? quranSurahs.find((s) => s.id === liveRef.surah) : null;
  const liveQuarterInHizb = liveVerse ? (liveVerse.rub_el_hizb_number - 1) % 4 : 0;

  // Jump straight to the exact ayah being resumed (not just the top of its page) — only once,
  // the first time this page's verses load, so it doesn't fight the reader's own scrolling
  // afterwards or re-trigger on ordinary page turns.
  useEffect(() => {
    if (appliedInitialScrollRef.current || !initialVerseKey || !verses || verses.length === 0) return;
    appliedInitialScrollRef.current = true;
    const el = document.querySelector(`[data-verse-key="${CSS.escape(initialVerseKey)}"]`);
    el?.scrollIntoView({ block: "center" });
  }, [verses, initialVerseKey]);

  // Checkpoint reading position continuously (like a Kindle or podcast app), not only on exit —
  // so force-closing the app, or exiting some other way, still remembers the exact spot.
  useEffect(() => {
    if (!liveVerse || !liveRef || !liveSurahMeta) return;
    saveLastRead({
      surahId: liveSurahMeta.id,
      surahName: liveSurahMeta.name,
      surahArabic: liveSurahMeta.arabic,
      ayah: liveRef.ayah,
      pageNumber,
    });
  }, [liveVerseKey, pageNumber, verses]);

  // Full-surah verses (with audio URLs) for whichever surah is currently in view — Page View's
  // own display data only has this page's partial slice, but audio playback needs the whole
  // surah to sequence through ayahs and auto-advance the same way Verse View does.
  const { verses: audioVerses } = useQuranVerses(liveSurahMeta?.id, reciter, audioLanguage);
  const { nowPlaying, toggleVerse, pause, resume } = useQuranAudio();

  // Recitation plays continuously through the whole surah (same as Verse View), which can span
  // several real pages — once playback moves to an ayah that isn't on the page currently shown,
  // follow it there automatically rather than leaving the display stuck on stale content.
  useEffect(() => {
    if (!nowPlaying?.isPlaying || !verses) return;
    const isOnThisPage = verses.some((v) => {
      const ref = parseVerseKey(v.verse_key);
      return ref.surah === nowPlaying.surahId && ref.ayah === nowPlaying.ayahNumber;
    });
    if (!isOnThisPage) {
      const targetPage = getPageAt(nowPlaying.surahId, nowPlaying.ayahNumber);
      if (targetPage !== pageNumber) {
        setDirection(targetPage > pageNumber ? 1 : -1);
        setPageNumber(targetPage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowPlaying?.surahId, nowPlaying?.ayahNumber, nowPlaying?.isPlaying]);

  // Keep the currently-recited ayah visible as it plays, without fighting the reader's own
  // manual scrolling — this only runs when the playing ayah itself changes.
  useEffect(() => {
    if (!nowPlaying?.isPlaying) return;
    const key = `${nowPlaying.surahId}:${nowPlaying.ayahNumber}`;
    const el = document.querySelector(`[data-verse-key="${key}"]`);
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [nowPlaying?.surahId, nowPlaying?.ayahNumber, nowPlaying?.isPlaying]);

  const isThisAyahPlaying = !!nowPlaying && !!liveRef && nowPlaying.surahId === liveRef.surah && nowPlaying.isPlaying;
  const isThisSurahActive = !!nowPlaying && !!liveRef && nowPlaying.surahId === liveRef.surah;

  const handlePlayPause = () => {
    if (!liveSurahMeta || !liveRef) return;
    if (isThisSurahActive) {
      isThisAyahPlaying ? pause() : resume();
      return;
    }
    if (!audioVerses) return;
    const idx = audioVerses.findIndex((v) => v.numberInSurah === liveRef.ayah);
    const surahMeta = { id: liveSurahMeta.id, name: liveSurahMeta.name, arabic: liveSurahMeta.arabic };
    toggleVerse(surahMeta, audioVerses, idx >= 0 ? idx : 0, { language: audioLanguage, reciter });
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col" style={{ backgroundColor: palette.bg }}>
      <div className="absolute inset-x-0 top-0 z-20 h-[3px]" style={{ backgroundColor: palette.goldFaint }}>
        <div
          className="h-full transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%`, backgroundColor: palette.gold }}
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
          onClick={handleExit}
          className="flex items-center gap-1.5 text-sm font-medium shrink-0"
          style={{ color: palette.text }}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="text-center min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: palette.text }}>
            {liveSurahMeta?.name}
          </p>
          <p className="text-xs" style={{ color: palette.textMuted }}>
            {pageNumber} / {totalPages}
          </p>
        </div>
        <div className="w-14 shrink-0" aria-hidden="true" />
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={pageNumber}
            initial={{ x: direction >= 0 ? 80 : -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction >= 0 ? -80 : 80, opacity: 0 }}
            transition={ENTER_EXIT_TRANSITION}
            drag={isPinching ? false : "x"}
            dragConstraints={DRAG_CONSTRAINTS}
            dragElastic={0.15}
            dragMomentum={false}
            dragSnapToOrigin
            onDragEnd={(_e, info) => {
              if (info.offset.x < -60 && hasNextPage) goToPage(1, pageNumber + 1);
              else if (info.offset.x > 60 && hasPrevPage) goToPage(-1, pageNumber - 1);
            }}
            onTap={() => {
              setShowControls((v) => !v);
              setActiveWaqf(null);
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onScroll={handleScroll}
            className="absolute inset-0 overflow-y-auto pt-16 pb-8 px-4 md:px-8"
          >
            {!loading && !error && verses?.length > 0 && (
              <div
                dir="rtl"
                className="grid grid-cols-3 items-center max-w-2xl mx-auto mb-2 text-xs md:text-sm"
                style={{ color: palette.text }}
              >
                <div className="text-right arabic-font">
                  الجزء {toArabicNumeral(liveVerse.juz_number)} - الحزب {toArabicNumeral(liveVerse.hizb_number)}
                </div>
                <div className="text-center tabular-nums" style={{ color: palette.textMuted }}>
                  {toArabicNumeral(pageNumber)}
                </div>
                <div className="text-left arabic-font">سُورَةُ {liveSurahMeta?.arabic}</div>
              </div>
            )}

            <div className="relative max-w-2xl mx-auto">
              <CornerOrnament className="-top-2 -left-2" color={palette.gold} />
              <CornerOrnament className="-top-2 -right-2 rotate-90" color={palette.gold} />
              <CornerOrnament className="-bottom-2 -right-2 rotate-180" color={palette.gold} />
              <CornerOrnament className="-bottom-2 -left-2 -rotate-90" color={palette.gold} />

              <div className="border-[3px] rounded-sm p-1.5" style={{ borderColor: palette.gold }}>
                <div
                  className="border rounded-sm px-5 pt-8 pb-14 md:px-10 md:pt-12 md:pb-20 min-h-[65vh] flex flex-col"
                  style={{ borderColor: palette.goldBorderStrong, backgroundColor: palette.bg }}
                >
                  {loading ? (
                    <div className="flex-1 flex flex-col justify-center space-y-4">
                      <div className="h-6 w-full rounded animate-pulse" style={{ backgroundColor: palette.goldFaint }} />
                      <div className="h-6 w-full rounded animate-pulse" style={{ backgroundColor: palette.goldFaint }} />
                      <div className="h-6 w-5/6 rounded animate-pulse" style={{ backgroundColor: palette.goldFaint }} />
                    </div>
                  ) : error ? (
                    <div className="flex-1 flex flex-col justify-center text-center py-8">
                      <AlertCircle className="w-12 h-12 mx-auto mb-4" style={{ color: palette.error }} />
                      <p className="font-medium mb-4" style={{ color: palette.text }}>
                        {error}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          retry();
                        }}
                        className="text-sm underline"
                        style={{ color: palette.goldDark }}
                      >
                        Try Again
                      </button>
                    </div>
                  ) : !verses || verses.length === 0 ? (
                    <div className="flex-1 flex flex-col justify-center text-center py-8">
                      <BookOpen className="w-12 h-12 mx-auto mb-4" style={{ color: palette.textFaint }} />
                      <p style={{ color: palette.textMuted }}>No verses to display.</p>
                    </div>
                  ) : (
                    <div
                      ref={textContainerRef}
                      dir="rtl"
                      className="relative text-justify [text-align-last:justify]"
                      style={{
                        fontFamily: MUSHAF_FONT,
                        color: palette.text,
                        fontSize: `${FONT_SCALE_BASE_REM * fontScale}rem`,
                        lineHeight: LINE_HEIGHT_EM,
                        wordSpacing: "0.06em",
                      }}
                    >
                      {lineBottoms.map((bottom, i) => (
                        <div
                          key={i}
                          aria-hidden="true"
                          className="absolute inset-x-0 pointer-events-none"
                          style={{ top: bottom, height: 1, backgroundColor: palette.ruleLine }}
                        />
                      ))}
                      {verses.map((verse, i) => {
                        const { surah, ayah } = parseVerseKey(verse.verse_key);
                        const surahMeta = quranSurahs.find((s) => s.id === surah);
                        const isNewSurah = verse.verse_number === 1;
                        const next = verses[i + 1];
                        const rukuEndsHere = next && next.ruku_number !== verse.ruku_number;
                        const manzilEndsHere = next && next.manzil_number !== verse.manzil_number;
                        const quarterInHizb = (verse.rub_el_hizb_number - 1) % 4;
                        const isSajda = verse.sajdah_number !== null;
                        const isAyahPlaying =
                          !!nowPlaying && nowPlaying.isPlaying && nowPlaying.surahId === surah && nowPlaying.ayahNumber === ayah;

                        return (
                          <span
                            key={verse.verse_key}
                            data-verse-key={verse.verse_key}
                            style={isAyahPlaying ? { backgroundColor: palette.goldFaint, borderRadius: "0.25em" } : undefined}
                          >
                            {isNewSurah && surahMeta && (
                              <span
                                data-no-rule="true"
                                className="block rounded-md border-2 px-3 py-3 my-4 text-center"
                                style={{
                                  borderColor: palette.gold,
                                  backgroundImage: `linear-gradient(to bottom, ${palette.goldFaint}, transparent)`,
                                }}
                              >
                                <span dir="rtl" className="grid grid-cols-3 items-center text-center gap-1">
                                  <span className="text-xs md:text-sm" style={{ color: palette.text }}>
                                    {toArabicNumeral(surahMeta.verses)}
                                  </span>
                                  <span>
                                    <span
                                      className="block text-lg md:text-2xl"
                                      style={{ fontFamily: MUSHAF_FONT, color: palette.text }}
                                    >
                                      سُورَةُ {surahMeta.arabic}
                                    </span>
                                    <span
                                      dir="ltr"
                                      className="block text-[9px] md:text-[11px] tracking-[0.15em] uppercase mt-0.5"
                                      style={{ fontFamily: "Inter, sans-serif", color: palette.textMuted }}
                                    >
                                      {surahMeta.name}
                                    </span>
                                  </span>
                                  <span className="text-xs md:text-sm" style={{ color: palette.text }}>
                                    {surahMeta.revelation === "Meccan" ? "مَكِّيَّة" : "مَدَنِيَّة"}
                                  </span>
                                </span>
                                {surah !== 1 && surah !== 9 && <AutoFitBismillah color={palette.text} />}
                              </span>
                            )}
                            {splitWaqfMarks(verse.text_uthmani).map((seg, si) =>
                              seg.type === "waqf" ? (
                                <button
                                  key={si}
                                  type="button"
                                  onClick={(ev) => {
                                    ev.stopPropagation();
                                    setActiveWaqf(seg);
                                  }}
                                  style={{ color: palette.goldDark }}
                                >
                                  {seg.value}
                                </button>
                              ) : (
                                <span key={si}>{seg.value}</span>
                              )
                            )}
                            <span style={{ color: palette.gold }} className="mx-1" aria-hidden="true">
                              {" "}
                              ۝{toArabicNumeral(ayah)}{" "}
                            </span>
                            {rukuEndsHere && (
                              <span
                                className="inline-flex items-center justify-center rounded-full mx-1 align-middle"
                                style={{
                                  width: "1.7em",
                                  height: "1.7em",
                                  border: `1.5px solid ${palette.gold}`,
                                  color: palette.gold,
                                  fontSize: "0.6em",
                                }}
                                title={`Ruku ${verse.ruku_number} ends here`}
                              >
                                ع{toArabicNumeral(verse.ruku_number)}
                              </span>
                            )}
                            {/* Only fires when the PRIOR verse (within this page) proves a genuine transition —
                                showing it at the page's very first verse would be a guess, since we can't see
                                the previous page's last verse to confirm this one is really where a new quarter
                                begins rather than just a mid-quarter continuation. */}
                            {i > 0 && verses[i - 1].rub_el_hizb_number !== verse.rub_el_hizb_number && (
                              <span
                                className="inline-flex items-center gap-1 mx-1 align-middle"
                                title={quarterInHizb === 0 ? `Hizb ${verse.hizb_number}` : HIZB_QUARTER_LABELS[quarterInHizb]}
                              >
                                <HizbQuarterGlyph quarterInHizb={quarterInHizb} color={palette.gold} />
                                <span style={{ color: palette.gold, fontSize: "0.6em" }}>
                                  {quarterInHizb === 0 ? `حزب ${toArabicNumeral(verse.hizb_number)}` : HIZB_QUARTER_LABELS[quarterInHizb]}
                                </span>
                              </span>
                            )}
                            {isSajda && (
                              <span
                                className="inline-flex items-center gap-1 rounded-full mx-1 px-1.5 align-middle"
                                style={{
                                  border: `1.5px solid ${palette.gold}`,
                                  color: palette.goldDark,
                                  fontSize: "0.6em",
                                  backgroundColor: isObligatorySajda(surah, ayah) ? palette.goldFaint : "transparent",
                                }}
                                title={isObligatorySajda(surah, ayah) ? "Sajdah (obligatory per some schools)" : "Sajdah (recommended)"}
                              >
                                ۩ سجدة
                              </span>
                            )}
                            {manzilEndsHere && (
                              <span
                                data-no-rule="true"
                                className="block text-center tracking-wide"
                                style={{ color: palette.textMuted, fontSize: "0.6em" }}
                                aria-hidden="true"
                              >
                                — منزل {toArabicNumeral(verse.manzil_number)} —
                              </span>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {activeWaqf && (
              <div
                className="sticky bottom-2 z-20 mt-4 max-w-sm mx-auto rounded-xl border px-4 py-3 text-center shadow-lg"
                style={{ backgroundColor: palette.bg, borderColor: palette.gold }}
                onClick={(e) => e.stopPropagation()}
              >
                <p style={{ fontFamily: MUSHAF_FONT, color: palette.goldDark }} className="text-lg">
                  {activeWaqf.value} — {activeWaqf.label}
                </p>
                <p className="text-xs font-medium mt-1" style={{ color: palette.text }}>
                  {activeWaqf.name}
                </p>
                <p className="text-xs mt-0.5" style={{ color: palette.textMuted }}>
                  {activeWaqf.meaning}
                </p>
              </div>
            )}
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

        <button
          type="button"
          onClick={handlePlayPause}
          disabled={loading || !verses}
          aria-label={isThisAyahPlaying ? "Pause recitation" : "Play recitation"}
          className="rounded-full w-10 h-10 flex items-center justify-center mx-2 disabled:opacity-40"
          style={{ backgroundColor: palette.gold, color: palette.bg }}
        >
          {isThisAyahPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <div className="w-px h-6 mx-1" style={{ backgroundColor: palette.goldBorder }} aria-hidden="true" />

        <div className="flex items-center gap-1.5">
          {THEME_ORDER.map((key) => (
            <ThemeSwatch key={key} themeKey={key} active={themeKey === key} onClick={() => setThemeKey(key)} />
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
