import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, Clock, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { parseServerDate } from "@/lib/serverDate";

export default function FeaturedContent({ articles, isLoading }) {
  if (isLoading) {
    return (
      <div>
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-semibold text-primary mb-2">Featured Articles</h2>
          <p className="text-muted-foreground">Discover our most popular Islamic guidance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(3).fill(0).map((_, i) => (
            <Card key={i} className="border-border glow-shadow">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-accent/40"></div>
          <Clock className="w-4 h-4 text-accent" />
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-accent/40"></div>
        </div>
        <h2 className="font-display text-3xl font-semibold text-primary mb-2">Featured Articles</h2>
        <p className="text-muted-foreground">Discover our most popular Islamic guidance</p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No featured articles available at the moment.</p>
          <Link to={createPageUrl("Guidance")}>
            <Button className="mt-4 bg-primary hover:bg-primary/90">
              Browse All Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="border-border bg-card glow-shadow hover:glow-gold transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
              {article.image_url && (
                <div className="aspect-video bg-gradient-to-br from-accent/10 to-primary/10 overflow-hidden">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <CardHeader>
                <div className="flex gap-2 mb-2 flex-wrap">
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                    {article.category}
                  </Badge>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    <Clock className="w-3 h-3 mr-1" />
                    {format(parseServerDate(article.created_date), "MMM d")}
                  </Badge>
                </div>

                <CardTitle className="font-display text-lg text-primary leading-tight">
                  {article.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3 font-body">
                  {article.content.substring(0, 120)}...
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="w-3 h-3" />
                    <span>{article.created_by || 'Admin'}</span>
                  </div>

                  <Link to={createPageUrl("Guidance")}>
                    <Button variant="ghost" size="sm" className="text-accent hover:bg-accent/10">
                      Read More
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}