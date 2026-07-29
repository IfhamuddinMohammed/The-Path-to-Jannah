import React, { useState, useEffect, useMemo } from "react";
import { NewMuslimResource } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, BookOpen, Users, Star, Languages, ArrowLeft, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

const SUPPORT_STYLES = ["bg-accent/10 text-accent", "bg-primary/10 text-primary", "bg-secondary text-secondary-foreground"];

export default function NewMuslimsPage() {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [contentLanguage, setContentLanguage] = useState("english");
  const [selectedItem, setSelectedItem] = useState(null);
  const isRomanUrdu = contentLanguage === "roman_urdu";

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await NewMuslimResource.list("order");
        setResources(data);
      } catch (error) {
        console.error("Error loading New Muslims resources:", error);
      }
      setIsLoading(false);
    };
    load();
  }, []);

  const bySection = useMemo(() => {
    const sort = (arr) => [...arr].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return {
      essentials: sort(resources.filter((r) => r.section === "essentials")),
      first_steps: sort(resources.filter((r) => r.section === "first_steps")),
      support: sort(resources.filter((r) => r.section === "support")),
    };
  }, [resources]);

  const describe = (item) => (isRomanUrdu && item.description_roman_urdu) || item.description;
  const contentOf = (item) => (isRomanUrdu && item.content_roman_urdu) || item.content;

  if (selectedItem) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
            <Button variant="outline" onClick={() => setSelectedItem(null)}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <LanguagePills value={contentLanguage} onChange={setContentLanguage} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-display text-primary">
                {selectedItem.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{contentOf(selectedItem)}</ReactMarkdown>
              </div>
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
          <Heart className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
            Welcome New Muslims
          </h1>
          <p className="text-xl text-accent mb-2 arabic-font">أهلاً وسهلاً بالمسلمين الجدد</p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            Your guide to understanding and practicing Islam. Take it step by step,
            Allah makes the path easy for those who seek Him.
          </p>
          <div className="flex justify-center">
            <LanguagePills value={contentLanguage} onChange={setContentLanguage} />
          </div>
        </div>

        <Card className="mb-8 bg-secondary border-border">
          <CardContent className="p-6 sm:p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-primary mb-4">
              Assalamu Alaikum - Peace be upon you!
            </h3>
            <p className="text-foreground/80 leading-relaxed max-w-3xl mx-auto">
              Congratulations on your beautiful journey into Islam! Remember that becoming a Muslim
              is like being reborn - all your previous sins are forgiven. Take your time learning,
              ask questions, and know that the Muslim community is here to support you with love and patience.
            </p>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-40 w-full rounded-lg" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {bySection.essentials.map((item) => (
              <Card
                key={item.id}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Star className="w-8 h-8 text-primary" />
                    <Badge variant={item.status === "essential" ? "destructive" : "secondary"}>
                      {item.status === "essential" ? "Essential" : "Important"}
                    </Badge>
                  </div>
                  <CardTitle className="text-primary">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{describe(item)}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Read the full lesson <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                First Steps in Islam
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="space-y-3">
                  {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-lg" />)}
                </div>
              ) : (
                <div className="space-y-3">
                  {bySection.first_steps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg">
                      <div className="w-6 h-6 bg-primary rounded-full text-primary-foreground text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-foreground font-medium">{step.title}</p>
                        {describe(step) && (
                          <p className="text-sm text-muted-foreground mt-0.5">{describe(step)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Support & Community
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-lg" />)
              ) : (
                bySection.support.map((item, index) => (
                  <div key={item.id} className={`p-4 rounded-lg ${SUPPORT_STYLES[index % SUPPORT_STYLES.length]}`}>
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm opacity-90">{describe(item)}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-primary text-primary-foreground">
          <CardContent className="p-6 sm:p-8 text-center">
            <h3 className="font-display text-2xl font-bold mb-4">Remember</h3>
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-primary-foreground/80">
                "And whoever relies upon Allah - then He is sufficient for him.
                Indeed, Allah will accomplish His purpose."
              </p>
              <p className="text-sm italic">- Qur'an 65:3</p>
            </div>
            <div className="mt-6">
              <Button
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                disabled={!bySection.essentials.length}
                onClick={() => setSelectedItem(bySection.essentials[0])}
              >
                Start Your Learning Journey
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LanguagePills({ value, onChange }) {
  return (
    <div className="inline-flex p-1 rounded-full bg-muted border border-border shrink-0">
      <button
        type="button"
        onClick={() => onChange("english")}
        className={cn(
          "px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5",
          value === "english"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Languages className="w-3.5 h-3.5" /> English
      </button>
      <button
        type="button"
        onClick={() => onChange("roman_urdu")}
        className={cn(
          "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
          value === "roman_urdu"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Roman Urdu
      </button>
    </div>
  );
}
