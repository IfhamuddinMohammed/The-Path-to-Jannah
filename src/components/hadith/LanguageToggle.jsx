import { LANGUAGE_MODES } from "@/data/hadithData";
import { cn } from "@/lib/utils";

export default function LanguageToggle({ value, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {LANGUAGE_MODES.map((mode) => (
        <button
          key={mode}
          onClick={() => onChange(mode)}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
            value === mode
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-muted-foreground border-border hover:bg-secondary"
          )}
        >
          {mode}
        </button>
      ))}
    </div>
  );
}
