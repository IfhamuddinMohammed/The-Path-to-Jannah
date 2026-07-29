import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { SeerahEvent, SeerahLocation, ProphetName, CharacterTrait } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Heart,
  Calendar,
  MapPin,
  BookOpen,
  Search,
  Landmark,
  Building2,
  Mountain,
  TreePine,
  Swords,
  Languages,
  Headphones,
  Youtube,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from "@/components/seerah/EventCard";
import EventDetailDialog from "@/components/seerah/EventDetailDialog";
import ProphetNameChip from "@/components/seerah/ProphetNameChip";
import CharacterTraitCard from "@/components/seerah/CharacterTraitCard";
import { cn } from "@/lib/utils";

const LOCATION_ICONS = {
  "Makkah Al-Mukarramah": Landmark,
  "Madinah Al-Munawwarah": Building2,
  "Cave Hira (Jabal Al-Nour)": Mountain,
  "Ta'if": TreePine,
  Badr: Swords,
};

// Established scholars' Seerah lecture series, embedded via link-out (not
// iframe) to their own YouTube channels — same pattern as the Videos page.
const LECTURE_SERIES = [
  {
    title: "Seerah of Prophet Muhammad ﷺ",
    speaker: "Shaykh Dr. Yasir Qadhi",
    language: "English",
    description:
      "A detailed, source-referenced account of the Prophet's ﷺ life — one of the most comprehensive English-language Seerah series available, spanning over 100 sessions.",
    url: "https://www.youtube.com/playlist?list=PL07tC5WUlx10tDkMpqQWXCPn_7G0XhG5n",
  },
  {
    title: "Life of the Final Messenger",
    speaker: "Mufti Ismail Menk",
    language: "English",
    description:
      "An accessible, engaging journey through the Seerah across 28 lectures — well suited for beginners and families alike.",
    url: "https://www.youtube.com/playlist?list=PLWV9AumpGdP9zadagjK0qHE3y_UWPfG77",
  },
  {
    title: "Seerat-un-Nabi ﷺ",
    speaker: "Seerah in Urdu",
    language: "Urdu",
    description:
      "A compiled Urdu-language lecture series covering the life of the Prophet ﷺ, from birth to his final days.",
    url: "https://www.youtube.com/playlist?list=PLSeJQpJmPdNjRMHcAixwxVQp79kjvGpAK",
  },
];

export default function SeerahPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [contentLanguage, setContentLanguage] = useState("english");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [names, setNames] = useState([]);
  const [traits, setTraits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [eventRecords, locationRecords, nameRecords, traitRecords] = await Promise.all([
          SeerahEvent.list("year_ce"),
          SeerahLocation.list("-events_count"),
          ProphetName.list("-created_date"),
          CharacterTrait.list("-created_date"),
        ]);
        setEvents(eventRecords);
        setLocations(locationRecords);
        setNames(nameRecords);
        setTraits(traitRecords);
      } catch (error) {
        console.error("Error loading Seerah content:", error);
      }
      setIsLoading(false);
    };
    load();
  }, []);

  const isRomanUrdu = contentLanguage === "roman_urdu";

  const displayEvents = useMemo(
    () =>
      events.map((e) => ({
        id: e.id,
        yearCE: e.year_ce,
        yearAH: e.year_ah,
        title: e.title,
        titleArabic: e.title_arabic,
        era: e.era,
        description: (isRomanUrdu && e.description_roman_urdu) || e.description,
        detailedText: (isRomanUrdu && e.detailed_text_roman_urdu) || e.detailed_text,
        keyLessons:
          (isRomanUrdu && e.key_lessons_roman_urdu?.length ? e.key_lessons_roman_urdu : e.key_lessons) || [],
        authenticSources: e.authentic_sources || [],
      })),
    [events, isRomanUrdu]
  );

  const displayLocations = useMemo(
    () =>
      locations.map((l) => ({
        name: l.name,
        arabicName: l.arabic_name,
        significance: (isRomanUrdu && l.significance_roman_urdu) || l.significance,
        eventsCount: l.events_count,
      })),
    [locations, isRomanUrdu]
  );

  const displayNames = useMemo(
    () =>
      names.map((n) => ({
        arabic: n.arabic,
        transliteration: n.transliteration,
        meaning: (isRomanUrdu && n.meaning_roman_urdu) || n.meaning,
        reference: n.reference,
      })),
    [names, isRomanUrdu]
  );

  const displayTraits = useMemo(
    () =>
      traits.map((t) => ({
        trait: t.trait,
        arabicTrait: t.arabic_trait,
        description: (isRomanUrdu && t.description_roman_urdu) || t.description,
        hadithCitation: t.hadith_citation,
      })),
    [traits, isRomanUrdu]
  );

  const filteredEvents = useMemo(() => {
    let filtered = displayEvents;

    if (activeTab === "early") {
      filtered = filtered.filter((e) => e.era === "early");
    } else if (activeTab === "prophethood") {
      filtered = filtered.filter((e) => e.era === "prophethood");
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(query) ||
          e.description.toLowerCase().includes(query) ||
          e.detailedText.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [displayEvents, activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Heart className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
            Seerah of Prophet Muhammad ﷺ
          </h1>
          <p className="text-xl text-accent mb-2 arabic-font">سيرة الرسول محمد ﷺ</p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn about the life, character, and teachings of the best of creation,
            our beloved Prophet Muhammad ﷺ
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto mb-8">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search events by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="inline-flex p-1 rounded-full bg-muted border border-border shrink-0">
            <button
              type="button"
              onClick={() => setContentLanguage("english")}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5",
                contentLanguage === "english"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Languages className="w-3.5 h-3.5" /> English
            </button>
            <button
              type="button"
              onClick={() => setContentLanguage("roman_urdu")}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                contentLanguage === "roman_urdu"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Roman Urdu
            </button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto">
            <TabsTrigger value="overview" className="text-xs sm:text-sm py-2">Overview</TabsTrigger>
            <TabsTrigger value="early" className="text-xs sm:text-sm py-2">Early Life</TabsTrigger>
            <TabsTrigger value="prophethood" className="text-xs sm:text-sm py-2">Prophethood</TabsTrigger>
            <TabsTrigger value="character" className="text-xs sm:text-sm py-2">Character</TabsTrigger>
            <TabsTrigger value="lectures" className="text-xs sm:text-sm py-2">Lectures</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <TimelineTabContent
              events={filteredEvents}
              locations={displayLocations}
              names={displayNames}
              isLoading={isLoading}
              onSelectEvent={setSelectedEvent}
            />
          </TabsContent>

          <TabsContent value="early">
            <TimelineTabContent
              events={filteredEvents}
              locations={displayLocations}
              names={displayNames}
              isLoading={isLoading}
              onSelectEvent={setSelectedEvent}
            />
          </TabsContent>

          <TabsContent value="prophethood">
            <TimelineTabContent
              events={filteredEvents}
              locations={displayLocations}
              names={displayNames}
              isLoading={isLoading}
              onSelectEvent={setSelectedEvent}
            />
          </TabsContent>

          <TabsContent value="character">
            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-40 w-full rounded-lg" />)}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayTraits.map((trait, i) => (
                  <CharacterTraitCard key={i} trait={trait} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="lectures">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {LECTURE_SERIES.map((series) => (
                <a
                  key={series.url}
                  href={series.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-card border border-border hover:border-accent/40 hover:glow-gold transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Headphones className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border">
                      {series.language}
                    </span>
                  </div>
                  <h4 className="font-display font-semibold text-primary mb-1">{series.title}</h4>
                  <p className="text-sm text-accent mb-2">{series.speaker}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {series.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:text-accent transition-colors">
                    <Youtube className="w-4 h-4" /> Watch on YouTube
                  </span>
                </a>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-6 text-center">
            <BookOpen className="w-8 h-8 mx-auto text-primary mb-4" />
            <h3 className="font-display text-lg font-semibold text-primary mb-2">
              Continue Learning
            </h3>
            <p className="text-foreground/80 mb-4">
              Explore more about the Prophet's life, his companions, and his teachings
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link to={createPageUrl("Hadith")}>
                <Button variant="outline">Read Hadith Collection</Button>
              </Link>
              <Button onClick={() => setActiveTab("lectures")}>Watch Seerah Videos</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <EventDetailDialog
        event={selectedEvent}
        open={!!selectedEvent}
        onOpenChange={(open) => !open && setSelectedEvent(null)}
      />
    </div>
  );
}

function TimelineTabContent({ events, locations, names, isLoading, onSelectEvent }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display text-primary">
            <Calendar className="w-5 h-5 text-primary" />
            Timeline of Prophet's Life
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-lg" />)}
            </div>
          ) : events.length > 0 ? (
            <div className="space-y-4">
              {events.map((event) => (
                <EventCard key={event.id} event={event} onClick={() => onSelectEvent(event)} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No events match your search.</p>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-primary">
              <MapPin className="w-5 h-5 text-primary" />
              Key Locations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {locations.map((location) => {
              const Icon = LOCATION_ICONS[location.name] || MapPin;
              return (
                <div key={location.name} className="p-3 bg-secondary rounded-lg flex items-start gap-3">
                  <Icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h4 className="font-semibold text-primary">{location.name}</h4>
                      <span className="text-sm text-accent arabic-font">{location.arabicName}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{location.significance}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-primary">Names of Prophet ﷺ</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {names.map((name) => (
              <ProphetNameChip key={name.transliteration} name={name} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
