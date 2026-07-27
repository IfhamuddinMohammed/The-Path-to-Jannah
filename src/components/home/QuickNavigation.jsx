import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  BookOpen,
  Video,
  Heart,
  Moon,
  Sun,
  MessageSquare,
  ArrowRight
} from "lucide-react";

const navigationItems = [
  { title: "Holy Qur'an", description: "Read and listen to the complete Qur'an with translations", icon: BookOpen, url: "Quran" },
  { title: "Authentic Hadith", description: "Explore authentic sayings of Prophet Muhammad ﷺ", icon: MessageSquare, url: "Hadith" },
  { title: "Prophets' Stories", description: "Learn from the lives of all Prophets and Messengers", icon: Heart, url: "Stories" },
  { title: "Islamic Guidance", description: "Practical guidance for living according to the Sunnah", icon: Sun, url: "Guidance" },
  { title: "Islamic Videos", description: "Watch curated Islamic lectures and documentaries", icon: Video, url: "Videos" },
  { title: "Daily Duas", description: "Learn essential duas for every aspect of life", icon: Moon, url: "Duas" },
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