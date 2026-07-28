import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Video,
  Heart,
  Brain,
  UserPlus,
  Scale,
  HelpCircle,
  Sun,
  ArrowRight
} from "lucide-react";

// Deliberately distinct from QuickAccessGrid's items (Qur'an, Hadith, Prayer Times,
// Duas, Qibla, 99 Names, Tasbeeh, Guidance, Stories) and from the "Join Our
// Community" CTA further down this page — this section surfaces sections that
// don't already have a shortcut elsewhere on the home page.
const navigationItems = [
  { title: "Islamic Videos", description: "Watch curated Islamic lectures and documentaries", icon: Video, url: "Videos" },
  { title: "Seerah", description: "Learn from the blessed life of Prophet Muhammad ﷺ", icon: Heart, url: "Seerah" },
  { title: "Test Your Knowledge", description: "Challenge yourself with fun Islamic quizzes", icon: Brain, url: "Quiz" },
  { title: "New Muslims", description: "A gentle starting guide for those new to Islam", icon: UserPlus, url: "NewMuslims" },
  { title: "Fiqh Rulings", description: "Practical rulings for everyday worship and life", icon: Scale, url: "Fiqh" },
  { title: "FAQ", description: "Answers to common questions about Islam and practice", icon: HelpCircle, url: "FAQ" },
];

export default function QuickNavigation() {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-accent/40"></div>
          <Sun className="w-4 h-4 text-accent" />
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-accent/40"></div>
        </div>
        <h2 className="font-display text-3xl font-semibold text-primary mb-2">Explore Islamic Knowledge</h2>
        <p className="text-muted-foreground">Navigate through our comprehensive Islamic resources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {navigationItems.map((item) => (
          <Card
            key={item.title}
            className="relative border-border bg-card glow-shadow hover:glow-gold transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
          >
            <div className="absolute inset-0 geometric-bg opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
            <CardContent className="relative p-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/15 to-primary/10 border border-accent/20 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-accent" />
              </div>

              <h3 className="font-display text-lg font-semibold text-primary mb-2">
                {item.title}
              </h3>

              <p className="text-muted-foreground text-sm mb-4 leading-relaxed font-body">
                {item.description}
              </p>

              <Link to={createPageUrl(item.url)}>
                <Button variant="ghost" className="text-accent hover:bg-accent/10 p-0">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}