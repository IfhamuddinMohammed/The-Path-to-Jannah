import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Sparkles, Volume2, Pause, Users } from "lucide-react";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";

export default function StoryDialog({ story, open, onOpenChange }) {
  const [page, setPage] = useState(0);
  const { speak, stop, speaking, progress: speechProgress } = useSpeechSynthesis();
  // Tracks whether we're in "hands-free narration" mode, where finishing a
  // page's audio should automatically turn to the next page and keep reading —
  // a plain ref (not state) so the speechSynthesis onEnd callback always reads
  // the latest value instead of a stale one captured at speak()-call time.
  const autoNarrateRef = useRef(false);

  useEffect(() => {
    if (open) {
      setPage(0);
    } else {
      autoNarrateRef.current = false;
      stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, story]);

  if (!story) return null;

  const isLastPage = page === story.pages.length - 1;

  const narratePage = (pageIndex) => {
    speak(story.pages[pageIndex], {
      onEnd: () => {
        if (!autoNarrateRef.current) return;
        if (pageIndex < story.pages.length - 1) {
          const next = pageIndex + 1;
          setPage(next);
          narratePage(next);
        } else if (story.moral) {
          speak(story.moral, { onEnd: () => (autoNarrateRef.current = false) });
        } else {
          autoNarrateRef.current = false;
        }
      },
    });
  };

  const toggleListen = () => {
    if (speaking) {
      autoNarrateRef.current = false;
      stop();
    } else {
      autoNarrateRef.current = true;
      narratePage(page);
    }
  };

  const goBack = () => {
    autoNarrateRef.current = false;
    stop();
    setPage((p) => Math.max(0, p - 1));
  };

  const goNext = () => {
    autoNarrateRef.current = false;
    stop();
    setPage((p) => Math.min(story.pages.length - 1, p + 1));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-display text-primary">
            <span className="text-3xl">{story.emoji}</span>
            {story.title}
          </DialogTitle>
        </DialogHeader>

        <Progress value={((page + 1) / story.pages.length) * 100} className="h-1.5" />

        <div className="text-center pt-1">
          <div className="text-6xl mb-3">{story.emoji}</div>
          <p className="text-base leading-relaxed text-foreground/90 min-h-[100px] font-medium">
            {story.pages[page]}
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={toggleListen}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-sm font-semibold"
          >
            {speaking ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            {speaking ? "Pause" : "🔊 Listen to Story"}
          </button>
          {speaking && (
            <div className="h-1.5 bg-border rounded-full overflow-hidden w-full max-w-[220px]">
              <div
                className="h-full bg-accent transition-[width] duration-150"
                style={{ width: `${speechProgress * 100}%` }}
              />
            </div>
          )}
          {speaking && !isLastPage && (
            <p className="text-xs text-muted-foreground">Turning the page automatically…</p>
          )}
        </div>

        {isLastPage && (
          <div className="flex items-start gap-2 bg-accent/10 border border-accent/20 rounded-lg p-3">
            <Sparkles className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <p className="text-sm text-accent font-medium">{story.moral}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={goBack}
            disabled={page === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <span className="text-xs text-muted-foreground">
            {page + 1} / {story.pages.length}
          </span>
          {isLastPage ? (
            <Button size="sm" className="rounded-full" onClick={() => onOpenChange(false)}>
              Finish
            </Button>
          ) : (
            <Button size="sm" className="rounded-full" onClick={goNext}>
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>

        {story.discussionPrompt && (
          <div className="flex items-start gap-2 bg-primary/5 border border-primary/15 rounded-lg p-3">
            <Users className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-primary/90">
              <span className="font-semibold">👪 Parent Discussion Prompt:</span>{" "}
              {story.discussionPrompt}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
