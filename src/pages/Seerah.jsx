import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Calendar, MapPin, BookOpen, Search, Landmark, Building2, Mountain, TreePine, Swords } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEERAH_TIMELINE, KEY_LOCATIONS, PROPHET_NAMES, CHARACTER_TRAITS } from "@/data/seerahData";
import EventCard from "@/components/seerah/EventCard";
import EventDetailDialog from "@/components/seerah/EventDetailDialog";
import ProphetNameChip from "@/components/seerah/ProphetNameChip";
import CharacterTraitCard from "@/components/seerah/CharacterTraitCard";

const LOCATION_ICONS = {
  "Makkah Al-Mukarramah": Landmark,
  "Madinah Al-Munawwarah": Building2,
  "Cave Hira (Jabal Al-Nour)": Mountain,
  "Ta'if": TreePine,
  Badr: Swords,
};

export default function SeerahPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = useMemo(() => {
    let events = SEERAH_TIMELINE;

    if (activeTab === "early") {
      events = events.filter((e) => e.era === "early");
    } else if (activeTab === "prophethood") {
      events = events.filter((e) => e.era === "prophethood");
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      events = events.filter(
        (e) =>
          e.title.toLowerCase().includes(query) ||
          e.description.toLowerCase().includes(query) ||
          e.detailedText.toLowerCase().includes(query)
      );
    }

    return events;
  }, [activeTab, searchQuery]);

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

        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search events by title or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="overview" className="text-xs sm:text-sm py-2">Overview</TabsTrigger>
            <TabsTrigger value="early" className="text-xs sm:text-sm py-2">Early Life</TabsTrigger>
            <TabsTrigger value="prophethood" className="text-xs sm:text-sm py-2">Prophethood</TabsTrigger>
            <TabsTrigger value="character" className="text-xs sm:text-sm py-2">Character</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <TimelineTabContent events={filteredEvents} onSelectEvent={setSelectedEvent} />
          </TabsContent>

          <TabsContent value="early">
            <TimelineTabContent events={filteredEvents} onSelectEvent={setSelectedEvent} />
          </TabsContent>

          <TabsContent value="prophethood">
            <TimelineTabContent events={filteredEvents} onSelectEvent={setSelectedEvent} />
          </TabsContent>

          <TabsContent value="character">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CHARACTER_TRAITS.map((trait, i) => (
                <CharacterTraitCard key={i} trait={trait} />
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
            <div className="flex justify-center gap-3">
              <Button variant="outline">Read Hadith Collection</Button>
              <Button>Watch Seerah Videos</Button>
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

function TimelineTabContent({ events, onSelectEvent }) {
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
          {events.length > 0 ? (
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
            {KEY_LOCATIONS.map((location) => {
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
            {PROPHET_NAMES.map((name) => (
              <ProphetNameChip key={name.transliteration} name={name} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
