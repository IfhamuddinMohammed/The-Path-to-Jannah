import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  MapPin,
  Volume2,
  Play,
  Navigation,
  Settings2,
} from "lucide-react";
import { useAdhaan, ADHAN_SOUNDS, CALCULATION_METHODS } from "@/hooks/useAdhaan";

const PRAYERS = [
  { key: "Fajr", label: "Fajr (Dawn)" },
  { key: "Dhuhr", label: "Dhuhr (Noon)" },
  { key: "Asr", label: "Asr (Afternoon)" },
  { key: "Maghrib", label: "Maghrib (Sunset)" },
  { key: "Isha", label: "Isha (Night)" },
];

export default function AdhaanSettings() {
  const {
    settings,
    updateSettings,
    testAdhaan,
    requestNotificationPermission,
    locationInfo,
  } = useAdhaan();
  const [detecting, setDetecting] = useState(false);

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

  const handleNotificationToggle = async (checked) => {
    if (checked) {
      const granted = await requestNotificationPermission();
      updateSettings({ browserNotifications: granted });
    } else {
      updateSettings({ browserNotifications: false });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Adhaan Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable toggle */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="font-medium">Enable Adhaan Alerts</Label>
            <p className="text-sm text-muted-foreground">
              Get notified with the call to prayer at each prayer time
            </p>
          </div>
          <Switch
            checked={settings.enabled}
            onCheckedChange={(c) => updateSettings({ enabled: c })}
          />
        </div>

        {settings.enabled && (
          <>
            {/* Location */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center gap-2 text-primary font-medium">
                <MapPin className="w-4 h-4" />
                Location
              </div>

              <div className="flex items-center justify-between">
                <Label>Auto-detect location</Label>
                <Switch
                  checked={settings.useGeolocation}
                  onCheckedChange={(c) => updateSettings({ useGeolocation: c })}
                />
              </div>

              {settings.useGeolocation ? (
                <div className="flex items-center gap-3 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGeolocation}
                    disabled={detecting}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    {detecting ? "Detecting..." : "Use My Location"}
                  </Button>
                  {settings.lat != null && (
                    <Badge variant="outline" className="text-xs">
                      {settings.lat.toFixed(2)}, {settings.lng.toFixed(2)}
                    </Badge>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm">City</Label>
                    <Input
                      value={settings.city}
                      onChange={(e) => updateSettings({ city: e.target.value })}
                      placeholder="e.g. London"
                    />
                  </div>
                  <div>
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
              )}

              {locationInfo?.method && (
                <p className="text-xs text-muted-foreground">
                  Method: {locationInfo.method}
                </p>
              )}
            </div>

            {/* Calculation method */}
            <div className="space-y-2 pt-4 border-t">
              <Label className="flex items-center gap-2 text-primary font-medium">
                <Settings2 className="w-4 h-4" />
                Calculation Method
              </Label>
              <Select
                value={String(settings.method)}
                onValueChange={(v) => updateSettings({ method: Number(v) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CALCULATION_METHODS.map((m) => (
                    <SelectItem key={m.id} value={String(m.id)}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Prayer selection */}
            <div className="space-y-3 pt-4 border-t">
              <Label className="flex items-center gap-2 text-primary font-medium">
                <Bell className="w-4 h-4" />
                Prayer Alerts
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRAYERS.map((p) => (
                  <div
                    key={p.key}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted"
                  >
                    <Label className="text-sm cursor-pointer">{p.label}</Label>
                    <Switch
                      checked={settings.prayers[p.key]}
                      onCheckedChange={(c) =>
                        updateSettings({
                          prayers: { ...settings.prayers, [p.key]: c },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Adhaan sound */}
            <div className="space-y-2 pt-4 border-t">
              <Label className="flex items-center gap-2 text-primary font-medium">
                <Volume2 className="w-4 h-4" />
                Adhaan Sound
              </Label>
              <div className="flex gap-2">
                <Select
                  value={settings.adhanSoundId}
                  onValueChange={(v) => updateSettings({ adhanSoundId: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ADHAN_SOUNDS.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" onClick={testAdhaan}>
                  <Play className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Browser notifications */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <Label className="font-medium">Browser Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Show desktop notifications when a prayer time arrives
                </p>
              </div>
              <Switch
                checked={settings.browserNotifications}
                onCheckedChange={handleNotificationToggle}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}