import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Clock,
  MapPin,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Star,
  Navigation,
  Loader2,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { useAdhaan } from "@/hooks/useAdhaan";
import AdhaanSettings from "@/components/adhaan/AdhaanSettings";

export default function PrayerTimesPage() {
  const {
    settings,
    updateSettings,
    prayerTimes,
    nextPrayer,
    loading,
    error,
    locationInfo,
  } = useAdhaan();
  const [detecting, setDetecting] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hasLocation = settings.useGeolocation
    ? settings.lat != null && settings.lng != null
    : !!(settings.city && settings.country);

  const handleGeolocation = () => {
    setDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          updateSettings({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setDetecting(false);
        },
        () => setDetecting(false)
      );
    } else {
      setDetecting(false);
    }
  };

  const getPrayerIcon = (prayerName) => {
    const icons = {
      Fajr: Star,
      Sunrise: Sunrise,
      Dhuhr: Sun,
      Asr: Sun,
      Maghrib: Sunset,
      Isha: Moon,
    };
    return icons[prayerName] || Clock;
  };

  const formatCountdown = (minutes) => {
    if (minutes < 0) return "Now";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Clock className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
            Prayer Times
          </h1>
          <p className="text-xl text-accent mb-2 arabic-font">مواقيت الصلاة</p>
          <p className="text-muted-foreground">
            Never miss your Salah with accurate prayer times
          </p>
          {locationInfo && (
            <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-primary/10 rounded-full">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">
                {locationInfo.hijriDay} {locationInfo.hijriMonth}{" "}
                {locationInfo.hijriYear} AH
              </span>
            </div>
          )}
        </div>

        {!hasLocation ? (
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <MapPin className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-display font-bold text-primary mb-4">
                Set Your Location
              </h3>
              <p className="text-muted-foreground mb-6">
                We need your location to provide accurate prayer times for your
                area
              </p>
              <div className="space-y-4">
                <Button
                  onClick={handleGeolocation}
                  disabled={detecting}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  {detecting ? "Detecting Location..." : "Use My Current Location"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-card px-4 text-sm text-muted-foreground">
                      or enter manually
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                  <div className="text-left">
                    <Label className="text-sm">City</Label>
                    <Input
                      value={settings.city}
                      onChange={(e) => updateSettings({ city: e.target.value })}
                      placeholder="e.g. London"
                    />
                  </div>
                  <div className="text-left">
                    <Label className="text-sm">Country</Label>
                    <Input
                      value={settings.country}
                      onChange={(e) =>
                        updateSettings({ country: e.target.value })
                      }
                      placeholder="e.g. United Kingdom"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : loading ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Loading prayer times...</p>
            </CardContent>
          </Card>
        ) : error ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-destructive mb-4">{error}</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : prayerTimes ? (
          <div className="space-y-6">
            {/* Current Time and Next Prayer */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-primary-foreground/70 text-sm">Current Time</p>
                    <p className="text-2xl font-bold">
                      {format(currentTime, "h:mm:ss a")}
                    </p>
                    <p className="text-primary-foreground/70 text-sm">
                      {format(currentTime, "EEEE, MMMM d, yyyy")}
                    </p>
                  </div>
                  {nextPrayer && (
                    <div className="text-right">
                      <p className="text-primary-foreground/70 text-sm">Next Prayer</p>
                      <p className="text-2xl font-bold">{nextPrayer.name}</p>
                      <p className="text-primary-foreground/70 text-sm">
                        in {formatCountdown(nextPrayer.minutesUntil)}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Prayer Times Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(prayerTimes)
                .filter(([name]) => name !== "Sunrise")
                .map(([name, time]) => {
                  const Icon = getPrayerIcon(name);
                  const isNext = nextPrayer?.name === name;
                  const isPassed = time < currentTime;

                  return (
                    <Card
                      key={name}
                      className={`${
                        isNext ? "ring-2 ring-accent bg-accent/10" : ""
                      } ${isPassed && !isNext ? "opacity-60" : ""}`}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon
                              className={`w-5 h-5 ${
                                isNext ? "text-accent" : "text-muted-foreground"
                              }`}
                            />
                            <span
                              className={
                                isNext ? "text-accent" : "text-foreground"
                              }
                            >
                              {name}
                            </span>
                          </div>
                          {isNext && (
                            <Badge className="bg-accent text-accent-foreground">Next</Badge>
                          )}
                          {isPassed && !isNext && (
                            <Badge variant="outline">Passed</Badge>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p
                          className={`text-xl font-bold ${
                            isNext ? "text-accent" : "text-foreground"
                          }`}
                        >
                          {format(time, "h:mm a")}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>

            {/* Location Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Location Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {settings.useGeolocation ? (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Latitude</p>
                        <p className="font-medium">
                          {settings.lat?.toFixed(4)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Longitude</p>
                        <p className="font-medium">
                          {settings.lng?.toFixed(4)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">City</p>
                        <p className="font-medium">{settings.city}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Country</p>
                        <p className="font-medium">{settings.country}</p>
                      </div>
                    </>
                  )}
                </div>
                {locationInfo?.method && (
                  <p className="text-sm text-muted-foreground mt-4">
                    Calculation Method: {locationInfo.method}
                  </p>
                )}
                <div className="mt-4">
                  <Button variant="outline" size="sm" onClick={handleGeolocation}>
                    <Navigation className="w-4 h-4 mr-2" />
                    Update Location
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Adhaan Settings */}
            <AdhaanSettings />
          </div>
        ) : null}
      </div>
    </div>
  );
}