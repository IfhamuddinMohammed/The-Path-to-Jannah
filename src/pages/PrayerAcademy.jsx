import React, { useState, useEffect, useMemo } from "react";
import { PrayerLesson, WuduStep, SalahStep } from "@/entities/all";
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
  PersonStanding,
  LayoutList,
  Mic2,
  PartyPopper,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import WuduTutorial from "@/components/prayer/WuduTutorial";
import SalahStepCard from "@/components/prayer/SalahStepCard";
import RakahWalkthrough from "@/components/prayer/RakahWalkthrough";
import NamazFormatChart from "@/components/prayer/NamazFormatChart";
import { usePrayerPreferences } from "@/hooks/usePrayerPreferences";
import { cn } from "@/lib/utils";
import { SEED_LESSONS, SEED_WUDU_STEPS } from "@/data/prayerAcademySeed";
import { SEED_SALAH_STEPS } from "@/data/salahStepsSeed";
import { backfillSeed } from "@/lib/seedBackfill";
import { WALKTHROUGH_PRAYERS } from "@/data/salahStructure";

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
  {
    key: "khutbah",
    label: "The Khutbah",
    icon: Mic2,
    sections: ["khutbah"],
  },
  {
    key: "eid",
    label: "Eid Prayers",
    icon: PartyPopper,
    sections: ["eid"],
  },
];

export default function PrayerAcademyPage() {
  const [lessons, setLessons] = useState([]);
  const [wuduSteps, setWuduSteps] = useState([]);
  const [salahSteps, setSalahSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showHowToPray, setShowHowToPray] = useState(false);
  const [showWuduTutorial, setShowWuduTutorial] = useState(false);
  const [showPrayerPicker, setShowPrayerPicker] = useState(false);
  const [showNamazFormat, setShowNamazFormat] = useState(false);
  const [walkthroughPrayerKey, setWalkthroughPrayerKey] = useState(null);
  const { settings, updateSettings } = usePrayerPreferences();
  const isRomanUrdu = settings.contentLanguage === "roman_urdu";

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        let [lessonData, wuduData, salahData] = await Promise.all([
          PrayerLesson.list("order"),
          WuduStep.list("order"),
          SalahStep.list("order"),
        ]);

        // Seed the starter curriculum once per user (mirrors the seed-once-for-everyone pattern
        // already used by useRomanUrdu.js), but keep it in sync on two axes, not just "only if
        // the list is still completely empty": rows the seed has added since (e.g. the Khutbah/
        // Eid lessons and the eid_takbirs step), and fields the seed has added to *existing* rows
        // since they were first created (e.g. Roman Urdu translations written after the English
        // content had already been seeded) — an empty-list-only check misses both for anyone
        // who'd already loaded this page before either happened.
        try {
          lessonData = await backfillSeed(PrayerLesson, "title", SEED_LESSONS, lessonData, [
            "description_roman_urdu",
            "content_roman_urdu",
          ]);
        } catch (seedError) {
          console.error("Error seeding Prayer Lessons:", seedError);
        }
        try {
          wuduData = await backfillSeed(WuduStep, "title", SEED_WUDU_STEPS, wuduData, [
            "instructions_roman_urdu",
          ]);
        } catch (seedError) {
          console.error("Error seeding Wudu Steps:", seedError);
        }
        try {
          salahData = await backfillSeed(SalahStep, "step_key", SEED_SALAH_STEPS, salahData, [
            "what_to_do_roman_urdu",
          ]);
        } catch (seedError) {
          console.error("Error seeding Salah Steps:", seedError);
        }

        setLessons(lessonData);
        setWuduSteps(wuduData);
        setSalahSteps(salahData);
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

  if (walkthroughPrayerKey) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6">
        <RakahWalkthrough
          prayerKey={walkthroughPrayerKey}
          salahSteps={salahSteps}
          contentLanguage={settings.contentLanguage}
          onExit={() => {
            setWalkthroughPrayerKey(null);
            setShowPrayerPicker(false);
          }}
        />
      </div>
    );
  }

  if (showNamazFormat) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6">
        <Button variant="outline" onClick={() => setShowNamazFormat(false)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <NamazFormatChart />
      </div>
    );
  }

  if (showPrayerPicker) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <Button variant="outline" onClick={() => setShowPrayerPicker(false)} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <div className="text-center mb-8">
            <PersonStanding className="w-12 h-12 mx-auto text-primary mb-3" />
            <h2 className="font-display text-2xl font-bold text-primary mb-2">Which prayer?</h2>
            <p className="text-muted-foreground">
              Choose a prayer to walk through, rak'ah by rak'ah.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WALKTHROUGH_PRAYERS.map((prayer) => (
              <button
                key={prayer.key}
                type="button"
                onClick={() => setWalkthroughPrayerKey(prayer.key)}
                className="p-5 rounded-xl border border-border hover:border-accent/40 hover:bg-accent/5 transition-colors text-left"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-display text-lg font-semibold text-primary">{prayer.label}</p>
                  <span className="text-lg arabic-font text-accent">{prayer.arabic}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {prayer.rakahCount} rak'ah (Fard) · {prayer.recitationNote}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showHowToPray) {
    // eid_takbirs is Eid-only (see buildEidSequence) — excluded here since this guide walks the
    // ordinary daily-prayer sequence from the opening Takbir to the closing Tasleem.
    const dailySteps = salahSteps.filter((step) => step.step_key !== "eid_takbirs");
    return (
      <div className="min-h-screen bg-background p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
            <Button variant="outline" onClick={() => setShowHowToPray(false)}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <LanguagePills value={settings.contentLanguage} onChange={(v) => updateSettings({ contentLanguage: v })} />
          </div>

          <div className="text-center mb-8">
            <PersonStanding className="w-12 h-12 mx-auto text-primary mb-3" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">
              How to Pray — Step by Step
            </h2>
            <p className="text-muted-foreground">
              All {dailySteps.length} steps, from the opening Takbir to the closing Tasleem — read
              through in order, like a full guide.
            </p>
          </div>

          <div className="space-y-8">
            {dailySteps.map((step, i) => (
              <div key={step.id}>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground pl-4 pr-1.5 py-1 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wide">Step</span>
                  <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                </div>
                <SalahStepCard step={step} contentLanguage={settings.contentLanguage} />
              </div>
            ))}
          </div>

          <div className="text-center mt-10 pt-8 border-t border-border">
            <Button onClick={() => setShowHowToPray(false)}>Back to Prayer Academy</Button>
          </div>
        </div>
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
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card
            className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-primary text-primary-foreground border-0"
            onClick={() => setShowWuduTutorial(true)}
          >
            <CardContent className="p-6 sm:p-8 flex items-center justify-between gap-4 flex-wrap h-full">
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

          <Card
            className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-secondary text-secondary-foreground border-0"
            onClick={() => setShowHowToPray(true)}
          >
            <CardContent className="p-6 sm:p-8 flex items-center justify-between gap-4 flex-wrap h-full">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpenCheck className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-1">How to Pray</h3>
                  <p className="text-secondary-foreground/80 text-sm">
                    Every step, Takbir to Tasleem, in one full read-through guide
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-accent text-accent-foreground border-0"
            onClick={() => setShowPrayerPicker(true)}
          >
            <CardContent className="p-6 sm:p-8 flex items-center justify-between gap-4 flex-wrap h-full">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-accent-foreground/10 flex items-center justify-center shrink-0">
                  <PersonStanding className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-1">Rak'ah Walkthrough</h3>
                  <p className="text-accent-foreground/80 text-sm">
                    Follow along, rak'ah by rak'ah, through any of the five daily prayers
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-primary/20"
            onClick={() => setShowNamazFormat(true)}
          >
            <CardContent className="p-6 sm:p-8 flex items-center justify-between gap-4 flex-wrap h-full">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <LayoutList className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-1 text-primary">Daily Prayer Format</h3>
                  <p className="text-muted-foreground text-sm">
                    Sunnah, Farz, Nafl, and Witr for every prayer — plus Jummah
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 shrink-0 text-primary" />
            </CardContent>
          </Card>
        </div>

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
                      <Badge className="bg-primary/10 text-primary">
                        {group.lessons.length} {group.lessons.length === 1 ? "Lesson" : "Lessons"}
                      </Badge>
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

