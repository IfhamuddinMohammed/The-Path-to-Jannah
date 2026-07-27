import React, { useState, useEffect } from "react";
import { Quiz } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const data = await Quiz.list('-created_date');
      setQuizzes(data);
    } catch (error) {
      console.error("Error loading quizzes:", error);
    }
  };

  const startQuiz = (category) => {
    const categoryQuizzes = quizzes.filter(q => q.category === category);
    if (categoryQuizzes.length > 0) {
      setCurrentQuiz(categoryQuizzes.slice(0, 10)); // Limit to 10 questions
      setCurrentQuestion(0);
      setScore(0);
      setShowResult(false);
      setQuizCompleted(false);
      setAnswers([]);
      setSelectedAnswer("");
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const submitAnswer = () => {
    const question = currentQuiz[currentQuestion];
    const isCorrect = selectedAnswer === question.correct_answer;
    
    const newAnswer = {
      question: question.question,
      selectedAnswer,
      correctAnswer: question.correct_answer,
      isCorrect,
      explanation: question.explanation
    };
    
    setAnswers([...answers, newAnswer]);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < currentQuiz.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
    setAnswers([]);
  };

  const categories = [
    { id: "quran", name: "Qur'an", color: "bg-primary/10 text-primary border border-primary/20", description: "Test your knowledge of the Holy Qur'an" },
    { id: "hadith", name: "Hadith", color: "bg-accent/10 text-accent border border-accent/20", description: "Prophetic traditions and sayings" },
    { id: "prophets", name: "Prophets", color: "bg-chart-3/10 text-chart-3 border border-chart-3/20", description: "Stories and lessons from the Prophets" },
    { id: "islamic-history", name: "Islamic History", color: "bg-chart-4/10 text-chart-4 border border-chart-4/20", description: "Important events in Islamic history" },
    { id: "fiqh", name: "Fiqh", color: "bg-chart-5/10 text-chart-5 border border-chart-5/20", description: "Islamic jurisprudence and rulings" },
    { id: "general", name: "General", color: "bg-muted text-muted-foreground border border-border", description: "General Islamic knowledge" }
  ];

  if (quizCompleted) {
    const percentage = (score / currentQuiz.length) * 100;
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <Trophy className="w-16 h-16 mx-auto text-accent mb-4" />
            <CardTitle className="text-2xl font-display">Quiz Completed!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <p className="text-4xl font-bold text-primary">{score}/{currentQuiz.length}</p>
              <p className="text-muted-foreground">Correct Answers</p>
              <Progress value={percentage} className="w-full mt-4" />
              <p className="text-lg font-semibold mt-2">{percentage.toFixed(0)}%</p>
            </div>

            <div className="space-y-4">
              {answers.map((answer, index) => (
                <div key={index} className={`p-4 rounded-lg border ${answer.isCorrect ? 'bg-primary/10 border-primary/20' : 'bg-destructive/10 border-destructive/20'}`}>
                  <div className="flex items-start gap-2">
                    {answer.isCorrect ?
                      <CheckCircle className="w-5 h-5 text-primary mt-1" /> :
                      <XCircle className="w-5 h-5 text-destructive mt-1" />
                    }
                    <div className="flex-1">
                      <p className="font-medium">{answer.question}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your answer: {answer.selectedAnswer}
                      </p>
                      {!answer.isCorrect && (
                        <p className="text-sm text-primary mt-1">
                          Correct answer: {answer.correctAnswer}
                        </p>
                      )}
                      {answer.explanation && (
                        <p className="text-sm text-accent mt-2 italic">
                          {answer.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={resetQuiz}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Take Another Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentQuiz) {
    const question = currentQuiz[currentQuestion];
    const progress = ((currentQuestion + 1) / currentQuiz.length) * 100;
    
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <Badge variant="outline">{question.category}</Badge>
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {currentQuiz.length}
              </span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent>
              {!showResult ? (
                <div className="space-y-4">
                  {question.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === option ? "default" : "outline"}
                      onClick={() => handleAnswerSelect(option)}
                      className="w-full text-left justify-start h-auto py-4 px-6"
                    >
                      {option}
                    </Button>
                  ))}

                  <div className="pt-4">
                    <Button
                      onClick={submitAnswer}
                      disabled={!selectedAnswer}
                    >
                      Submit Answer
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${selectedAnswer === question.correct_answer ? 'bg-primary/10 border border-primary/20' : 'bg-destructive/10 border border-destructive/20'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {selectedAnswer === question.correct_answer ?
                        <CheckCircle className="w-5 h-5 text-primary" /> :
                        <XCircle className="w-5 h-5 text-destructive" />
                      }
                      <span className="font-semibold">
                        {selectedAnswer === question.correct_answer ? 'Correct!' : 'Incorrect'}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                      Your answer: {selectedAnswer}
                    </p>

                    {selectedAnswer !== question.correct_answer && (
                      <p className="text-sm text-primary mb-2">
                        Correct answer: {question.correct_answer}
                      </p>
                    )}

                    {question.explanation && (
                      <p className="text-sm text-accent italic">
                        {question.explanation}
                      </p>
                    )}
                  </div>

                  <Button onClick={nextQuestion}>
                    {currentQuestion + 1 < currentQuiz.length ? 'Next Question' : 'View Results'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Brain className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">Islamic Quiz</h1>
          <p className="text-muted-foreground">Test your Islamic knowledge and learn something new</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const categoryQuizzes = quizzes.filter(q => q.category === category.id);
            return (
              <Card
                key={category.id}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => startQuiz(category.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className={category.color}>{category.name}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {categoryQuizzes.length} questions
                    </span>
                  </div>
                  <CardTitle className="text-lg">{category.name} Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                  <Button
                    className="w-full"
                    disabled={categoryQuizzes.length === 0}
                  >
                    {categoryQuizzes.length > 0 ? 'Start Quiz' : 'Coming Soon'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}