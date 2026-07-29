import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { DuaRequest } from "@/entities/all";
import { useToast } from "@/components/ui/use-toast";

const CATEGORY_STYLES = {
  Health: "bg-primary/10 text-primary border-primary/20",
  Family: "bg-accent/10 text-accent border-accent/20",
  Guidance: "bg-[hsl(var(--chart-3)/0.15)] text-[hsl(var(--chart-3))] border-[hsl(var(--chart-3)/0.3)]",
  Provision: "bg-[hsl(var(--chart-4)/0.15)] text-[hsl(var(--chart-4))] border-[hsl(var(--chart-4)/0.3)]",
  General: "bg-muted text-muted-foreground border-border",
};

export default function DuaCard({ dua, onAameenChange }) {
  const [aameenCount, setAameenCount] = useState(dua.aameen_count || 0);
  const [hasSaidAameen, setHasSaidAameen] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const posterLabel = dua.name || `Anonymous ${dua.gender === "sister" ? "Sister" : "Brother"}`;
  const timeAgo = dua.created_date
    ? formatDistanceToNow(new Date(dua.created_date), { addSuffix: true })
    : "Just now";

  const toggleAameen = async () => {
    if (saving) return;
    const next = hasSaidAameen ? aameenCount - 1 : aameenCount + 1;
    setAameenCount(next);
    setHasSaidAameen((v) => !v);
    if (!hasSaidAameen) {
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 700);
    }

    setSaving(true);
    try {
      await DuaRequest.update(dua.id, { aameen_count: next });
      onAameenChange?.(dua.id, next);
    } catch (error) {
      console.error("Error updating Aameen count:", error);
      // Roll back on failure so the displayed count doesn't drift from reality.
      setAameenCount(aameenCount);
      setHasSaidAameen((v) => !v);
      toast({
        variant: "destructive",
        title: "Couldn't record your Aameen",
        description: "Please check your connection and try again.",
      });
    }
    setSaving(false);
  };

  return (
    <Card className="bg-card border-border glow-shadow hover:glow-gold transition-shadow">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-foreground">{posterLabel}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{timeAgo}</p>
          </div>
          <Badge variant="outline" className={cn("text-xs shrink-0", CATEGORY_STYLES[dua.category])}>
            {dua.category}
          </Badge>
        </div>

        <p className="text-sm text-foreground/90 leading-relaxed">{dua.request}</p>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <Button
            variant={hasSaidAameen ? "default" : "outline"}
            size="sm"
            onClick={toggleAameen}
            className="relative"
          >
            <Heart className={cn("w-4 h-4 mr-2", hasSaidAameen && "fill-current")} />
            {hasSaidAameen ? "Ameen said" : "Make Dua"}
            <AnimatePresence>
              {showBurst && (
                <motion.span
                  initial={{ opacity: 1, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, y: -24, scale: 1.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="absolute -top-1 right-1 text-accent pointer-events-none"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-primary">{aameenCount}</span> people said Aameen
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
