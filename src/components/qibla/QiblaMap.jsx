import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import { useTheme } from "next-themes";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { KAABA, greatCirclePoints } from "@/lib/qibla";

const kaabaIcon = L.divIcon({
  html: '<div class="w-7 h-7 rounded-full bg-card border-2 border-accent shadow-md flex items-center justify-center text-base">🕋</div>',
  className: "",
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const userIcon = L.divIcon({
  html: '<div class="w-4 h-4 rounded-full bg-primary border-2 border-card shadow-md"></div>',
  className: "",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

function ResizeOnShow({ resizeKey }) {
  const map = useMap();
  useEffect(() => {
    const id = setTimeout(() => map.invalidateSize(), 150);
    return () => clearTimeout(id);
  }, [map, resizeKey]);
  return null;
}

export default function QiblaMap({ location, className, scrollWheelZoom = false, resizeKey }) {
  const { resolvedTheme } = useTheme();

  if (!location) return null;

  const path = greatCirclePoints(location.lat, location.lng, KAABA.lat, KAABA.lng);
  const bounds = L.latLngBounds([
    [location.lat, location.lng],
    [KAABA.lat, KAABA.lng],
  ]);
  const lineColor = resolvedTheme === "dark" ? "hsl(158, 48%, 38%)" : "hsl(158, 42%, 20%)";

  return (
    <div className={className}>
      <MapContainer
        bounds={bounds}
        boundsOptions={{ padding: [32, 32] }}
        scrollWheelZoom={scrollWheelZoom}
        style={{ height: "100%", width: "100%" }}
      >
        <ResizeOnShow resizeKey={resizeKey} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={path} pathOptions={{ color: lineColor, weight: 3, dashArray: "6 6" }} />
        <Marker position={[location.lat, location.lng]} icon={userIcon} />
        <Marker position={[KAABA.lat, KAABA.lng]} icon={kaabaIcon} />
      </MapContainer>
    </div>
  );
}
