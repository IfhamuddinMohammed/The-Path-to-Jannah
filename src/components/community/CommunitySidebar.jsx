import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Scale, ShieldQuestion, ChevronRight, Heart, MessageSquare } from "lucide-react";
import { createPageUrl } from "@/utils";
import { communityStats, dailyReflectionPrompt } from "@/data/communityData";

export default function CommunitySidebar() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-accent/8 to-primary/8 border-border glow-shadow gold-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display text-primary text-base">
            <Sparkles className="w-4 h-4 text-accent" />
            Daily Reflection Prompt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/90 leading-relaxed">{dailyReflectionPrompt}</p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border glow-shadow">
        <CardHeader>
          <CardTitle className="font-display text-primary text-base">Community Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="w-4 h-4 text-accent" />
              Duas made today
            </div>
            <span className="text-sm font-semibold text-primary">{communityStats.duasToday}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageSquare className="w-4 h-4 text-accent" />
              Active discussions
            </div>
            <span className="text-sm font-semibold text-primary">{communityStats.activeDiscussions}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border glow-shadow">
        <CardHeader>
          <CardTitle className="font-display text-primary text-base">Need Official Guidance?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <Link
            to={createPageUrl("Fiqh")}
            className="flex items-center justify-between px-2 py-2 rounded-lg text-sm text-foreground hover:bg-accent/10 hover:text-accent transition-colors"
          >
            <span className="flex items-center gap-2">
              <Scale className="w-4 h-4" />
              Fiqh Rulings
            </span>
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            to={createPageUrl("FAQ")}
            className="flex items-center justify-between px-2 py-2 rounded-lg text-sm text-foreground hover:bg-accent/10 hover:text-accent transition-colors"
          >
            <span className="flex items-center gap-2">
              <ShieldQuestion className="w-4 h-4" />
              FAQ
            </span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
