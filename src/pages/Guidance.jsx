
import React, { useState, useEffect } from "react";
import { Article } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Sun, ArrowRight, Clock, User, BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";

export default function GuidancePage() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      try {
        const filters = selectedCategory === "all" ? {} : { category: selectedCategory };
        const data = await Article.filter(filters, '-created_date', 50);
        setArticles(data);
      } catch (error) {
        console.error("Error loading articles:", error);
      }
      setIsLoading(false);
    };

    loadArticles();
  }, [selectedCategory]);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "guidance", label: "General Guidance" },
    { value: "akhlaq", label: "Good Character (Akhlaq)" },
    { value: "repentance", label: "Repentance & Forgiveness" },
    { value: "respect", label: "Respect & Relationships" },
    { value: "family-parenting", label: "Family & Parenting" },
    { value: "youth-corner", label: "Youth Corner" },
    { value: "self-development", label: "Self-Development" },
    { value: "sunnah-habits", label: "Daily Sunnah Habits" },
    { value: "charity", label: "Charity & Community" },
    { value: "consequences", label: "Consequences of Sins" },
    { value: "rewards", label: "Rewards & Paradise" },
  ];

  const getCategoryColor = (category) => {
    // Coordinated theme palette for category badges — each hue is pulled from
    // the design tokens (primary/accent/destructive/chart-3/chart-4) so distinct
    // topic areas stay visually distinguishable without clashing raw Tailwind colors.
    const colors = {
      guidance: "bg-primary/15 text-primary",
      akhlaq: "bg-accent/15 text-accent",
      repentance: "bg-[hsl(var(--chart-3)/0.15)] text-[hsl(var(--chart-3))]",
      prophets: "bg-[hsl(var(--chart-4)/0.15)] text-[hsl(var(--chart-4))]", // Kept for potential older articles or broader use
      morals: "bg-muted text-muted-foreground",     // Kept for potential older articles or broader use
      consequences: "bg-destructive/15 text-destructive",
      rewards: "bg-accent/15 text-accent",
      respect: "bg-[hsl(var(--chart-4)/0.15)] text-[hsl(var(--chart-4))]",
      "family-parenting": "bg-[hsl(var(--chart-3)/0.15)] text-[hsl(var(--chart-3))]",
      "youth-corner": "bg-primary/15 text-primary",
      "self-development": "bg-primary/15 text-primary",
      "sunnah-habits": "bg-accent/15 text-accent",
      charity: "bg-[hsl(var(--chart-4)/0.15)] text-[hsl(var(--chart-4))]",
      "daily-life": "bg-muted text-muted-foreground", // Kept for potential older articles or broader use
      sunnah: "bg-[hsl(var(--chart-3)/0.15)] text-[hsl(var(--chart-3))]", // Kept for potential older articles or broader use
      sahaba: "bg-muted text-muted-foreground"
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={() => setSelectedArticle(null)}
            className="mb-6"
          >
            ← Back to Articles
          </Button>

          <Card className="border-border glow-shadow">
            <CardHeader className="pb-6">
              <div className="flex gap-2 mb-4">
                <Badge className={getCategoryColor(selectedArticle.category)}>
                  {selectedArticle.category.replace('-', ' ')}
                </Badge>
                <Badge variant="outline">
                  <Clock className="w-3 h-3 mr-1" />
                  {format(new Date(selectedArticle.created_date), "MMM d, yyyy")}
                </Badge>
              </div>

              <CardTitle className="text-2xl md:text-3xl font-display text-primary leading-tight">
                {selectedArticle.title}
              </CardTitle>

              {selectedArticle.arabic_text && (
                <div className="mt-4 p-4 bg-secondary rounded-lg">
                  <p className="text-lg text-accent arabic-font text-right leading-relaxed">
                    {selectedArticle.arabic_text}
                  </p>
                </div>
              )}
            </CardHeader>

            <CardContent>
              <div className="prose max-w-none">
                <ReactMarkdown>{selectedArticle.content}</ReactMarkdown>
              </div>

              {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="text-sm font-medium text-foreground mb-3">Related Topics:</h4>
                  <div className="flex gap-2 flex-wrap">
                    {selectedArticle.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Sun className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
            Islamic Guidance
          </h1>
          <p className="text-xl text-accent mb-2 arabic-font">الهداية الإسلامية</p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Authentic Islamic guidance for living according to the Qur'an and Sunnah.
            Learn how to walk the path of righteousness with wisdom and compassion.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-border glow-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Articles Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex gap-2 mb-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium text-foreground mb-2">No Articles Found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try adjusting your search terms" : "No articles available in this category"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                className="border-border glow-shadow hover:glow-gold transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                {article.image_url && (
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <CardHeader>
                  <div className="flex gap-2 mb-3">
                    <Badge className={getCategoryColor(article.category)}>
                      {article.category.replace('-', ' ')}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {format(new Date(article.created_date), "MMM d")}
                    </Badge>
                  </div>

                  <CardTitle className="text-lg font-display text-primary leading-tight hover:text-primary/80">
                    {article.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {article.content.substring(0, 150)}...
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span>{article.created_by || 'Admin'}</span>
                    </div>

                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      Read More
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
