import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DuaRequest } from "@/entities/all";
import { useToast } from "@/components/ui/use-toast";
import { isMine, unmarkAsMine } from "@/lib/ownership";
import { hasAlreadySaidAmeen, setAlreadySaidAmeen } from "@/lib/ameenTracking";
import { parseServerDate } from "@/lib/serverDate";

const CATEGORY_STYLES = {
  Health: "bg-primary/10 text-primary border-primary/20",
  Family: "bg-accent/10 text-accent border-accent/20",
  Guidance: "bg-[hsl(var(--chart-3)/0.15)] text-[hsl(var(--chart-3))] border-[hsl(var(--chart-3)/0.3)]",
  Provision: "bg-[hsl(var(--chart-4)/0.15)] text-[hsl(var(--chart-4))] border-[hsl(var(--chart-4)/0.3)]",
  General: "bg-muted text-muted-foreground border-border",
};

export default function DuaCard({ dua, onAameenChange, onDelete }) {
  const [aameenCount, setAameenCount] = useState(dua.aameen_count || 0);
  const [hasSaidAameen, setHasSaidAameen] = useState(() => hasAlreadySaidAmeen(dua.id));
  const [showBurst, setShowBurst] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const isMineDua = isMine("dua_requests", dua.id);
  const posterLabel = dua.name || `Anonymous ${dua.gender === "sister" ? "Sister" : "Brother"}`;
  const timeAgo = dua.created_date
    ? formatDistanceToNow(parseServerDate(dua.created_date), { addSuffix: true })
    : "Just now";

  const handleDelete = async () => {
    if (deleting || !window.confirm("Delete this dua request? This can't be undone.")) return;
    setDeleting(true);
    try {
      await DuaRequest.delete(dua.id);
      unmarkAsMine("dua_requests", dua.id);
      onDelete?.(dua.id);
    } catch (error) {
      console.error("Error deleting dua request:", error);
      toast({
        variant: "destructive",
        title: "Couldn't delete your dua request",
        description: "Please check your connection and try again.",
      });
      setDeleting(false);
    }
  };

  const toggleAameen = async () => {
    if (saving) return;
    const nextHasSaid = !hasSaidAameen;
    const next = nextHasSaid ? aameenCount + 1 : aameenCount - 1;
    setAameenCount(next);
    setHasSaidAameen(nextHasSaid);
    setAlreadySaidAmeen(dua.id, nextHasSaid);
    if (nextHasSaid) {
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
      setHasSaidAameen(hasSaidAameen);
      setAlreadySaidAmeen(dua.id, hasSaidAameen);
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
          <div className="flex items-center gap-1 shrink-0">
            <Badge variant="outline" className={cn("text-xs", CATEGORY_STYLES[dua.category])}>
              {dua.category}
            </Badge>
            {isMineDua && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="text-muted-foreground hover:text-destructive p-1"
                aria-label="Delete dua request"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <p className="text-sm text-foreground/90 leading-relaxed">{dua.request}</p>

        <div className="flex items-center justify-between gap-2 flex-wrap pt-2 border-t border-border">
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
