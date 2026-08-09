import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { SiteSettings } from "@/entities/all";
import { useToast } from "@/components/ui/use-toast";
import { hasAlreadySaidAmeen, setAlreadySaidAmeen } from "@/lib/ameenTracking";

const DEDICATION_KEY = "about-dedication";

export default function AmeenCounter({ settings }) {
  const [count, setCount] = useState(settings?.dedication_ameen_count ?? 0);
  const [hasSaid, setHasSaid] = useState(() => hasAlreadySaidAmeen(DEDICATION_KEY));
  const [showBurst, setShowBurst] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Settings load asynchronously after mount — sync the real count once it arrives.
  useEffect(() => {
    if (settings) setCount(settings.dedication_ameen_count ?? 0);
  }, [settings]);

  const toggle = async () => {
    if (saving || !settings) return;
    const nextHasSaid = !hasSaid;
    const next = nextHasSaid ? count + 1 : count - 1;
    setCount(next);
    setHasSaid(nextHasSaid);
    setAlreadySaidAmeen(DEDICATION_KEY, nextHasSaid);
    if (nextHasSaid) {
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 700);
    }

    setSaving(true);
    try {
      await SiteSettings.update(settings.id, { dedication_ameen_count: next });
    } catch (error) {
      console.error("Error updating dedication Ameen count:", error);
      setCount(count);
      setHasSaid(hasSaid);
      setAlreadySaidAmeen(DEDICATION_KEY, hasSaid);
      toast({
        variant: "destructive",
        title: "Couldn't record your Ameen",
        description: "Please check your connection and try again.",
      });
    }
    setSaving(false);
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant={hasSaid ? "default" : "outline"}
        onClick={toggle}
        disabled={!settings || saving}
        className="relative"
      >
        <Heart className={cn("w-4 h-4 mr-2", hasSaid && "fill-current")} />
        {hasSaid ? "Ameen said" : "Say Ameen"}
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
        <span className="font-medium text-primary">{count}</span> people said Ameen for him
      </p>
    </div>
  );
}
