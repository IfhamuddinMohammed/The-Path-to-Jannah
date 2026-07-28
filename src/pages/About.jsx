import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoonStar, Heart, MessageCircle } from "lucide-react";
import AmeenCounter from "@/components/about/AmeenCounter";

const PILLARS = [
  {
    emoji: "🌟",
    title: "Authenticity",
    description:
      "Every piece of content is meticulously compiled from verified sources: Qur'an with authentic Tafsir & word-by-word meanings, verified Hadith from Sahih al-Bukhari, Sahih Muslim, and major collections, and Seerah sourced from established classical biographies.",
  },
  {
    emoji: "🤝",
    title: "Unity & Peace",
    description:
      "Inspiring humanity to learn from one another, grow together in character, and walk the straight path — with sincerity, humility, and love for the Deen.",
  },
  {
    emoji: "🕊️",
    title: "Free & Accessible Forever",
    description:
      "No paywalls on learning Islam. This platform will always remain free, so that anyone, anywhere can access the Qur'an, Hadith, and guidance without barriers.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Hero */}
        <Card className="bg-card border-border glow-shadow overflow-hidden">
          <CardContent className="p-6 sm:p-10 text-center relative geometric-bg">
            <MoonStar className="w-12 h-12 mx-auto text-accent mb-4" />
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary mb-2">
              SIRAT
            </h1>
            <p className="text-2xl text-accent arabic-font mb-4">صراط</p>
            <p className="text-foreground/90 max-w-xl mx-auto leading-relaxed">
              "Guiding hearts toward the beauty, clarity, and peace of Islam."
            </p>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed mt-4 text-sm">
              We built this platform to showcase the true, authentic beauty of Islam to the
              world — a humble effort to help humanity learn from one another, grow in faith, and
              walk the straight path so that we may stand hopeful and purified before Allah ﷻ on
              the Day of Judgment. Ameen.
            </p>
          </CardContent>
        </Card>

        {/* Dedication */}
        <Card className="bg-gradient-to-br from-accent/8 to-primary/5 gold-border glow-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-primary">
              <Heart className="w-5 h-5 text-accent" />
              Dedication &amp; Inspiration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This project is lovingly dedicated to my beloved grandfather:
            </p>
            <div className="text-center py-2">
              <p className="font-display text-xl font-semibold text-primary">
                Haji Mohammed Abdul Hameed
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Passed away in Holy Ramzan, 1443 AH / 2022
              </p>
            </div>
            <p className="text-foreground/90 leading-relaxed text-sm">
              He was an extraordinary mentor, an inspiring man, and the pillar of Islam in our
              lives. His steadfast belief, unwavering love for the Deen, and gentle character
              showed everyone around him what it truly means to live as a sincere Muslim.
            </p>
            <p className="text-foreground/90 leading-relaxed text-sm">
              Though he has returned to Allah, his teachings live on through this platform. We
              pray that every Ayah read, every Dua recited, and every lesson learned on this app
              serves as a continuous light (Sadaqah Jariyah) for his soul.
            </p>

            <div className="p-4 rounded-lg bg-card border border-accent/20">
              <p className="text-base text-accent arabic-font text-right leading-loose mb-2">
                اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ
              </p>
              <p className="text-sm text-foreground/90 italic mb-4">
                "May Allah forgive him, elevate his status among the guided, expand his grave,
                fill it with light, and grant him the highest level of Jannat al-Firdaus." — Ameen.
              </p>
              <AmeenCounter initialCount={213} />
            </div>

            <p className="text-xs text-muted-foreground text-right">
              Built with sincerity by Mohammed Ifham Uddin.
            </p>
          </CardContent>
        </Card>

        {/* Core Pillars */}
        <div>
          <h2 className="font-display text-xl font-semibold text-primary text-center mb-4">
            Our Core Pillars
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {PILLARS.map((pillar) => (
              <Card key={pillar.title} className="bg-card border-border glow-shadow hover:glow-gold transition-shadow">
                <CardContent className="p-5 text-center space-y-2">
                  <div className="text-3xl">{pillar.emoji}</div>
                  <h3 className="font-display font-semibold text-primary">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact / Feedback */}
        <Card className="bg-secondary border-border">
          <CardContent className="p-6 text-center">
            <MessageCircle className="w-6 h-6 mx-auto text-primary mb-2" />
            <p className="text-sm text-foreground/90 mb-1">
              Found a typo, or have a suggestion to improve this platform?
            </p>
            {/* TODO: replace with the real support/feedback email */}
            <a
              href="mailto:feedback@example.com"
              className="text-sm font-medium text-primary hover:text-accent underline underline-offset-4"
            >
              Send Feedback
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
