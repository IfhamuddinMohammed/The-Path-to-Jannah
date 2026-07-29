import React, { useState, useEffect } from "react";
import { Article } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookUser, ArrowRight, Languages } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from "react-markdown";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function StoriesPage() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("prophets");
  const [contentLanguage, setContentLanguage] = useState("english");
  const isRomanUrdu = contentLanguage === "roman_urdu";

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      try {
        const data = await Article.filter({ category: activeTab }, '-created_date', 50);
        setArticles(data);
      } catch (error) {
        console.error("Error loading stories:", error);
      }
      setIsLoading(false);
    };

    loadArticles();
  }, [activeTab]);

  if (selectedArticle) {
    const detailContent =
      (isRomanUrdu && selectedArticle.content_roman_urdu) || selectedArticle.content;
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
            <Button variant="outline" onClick={() => setSelectedArticle(null)}>
              ← Back to Stories
            </Button>
            <LanguagePills value={contentLanguage} onChange={setContentLanguage} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-display text-primary">{selectedArticle.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{detailContent}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <BookUser className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
            Stories of Inspiration
          </h1>
          <p className="text-muted-foreground">
            Learn from the lives of the Prophets and the Companions (RA).
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="grid w-full sm:w-auto grid-cols-2 h-auto">
              <TabsTrigger value="prophets" className="text-xs sm:text-sm whitespace-normal py-2">
                Prophets & Messengers
              </TabsTrigger>
              <TabsTrigger value="sahaba" className="text-xs sm:text-sm whitespace-normal py-2">
                The Companions (Sahaba)
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <LanguagePills value={contentLanguage} onChange={setContentLanguage} />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <Card key={i}><CardHeader><Skeleton className="h-6 w-full" /></CardHeader><CardContent><Skeleton className="h-20 w-full" /></CardContent></Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => {
              const previewContent = (isRomanUrdu && article.content_roman_urdu) || article.content;
              return (
                <Card
                  key={article.id}
                  className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {previewContent.substring(0, 150)}...
                    </p>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      Read Story <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
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