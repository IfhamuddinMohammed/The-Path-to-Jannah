import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X, CheckCircle2, Volume2, VolumeX, RotateCcw, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import SalahStepCard from "@/components/prayer/SalahStepCard";
import {
  ADVANCE_BUFFER_MS,
  estimatedDwellMs,
  vibrate,
  stripMarkdown,
  DwellProgressBar,
  RepeatDots,
} from "@/components/prayer/AutoAdvanceControls";
import { WALKTHROUGH_PRAYERS, buildRakahSequence, flattenRakahSequence, buildEidSequence } from "@/data/salahStructure";
import { getAyahAudioUrl } from "@/lib/quranAudio";
import { surahs as quranSurahs } from "@/data/quranData";
import { cn } from "@/lib/utils";

const READ_ALOUD_KEY = "salah_walkthrough_read_aloud";

// Dhikr counts recited 3 times within a step — same auto-filling visual pacing as the Wudu
// tutorial's repeat dots, not a tap requirement (you can't tap a phone mid-Sujood either).
const REPEAT_COUNTS = { ruku: 3, sujood: 3, sitting_between_sujood: 3, eid_takbirs: 3 };

// Al-Fatihah and the additional surah are the only two steps that are actual Qur'an — real
// Qari recitation audio already exists for these via the app's per-ayah Quran audio
// infrastructure (everyayah.com), unlike the rest of the prayer's dhikr, which has no equivalent
// public per-phrase audio source. Al-Ikhlas is used as the default additional surah (a common,
// widely-taught choice, matching the reference booklet's own suggested short surahs).
const STEP_QURAN_SURAH = { al_fatiha: 1, surah_after_fatiha: 112 };
const DEFAULT_RECITER = "mishary";

function loadReadAloudPref() {
  try {
    const stored = window.localStorage.getItem(READ_ALOUD_KEY);
    return stored === null ? true : stored === "true";
  } catch {
    return true;
  }
}

export default function RakahWalkthrough({ prayerKey, salahSteps, contentLanguage, onExit }) {
  const prayerConfig = useMemo(
    () => WALKTHROUGH_PRAYERS.find((p) => p.key === prayerKey) || WALKTHROUGH_PRAYERS[0],
    [prayerKey]
  );
  const flatSteps = useMemo(
    () =>
      prayerConfig.isEid
        ? buildEidSequence()
        : flattenRakahSequence(buildRakahSequence(prayerConfig.rakahCount)),
    [prayerConfig.isEid, prayerConfig.rakahCount]
  );
  const stepByKey = useMemo(
    () => Object.fromEntries((salahSteps || []).map((s) => [s.step_key, s])),
    [salahSteps]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedIndices, setCompletedIndices] = useState(() => new Set());
  const [showCompletion, setShowCompletion] = useState(false);
  const [filledDots, setFilledDots] = useState(0);
  const [readAloud, setReadAloud] = useState(loadReadAloudPref);

  const advanceTimerRef = useRef(null);
  const dotIntervalRef = useRef(null);
  const speechDoneRef = useRef(true);
  const dwellDoneRef = useRef(false);
  const surahAudioRef = useRef(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(READ_ALOUD_KEY, String(readAloud));
    } catch {
      // ignore
    }
  }, [readAloud]);

  const entry = flatSteps[currentIndex];
  const step = entry ? stepByKey[entry.stepKey] : null;
  const isLast = currentIndex === flatSteps.length - 1;
  const repeatCount = entry ? REPEAT_COUNTS[entry.stepKey] ?? 1 : 1;
  const quranSurahId = entry ? STEP_QURAN_SURAH[entry.stepKey] : null;
  // Real recitation audio runs much longer than any dhikr phrase — the actual advance is always
  // gated on the audio truly finishing (speechDoneRef), so this only sets how long the visual
  // dwell bar takes to fill, roughly matched to a typical unhurried recitation pace per ayah.
  const dwellMs = quranSurahId
    ? (quranSurahs.find((s) => s.id === quranSurahId)?.verses || 1) * 5000
    : estimatedDwellMs(repeatCount);

  const clearTimers = () => {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    if (dotIntervalRef.current) clearInterval(dotIntervalRef.current);
    advanceTimerRef.current = null;
    dotIntervalRef.current = null;
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (surahAudioRef.current) {
      surahAudioRef.current.onended = null;
      surahAudioRef.current.pause();
      surahAudioRef.current = null;
    }
  };

  const goNext = () => {
    clearTimers();
    setCompletedIndices((prev) => new Set(prev).add(currentIndex));
    vibrate(20);
    if (isLast) {
      setShowCompletion(true);
      return;
    }
    setCurrentIndex((i) => Math.min(i + 1, flatSteps.length - 1));
  };

  const maybeAdvance = () => {
    if (dwellDoneRef.current && speechDoneRef.current) {
      goNext();
    }
  };

  // Plays real Qari recitation ayah-by-ayah for an actual Qur'an surah (Al-Fatihah / the
  // additional surah) — a small self-contained sequential player, deliberately not the shared
  // useQuranAudio context, since that hook auto-continues into the *next* surah once one
  // finishes (its own "keep playing like a playlist" behavior), which would race against this
  // walkthrough wanting to stop and advance to the *next prayer step* instead.
  const playSurahAudio = (surahId) => {
    const surahMeta = quranSurahs.find((s) => s.id === surahId);
    const totalAyahs = surahMeta?.verses || 1;
    let ayah = 1;
    const el = new Audio();
    surahAudioRef.current = el;
    const playNextAyah = () => {
      if (ayah > totalAyahs) {
        speechDoneRef.current = true;
        maybeAdvance();
        return;
      }
      el.src = getAyahAudioUrl(surahId, ayah, DEFAULT_RECITER);
      ayah += 1;
      el.play().catch(() => {
        speechDoneRef.current = true;
        maybeAdvance();
      });
    };
    el.onended = playNextAyah;
    playNextAyah();
  };

  const speak = () => {
    if (!readAloud || !step) return;
    const surahId = STEP_QURAN_SURAH[entry.stepKey];
    if (surahId) {
      playSurahAudio(surahId);
      return;
    }
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    // Reading the Latin transliteration (rather than the Arabic script, or an English
    // description) — a standard voice pronounces transliterated Arabic reasonably, whereas
    // Arabic script fed to a non-Arabic voice can come out as unintelligible noise, and an
    // English description isn't the actual words being said.
    const text = [step.transliteration, !step.transliteration && stripMarkdown(step.what_to_do)]
      .filter(Boolean)
      .join(". ");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.onend = () => {
      speechDoneRef.current = true;
      maybeAdvance();
    };
    utterance.onerror = () => {
      speechDoneRef.current = true;
      maybeAdvance();
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // Mirrors WuduTutorial's "propped up, hands busy" flow exactly — narrate the step, fill the
  // repeat dots on a fixed visual cadence, then auto-advance once both narration and a minimum
  // dwell time finish. Re-runs on every step change.
  useEffect(() => {
    if (!step || showCompletion) return undefined;

    setFilledDots(0);
    dwellDoneRef.current = false;
    speechDoneRef.current = !readAloud;

    if (repeatCount > 1) {
      const tick = dwellMs / repeatCount;
      let count = 0;
      dotIntervalRef.current = setInterval(() => {
        count += 1;
        setFilledDots(Math.min(count, repeatCount));
        if (count >= repeatCount) clearInterval(dotIntervalRef.current);
      }, tick);
    }

    speak();

    advanceTimerRef.current = setTimeout(() => {
      dwellDoneRef.current = true;
      maybeAdvance();
    }, dwellMs + ADVANCE_BUFFER_MS);

    return clearTimers;
  }, [currentIndex, readAloud]);

  const handleBack = () => {
    clearTimers();
    setCurrentIndex((i) => Math.max(i - 1, 0));
  };

  const repeatNarration = () => {
    dwellDoneRef.current = false;
    speechDoneRef.current = !readAloud;
    setFilledDots(0);
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    advanceTimerRef.current = setTimeout(() => {
      dwellDoneRef.current = true;
      maybeAdvance();
    }, dwellMs + ADVANCE_BUFFER_MS);
    speak();
  };

  const restart = () => {
    clearTimers();
    setCurrentIndex(0);
    setCompletedIndices(new Set());
    setShowCompletion(false);
  };

  if (!salahSteps || salahSteps.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Salah steps aren't available yet.</p>
        <Button variant="outline" className="mt-4" onClick={onExit}>
          Back
        </Button>
      </div>
    );
  }

  if (showCompletion) {
    return (
      <div className="text-center py-16">
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-20 h-20 mx-auto mb-4"
          >
            <div className="absolute inset-0 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <Star className="absolute -top-1 -right-1 w-6 h-6 text-accent fill-accent" />
            <Star className="absolute -bottom-1 -left-2 w-4 h-4 text-accent fill-accent" />
          </motion.div>
        </AnimatePresence>
        <h3 className="font-display text-2xl font-bold text-primary mb-2">{prayerConfig.label} Complete</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          May Allah accept your prayer.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" onClick={restart}>
            Pray Again
          </Button>
          <Button onClick={onExit}>Back to Academy</Button>
        </div>
      </div>
    );
  }

  const groupEntries = flatSteps
    .map((e, idx) => ({ ...e, idx }))
    .filter((e) => e.groupLabel === entry.groupLabel);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-4">
        <Button variant="ghost" size="sm" onClick={onExit}>
          <X className="w-4 h-4 mr-2" /> Exit
        </Button>
        <span className="text-sm text-muted-foreground">
          {prayerConfig.label} — Step {currentIndex + 1} of {flatSteps.length}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setReadAloud((v) => !v)}
          aria-label={readAloud ? "Turn off read-aloud" : "Turn on read-aloud"}
          title={readAloud ? "Read aloud: on" : "Read aloud: off"}
        >
          {readAloud ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </Button>
      </div>

      <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-4">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / flatSteps.length) * 100}%` }}
        />
      </div>

      <div className="text-center mb-3">
        <h2 className="font-display text-xl font-semibold text-primary">{entry.groupLabel}</h2>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {groupEntries.map((e) => {
          const label = stepByKey[e.stepKey]?.title || e.stepKey;
          const isDone = completedIndices.has(e.idx);
          const isCurrent = e.idx === currentIndex;
          return (
            <span
              key={e.idx}
              className={cn(
                "text-xs px-2.5 py-1 rounded-full border font-medium",
                isDone
                  ? "bg-accent text-accent-foreground border-accent"
                  : isCurrent
                  ? "border-accent text-accent"
                  : "border-border text-muted-foreground"
              )}
            >
              {isDone ? "✓ " : ""}
              {label}
            </span>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative">
            <div className="absolute -top-2 left-0 right-0 z-10">
              <DwellProgressBar stepKey={currentIndex} durationMs={dwellMs} paused={false} />
            </div>
            <SalahStepCard step={step} contentLanguage={contentLanguage} />
          </div>

          {repeatCount > 1 && (
            <div className="text-center mt-4">
              <p className="text-xs text-muted-foreground mb-2">×{repeatCount} times</p>
              <RepeatDots count={repeatCount} filled={filledDots} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between gap-3 mt-6">
        <Button variant="outline" size="lg" onClick={handleBack} disabled={currentIndex === 0} className="flex-1">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </Button>
        <button
          type="button"
          onClick={repeatNarration}
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground shrink-0 px-2"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Repeat
        </button>
        <Button size="lg" onClick={goNext} className="flex-1">
          {isLast ? "Complete" : "Next"} <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
