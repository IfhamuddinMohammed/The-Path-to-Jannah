import ReactMarkdown from "react-markdown";
import { AlertTriangle, BookOpenCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SalahPostureSilhouette from "@/components/prayer/SalahPostureSilhouette";
import { STEP_POSTURES } from "@/data/salahStructure";

// Presentational-only detail view for a single SalahStep — used both by the "How to Pray"
// browsable reference list and (wrapped with rak'ah-aware checklist chrome) by the live
// Rak'ah Walkthrough. Deliberately NOT shared with WuduTutorial's card markup: WuduStep's field
// names differ (instructions vs what_to_do) and that component is already shipped/working, so
// this is accepted duplication rather than a forced, risky refactor.
export default function SalahStepCard({ step, contentLanguage }) {
  if (!step) return null;
  const isRomanUrdu = contentLanguage === "roman_urdu";
  const whatToDoOf = (s) => (isRomanUrdu && s.what_to_do_roman_urdu) || s.what_to_do;
  const posture = STEP_POSTURES[step.step_key] || "standing";

  return (
    <Card className="glow-shadow overflow-hidden">
      <CardContent className="p-6 md:p-8 flex flex-col items-center text-center">
        <h3 className="font-display text-2xl font-semibold text-primary mb-4">{step.title}</h3>

        <SalahPostureSilhouette posture={posture} className="w-28 h-28 mb-4" />

        {step.arabic_text && (
          <div className="w-full mb-4 p-4 rounded-xl bg-primary/5">
            <p className="text-2xl md:text-3xl arabic-font text-primary mb-2 leading-loose">{step.arabic_text}</p>
            {step.transliteration && (
              <p className="text-accent italic font-display">{step.transliteration}</p>
            )}
            {step.translation && <p className="text-sm text-muted-foreground mt-1">{step.translation}</p>}
          </div>
        )}

        {step.ruling_status && (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mb-4">
            {step.ruling_status}
          </Badge>
        )}

        <div className="prose dark:prose-invert max-w-none text-left w-full">
          <ReactMarkdown>{whatToDoOf(step)}</ReactMarkdown>
        </div>

        {step.common_mistakes && (
          <div className="w-full flex items-start gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/15 mt-4 text-left">
            <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
            <div className="text-sm text-foreground/80">
              <p className="font-medium text-destructive mb-1">Common Mistakes</p>
              <ReactMarkdown>{step.common_mistakes}</ReactMarkdown>
            </div>
          </div>
        )}

        {step.madhab_notes && (
          <div className="w-full flex items-start gap-2 p-3 rounded-lg bg-secondary text-sm text-secondary-foreground mt-3 text-left">
            <BookOpenCheck className="w-4 h-4 shrink-0 mt-0.5" />
            <p>{step.madhab_notes}</p>
          </div>
        )}

        {step.hadith_reference && (
          <p className="text-xs text-muted-foreground italic mt-3">Reference: {step.hadith_reference}</p>
        )}
      </CardContent>
    </Card>
  );
}
