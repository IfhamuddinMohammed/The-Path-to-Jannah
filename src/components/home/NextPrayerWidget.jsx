import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Clock, MapPin, Navigation, Bell, BellRing, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";
import { useAdhaan } from "@/hooks/useAdhaan";
import { getPrayerIcon, formatCountdown } from "@/lib/prayerFormat";

export default function NextPrayerWidget() {
  const {
    settings,
    updateSettings,
    prayerTimes,
    nextPrayer,
    loading,
    error,
    requestNotificationPermission,
  } = useAdhaan();
  const [detecting, setDetecting] = useState(false);
  const [enabling, setEnabling] = useState(false);

  const hasLocation = settings.useGeolocation
    ? settings.lat != null && settings.lng != null
    : !!(settings.city && settings.country);

  const alertsOn =
    settings.enabled &&
    (typeof Notification === "undefined" || Notification.permission === "granted");

  const handleGeolocation = () => {
    setDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          updateSettings({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setDetecting(false);
        },
        () => setDetecting(false)
      );
    } else {
      setDetecting(false);
    }
  };

  const handleEnableAlerts = async () => {
    setEnabling(true);
    const granted = await requestNotificationPermission();
    updateSettings({ enabled: true, browserNotifications: granted });
    setEnabling(false);
  };

  if (!hasLocation) {
    return (
      <div className="rounded-2xl bg-card border border-border glow-shadow p-6 text-center">
        <MapPin className="w-8 h-8 mx-auto text-accent mb-3" />
        <h3 className="font-display text-lg font-semibold text-primary mb-1">
          See today's prayer times
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Set your location once to get accurate prayer times and alerts, right on the home page.
        </p>
        <Button onClick={handleGeolocation} disabled={detecting}>
          <Navigation className="w-4 h-4 mr-2" />
          {detecting ? "Detecting Location…" : "Use My Location"}
        </Button>
      </div>
    );
  }

  if (loading && !prayerTimes) {
    return (
      <div className="rounded-2xl bg-card border border-border glow-shadow p-6 flex items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin" />
        Loading prayer times…
      </div>
    );
  }

  if (error || !prayerTimes) {
    return (
      <div className="rounded-2xl bg-card border border-border glow-shadow p-6 text-center">
        <p className="text-sm text-muted-foreground mb-3">
          {error || "Prayer times unavailable."}
        </p>
        <Link to={createPageUrl("PrayerTimes")}>
          <Button variant="outline" size="sm">
            Open Prayer Times
          </Button>
        </Link>
      </div>
    );
  }

  const prayerEntries = Object.entries(prayerTimes).filter(([name]) => name !== "Sunrise");

  return (
    <div className="rounded-2xl overflow-hidden bg-card border border-border glow-shadow">
      <div className="bg-primary text-primary-foreground p-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-primary-foreground/70 text-xs uppercase tracking-wide">Next Prayer</p>
          <p className="text-2xl font-display font-bold">{nextPrayer?.name}</p>
          {nextPrayer && (
            <p className="text-primary-foreground/70 text-sm">
              {format(nextPrayer.time, "h:mm a")} · in {formatCountdown(nextPrayer.minutesUntil)}
            </p>
          )}
        </div>
        <Clock className="w-9 h-9 text-primary-foreground/50 shrink-0" />
      </div>

      <div className="flex divide-x divide-border overflow-x-auto">
        {prayerEntries.map(([name, time]) => {
          const Icon = getPrayerIcon(name);
          const isNext = nextPrayer?.name === name;
          return (
            <div
              key={name}
              className={`flex-1 min-w-[64px] flex flex-col items-center gap-1 py-3 text-center ${
                isNext ? "bg-accent/10" : ""
              }`}
            >
              <Icon className={`w-4 h-4 ${isNext ? "text-accent" : "text-muted-foreground"}`} />
              <span
                className={`text-[11px] font-medium ${isNext ? "text-accent" : "text-foreground"}`}
              >
                {name}
              </span>
              <span className="text-[11px] text-muted-foreground">{format(time, "h:mm a")}</span>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-border flex items-center justify-between gap-3 flex-wrap">
        {alertsOn ? (
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <BellRing className="w-4 h-4 text-accent" />
            Prayer alerts are on
          </p>
        ) : (
          <Button
            size="sm"
            onClick={handleEnableAlerts}
            disabled={enabling}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Bell className="w-4 h-4 mr-2" />
            {enabling ? "Enabling…" : "Enable Prayer Alerts"}
          </Button>
        )}
        <Link
          to={createPageUrl("PrayerTimes")}
          className="text-sm text-accent hover:text-accent/80 flex items-center gap-1 shrink-0"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
