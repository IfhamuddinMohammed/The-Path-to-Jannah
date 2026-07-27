import { useState, useEffect, useRef, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import {
  Compass,
  MapPin,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Maximize2,
  RefreshCw,
} from "lucide-react";
import QiblaCompass from "@/components/qibla/QiblaCompass";
import QiblaMap from "@/components/qibla/QiblaMap";
import { KAABA, calculateBearing, calculateDistanceKm, bearingToCompassPoint } from "@/lib/qibla";

function geoErrorMessage(code) {
  switch (code) {
    case 1:
      return "Location access was denied. Enable location permissions for this site in your browser settings, then try again.";
    case 2:
      return "Your location could not be determined. Check your device's GPS/location settings and try again.";
    case 3:
      return "Location request timed out. Please try again.";
    default:
      return "Something went wrong while getting your location.";
  }
}

export default function QiblaPage() {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const [deviceHeading, setDeviceHeading] = useState(0);
  const [compassPermission, setCompassPermission] = useState("unknown"); // unknown | granted | denied | unsupported
  const [hasOrientationData, setHasOrientationData] = useState(false);
  const [compassUnavailable, setCompassUnavailable] = useState(false);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const hasOrientationRef = useRef(false);

  useEffect(() => {
    if (typeof DeviceOrientationEvent === "undefined") {
      setCompassPermission("unsupported");
      return;
    }
    if (typeof DeviceOrientationEvent.requestPermission !== "function") {
      setCompassPermission("granted");
    }
  }, []);

  useEffect(() => {
    if (compassPermission !== "granted" || typeof DeviceOrientationEvent === "undefined") return;

    setIsCalibrating(true);
    hasOrientationRef.current = false;

    const handleOrientation = (event) => {
      let heading;
      if (typeof event.webkitCompassHeading === "number") {
        heading = event.webkitCompassHeading;
      } else if (event.alpha !== null) {
        heading = (360 - event.alpha) % 360;
      }
      if (heading !== undefined) {
        setDeviceHeading(heading);
        if (!hasOrientationRef.current) {
          hasOrientationRef.current = true;
          setHasOrientationData(true);
        }
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    const calibrationTimer = setTimeout(() => setIsCalibrating(false), 2500);
    const availabilityTimer = setTimeout(() => {
      if (!hasOrientationRef.current) setCompassUnavailable(true);
    }, 4000);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      clearTimeout(calibrationTimer);
      clearTimeout(availabilityTimer);
    };
  }, [compassPermission]);

  const compassSupported = compassPermission === "granted" && hasOrientationData && !compassUnavailable;

  const qiblaDirection = useMemo(
    () => (location ? calculateBearing(location.lat, location.lng, KAABA.lat, KAABA.lng) : null),
    [location]
  );
  const distanceKm = useMemo(
    () => (location ? calculateDistanceKm(location.lat, location.lng, KAABA.lat, KAABA.lng) : null),
    [location]
  );

  const handleEnable = async () => {
    setLoadingLocation(true);
    setLocationError(null);

    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      try {
        const result = await DeviceOrientationEvent.requestPermission();
        setCompassPermission(result === "granted" ? "granted" : "denied");
      } catch {
        setCompassPermission("denied");
      }
    }

    if (!navigator.geolocation) {
      setLocationError({ code: 0, message: "Geolocation is not supported by this browser." });
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        setLoadingLocation(false);
      },
      (error) => {
        setLocationError({ code: error.code, message: geoErrorMessage(error.code) });
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Compass className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">Qibla Direction</h1>
          <p className="text-xl text-accent mb-2 font-arabic">اتجاه القبلة</p>
          <p className="text-muted-foreground">Find the direction to Kaaba for your prayers</p>
        </div>

        {!location ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MapPin className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-bold text-primary mb-4">Find Qibla Direction</h3>
              <p className="text-muted-foreground mb-6">
                We need your location to calculate the accurate Qibla direction
              </p>
              <Button onClick={handleEnable} disabled={loadingLocation}>
                {loadingLocation ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Qibla Direction
                  </>
                )}
              </Button>

              {locationError && (
                <div className="mt-6 flex items-start gap-3 text-left p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-destructive">Couldn't get your location</p>
                    <p className="text-sm text-muted-foreground mt-1">{locationError.message}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Dual Qibla Finder</CardTitle>
              </CardHeader>
              <CardContent>
                {isCalibrating && compassPermission === "granted" && !compassUnavailable && (
                  <div className="flex items-center gap-3 mb-6 p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <RefreshCw className="w-5 h-5 text-accent animate-spin" style={{ animationDuration: "1.5s" }} />
                    <div>
                      <p className="text-sm font-medium text-accent">Calibrate your compass</p>
                      <p className="text-xs text-muted-foreground">
                        Move your phone in a figure-8 motion for an accurate reading
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div className="relative h-64 rounded-xl overflow-hidden border border-border">
                    <QiblaMap location={location} className="h-full w-full" resizeKey="inline" />
                    <Dialog open={fullscreenOpen} onOpenChange={setFullscreenOpen}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="absolute bottom-2 right-2 z-[1000] shadow"
                        >
                          <Maximize2 className="w-4 h-4 mr-1.5" />
                          Full screen map
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogTitle>Qibla Map</DialogTitle>
                        <div className="h-[60vh] rounded-lg overflow-hidden border border-border">
                          <QiblaMap
                            location={location}
                            className="h-full w-full"
                            scrollWheelZoom
                            resizeKey={fullscreenOpen}
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <QiblaCompass
                    qiblaDirection={qiblaDirection}
                    deviceHeading={deviceHeading}
                    compassSupported={compassSupported}
                    isCalibrating={isCalibrating}
                  />
                </div>

                {!compassSupported && compassPermission !== "unknown" && (
                  <p className="text-sm text-center text-muted-foreground mt-6">
                    {compassPermission === "denied"
                      ? "Compass access was denied — use a physical compass and face the direction below."
                      : compassUnavailable
                      ? "Live compass isn't available on this device — use a physical compass and face the direction below."
                      : "Use a physical compass and face the direction below."}
                  </p>
                )}
              </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground">Current Distance to Kaaba</p>
                  <p className="text-2xl font-semibold text-primary font-display">
                    {distanceKm.toLocaleString(undefined, { maximumFractionDigits: 0 })} km
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground">Bearing</p>
                  <p className="text-2xl font-semibold text-primary font-display">
                    {qiblaDirection.toFixed(1)}°{" "}
                    <span className="text-lg text-accent">({bearingToCompassPoint(qiblaDirection)})</span>
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Location Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Your Location</p>
                    <p className="font-medium">
                      {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                    </p>
                    <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary border-primary/20">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      Location Acquired
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kaaba Location</p>
                    <p className="font-medium">
                      {KAABA.lat}, {KAABA.lng}
                    </p>
                    <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary border-primary/20">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      Location Acquired
                    </Badge>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-foreground">
                    <strong>Prayer Tip:</strong> Make sure your device is flat and you're facing the{" "}
                    {compassSupported ? "Kaaba icon" : "bearing"} direction when praying.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
