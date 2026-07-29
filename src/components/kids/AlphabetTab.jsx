import { useEffect, useState } from "react";
import { arabicAlphabet } from "@/data/arabicAlphabet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, Shuffle, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";

export default function AlphabetTab() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const { speak, stop, speaking } = useSpeechSynthesis();
  const letter = arabicAlphabet[index];

  const pronounce = (l) => {
    speak(`${l.name}. Like ${l.wordTransliteration}, meaning ${l.wordMeaning}.`);
  };

  useEffect(() => {
    if (autoPlay) pronounce(letter);
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const go = (dir) => {
    setFlipped(false);
    setIndex((i) => (i + dir + arabicAlphabet.length) % arabicAlphabet.length);
  };

  const shuffle = () => {
    setFlipped(false);
    setIndex(Math.floor(Math.random() * arabicAlphabet.length));
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
        Tap the card to flip it and discover a word that starts with this letter!
      </p>

      <div className="flex items-center gap-2.5 mb-5">
        <Label htmlFor="autoplay-sound" className="text-sm text-muted-foreground cursor-pointer">
          Auto-Play Sound
        </Label>
        <Switch id="autoplay-sound" checked={autoPlay} onCheckedChange={setAutoPlay} />
      </div>

      <div className="w-full max-w-sm" style={{ perspective: 1000 }}>
        <Card
          onClick={() => setFlipped((f) => !f)}
          className="relative cursor-pointer gold-border bg-gradient-to-br from-accent/5 to-primary/5 h-64 flex items-center justify-center"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              pronounce(letter);
            }}
            aria-label="Play pronunciation"
            className={`absolute top-3 right-3 w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
              speaking
                ? "bg-accent text-accent-foreground"
                : "bg-accent/10 text-accent hover:bg-accent/20"
            }`}
          >
            <Volume2 className="w-5 h-5" />
          </button>

          <CardContent className="p-0 w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!flipped ? (
                <motion.div
                  key="front"
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -90 }}
                  transition={{ duration: 0.25 }}
                  className="text-center"
                >
                  <div className="text-8xl arabic-font text-primary mb-3">{letter.letter}</div>
                  <p className="text-lg font-semibold text-accent">{letter.name}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="back"
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -90 }}
                  transition={{ duration: 0.25 }}
                  className="text-center px-4"
                >
                  <div className="text-4xl mb-2">{letter.emoji}</div>
                  <div className="text-4xl arabic-font text-primary mb-2">{letter.word}</div>
                  <p className="text-accent font-medium">{letter.wordTransliteration}</p>
                  <p className="text-muted-foreground text-sm">{letter.wordMeaning}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <Button variant="outline" size="icon" className="w-11 h-11 rounded-full" onClick={() => go(-1)}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" className="w-11 h-11 rounded-full" onClick={shuffle}>
          <Shuffle className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" className="w-11 h-11 rounded-full" onClick={() => go(1)}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        Letter {index + 1} of {arabicAlphabet.length}
      </p>
    </div>
  );
}
