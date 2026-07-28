import { useState } from "react";
import confetti from "canvas-confetti";
import { kidsQuizQuestions } from "@/data/kidsQuizData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Star, RotateCcw } from "lucide-react";

export default function QuizTab() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [stars, setStars] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = kidsQuizQuestions[index];

  const handleSelect = (option) => {
    if (selected) return;
    setSelected(option);
    if (option === question.correctAnswer) {
      setStars((s) => s + 1);
      confetti({
        particleCount: 60,
        spread: 65,
        origin: { y: 0.7 },
        colors: ["#D4AF37", "#064E3B", "#D97706"],
      });
    }
  };

  const next = () => {
    if (index + 1 < kidsQuizQuestions.length) {
      setIndex((i) => i + 1);
      setSelected(null);
    } else {
      setFinished(true);
      if (stars === kidsQuizQuestions.length) {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
      }
    }
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setStars(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <Card className="max-w-lg mx-auto text-center gold-border">
        <CardContent className="p-6 sm:p-8">
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: kidsQuizQuestions.length }).map((_, i) => (
              <Star
                key={i}
                className={`w-7 h-7 ${i < stars ? "text-accent fill-accent" : "text-muted-foreground/30"}`}
              />
            ))}
          </div>
          <h3 className="font-display text-2xl font-bold text-primary mb-2">
            You earned {stars} out of {kidsQuizQuestions.length} stars!
          </h3>
          <p className="text-muted-foreground mb-6">
            {stars === kidsQuizQuestions.length
              ? "Amazing! MashaAllah, you know so much!"
              : "Great try! Play again to earn more stars."}
          </p>
          <Button onClick={restart}>
            <RotateCcw className="w-4 h-4 mr-2" /> Play Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1">
          {Array.from({ length: kidsQuizQuestions.length }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < stars ? "text-accent fill-accent" : "text-muted-foreground/30"}`}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {index + 1} / {kidsQuizQuestions.length}
        </span>
      </div>
      <Progress value={((index + 1) / kidsQuizQuestions.length) * 100} className="h-1.5 mb-6" />

      <Card className="gold-border">
        <CardHeader>
          <CardTitle className="text-xl text-center">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((option) => {
            const showState = selected !== null;
            const isThisCorrect = option === question.correctAnswer;
            const isThisSelected = option === selected;
            return (
              <Button
                key={option}
                variant="outline"
                onClick={() => handleSelect(option)}
                className={`w-full justify-between h-auto py-3 px-5 text-base ${
                  showState && isThisCorrect ? "border-primary bg-primary/10 text-primary" : ""
                } ${showState && isThisSelected && !isThisCorrect ? "border-destructive bg-destructive/10 text-destructive" : ""}`}
              >
                {option}
                {showState && isThisCorrect && <CheckCircle2 className="w-5 h-5" />}
                {showState && isThisSelected && !isThisCorrect && <XCircle className="w-5 h-5" />}
              </Button>
            );
          })}

          {selected && (
            <div className="pt-2 space-y-3">
              <p className="text-sm text-center text-accent italic">{question.fact}</p>
              <Button className="w-full" onClick={next}>
                {index + 1 < kidsQuizQuestions.length ? "Next Question" : "See My Stars"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
