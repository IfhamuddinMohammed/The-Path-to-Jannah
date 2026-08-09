import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  ArrowRight,
  X,
  CheckCircle2,
  AlertTriangle,
  BookOpenCheck,
  Volume2,
  VolumeX,
  RotateCcw,
  ChevronDown,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import WuduStepIllustration from "@/components/prayer/WuduStepIllustration";
import {
  ADVANCE_BUFFER_MS,
  estimatedDwellMs,
  vibrate,
  stripMarkdown,
  DwellProgressBar,
  RepeatDots,
} from "@/components/prayer/AutoAdvanceControls";

// How many times each step is physically repeated — presentation-only detail, not worth a
// dedicated entity field for 9 fixed, unchanging steps.
const REPEAT_COUNTS = { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 3, 9: 1 };

// In real use this is propped up at the sink with wet hands — nobody can tap through a
// per-repetition counter or read paragraphs mid-wash. So the step advances on its own: it's
// narrated aloud (Web Speech API — no audio asset needed) and, once the narration ends (or a
// generous fallback dwell time if narration is off/unsupported), moves to the next step by
// itself. Tapping Next/Back/Repeat always works as a manual override for anyone who wants it.
const READ_ALOUD_KEY = "wudu_tutorial_read_aloud";

function loadReadAloudPref() {
  try {
    const stored = window.localStorage.getItem(READ_ALOUD_KEY);
    return stored === null ? true : stored === "true";
  } catch {
    return true;
  }
}

export default function WuduTutorial({ steps, contentLanguage, onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(() => new Set());
  const [showCompletion, setShowCompletion] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [filledDots, setFilledDots] = useState(0);
  const [readAloud, setReadAloud] = useState(loadReadAloudPref);
  const isRomanUrdu = contentLanguage === "roman_urdu";

  const advanceTimerRef = useRef(null);
  const dotIntervalRef = useRef(null);
  const speechDoneRef = useRef(true);
  const dwellDoneRef = useRef(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(READ_ALOUD_KEY, String(readAloud));
    } catch {
      // ignore
    }
  }, [readAloud]);

  const step = steps?.[currentIndex];
  const isLast = steps ? currentIndex === steps.length - 1 : false;
  const repeatCount = step ? REPEAT_COUNTS[step.order] ?? 1 : 1;
  const dwellMs = estimatedDwellMs(repeatCount);

  const clearTimers = () => {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    if (dotIntervalRef.current) clearInterval(dotIntervalRef.current);
    advanceTimerRef.current = null;
    dotIntervalRef.current = null;
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const goNext = () => {
    clearTimers();
    setCompletedSteps((prev) => new Set(prev).add(step.order));
    setShowDetails(false);
    vibrate(20);
    if (isLast) {
      setShowCompletion(true);
      return;
    }
    setCurrentIndex((i) => Math.min(i + 1, steps.length - 1));
  };

  const maybeAdvance = () => {
    if (dwellDoneRef.current && speechDoneRef.current && !pausedRef.current) {
      goNext();
    }
  };

  // Drives the whole "propped at the sink" flow for the current step: narrate it aloud, fill
  // the repeat dots on a fixed visual cadence, then move on automatically once both the
  // narration (if enabled) and a minimum dwell time have finished — so nothing needs to be
  // touched between steps. Re-runs on every step change and cleans up fully on the way out.
  useEffect(() => {
    if (!step || showCompletion) return undefined;

    setFilledDots(0);
    dwellDoneRef.current = false;
    speechDoneRef.current = !readAloud;
    pausedRef.current = false;

    if (repeatCount > 1) {
      const tick = dwellMs / repeatCount;
      let count = 0;
      dotIntervalRef.current = setInterval(() => {
        count += 1;
        setFilledDots(Math.min(count, repeatCount));
        if (count >= repeatCount) clearInterval(dotIntervalRef.current);
      }, tick);
    }

    if (readAloud && typeof window !== "undefined" && window.speechSynthesis) {
      const text = [step.title, stripMarkdown(step.instructions)].filter(Boolean).join(". ");
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.92;
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
    }

    advanceTimerRef.current = setTimeout(() => {
      dwellDoneRef.current = true;
      maybeAdvance();
    }, dwellMs + ADVANCE_BUFFER_MS);

    return clearTimers;
  }, [currentIndex, readAloud]);

  if (!steps || steps.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Wudu steps aren't available yet.</p>
        <Button variant="outline" className="mt-4" onClick={onExit}>
          Back
        </Button>
      </div>
    );
  }

  const instructionsOf = (s) => (isRomanUrdu && s.instructions_roman_urdu) || s.instructions;

  const handleBack = () => {
    clearTimers();
    setShowDetails(false);
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

    if (readAloud && typeof window !== "undefined" && window.speechSynthesis) {
      const text = [step.title, stripMarkdown(step.instructions)].filter(Boolean).join(". ");
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.92;
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
    }
  };

  const toggleDetails = () => {
    const next = !showDetails;
    setShowDetails(next);
    // Reading more means "don't rush me" — pause the auto-advance for this step entirely.
    pausedRef.current = next;
    if (next && advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  };

  const restart = () => {
    clearTimers();
    setCurrentIndex(0);
    setCompletedSteps(new Set());
    setShowCompletion(false);
    setShowDetails(false);
  };

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
        <h3 className="font-display text-2xl font-bold text-primary mb-2">Wudu Complete</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          May Allah accept your purification. You're ready to stand for prayer.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" onClick={restart}>
            Start Over
          </Button>
          <Button onClick={onExit}>Back to Academy</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onExit}>
          <X className="w-4 h-4 mr-2" /> Exit
        </Button>
        <span className="text-sm text-muted-foreground">
          Step {currentIndex + 1} of {steps.length}
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

      <div className="flex items-center gap-1.5 mb-8">
        {steps.map((s, i) => {
          const isDone = completedSteps.has(s.order);
          const isCurrent = i === currentIndex;
          const isReachable = isDone || i <= currentIndex;
          return (
            <button
              key={s.id ?? s.order}
              type="button"
              onClick={() => {
                if (!isReachable) return;
                clearTimers();
                setShowDetails(false);
                setCurrentIndex(i);
              }}
              disabled={!isReachable}
              aria-label={`Step ${i + 1}: ${s.title}`}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                isDone ? "bg-accent" : isCurrent ? "bg-accent/50" : "bg-muted"
              )}
            />
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
          <Card className="glow-shadow overflow-hidden">
            <DwellProgressBar stepKey={currentIndex} durationMs={dwellMs} paused={showDetails} />
            <CardContent className="p-6 md:p-8 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground pl-4 pr-1.5 py-1 mb-4">
                <span className="text-xs font-bold uppercase tracking-wide">Step</span>
                <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                  {currentIndex + 1}
                </span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-primary mb-5">{step.title}</h3>

              <motion.div
                key={`icon-${currentIndex}`}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="mb-4"
              >
                <WuduStepIllustration stepIndex={currentIndex} className="w-28 h-28" />
              </motion.div>

              {repeatCount > 1 && (
                <div className="mb-2">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-border text-xs font-bold text-muted-foreground">
                      ×{repeatCount}
                    </span>
                    <p className="text-xs text-muted-foreground">times</p>
                  </div>
                  <RepeatDots count={repeatCount} filled={filledDots} />
                </div>
              )}

              {step.arabic_text && (
                <div className="w-full mt-3 mb-4 p-4 rounded-xl bg-primary/5">
                  <p className="text-3xl arabic-font text-primary mb-2">{step.arabic_text}</p>
                  {step.transliteration && (
                    <p className="text-accent italic font-display">{step.transliteration}</p>
                  )}
                  {step.translation && (
                    <p className="text-sm text-muted-foreground mt-1">{step.translation}</p>
                  )}
                </div>
              )}

              {step.importance && (
                <p className="text-sm text-foreground/80 mt-1 max-w-sm">
                  <span className="font-semibold text-primary">Why? </span>
                  {step.importance}
                </p>
              )}

              <div className="flex items-center gap-4 mt-4">
                <button
                  type="button"
                  onClick={repeatNarration}
                  className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Repeat
                </button>
                <button
                  type="button"
                  onClick={toggleDetails}
                  className="inline-flex items-center gap-1 text-sm font-medium text-accent"
                >
                  {showDetails ? "Show less" : "Learn more"}
                  <ChevronDown className={cn("w-4 h-4 transition-transform", showDetails && "rotate-180")} />
                </button>
              </div>

              <AnimatePresence initial={false}>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full overflow-hidden text-left"
                  >
                    <div className="prose dark:prose-invert max-w-none mt-4">
                      <ReactMarkdown>{instructionsOf(step)}</ReactMarkdown>
                    </div>

                    {step.common_mistakes && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/15 mt-4">
                        <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                        <div className="text-sm text-foreground/80">
                          <p className="font-medium text-destructive mb-1">Common Mistakes</p>
                          <ReactMarkdown>{step.common_mistakes}</ReactMarkdown>
                        </div>
                      </div>
                    )}

                    {step.madhab_notes && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-secondary text-sm text-secondary-foreground mt-3">
                        <BookOpenCheck className="w-4 h-4 shrink-0 mt-0.5" />
                        <p>{step.madhab_notes}</p>
                      </div>
                    )}

                    {step.hadith_reference && (
                      <p className="text-xs text-muted-foreground italic mt-3">
                        Reference: {step.hadith_reference}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between gap-3 mt-6">
        <Button
          variant="outline"
          size="lg"
          onClick={handleBack}
          disabled={currentIndex === 0}
          className="flex-1"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </Button>
        <Button size="lg" onClick={goNext} className="flex-1">
          {isLast ? "Complete" : "Next"} <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
