import React, { useState, useEffect } from "react";
import { Dua } from "@/entities/all";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Moon, BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function DuasPage() {
  const [duas, setDuas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDuas = async () => {
      setIsLoading(true);
      try {
        const data = await Dua.list('-created_date');
        setDuas(data);
      } catch (error) {
        console.error("Error loading duas:", error);
      }
      setIsLoading(false);
    };
    loadDuas();
  }, []);

  const groupedDuas = duas.reduce((acc, dua) => {
    const category = dua.category || 'general';
    if (!acc[category]) acc[category] = [];
    acc[category].push(dua);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Moon className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">Daily Duas</h1>
          <p className="text-muted-foreground">Essential supplications for every part of your day.</p>
        </div>

        {isLoading ? <Skeleton className="h-64 w-full" /> :
        <Card>
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {Object.entries(groupedDuas).map(([category, duaList]) => (
                <AccordionItem key={category} value={category}>
                  <AccordionTrigger className="capitalize text-lg font-bold text-primary">{category}</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    {duaList.map(dua => (
                      <div key={dua.id} className="p-4 border rounded-lg">
                        <h4 className="font-bold text-primary mb-2">{dua.title}</h4>
                        <p className="text-lg arabic-font text-right leading-loose mb-3">{dua.arabic_text}</p>
                        <p className="text-sm italic text-muted-foreground mb-2">{dua.transliteration}</p>
                        <p className="text-foreground leading-relaxed mb-3">"{dua.translation}"</p>
                        {dua.hadith_reference && <Badge variant="outline"><BookOpen className="w-3 h-3 mr-1" />{dua.hadith_reference}</Badge>}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
        }
      </div>
    </div>
  );
}