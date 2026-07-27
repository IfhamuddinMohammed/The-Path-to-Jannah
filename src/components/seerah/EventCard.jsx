import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ERA_STYLES = {
  early: "bg-secondary text-secondary-foreground border-border",
  prophethood: "bg-primary/10 text-primary border-primary/20",
  medina: "bg-accent/10 text-accent border-accent/20",
};

const ERA_LABELS = {
  early: "Early Life",
  prophethood: "Prophethood",
  medina: "Medina Era",
};

export default function EventCard({ event, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left flex items-start gap-4 p-4 rounded-lg bg-secondary border border-border hover:border-accent/40 hover:bg-accent/5 transition-colors"
    >
      <Badge variant="outline" className="bg-card text-primary border-primary/20 font-bold min-w-20 shrink-0 justify-center">
        {event.yearCE}
      </Badge>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-semibold text-primary">{event.title}</h4>
          <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", ERA_STYLES[event.era])}>
            {ERA_LABELS[event.era]}
          </Badge>
        </div>
        {event.titleArabic && (
          <p className="text-sm text-accent arabic-font mt-0.5">{event.titleArabic}</p>
        )}
        <p className="text-muted-foreground text-sm mt-1">{event.description}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
    </button>
  );
}
