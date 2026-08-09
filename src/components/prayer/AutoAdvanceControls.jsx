import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Shared helpers for any "propped up, hands busy" tutorial step (Wudu, Salah) — used identically
// by WuduTutorial and RakahWalkthrough, so extracted here rather than duplicated: both need the
// same generic dwell-time estimate, haptic buzz, markdown-to-speech cleanup, visual dwell
// countdown, and auto-filling repeat-count dots.

export const ADVANCE_BUFFER_MS = 1400;

export function estimatedDwellMs(repeatCount) {
  return repeatCount > 1 ? repeatCount * 2600 : 5200;
}

export function vibrate(pattern) {
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
    navigator.vibrate(pattern);
  }
}

export function stripMarkdown(text) {
  return (text || "")
    .replace(/[*_`#>]/g, "")
    .replace(/\n+/g, ". ")
    .trim();
}

export function DwellProgressBar({ stepKey, durationMs, paused }) {
  return (
    <div className="w-full h-1 rounded-full bg-muted overflow-hidden" aria-hidden="true">
      <motion.div
        key={stepKey}
        className="h-full bg-accent/70 rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: paused ? "0%" : "100%" }}
        transition={paused ? { duration: 0 } : { duration: durationMs / 1000, ease: "linear" }}
      />
    </div>
  );
}

export function RepeatDots({ count, filled }) {
  return (
    <div className="flex items-center justify-center gap-3 my-1" aria-live="polite">
      {Array.from({ length: count }, (_, i) => {
        const done = i < filled;
        return (
          <motion.div
            key={i}
            animate={done ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "w-11 h-11 rounded-full border-2 flex items-center justify-center text-base font-display font-semibold transition-colors",
              done ? "bg-accent border-accent text-accent-foreground" : "border-border text-muted-foreground/40"
            )}
          >
            {done ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
          </motion.div>
        );
      })}
    </div>
  );
}
