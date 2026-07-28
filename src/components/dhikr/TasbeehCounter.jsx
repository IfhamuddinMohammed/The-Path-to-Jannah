import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Maximize2, Minimize2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "imaan-tasbeeh-counter";
const MILESTONES = [33, 99, 100];

// Ordered by how the virtue of each dhikr is described in hadith — the most
// explicitly "highest-ranked" phrases (best of remembrance / heaviest on the
// scale) come first, then the classic post-prayer tasbeeh, then Custom last.
const PRESETS = [
  {
    id: "laailahaillallah",
    label: "La ilaha illallah",
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ",
    transliteration: "La ilaha illallah",
    translation: "There is no god but Allah",
    target: 100,
    virtue: "The best of remembrance (Tirmidhi)",
    highlight: true,
  },
  {
    id: "subhanallahwabihamdihi",
    label: "SubhanAllah wa Bihamdihi",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ",
    transliteration: "SubhanAllahi wa bihamdihi, SubhanAllahil Azeem",
    translation: "Glory be to Allah and praise Him, Glory be to Allah the Magnificent",
    target: 100,
    virtue: "Light on the tongue, heavy on the scale (Bukhari & Muslim)",
    highlight: true,
  },
  {
    id: "tahlil",
    label: "Full Tahlil",
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "La ilaha illallahu wahdahu la sharika lahu, lahul mulku wa lahul hamd, wa huwa 'ala kulli shai'in qadeer",
    translation: "None has the right to be worshipped but Allah alone, He has no partner. His is the dominion and His is the praise, and He is able to do all things",
    target: 100,
    virtue: "Equal to freeing 10 slaves + 100 good deeds, if said 100x/day (Bukhari & Muslim)",
  },
  {
    id: "lahawlawalaquwwata",
    label: "La hawla wala quwwata",
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "La hawla wala quwwata illa billah",
    translation: "There is no power and no strength except with Allah",
    target: 100,
    virtue: "A treasure from the treasures of Paradise (Bukhari & Muslim)",
  },
  {
    id: "subhanallah",
    label: "SubhanAllah",
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: "SubhanAllah",
    translation: "Glory be to Allah",
    target: 33,
    virtue: "Part of the Tasbih of Fatimah, after every prayer (Bukhari)",
  },
  {
    id: "alhamdulillah",
    label: "Alhamdulillah",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah",
    translation: "All praise is due to Allah",
    target: 33,
    virtue: "Part of the Tasbih of Fatimah, after every prayer (Bukhari)",
  },
  {
    id: "allahuakbar",
    label: "Allahu Akbar",
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    translation: "Allah is the Greatest",
    target: 34,
    virtue: "Part of the Tasbih of Fatimah, after every prayer (Bukhari)",
  },
  {
    id: "astaghfirullah",
    label: "Astaghfirullah",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    transliteration: "Astaghfirullah",
    translation: "I seek forgiveness from Allah",
    target: 100,
    virtue: "Opens provision and relief from hardship (Abu Dawud)",
  },
  {
    id: "custom",
    label: "Custom",
    arabic: "ذِكْر",
    transliteration: "Dhikr",
    translation: "Remembrance of Allah",
    target: null,
  },
];

function loadStoredState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function vibrate(pattern) {
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
    navigator.vibrate(pattern);
  }
}

function ProgressRing({ progress, size = 220, strokeWidth = 10 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <svg width={size} height={size} className="-rotate-90 shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsl(var(--accent) / 0.15)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.35s ease-out" }}
      />
    </svg>
  );
}

export default function TasbeehCounter() {
  const stored = useMemo(loadStoredState, []);
  const [activeId, setActiveId] = useState(stored?.activeId || PRESETS[0].id);
  const [counts, setCounts] = useState(() => ({
    ...Object.fromEntries(PRESETS.map((p) => [p.id, 0])),
    ...(stored?.counts || {}),
  }));
  const [customTarget, setCustomTarget] = useState(stored?.customTarget || 100);
  const [zenMode, setZenMode] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ activeId, counts, customTarget }));
  }, [activeId, counts, customTarget]);

  const activePreset = PRESETS.find((p) => p.id === activeId) ?? PRESETS[0];
  const target = activePreset.id === "custom" ? customTarget || 100 : activePreset.target;
  const count = counts[activeId] ?? 0;
  const progress = target ? Math.min(count / target, 1) : 0;

  const handleTap = () => {
    const next = count + 1;
    setCounts((prev) => ({ ...prev, [activeId]: next }));

    if (next === target || MILESTONES.includes(next)) {
      vibrate([40, 30, 40]);
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 500);
    } else {
      vibrate(10);
    }
  };

  const handleReset = () => {
    setCounts((prev) => ({ ...prev, [activeId]: 0 }));
  };

  const card = (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`Tap to count ${activePreset.label}`}
      onClick={handleTap}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleTap();
        }
      }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative w-full max-w-sm mx-auto rounded-3xl bg-card border select-none cursor-pointer overflow-hidden",
        "flex flex-col items-center gap-6 p-8 md:p-10 shadow-lg transition-shadow duration-300",
        celebrate ? "border-accent glow-gold" : "border-border glow-shadow"
      )}
      style={{ touchAction: "manipulation" }}
    >
      <div className="absolute inset-0 geometric-bg opacity-20 pointer-events-none"></div>

      <div className="relative text-center">
        <p className="text-4xl md:text-5xl arabic-font text-primary mb-2">{activePreset.arabic}</p>
        <p className="font-display text-lg text-accent italic">{activePreset.transliteration}</p>
        <p className="text-sm text-muted-foreground mt-1">{activePreset.translation}</p>
        {activePreset.virtue && (
          <p className="text-[11px] text-accent/70 italic mt-2">{activePreset.virtue}</p>
        )}
      </div>

      <div className="relative flex items-center justify-center">
        <ProgressRing progress={progress} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl md:text-6xl font-display font-bold text-primary tabular-nums">
            {count}
          </span>
          {target ? (
            <span className="text-sm text-muted-foreground mt-1">/ {target}</span>
          ) : null}
        </div>
      </div>

      <p className="relative text-xs text-muted-foreground uppercase tracking-widest">
        Tap anywhere to count
      </p>
    </motion.div>
  );

  if (zenMode) {
    return (
      <div
        className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-6"
        style={{ background: "hsl(var(--primary))" }}
      >
        <button
          type="button"
          onClick={() => setZenMode(false)}
          aria-label="Exit Zen Mode"
          className="absolute top-6 right-6 flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
        >
          <Minimize2 className="w-4 h-4" />
          <span className="text-sm">Exit</span>
        </button>
        {card}
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl p-4 md:p-8 geometric-bg"
      style={{ background: "hsl(var(--primary))" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-xl md:text-2xl font-semibold text-primary-foreground">
            Tasbeeh Counter
          </h2>
          <p className="text-sm text-primary-foreground/70">Remember Allah with every tap</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setZenMode(true)}
            aria-label="Enter Zen Mode"
            className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Reset counter"
                className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset counter?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset your {activePreset.label} count back to 0. This can't be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleReset}>Reset</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => setActiveId(preset.id)}
            className={cn(
              "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border",
              activeId === preset.id
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-transparent text-primary-foreground/80 border-primary-foreground/20 hover:bg-primary-foreground/10"
            )}
          >
            {preset.highlight && (
              <Star
                className={cn(
                  "w-3 h-3",
                  activeId === preset.id ? "fill-current" : "fill-accent text-accent"
                )}
              />
            )}
            {preset.label}
            {preset.target ? ` (${preset.target})` : ""}
          </button>
        ))}
      </div>

      {activeId === "custom" && (
        <div className="flex items-center gap-2 mb-6">
          <label htmlFor="tasbeeh-custom-target" className="text-sm text-primary-foreground/70">
            Target
          </label>
          <input
            id="tasbeeh-custom-target"
            type="number"
            min={1}
            max={10000}
            value={customTarget}
            onChange={(e) => setCustomTarget(Math.max(1, Number(e.target.value) || 1))}
            className="w-24 px-2 py-1 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm outline-none focus:border-accent"
          />
        </div>
      )}

      {card}
    </div>
  );
}
