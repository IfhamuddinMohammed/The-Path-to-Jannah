import React, { useState, useEffect } from "react";
import { AsmaulHusna } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star, Search, Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function NamesPage() {
  const [names, setNames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNames = async () => {
      setIsLoading(true);
      try {
        const data = await AsmaulHusna.list('position');
        setNames(data);
      } catch (error) {
        console.error("Error loading names:", error);
      }
      setIsLoading(false);
    };
    loadNames();
  }, []);

  const filteredNames = names.filter(name =>
    name.name_english.toLowerCase().includes(searchQuery.toLowerCase()) ||
    name.name_arabic.includes(searchQuery) ||
    name.meaning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-accent/40"></div>
            <Star className="w-12 h-12 text-accent" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-accent/40"></div>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-2">99 Names of Allah</h1>
          <p className="text-2xl text-accent mb-2 arabic-font">أسماء الله الحسنى</p>
          <p className="text-muted-foreground font-body">Discover the beautiful names and attributes of Allah (SWT)</p>
        </div>

        <Card className="mb-8 bg-card border-border glow-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, meaning, or Arabic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(9).fill(0).map((_, i) => (
              <Card key={i} className="glow-shadow">
                <CardHeader>
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNames.map((name) => (
              <Card key={name.id} className="relative bg-card border-border glow-shadow hover:glow-gold transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                {/* Gold top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent"></div>
                <div className="absolute inset-0 geometric-bg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>

                <CardHeader className="relative">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                      {name.position}
                    </Badge>
                    <Heart className="w-4 h-4 text-muted-foreground hover:text-destructive cursor-pointer transition-colors" />
                  </div>
                  <CardTitle className="text-center">
                    <div className="text-3xl arabic-font text-accent mb-2 mt-2">
                      {name.name_arabic}
                    </div>
                    <div className="font-display text-xl text-primary">
                      {name.name_english}
                    </div>
                    <div className="text-sm text-muted-foreground font-body font-normal italic">
                      {name.transliteration}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-primary mb-1 font-body">Meaning:</p>
                      <p className="text-sm text-muted-foreground font-body">{name.meaning}</p>
                    </div>

                    {name.explanation && (
                      <div>
                        <p className="text-sm font-semibold text-primary mb-1 font-body">Explanation:</p>
                        <p className="text-sm text-muted-foreground leading-relaxed font-body">{name.explanation}</p>
                      </div>
                    )}

                    {name.benefits && (
                      <div className="p-3 bg-accent/8 rounded-lg gold-border">
                        <p className="text-sm font-semibold text-accent mb-1 font-body">Benefits:</p>
                        <p className="text-xs text-muted-foreground font-body">{name.benefits}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredNames.length === 0 && !isLoading && (
          <Card className="bg-card border-border glow-shadow">
            <CardContent className="p-12 text-center">
              <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-display text-xl font-medium text-primary mb-2">No Names Found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}