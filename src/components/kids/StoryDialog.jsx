import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export default function StoryDialog({ story, open, onOpenChange }) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (open) setPage(0);
  }, [open, story]);

  if (!story) return null;

  const isLastPage = page === story.pages.length - 1;

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

        <p className="text-base leading-relaxed text-foreground/90 min-h-[120px]">
          {story.pages[page]}
        </p>

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
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <span className="text-xs text-muted-foreground">
            {page + 1} / {story.pages.length}
          </span>
          {isLastPage ? (
            <Button size="sm" onClick={() => onOpenChange(false)}>
              Finish
            </Button>
          ) : (
            <Button size="sm" onClick={() => setPage((p) => p + 1)}>
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
