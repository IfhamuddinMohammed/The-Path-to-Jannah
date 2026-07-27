import React, { useState, useEffect } from "react";
import { CardContent } from "@/components/ui/card";
import { Sun, Moon, Sunrise, Sunset } from "lucide-react";

export default function IslamicGreeting() {
  const [greeting, setGreeting] = useState("");
  const [icon, setIcon] = useState(Sun);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      setCurrentTime(now);
      const hour = now.getHours();

      if (hour >= 5 && hour < 12) {
        setGreeting("Assalamu Alaikum wa Rahmatullahi wa Barakatuh");
        setIcon(Sunrise);
      } else if (hour >= 12 && hour < 17) {
        setGreeting("May Allah bless your day");
        setIcon(Sun);
      } else if (hour >= 17 && hour < 20) {
        setGreeting("May Allah accept your good deeds today");
        setIcon(Sunset);
      } else {
        setGreeting("May Allah grant you peaceful rest");
        setIcon(Moon);
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  const IconComponent = icon;

  return (
    <div className="relative rounded-2xl overflow-hidden gold-border glow-gold arch-top-lg">
      {/* Background layers */}
      <div className="absolute inset-0 marble-gradient"></div>
      <div className="absolute inset-0 geometric-bg opacity-60"></div>

      {/* Content */}
      <CardContent className="relative p-6 md:p-8 text-center">
        {/* Arch frame ornament */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-accent/40"></div>
          <IconComponent className="w-6 h-6 text-accent" />
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-accent/40"></div>
        </div>

        <h3 className="font-display text-xl md:text-2xl font-semibold text-primary mb-2">
          {greeting}
        </h3>
        <p className="text-sm text-muted-foreground font-body">
          {currentTime.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <p className="text-base text-accent mt-3 arabic-font">
          وعليكم السلام ورحمة الله وبركاته
        </p>
      </CardContent>
    </div>
  );
}