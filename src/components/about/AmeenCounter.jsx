import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AmeenCounter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);
  const [hasSaid, setHasSaid] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  const toggle = () => {
    if (hasSaid) {
      setCount((c) => c - 1);
      setHasSaid(false);
      return;
    }
    setCount((c) => c + 1);
    setHasSaid(true);
    setShowBurst(true);
    setTimeout(() => setShowBurst(false), 700);
  };

  return (
    <div className="flex items-center gap-3">
      <Button variant={hasSaid ? "default" : "outline"} onClick={toggle} className="relative">
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
