import React, { useState, useEffect, Suspense, lazy } from "react";
import { Quote, Article } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  BookOpen,
  Heart,
  Users,
  MoonStar,
  Moon,
  ArrowRight,
  ChevronDown } from
"lucide-react";

import DailyQuote from "../components/home/DailyQuote";
import QuickNavigation from "../components/home/QuickNavigation";
import QuickAccessGrid from "../components/home/QuickAccessGrid";
import FeaturedContent from "../components/home/FeaturedContent";
import IslamicGreeting from "../components/home/IslamicGreeting";
import NextPrayerWidget from "../components/home/NextPrayerWidget";

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
        <div className="relative px-6 pt-10 pb-20 md:pt-28 md:pb-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4 md:mb-6">
              {/* Gold ornament divider */}
              <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent/50"></div>
                <MoonStar className="w-5 h-5 text-accent" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent/50"></div>
              </div>

              <h1 className="font-display text-2xl md:text-4xl font-semibold mb-2 leading-tight text-accent" style={{ textShadow: "0 0 40px hsl(38 50% 55% / 0.15)" }}>
                SIRAT
              </h1>
              <p
                className="text-xs md:text-sm uppercase tracking-widest font-semibold text-accent/90 mb-5"
                style={{ textShadow: "0 2px 14px hsl(215 48% 4% / 0.7)" }}
              >
                Path to Jannah
              </p>

              <p
                dir="rtl"
                className="arabic-font text-4xl md:text-6xl text-accent leading-loose"
                style={{ textShadow: "0 2px 24px hsl(215 48% 4% / 0.6)" }}
              >
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </p>
            </div>

            <p className="text-sm md:text-lg text-[hsl(40_30%_94%)] mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed font-body" style={{ textShadow: "0 2px 18px hsl(215 48% 4% / 0.85), 0 1px 3px hsl(215 48% 4% / 0.9)" }}>
              Walk the straight path towards Jannah with authentic Qur'an, daily prayer times,
              verified Hadith, and the life of our beloved Prophet ﷺ.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link to={createPageUrl("Quran")}>
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto glow-gold">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Read Qur'an
                </Button>
              </Link>
              <Link to={createPageUrl("Guidance")}>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-accent/10 backdrop-blur-md border border-accent/30 text-accent hover:bg-accent/20 hover:border-accent/50 active:bg-accent/25 shadow-sm w-full sm:w-auto transition-colors"
                >
                  <Moon className="w-5 h-5 mr-2" />
                  Daily Guidance
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none">
          <button
            type="button"
            onClick={() =>
              document.getElementById("home-content")?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label="Scroll down to explore"
            className="pointer-events-auto flex flex-col items-center gap-1 p-0 border-0 bg-transparent text-[hsl(40_30%_92%)]/70 hover:text-accent transition-colors animate-bounce"
          >
            <span className="text-xs leading-none">Explore</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div id="home-content" className="px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Quick Access */}
          <QuickAccessGrid />

          {/* Next Prayer */}
          <NextPrayerWidget />

          {/* Greeting */}
          <IslamicGreeting />

          {/* Daily Quote */}
          <DailyQuote quote={dailyQuote} isLoading={isLoading} />

          {/* Quick Navigation */}
          <div id="explore-section">
            <QuickNavigation />
          </div>

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