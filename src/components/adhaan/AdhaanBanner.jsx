import React from "react";
import { Button } from "@/components/ui/button";
import { X, Clock } from "lucide-react";
import { format } from "date-fns";
import { useAdhaan, PRAYER_INFO } from "@/hooks/useAdhaan";

export default function AdhaanBanner() {
  const { activeAdhaan, stopAdhaan } = useAdhaan();

  if (!activeAdhaan) return null;

  const info = PRAYER_INFO[activeAdhaan.prayer] || PRAYER_INFO.Fajr;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-gradient-to-br from-primary to-primary/85 rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-accent via-accent to-accent/60" />

        <div className="p-8 text-center text-primary-foreground relative">
          <button
            onClick={stopAdhaan}
            className="absolute top-4 right-4 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Animated sound waves */}
          <div className="flex justify-center items-end gap-1.5 h-20 mb-6">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-2 bg-primary-foreground/30 rounded-full animate-pulse"
                style={{
                  height: `${30 + Math.sin(i) * 20 + 20}%`,
                  animationDelay: `${i * 0.12}s`,
                  animationDuration: "0.8s",
                }}
              />
            ))}
          </div>

          <p className="text-sm text-primary-foreground/80 uppercase tracking-widest mb-2">
            Prayer Time
          </p>
          <h2 className="text-4xl font-display font-bold mb-1">{info.english}</h2>
          <p className="text-3xl arabic-font text-primary-foreground/90 mb-4">{info.arabic}</p>
          <p className="text-primary-foreground/80 mb-6">
            Allahu Akbar! It is time for {info.english} prayer.
          </p>

          <div className="inline-flex items-center gap-2 text-primary-foreground mb-6 px-4 py-2 bg-primary-foreground/10 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="text-lg font-medium">
              {format(activeAdhaan.time, "h:mm a")}
            </span>
          </div>

          <Button
            onClick={stopAdhaan}
            className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-medium"
          >
            <X className="w-4 h-4 mr-2" />
            Stop Adhaan
          </Button>

          <p className="text-xs text-primary-foreground/70 mt-5 arabic-font leading-relaxed">
            حَيَّ عَلَى الصَّلَاةِ · حَيَّ عَلَى الْفَلَاحِ
          </p>
          <p className="text-xs text-primary-foreground/60 mt-1">
            Hayya 'ala as-Salah · Hayya 'ala al-Falah
          </p>
        </div>
      </div>
    </div>
  );
}