import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export default function ProphetNameChip({ name }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-1 -m-1">
          <Badge
            variant="outline"
            className="text-primary border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-colors cursor-pointer"
          >
            {name.transliteration}
          </Badge>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <p className="text-2xl arabic-font text-accent text-right mb-2">{name.arabic}</p>
        <p className="font-semibold text-primary">{name.transliteration}</p>
        <p className="text-sm text-foreground/80 mt-1">{name.meaning}</p>
        {name.reference && (
          <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
            {name.reference}
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
}
