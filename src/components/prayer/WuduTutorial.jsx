import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  ArrowRight,
  X,
  CheckCircle2,
  Droplets,
  AlertTriangle,
  BookOpenCheck,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function WuduTutorial({ steps, contentLanguage, onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(() => new Set());
  const [showCompletion, setShowCompletion] = useState(false);
  const isRomanUrdu = contentLanguage === "roman_urdu";

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

  const step = steps[currentIndex];
  const isLast = currentIndex === steps.length - 1;
  const instructionsOf = (s) => (isRomanUrdu && s.instructions_roman_urdu) || s.instructions;

  const handleNext = () => {
    setCompletedSteps((prev) => new Set(prev).add(step.order));
    if (isLast) {
      setShowCompletion(true);
      return;
    }
    setCurrentIndex((i) => Math.min(i + 1, steps.length - 1));
  };

  const handleBack = () => setCurrentIndex((i) => Math.max(i - 1, 0));

  const playAudio = () => {
    if (!step.audio_url) return;
    new Audio(step.audio_url).play().catch(() => {});
  };

  const restart = () => {
    setCurrentIndex(0);
    setCompletedSteps(new Set());
    setShowCompletion(false);
  };

  if (showCompletion) {
    return (
      <div className="text-center py-16">
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
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
              onClick={() => isReachable && setCurrentIndex(i)}
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

      <Card className="glow-shadow">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="w-5 h-5 text-accent" />
            <h3 className="font-display text-xl font-semibold text-primary">{step.title}</h3>
          </div>

          {step.arabic_text && (
            <div className="text-center mb-6 p-4 rounded-xl bg-primary/5">
              <p className="text-3xl arabic-font text-primary mb-2">{step.arabic_text}</p>
              {step.transliteration && (
                <p className="text-accent italic font-display">{step.transliteration}</p>
              )}
              {step.translation && (
                <p className="text-sm text-muted-foreground mt-1">{step.translation}</p>
              )}
              {step.audio_url && (
                <Button variant="outline" size="sm" onClick={playAudio} className="mt-3">
                  <Volume2 className="w-4 h-4 mr-2" /> Play
                </Button>
              )}
            </div>
          )}

          <div className="prose dark:prose-invert max-w-none mb-4">
            <ReactMarkdown>{instructionsOf(step)}</ReactMarkdown>
          </div>

          {step.importance && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mb-4">
              {step.importance}
            </Badge>
          )}

          {step.common_mistakes && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/15 mb-4">
              <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <div className="text-sm text-foreground/80">
                <p className="font-medium text-destructive mb-1">Common Mistakes</p>
                <ReactMarkdown>{step.common_mistakes}</ReactMarkdown>
              </div>
            </div>
          )}

          {step.madhab_notes && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-secondary text-sm text-secondary-foreground mb-2">
              <BookOpenCheck className="w-4 h-4 shrink-0 mt-0.5" />
              <p>{step.madhab_notes}</p>
            </div>
          )}

          {step.hadith_reference && (
            <p className="text-xs text-muted-foreground italic mt-2">
              Reference: {step.hadith_reference}
            </p>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between mt-6">
        <Button variant="outline" onClick={handleBack} disabled={currentIndex === 0}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={handleNext}>
          {isLast ? "Complete" : "Mark Complete & Next"} <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
