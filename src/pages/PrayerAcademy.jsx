import React, { useState, useEffect, useMemo } from "react";
import { PrayerLesson, WuduStep } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  GraduationCap,
  Droplets,
  Compass,
  Clock,
  ArrowLeft,
  ArrowRight,
  Languages,
  BookOpenCheck,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import WuduTutorial from "@/components/prayer/WuduTutorial";
import { usePrayerPreferences, MADHABS } from "@/hooks/usePrayerPreferences";
import { cn } from "@/lib/utils";
import { SEED_LESSONS, SEED_WUDU_STEPS } from "@/data/prayerAcademySeed";

const SECTION_GROUPS = [
  {
    key: "foundations",
    label: "Foundations",
    icon: BookOpenCheck,
    sections: ["why_we_pray", "importance", "who_must_pray", "conditions"],
  },
  {
    key: "purification",
    label: "Purification",
    icon: Droplets,
    sections: ["purity", "wudu_overview", "tayammum"],
  },
  {
    key: "before_you_pray",
    label: "Before You Pray",
    icon: Compass,
    sections: ["awrah", "facing_qibla"],
  },
  {
    key: "timing",
    label: "Timing & Calling to Prayer",
    icon: Clock,
    sections: ["prayer_times", "adhan", "iqamah"],
  },
];

export default function PrayerAcademyPage() {
  const [lessons, setLessons] = useState([]);
  const [wuduSteps, setWuduSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showWuduTutorial, setShowWuduTutorial] = useState(false);
  const { settings, updateSettings } = usePrayerPreferences();
  const isRomanUrdu = settings.contentLanguage === "roman_urdu";

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        let [lessonData, wuduData] = await Promise.all([
          PrayerLesson.list("order"),
          WuduStep.list("order"),
        ]);

        // First-ever load (for any user): seed the starter curriculum once, so every future
        // visitor — on any device — sees the same content without a manual seeding step.
        // Mirrors the seed-once-for-everyone pattern already used by useRomanUrdu.js.
        if (lessonData.length === 0) {
          try {
            await PrayerLesson.bulkCreate(SEED_LESSONS);
            lessonData = await PrayerLesson.list("order");
          } catch (seedError) {
            console.error("Error seeding Prayer Lessons:", seedError);
          }
        }
        if (wuduData.length === 0) {
          try {
            await WuduStep.bulkCreate(SEED_WUDU_STEPS);
            wuduData = await WuduStep.list("order");
          } catch (seedError) {
            console.error("Error seeding Wudu Steps:", seedError);
          }
        }

        setLessons(lessonData);
        setWuduSteps(wuduData);
      } catch (error) {
        console.error("Error loading Prayer Academy content:", error);
      }
      setIsLoading(false);
    };
    load();
  }, []);

  const groupedSections = useMemo(() => {
    return SECTION_GROUPS.map((group) => ({
      ...group,
      lessons: group.sections
        .flatMap((section) => lessons.filter((l) => l.section === section))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    })).filter((group) => group.lessons.length > 0);
  }, [lessons]);

  const describe = (item) => (isRomanUrdu && item.description_roman_urdu) || item.description;
  const contentOf = (item) => (isRomanUrdu && item.content_roman_urdu) || item.content;

  if (showWuduTutorial) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6">
        <WuduTutorial
          steps={wuduSteps}
          contentLanguage={settings.contentLanguage}
          onExit={() => setShowWuduTutorial(false)}
        />
      </div>
    );
  }

  if (selectedLesson) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
            <Button variant="outline" onClick={() => setSelectedLesson(null)}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <LanguagePills value={settings.contentLanguage} onChange={(v) => updateSettings({ contentLanguage: v })} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-display text-primary">
                {selectedLesson.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{contentOf(selectedLesson)}</ReactMarkdown>
              </div>

              {selectedLesson.madhab_notes && (
                <Accordion type="single" collapsible className="mt-6">
                  <AccordionItem value="madhab">
                    <AccordionTrigger className="text-left font-medium text-foreground">
                      Madhab Differences
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="prose dark:prose-invert max-w-none">
                        <ReactMarkdown>{selectedLesson.madhab_notes}</ReactMarkdown>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}

              {selectedLesson.hadith_reference && (
                <div className="mt-6 pt-4 border-t border-border">
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                    {selectedLesson.hadith_reference}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <GraduationCap className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
            Prayer Academy
          </h1>
          <p className="text-xl text-accent mb-2 arabic-font">أكاديمية الصلاة</p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            Learn how to pray, step by step — from why we pray to how to purify yourself for it,
            grounded in the Qur'an and Sunnah.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <LanguagePills value={settings.contentLanguage} onChange={(v) => updateSettings({ contentLanguage: v })} />
            <MadhabPicker value={settings.madhab} onChange={(v) => updateSettings({ madhab: v })} />
          </div>
        </div>

        <Card
          className="mb-8 cursor-pointer hover:shadow-lg transition-all duration-300 bg-primary text-primary-foreground border-0"
          onClick={() => setShowWuduTutorial(true)}
        >
          <CardContent className="p-6 sm:p-8 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                <Droplets className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-1">How to Perform Wudu</h3>
                <p className="text-primary-foreground/80 text-sm">
                  An interactive, step-by-step guide to ritual purification before prayer
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 shrink-0" />
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="space-y-6">
            {Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {groupedSections.map((group) => {
              const Icon = group.icon;
              return (
                <Card key={group.key}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 flex-wrap">
                      <Icon className="w-6 h-6 text-primary shrink-0" />
                      <span className="min-w-0">{group.label}</span>
                      <Badge className="bg-primary/10 text-primary">{group.lessons.length} Lessons</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {group.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => setSelectedLesson(lesson)}
                        className="w-full flex items-center justify-between gap-3 p-4 rounded-lg border border-border hover:border-accent/40 hover:bg-accent/5 transition-colors text-left"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-primary">{lesson.title}</p>
                          <p className="text-sm text-muted-foreground truncate">{describe(lesson)}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-accent shrink-0" />
                      </button>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function LanguagePills({ value, onChange }) {
  return (
    <div className="inline-flex p-1 rounded-full bg-muted border border-border shrink-0">
      <button
        type="button"
        onClick={() => onChange("english")}
        className={cn(
          "px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5",
          value === "english"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Languages className="w-3.5 h-3.5" /> English
      </button>
      <button
        type="button"
        onClick={() => onChange("roman_urdu")}
        className={cn(
          "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
          value === "roman_urdu"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Roman Urdu
      </button>
    </div>
  );
}

function MadhabPicker({ value, onChange }) {
  return (
    <div className="inline-flex p-1 rounded-full bg-muted border border-border shrink-0 flex-wrap">
      {MADHABS.map((m) => (
        <button
          key={m.id}
          type="button"
          onClick={() => onChange(m.id)}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
            value === m.id
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {m.name}
        </button>
      ))}
    </div>
  );
}
