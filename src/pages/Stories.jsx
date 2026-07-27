import React, { useState, useEffect } from "react";
import { Article } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookUser, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from "react-markdown";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StoriesPage() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("prophets");

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
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={() => setSelectedArticle(null)}
            className="mb-6"
          >
            ← Back to Stories
          </Button>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-display text-primary">{selectedArticle.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{selectedArticle.content}</ReactMarkdown>
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="prophets">Prophets & Messengers</TabsTrigger>
            <TabsTrigger value="sahaba">The Companions (Sahaba)</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <Card key={i}><CardHeader><Skeleton className="h-6 w-full" /></CardHeader><CardContent><Skeleton className="h-20 w-full" /></CardContent></Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
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
                    {article.content.substring(0, 150)}...
                  </p>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    Read Story <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}