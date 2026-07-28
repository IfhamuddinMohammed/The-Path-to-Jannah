import { useState } from "react";
import { arabicAlphabet } from "@/data/arabicAlphabet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AlphabetTab() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const letter = arabicAlphabet[index];

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

      <div className="w-full max-w-sm" style={{ perspective: 1000 }}>
        <Card
          onClick={() => setFlipped((f) => !f)}
          className="cursor-pointer gold-border bg-gradient-to-br from-accent/5 to-primary/5 h-64 flex items-center justify-center"
        >
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
                  <div className="text-5xl arabic-font text-primary mb-2">{letter.word}</div>
                  <p className="text-accent font-medium">{letter.wordTransliteration}</p>
                  <p className="text-muted-foreground text-sm">{letter.wordMeaning}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <Button variant="outline" size="icon" onClick={() => go(-1)}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={shuffle}>
          <Shuffle className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => go(1)}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        Letter {index + 1} of {arabicAlphabet.length}
      </p>
    </div>
  );
}
