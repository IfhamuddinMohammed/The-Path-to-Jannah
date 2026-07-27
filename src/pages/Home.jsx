import React, { useState, useEffect } from "react";
import { Quote, Article } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  BookOpen,
  Heart,
  Users,
  Sparkles,
  Moon,
  ArrowRight } from
"lucide-react";

import DailyQuote from "../components/home/DailyQuote";
import QuickNavigation from "../components/home/QuickNavigation";
import FeaturedContent from "../components/home/FeaturedContent";
import IslamicGreeting from "../components/home/IslamicGreeting";

// Pre-computed star positions for the night-sky hero
const stars = [
  { top: "8%", left: "12%", size: 2, delay: "0s" },
  { top: "15%", left: "85%", size: 1.5, delay: "0.5s" },
  { top: "22%", left: "45%", size: 2.5, delay: "1s" },
  { top: "30%", left: "70%", size: 1, delay: "1.5s" },
  { top: "35%", left: "20%", size: 1.5, delay: "2s" },
  { top: "42%", left: "92%", size: 2, delay: "0.3s" },
  { top: "50%", left: "8%", size: 1, delay: "1.2s" },
  { top: "55%", left: "55%", size: 1.5, delay: "0.8s" },
  { top: "60%", left: "80%", size: 1, delay: "2.5s" },
  { top: "68%", left: "30%", size: 2, delay: "0.6s" },
  { top: "72%", left: "65%", size: 1.5, delay: "1.8s" },
  { top: "78%", left: "15%", size: 1, delay: "0.2s" },
  { top: "82%", left: "50%", size: 2, delay: "1.4s" },
  { top: "88%", left: "88%", size: 1.5, delay: "2.2s" },
  { top: "18%", left: "28%", size: 1, delay: "1.6s" },
  { top: "25%", left: "60%", size: 1.5, delay: "0.9s" },
];

export default function HomePage() {
  const [dailyQuote, setDailyQuote] = useState(null);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHomeContent();
  }, []);

  const loadHomeContent = async () => {
    setIsLoading(true);
    try {
      const quotes = await Quote.filter({ featured: true }, '-created_date', 1);
      const articles = await Article.filter({ featured: true }, '-created_date', 3);

      setDailyQuote(quotes[0] || null);
      setFeaturedArticles(articles);
    } catch (error) {
      console.error("Error loading home content:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section — Night Sky with stars and crescent */}
      <div className="relative night-sky overflow-hidden">
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 geometric-bg opacity-40"></div>

        {/* Glowing stars */}
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-accent/80 animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              boxShadow: `0 0 ${star.size * 3}px hsl(38 50% 60% / 0.6)`,
            }}
          />
        ))}

        {/* Crescent moon — top right */}
        <div className="absolute top-8 right-8 md:top-12 md:right-16 animate-float-slow">
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <div className="absolute inset-0 rounded-full bg-accent/10 blur-2xl animate-glow-pulse"></div>
            <svg viewBox="0 0 80 80" className="relative w-full h-full">
              <defs>
                <radialGradient id="crescentGrad" cx="40%" cy="35%">
                  <stop offset="0%" stopColor="hsl(38 55% 72%)" />
                  <stop offset="100%" stopColor="hsl(38 44% 48%)" />
                </radialGradient>
              </defs>
              <path
                d="M48 8 A32 32 0 1 0 48 72 A26 26 0 1 1 48 8"
                fill="url(#crescentGrad)"
                style={{ filter: "drop-shadow(0 0 12px hsl(38 50% 55% / 0.4))" }}
              />
            </svg>
          </div>
        </div>

        {/* Soft glow at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/30 to-transparent"></div>

        {/* Hero Content */}
        <div className="relative px-6 py-16 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              {/* Gold ornament divider */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent/50"></div>
                <Sparkles className="w-5 h-5 text-accent" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent/50"></div>
              </div>

              <h1 className="font-display text-4xl md:text-6xl font-semibold mb-4 leading-tight text-accent" style={{ textShadow: "0 0 40px hsl(38 50% 55% / 0.15)" }}>
                The Path to Jannah
              </h1>
              <p className="text-2xl md:text-3xl text-accent/80 mb-2 arabic-font">
                طريق الإسلام
              </p>
            </div>

            <p className="text-base md:text-lg text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed font-body">
              Guidance towards the right path, inspired by the Qur'an and Sunnah.
              Discover authentic Islamic knowledge with love and wisdom.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Quran")}>
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto glow-gold">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Read Qur'an
                </Button>
              </Link>
              <Link to={createPageUrl("Guidance")}>
                <Button size="lg" variant="outline" className="bg-transparent border-accent/40 text-accent hover:bg-accent/10 w-full sm:w-auto">
                  <Moon className="w-5 h-5 mr-2" />
                  Islamic Guidance
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Greeting */}
          <IslamicGreeting />

          {/* Daily Quote */}
          <DailyQuote quote={dailyQuote} isLoading={isLoading} />

          {/* Quick Navigation */}
          <QuickNavigation />

          {/* Featured Content */}
          <FeaturedContent articles={featuredArticles} isLoading={isLoading} />

          {/* Call to Action */}
          <div className="relative bg-gradient-to-br from-accent/8 to-primary/8 rounded-2xl p-8 md:p-12 text-center gold-border glow-gold overflow-hidden">
            <div className="absolute inset-0 geometric-bg opacity-50"></div>
            <div className="relative">
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center glow-gold">
                <Heart className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-4">
                Join Our Community
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                Connect with fellow Muslims, ask questions, share knowledge, and support each other
                on the beautiful journey of Islam.
              </p>
              <Link to={createPageUrl("Community")}>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Users className="w-5 h-5 mr-2" />
                  Join Community
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}