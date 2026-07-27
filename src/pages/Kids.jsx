import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Baby, Heart, BookOpen, Music, Gamepad2, Users } from "lucide-react";

export default function KidsPage() {
  const features = [
    {
      icon: BookOpen,
      title: "Islamic Stories",
      description: "Fun and engaging stories from the Quran and Prophets",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: Music,
      title: "Islamic Nasheeds",
      description: "Beautiful songs and nasheeds for children",
      color: "bg-accent/10 text-accent"
    },
    {
      icon: Gamepad2,
      title: "Learning Games",
      description: "Interactive games to learn Arabic letters and Islamic basics",
      color: "bg-[hsl(var(--chart-3)/0.12)] text-[hsl(var(--chart-3))]"
    },
    {
      icon: Heart,
      title: "Good Manners",
      description: "Teaching Islamic etiquette and good behavior",
      color: "bg-[hsl(var(--chart-4)/0.15)] text-[hsl(var(--chart-4))]"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Baby className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">Kids Corner</h1>
          <p className="text-accent mb-2 arabic-font text-xl">ركن الأطفال</p>
          <p className="text-muted-foreground">Fun Islamic learning for young Muslims</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-primary/20">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-secondary border-border">
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="font-display text-2xl font-bold text-primary mb-4">Parents & Teachers</h3>
            <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
              We're building a comprehensive Islamic learning platform for children.
              This section will include interactive stories, games, and activities to make
              learning about Islam fun and engaging for young minds.
            </p>
            <p className="text-primary font-medium">
              May Allah bless our children with strong faith and good character. Ameen.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}