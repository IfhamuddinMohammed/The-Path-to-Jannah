import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, BookOpen, Users, Compass, Clock, Star } from "lucide-react";

export default function NewMuslimsPage() {
  const essentials = [
    {
      title: "Shahada - Declaration of Faith",
      description: "Learn the meaning and importance of the Islamic testimony",
      icon: Star,
      status: "essential"
    },
    {
      title: "How to Perform Salah (Prayer)",
      description: "Step-by-step guide to the five daily prayers",
      icon: Clock,
      status: "essential"
    },
    {
      title: "Qibla Direction",
      description: "Finding the direction to face during prayer",
      icon: Compass,
      status: "essential"
    },
    {
      title: "Basic Islamic Beliefs",
      description: "Understanding the six pillars of faith (Iman)",
      icon: BookOpen,
      status: "important"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Heart className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
            Welcome New Muslims
          </h1>
          <p className="text-xl text-accent mb-2 arabic-font">أهلاً وسهلاً بالمسلمين الجدد</p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your guide to understanding and practicing Islam. Take it step by step,
            Allah makes the path easy for those who seek Him.
          </p>
        </div>

        <Card className="mb-8 bg-secondary border-border">
          <CardContent className="p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-primary mb-4">
              Assalamu Alaikum - Peace be upon you!
            </h3>
            <p className="text-foreground/80 leading-relaxed max-w-3xl mx-auto">
              Congratulations on your beautiful journey into Islam! Remember that becoming a Muslim
              is like being reborn - all your previous sins are forgiven. Take your time learning,
              ask questions, and know that the Muslim community is here to support you with love and patience.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {essentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-8 h-8 text-primary" />
                    <Badge variant={item.status === 'essential' ? 'destructive' : 'secondary'}>
                      {item.status === 'essential' ? 'Essential' : 'Important'}
                    </Badge>
                  </div>
                  <CardTitle className="text-primary">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                First Steps in Islam
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                  <div className="w-6 h-6 bg-primary rounded-full text-primary-foreground text-xs flex items-center justify-center font-bold">1</div>
                  <span className="text-foreground">Learn and recite the Shahada</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                  <div className="w-6 h-6 bg-primary rounded-full text-primary-foreground text-xs flex items-center justify-center font-bold">2</div>
                  <span className="text-foreground">Learn basic Arabic prayers</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                  <div className="w-6 h-6 bg-primary rounded-full text-primary-foreground text-xs flex items-center justify-center font-bold">3</div>
                  <span className="text-foreground">Start with 1-2 prayers daily</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                  <div className="w-6 h-6 bg-primary rounded-full text-primary-foreground text-xs flex items-center justify-center font-bold">4</div>
                  <span className="text-foreground">Connect with local Muslim community</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Support & Community
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-accent/10 rounded-lg">
                <h4 className="font-semibold text-accent mb-2">Find Your Local Mosque</h4>
                <p className="text-sm text-foreground/80">
                  Visit your nearest mosque to meet other Muslims and join community prayers.
                </p>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Take It Easy</h4>
                <p className="text-sm text-foreground/80">
                  Islam is easy and meant to bring peace to your life. Don't overwhelm yourself -
                  learn gradually with patience.
                </p>
              </div>

              <div className="p-4 bg-secondary rounded-lg">
                <h4 className="font-semibold text-secondary-foreground mb-2">Ask Questions</h4>
                <p className="text-sm text-secondary-foreground/80">
                  Never hesitate to ask questions. Seeking knowledge is encouraged in Islam.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h3 className="font-display text-2xl font-bold mb-4">Remember</h3>
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-primary-foreground/80">
                "And whoever relies upon Allah - then He is sufficient for him.
                Indeed, Allah will accomplish His purpose."
              </p>
              <p className="text-sm italic">- Qur'an 65:3</p>
            </div>
            <div className="mt-6">
              <Button variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Start Your Learning Journey
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}