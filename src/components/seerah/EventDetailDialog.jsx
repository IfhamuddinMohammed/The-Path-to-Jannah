import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, BookMarked } from "lucide-react";

export default function EventDetailDialog({ event, open, onOpenChange }) {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {event.yearCE}
            </Badge>
            {event.yearAH && (
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                {event.yearAH}
              </Badge>
            )}
          </div>
          <DialogTitle className="font-display text-primary text-xl">{event.title}</DialogTitle>
          {event.titleArabic && (
            <p className="text-lg text-accent arabic-font">{event.titleArabic}</p>
          )}
          <DialogDescription className="text-foreground/70 pt-1">
            {event.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-foreground/90 leading-relaxed">{event.detailedText}</p>

          {event.keyLessons?.length > 0 && (
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold text-primary">Key Wisdoms &amp; Lessons</p>
              </div>
              <ul className="space-y-1.5">
                {event.keyLessons.map((lesson, i) => (
                  <li key={i} className="text-sm text-foreground/90 flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {event.authenticSources?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookMarked className="w-4 h-4 text-accent" />
                <p className="text-sm font-semibold text-foreground">Authentic Sources</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {event.authenticSources.map((source, i) => (
                  <Badge key={i} variant="outline" className="bg-secondary text-secondary-foreground border-border">
                    {source}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
