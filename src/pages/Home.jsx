import React, { useState, useEffect, Suspense, lazy } from "react";
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
  ArrowRight,
  ChevronDown } from
"lucide-react";

import DailyQuote from "../components/home/DailyQuote";
import QuickNavigation from "../components/home/QuickNavigation";
import FeaturedContent from "../components/home/FeaturedContent";
import IslamicGreeting from "../components/home/IslamicGreeting";

const HeroCanvas = lazy(() => import("../components/home/HeroCanvas"));

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

        {/* Immersive 3D scene — geometric star, crescent moon, starfield */}
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>

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

            <p className="text-base md:text-lg text-[hsl(40_30%_94%)] mb-8 max-w-2xl mx-auto leading-relaxed font-body" style={{ textShadow: "0 2px 18px hsl(215 48% 4% / 0.85), 0 1px 3px hsl(215 48% 4% / 0.9)" }}>
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

        {/* Scroll cue */}
        <button
          type="button"
          onClick={() =>
            document.getElementById("home-content")?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label="Scroll down to explore"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[hsl(40_30%_92%)]/70 hover:text-accent transition-colors animate-bounce"
        >
          <span className="text-xs tracking-wide">Explore</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      <div id="home-content" className="px-6 py-12">
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