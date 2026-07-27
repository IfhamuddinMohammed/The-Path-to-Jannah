import React from "react";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DailyQuote({ quote, isLoading }) {
  if (isLoading) {
    return (
      <div className="relative rounded-2xl gold-border glow-shadow overflow-hidden">
        <div className="absolute inset-0 marble-gradient"></div>
        <CardContent className="relative p-8 text-center">
          <Skeleton className="w-10 h-10 mx-auto mb-4 rounded-full" />
          <Skeleton className="h-6 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-4 w-1/2 mx-auto mb-2" />
          <Skeleton className="h-4 w-1/3 mx-auto" />
        </CardContent>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="relative rounded-2xl gold-border glow-shadow overflow-hidden">
        <div className="absolute inset-0 marble-gradient"></div>
        <div className="absolute inset-0 geometric-bg opacity-40"></div>
        <CardContent className="relative p-8 text-center">
          <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center">
            <Star className="w-8 h-8 text-accent" />
          </div>
          <h3 className="font-display text-xl font-semibold text-primary mb-4">Daily Inspiration</h3>
          <p className="text-base text-muted-foreground mb-4 italic font-body leading-relaxed">
            "And whoever relies upon Allah - then He is sufficient for him.
            Indeed, Allah will accomplish His purpose."
          </p>
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
            Qur'an 65:3
          </Badge>
        </CardContent>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl gold-border glow-gold overflow-hidden">
      <div className="absolute inset-0 marble-gradient"></div>
      <div className="absolute inset-0 geometric-bg opacity-40"></div>
      <CardContent className="relative p-8 text-center">
        {/* Gold ornament divider */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-accent/40"></div>
          <Star className="w-5 h-5 text-accent" />
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-accent/40"></div>
        </div>

        <h3 className="font-display text-xl font-semibold text-primary mb-4">Daily Inspiration</h3>

        {quote.arabic_text && (
          <p className="text-lg text-primary mb-4 arabic-font leading-loose">
            {quote.arabic_text}
          </p>
        )}

        <p className="text-base text-muted-foreground mb-4 italic font-body leading-relaxed">
          "{quote.text}"
        </p>

        <div className="flex justify-center gap-2">
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
            {quote.source}
          </Badge>
          {quote.reference && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {quote.reference}
            </Badge>
          )}
        </div>
      </CardContent>
    </div>
  );
}