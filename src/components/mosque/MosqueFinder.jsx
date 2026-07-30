import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import {
  Search,
  X,
  MapPin,
  Navigation,
  ExternalLink,
  Loader2,
  AlertTriangle,
  RefreshCw,
  Clock,
  Star,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { calculateDistanceKm, KAABA } from "@/lib/qibla";
import { cn } from "@/lib/utils";

// The main public Overpass instance is a shared, unauthenticated service that frequently
// rate-limits or goes down under load, so we fail over to alternate public mirrors rather
// than depending on any single one.
const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.openstreetmap.ru/api/interpreter",
  "https://overpass.osm.ch/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];
const RADIUS_DEFAULT = 5000;
const RADIUS_EXPANDED = 10000;
const DEFAULT_LOCATION = { lat: KAABA.lat, lng: KAABA.lng, label: "Mecca" };

// CARTO's free keyless basemaps render English/Latin place names worldwide (falling back
// from local script), unlike the default osm.org "Standard" tiles. Voyager is the light,
// high-contrast variant — streets, water, and parks read clearly, closer to Google Maps.
const TILE_URL = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const FILTERS = [
  { id: "all", label: "All" },
  { id: "women", label: "Women's Area" },
  { id: "open", label: "Open Now" },
  { id: "jumuah", label: "Jumu'ah" },
];

async function fetchNearbyMosques(lat, lng, radius, signal) {
  const query = `[out:json][timeout:25];node(around:${radius},${lat},${lng})[amenity=place_of_worship][religion=muslim];out;`;
  let lastError = null;
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      // Bound each mirror to 8s — a mirror that hangs (rather than actively refusing) would
      // otherwise stall the whole fallback chain indefinitely.
      const res = await fetch(endpoint, {
        method: "POST",
        body: query,
        signal: AbortSignal.any([signal, AbortSignal.timeout(8000)]),
      });
      if (!res.ok) {
        lastError = new Error(`${endpoint} responded ${res.status}`);
        continue;
      }
      const data = await res.json();
      return data.elements ?? [];
    } catch (err) {
      if (signal.aborted) throw err;
      lastError = new Error(`${endpoint}: ${err.message || err.name}`);
    }
  }
  throw lastError ?? new Error("All Overpass endpoints failed");
}

async function geocodeQuery(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Geocoding failed (${res.status})`);
  const results = await res.json();
  if (!results.length) return null;
  const { lat, lon, display_name } = results[0];
  return { lat: parseFloat(lat), lng: parseFloat(lon), label: display_name.split(",")[0] };
}

function resolveMosqueName(tags = {}, district) {
  const named = tags.name || tags["name:en"] || tags.official_name;
  if (named) return named;
  const near = tags["addr:street"] || district;
  return near ? `Masjid near ${near}` : "Nearby Masjid";
}

// Never surfaces a raw "Address unavailable" string — callers fall back to a district or
// distance phrase instead when no address fragments are tagged in OSM.
function resolveLocation(tags = {}) {
  const street = [tags["addr:housenumber"], tags["addr:street"]].filter(Boolean).join(" ");
  const district = tags["addr:suburb"] || tags["addr:city"] || null;
  const parts = [street, tags["addr:suburb"], tags["addr:city"]].filter(Boolean);
  return { address: parts.length ? parts.join(", ") : null, district };
}

// OSM tagging for these facilities is inconsistent across mosques, so a badge is only
// shown when the underlying tag is actually present — absence doesn't mean the facility
// doesn't exist, just that it isn't mapped.
function getAmenities(tags = {}) {
  return {
    womensArea: tags.female === "yes" || tags.women === "yes",
    wudu: tags.ablution === "yes",
    parking: tags.parking === "yes",
    wheelchair: tags.wheelchair === "yes",
  };
}

// Returns true/false when opening_hours can be parsed, or null when it's missing/unparseable
// (most mapped mosques have no opening_hours tag at all).
function getOpenStatus(tags = {}) {
  const oh = tags.opening_hours;
  if (!oh) return null;
  if (/24\/7/i.test(oh)) return true;
  const match = oh.match(/(\d{2}):(\d{2})-(\d{2}):(\d{2})/);
  if (!match) return null;
  const [h1, m1, h2, m2] = match.slice(1).map(Number);
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const start = h1 * 60 + m1;
  const end = h2 * 60 + m2;
  return start <= end ? minutes >= start && minutes <= end : minutes >= start || minutes <= end;
}

// OSM occasionally carries a direct hotlinkable image URL on a node; there's no equivalent
// for star ratings, so getRating always returns null today — kept as a documented hook
// rather than fabricating numbers OSM/Overpass simply doesn't have.
function getPhotoUrl(tags = {}) {
  return typeof tags.image === "string" && /^https?:\/\//i.test(tags.image) ? tags.image : null;
}

function getRating(tags = {}) {
  return { rating: null, ratingsCount: null };
}

function formatDistance(km) {
  const useMiles = typeof navigator !== "undefined" && /^en-US/i.test(navigator.language || "");
  if (useMiles) {
    const mi = km * 0.621371;
    return `${mi < 10 ? mi.toFixed(1) : Math.round(mi)} mi`;
  }
  return `${km < 10 ? km.toFixed(1) : Math.round(km)} km`;
}

function estimateTravelTime(km) {
  if (km <= 1.2) return `${Math.max(1, Math.round((km / 5) * 60))} min walk`;
  return `${Math.max(1, Math.round((km / 30) * 60))} min drive`;
}

function googleMapsUrl(m) {
  return `https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lng}`;
}
function appleMapsUrl(m) {
  return `https://maps.apple.com/?daddr=${m.lat},${m.lng}`;
}
function wazeUrl(m) {
  return `https://waze.com/ul?ll=${m.lat},${m.lng}&navigate=yes`;
}

const PIN_PATH =
  "M12 0C5.373 0 0 5.373 0 12c0 8.4 12 20 12 20s12-11.6 12-20C24 5.373 18.627 0 12 0z";

function mosqueIcon(selected) {
  const size = selected ? 42 : 32;
  const height = Math.round((size * 32) / 24);
  const html = `
    <div style="width:${size}px;height:${height}px;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.35));transition:transform 0.15s ease;">
      <svg viewBox="0 0 24 32" width="${size}" height="${height}">
        <path d="${PIN_PATH}" fill="#D4AF37" stroke="${selected ? "#064E3B" : "#FDFBF7"}" stroke-width="${selected ? 2 : 1}" />
        <circle cx="12" cy="10" r="4" fill="#FDFBF7" />
        <rect x="7" y="13" width="10" height="4" rx="0.6" fill="#FDFBF7" />
        <rect x="15.4" y="4" width="1.6" height="7" fill="#FDFBF7" />
        <circle cx="16.2" cy="3" r="1.1" fill="#FDFBF7" />
      </svg>
    </div>`;
  return L.divIcon({ html, className: "", iconSize: [size, height], iconAnchor: [size / 2, height] });
}

const userLocationIcon = L.divIcon({
  html: '<div style="width:16px;height:16px;border-radius:9999px;background:#064E3B;border:3px solid #FDFBF7;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>',
  className: "",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

function createClusterIcon(cluster) {
  const count = cluster.getChildCount();
  const size = count < 10 ? 34 : count < 50 ? 42 : 50;
  const html = `
    <div style="width:${size}px;height:${size}px;border-radius:9999px;background:#D4AF37;border:2.5px solid #FDFBF7;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.4);">
      <span style="color:#064E3B;font-weight:700;font-size:${count < 100 ? 13 : 11}px;">${count}</span>
    </div>`;
  return L.divIcon({ html, className: "", iconSize: [size, size] });
}

function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= breakpoint
  );
  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const handler = (e) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);
  return isDesktop;
}

function FitToMarkers({ userLocation, mosques }) {
  const map = useMap();
  useEffect(() => {
    if (!mosques.length) {
      map.setView([userLocation.lat, userLocation.lng], 14);
      return;
    }
    const bounds = L.latLngBounds([
      [userLocation.lat, userLocation.lng],
      ...mosques.map((m) => [m.lat, m.lng]),
    ]);
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 16 });
  }, [map, userLocation.lat, userLocation.lng, mosques]);
  return null;
}

function RecenterButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Recenter to my location"
      className="absolute bottom-4 right-4 z-[1000] rounded-full bg-[#FDFBF7] text-[#064E3B] shadow-lg p-3 hover:bg-white transition-colors"
    >
      <Navigation className="w-5 h-5" />
    </button>
  );
}

function MosqueMapPane({ userLocation, mosques, highlightedId, onSelectMosque, onHoverMosque }) {
  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={14}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <FitToMarkers userLocation={userLocation} mosques={mosques} />
      <TileLayer attribution={TILE_ATTRIBUTION} url={TILE_URL} subdomains="abcd" />
      <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocationIcon} />
      <MarkerClusterGroup iconCreateFunction={createClusterIcon} maxClusterRadius={60} showCoverageOnHover={false}>
        {mosques.map((m) => {
          const highlighted = m.id === highlightedId;
          return (
            <Marker
              key={m.id}
              position={[m.lat, m.lng]}
              icon={mosqueIcon(highlighted)}
              zIndexOffset={highlighted ? 1000 : 0}
              eventHandlers={{
                click: () => onSelectMosque(m),
                mouseover: () => onHoverMosque(m.id),
                mouseout: () => onHoverMosque(null),
              }}
            >
              <Tooltip
                permanent
                direction="bottom"
                offset={[0, 4]}
                className={cn(
                  "!rounded-full !border !px-2 !py-0.5 !text-[11px] !font-semibold !shadow-md !whitespace-nowrap",
                  highlighted
                    ? "!bg-[#D4AF37] !text-[#064E3B] !border-[#064E3B] mosque-tooltip-active"
                    : "!bg-[#FDFBF7] !text-[#064E3B] !border-[#D4AF37]/50"
                )}
              >
                {m.name}
              </Tooltip>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

function MosquePlaceholderIllustration() {
  return (
    <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none" aria-hidden="true">
      <circle cx="24" cy="20" r="9" fill="#D4AF37" />
      <rect x="10" y="29" width="28" height="10" rx="1.5" fill="#D4AF37" />
      <rect x="33.5" y="10" width="3" height="16" fill="#D4AF37" />
      <circle cx="35" cy="8" r="2.5" fill="#D4AF37" />
      <rect x="19" y="10" width="10" height="3" rx="1" fill="#D4AF37" />
    </svg>
  );
}

function AmenityBadge({ emoji, label }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#064E3B]/8 border border-[#064E3B]/15 px-2.5 py-1 text-xs font-medium text-[#064E3B]">
      <span aria-hidden="true">{emoji}</span>
      {label}
    </span>
  );
}

function MosqueSubtitle({ mosque }) {
  const text = mosque.address || (mosque.district ? `Near ${mosque.district}` : `${formatDistance(mosque.distanceKm)} away`);
  return <p className="text-sm text-[#064E3B]/70 truncate">{text}</p>;
}

function MosqueCard({ mosque, selected, onSelect, onHover, registerRef }) {
  const { amenities } = mosque;
  const hasAmenities = amenities.womensArea || amenities.wheelchair || amenities.parking || amenities.wudu;

  return (
    <button
      ref={(el) => registerRef(mosque.id, el)}
      type="button"
      onClick={() => onSelect(mosque)}
      onMouseEnter={() => onHover(mosque.id)}
      onMouseLeave={() => onHover(null)}
      className={cn(
        "w-full text-left rounded-2xl bg-[#FDFBF7] border p-4 shadow-sm transition-all hover:shadow-md flex gap-3",
        selected ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/40" : "border-[#064E3B]/10"
      )}
    >
      <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-[#0a3d2e] to-[#064E3B] flex items-center justify-center">
        {mosque.photoUrl ? (
          <img src={mosque.photoUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <MosquePlaceholderIllustration />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-[#064E3B] truncate">{mosque.name}</h3>
            <MosqueSubtitle mosque={mosque} />
            {mosque.rating !== null && (
              <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-[#064E3B]">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                {mosque.rating.toFixed(1)}
                {mosque.ratingsCount !== null && (
                  <span className="text-[#064E3B]/50 font-normal">({mosque.ratingsCount})</span>
                )}
              </div>
            )}
          </div>
          <div className="shrink-0 text-right">
            <div className="text-sm font-semibold text-[#064E3B]">{formatDistance(mosque.distanceKm)}</div>
            <div className="text-xs text-[#064E3B]/60">{estimateTravelTime(mosque.distanceKm)}</div>
          </div>
        </div>

        {hasAmenities && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {amenities.womensArea && <AmenityBadge emoji="👩‍🦰" label="Women's Area" />}
            {amenities.wheelchair && <AmenityBadge emoji="♿" label="Wheelchair" />}
            {amenities.parking && <AmenityBadge emoji="🚗" label="Parking" />}
            {amenities.wudu && <AmenityBadge emoji="🚿" label="Wudu" />}
          </div>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#064E3B]/10">
          {mosque.openStatus === true && (
            <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Open now
            </span>
          )}
          {mosque.openStatus === false && (
            <span className="text-xs font-medium text-red-700 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Closed now
            </span>
          )}
          {mosque.openStatus === null && (
            <span className="text-xs text-[#064E3B]/45">Hours not listed</span>
          )}
          <a
            href={googleMapsUrl(mosque)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#064E3B] text-[#FDFBF7] text-xs font-semibold px-3 py-1.5 hover:bg-[#053e2f] transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" /> Get Directions
          </a>
        </div>
      </div>
    </button>
  );
}

function MosqueDetailDrawer({ mosque, open, onOpenChange }) {
  if (!mosque) return null;
  const { amenities } = mosque;
  const hasAmenities = amenities.womensArea || amenities.wudu || amenities.parking || amenities.wheelchair;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-[#FDFBF7] border-t-4 border-[#D4AF37] rounded-t-3xl max-h-[85vh]">
        <DrawerHeader className="text-left pb-2">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <DrawerTitle className="text-xl font-bold text-[#064E3B] truncate">{mosque.name}</DrawerTitle>
              <MosqueSubtitle mosque={mosque} />
            </div>
            <DrawerClose className="shrink-0 rounded-full p-1.5 hover:bg-[#064E3B]/10">
              <X className="w-5 h-5 text-[#064E3B]" />
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="px-4 pb-6 overflow-y-auto">
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-[#064E3B] bg-[#064E3B]/5 rounded-xl px-4 py-3">
            <span>{formatDistance(mosque.distanceKm)}</span>
            <span className="w-1 h-1 rounded-full bg-[#064E3B]/40" />
            <span>{estimateTravelTime(mosque.distanceKm)}</span>
            {mosque.openStatus !== null && (
              <>
                <span className="w-1 h-1 rounded-full bg-[#064E3B]/40" />
                <span className={mosque.openStatus ? "text-emerald-700" : "text-red-700"}>
                  {mosque.openStatus ? "Open now" : "Closed now"}
                </span>
              </>
            )}
          </div>

          {hasAmenities && (
            <div className="flex flex-wrap gap-2 mt-4">
              {amenities.womensArea && <AmenityBadge emoji="👩‍🦰" label="Women's Area" />}
              {amenities.wudu && <AmenityBadge emoji="🚿" label="Wudu" />}
              {amenities.parking && <AmenityBadge emoji="🚗" label="Parking" />}
              {amenities.wheelchair && <AmenityBadge emoji="♿" label="Wheelchair" />}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <a
              href={googleMapsUrl(mosque)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#064E3B] text-[#064E3B] px-4 py-2 text-sm font-semibold hover:bg-[#064E3B] hover:text-[#FDFBF7] transition-colors"
            >
              <Navigation className="w-4 h-4" /> Google Maps
            </a>
            <a
              href={appleMapsUrl(mosque)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#064E3B] text-[#064E3B] px-4 py-2 text-sm font-semibold hover:bg-[#064E3B] hover:text-[#FDFBF7] transition-colors"
            >
              <MapPin className="w-4 h-4" /> Apple Maps
            </a>
            <a
              href={wazeUrl(mosque)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#D4AF37] text-[#064E3B] px-4 py-2 text-sm font-semibold hover:bg-[#D4AF37] transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Waze
            </a>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function LoadingState({ showSkeletonCards }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-2 text-[#FDFBF7] py-6">
        <Loader2 className="w-5 h-5 animate-spin text-[#D4AF37]" />
        <span className="text-sm font-medium">Finding nearby mosques…</span>
      </div>
      {showSkeletonCards && (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-2xl bg-[#FDFBF7]/90 h-24 animate-pulse" />
          ))}
        </div>
      )}
    </div>
  );
}

function ErrorBanner({ message, onRetry }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#FDFBF7]/95 border border-red-300 px-4 py-4">
      <div className="flex items-center gap-2 text-red-700 text-sm font-medium">
        <AlertTriangle className="w-4 h-4 shrink-0" /> {message}
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[#064E3B] text-[#FDFBF7] text-xs font-semibold px-3 py-1.5 hover:bg-[#053e2f] transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" /> Retry
      </button>
    </div>
  );
}

function EmptyState({ radiusKm, canExpandRadius, onExpandRadius, filtered, onClearFilter }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 py-12 px-4 rounded-2xl bg-[#FDFBF7]/95">
      <MapPin className="w-8 h-8 text-[#064E3B]/30" />
      <p className="text-[#064E3B] font-medium">No mosques found within {radiusKm} km</p>
      <div className="flex flex-wrap justify-center gap-2">
        {filtered && (
          <button
            type="button"
            onClick={onClearFilter}
            className="rounded-full border border-[#064E3B]/20 text-[#064E3B] text-sm font-semibold px-4 py-2 hover:bg-[#064E3B]/5 transition-colors"
          >
            Clear filter
          </button>
        )}
        {canExpandRadius && (
          <button
            type="button"
            onClick={onExpandRadius}
            className="rounded-full bg-[#D4AF37] text-[#064E3B] text-sm font-semibold px-4 py-2 hover:bg-[#c19d2e] transition-colors"
          >
            Search a wider area (10 km)
          </button>
        )}
      </div>
    </div>
  );
}

export default function MosqueFinder() {
  const isDesktop = useIsDesktop();

  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("loading"); // loading | granted | denied | unavailable | manual
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const [radius, setRadius] = useState(RADIUS_DEFAULT);
  const [retryToken, setRetryToken] = useState(0);
  const [rawElements, setRawElements] = useState([]);
  const [mosquesLoading, setMosquesLoading] = useState(false);
  const [mosquesError, setMosquesError] = useState(null);

  const [viewMode, setViewMode] = useState("map");
  const [activeFilter, setActiveFilter] = useState("all");

  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const [selectedMosque, setSelectedMosque] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const cardRefs = useRef(new Map());
  const registerCardRef = useCallback((id, el) => {
    if (el) cardRefs.current.set(id, el);
    else cardRefs.current.delete(id);
  }, []);

  const requestLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setUserLocation(DEFAULT_LOCATION);
      setLocationStatus("unavailable");
      return;
    }
    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: "Your location" });
        setLocationStatus("granted");
        setBannerDismissed(false);
      },
      (err) => {
        setUserLocation((prev) => prev ?? DEFAULT_LOCATION);
        setLocationStatus(err.code === 1 ? "denied" : "unavailable");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  useEffect(() => {
    if (!userLocation) return;
    const controller = new AbortController();
    let cancelled = false;
    setMosquesLoading(true);
    setMosquesError(null);
    fetchNearbyMosques(userLocation.lat, userLocation.lng, radius, controller.signal)
      .then((elements) => {
        if (!cancelled) setRawElements(elements);
      })
      .catch((err) => {
        if (!cancelled && err.name !== "AbortError") {
          // A generic "Failed to fetch" here (rather than an HTTP status) usually means the
          // request never left the browser — most often a privacy/ad-blocking extension
          // blocking OpenStreetMap query domains, not the public mirrors being down.
          setMosquesError(
            `Couldn't reach any mosque search mirror. (${err.message || "unknown error"}) If this ` +
              "persists, check for an ad-blocker/privacy extension blocking OpenStreetMap-related domains."
          );
        }
      })
      .finally(() => {
        if (!cancelled) setMosquesLoading(false);
      });
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [userLocation, radius, retryToken]);

  const mosques = useMemo(() => {
    if (!userLocation) return [];
    return rawElements
      .filter((el) => typeof el.lat === "number" && typeof el.lon === "number")
      .map((el) => {
        const tags = el.tags || {};
        const { address, district } = resolveLocation(tags);
        return {
          id: el.id,
          lat: el.lat,
          lng: el.lon,
          name: resolveMosqueName(tags, district),
          address,
          district,
          distanceKm: calculateDistanceKm(userLocation.lat, userLocation.lng, el.lat, el.lon),
          amenities: getAmenities(tags),
          openStatus: getOpenStatus(tags),
          photoUrl: getPhotoUrl(tags),
          ...getRating(tags),
          tags,
        };
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [rawElements, userLocation]);

  const filteredMosques = useMemo(() => {
    if (activeFilter === "women") return mosques.filter((m) => m.amenities.womensArea);
    if (activeFilter === "open") return mosques.filter((m) => m.openStatus !== false);
    // Jumu'ah congregational prayer is held at virtually every mosque and OSM has no
    // reliable per-node tag for it, so this filter currently passes everything through.
    return mosques;
  }, [mosques, activeFilter]);

  const handleSelectMosque = useCallback(
    (mosque) => {
      setSelectedMosque(mosque);
      if (!isDesktop) setDrawerOpen(true);
    },
    [isDesktop]
  );

  useEffect(() => {
    if (!isDesktop || !selectedMosque) return;
    const el = cardRefs.current.get(selectedMosque.id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selectedMosque, isDesktop]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const query = searchText.trim();
    if (!query) return;
    setSearching(true);
    setSearchError(null);
    try {
      const result = await geocodeQuery(query);
      if (!result) {
        setSearchError(`No results found for "${query}".`);
        return;
      }
      setUserLocation(result);
      setLocationStatus("manual");
      setRadius(RADIUS_DEFAULT);
      setBannerDismissed(true);
    } catch {
      setSearchError("Search failed. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchText("");
    setSearchError(null);
  };

  const handleExpandRadius = () => setRadius(RADIUS_EXPANDED);
  const handleRetry = () => setRetryToken((t) => t + 1);

  if (!userLocation) {
    return (
      <div className="min-h-screen bg-[#064E3B] flex items-center justify-center gap-2 text-[#FDFBF7]">
        <Loader2 className="w-5 h-5 animate-spin text-[#D4AF37]" />
        <span className="text-sm font-medium">Getting your location…</span>
      </div>
    );
  }

  const showEmpty = !mosquesLoading && !mosquesError && filteredMosques.length === 0;
  const highlightedId = hoveredId ?? selectedMosque?.id ?? null;

  return (
    <div className="min-h-screen bg-[#064E3B]">
      <div className="sticky top-0 z-20 bg-[#064E3B]/95 backdrop-blur-sm border-b border-[#D4AF37]/20 px-4 pt-4 pb-3 space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#064E3B]/50" />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search city or zip code"
              className="w-full rounded-full bg-[#FDFBF7] text-[#064E3B] placeholder:text-[#064E3B]/40 pl-9 pr-9 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
            {searchText && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#064E3B]/50 hover:text-[#064E3B]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={searching}
            className="shrink-0 rounded-full bg-[#D4AF37] text-[#064E3B] font-semibold text-sm px-4 py-2.5 hover:bg-[#c19d2e] transition-colors disabled:opacity-60"
          >
            {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
          </button>
          <button
            type="button"
            onClick={requestLocation}
            aria-label="Use my current location"
            className="shrink-0 rounded-full bg-[#0a3d2e] text-[#FDFBF7] p-2.5 hover:bg-[#0d4a37] transition-colors"
          >
            <Navigation className="w-4 h-4" />
          </button>
        </form>

        {searchError && <p className="text-xs text-red-200 px-1">{searchError}</p>}

        <div className="flex gap-2 overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFilter(f.id)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors border",
                activeFilter === f.id
                  ? "bg-[#D4AF37] text-[#064E3B] border-[#D4AF37]"
                  : "bg-transparent text-[#FDFBF7]/80 border-[#FDFBF7]/25 hover:border-[#D4AF37]/60"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {!isDesktop && (
          <div className="flex rounded-full bg-[#0a3d2e] p-1 gap-1">
            <button
              type="button"
              onClick={() => setViewMode("map")}
              className={cn(
                "flex-1 rounded-full py-1.5 text-xs font-semibold flex items-center justify-center gap-1.5",
                viewMode === "map" ? "bg-[#D4AF37] text-[#064E3B]" : "text-[#FDFBF7]/70"
              )}
            >
              Map View
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={cn(
                "flex-1 rounded-full py-1.5 text-xs font-semibold flex items-center justify-center gap-1.5",
                viewMode === "list" ? "bg-[#D4AF37] text-[#064E3B]" : "text-[#FDFBF7]/70"
              )}
            >
              List View
            </button>
          </div>
        )}
      </div>

      {locationStatus === "denied" && !bannerDismissed && (
        <div className="mx-4 mt-3 flex items-start gap-2 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 px-4 py-3 text-sm text-[#FDFBF7]">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-[#D4AF37]" />
          <div className="flex-1">
            Location access was denied, so we're showing mosques near Mecca. Search a city or zip above to find
            mosques near you.
          </div>
          <button
            type="button"
            onClick={() => setBannerDismissed(true)}
            aria-label="Dismiss"
            className="shrink-0 text-[#FDFBF7]/60 hover:text-[#FDFBF7]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {locationStatus === "unavailable" && !bannerDismissed && (
        <div className="mx-4 mt-3 flex items-start gap-2 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 px-4 py-3 text-sm text-[#FDFBF7]">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-[#D4AF37]" />
          <div className="flex-1">
            Location isn't available on this device or browser. Showing mosques near Mecca — search a city or zip
            above.
          </div>
          <button
            type="button"
            onClick={() => setBannerDismissed(true)}
            aria-label="Dismiss"
            className="shrink-0 text-[#FDFBF7]/60 hover:text-[#FDFBF7]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="p-4">
        {mosquesError ? (
          <ErrorBanner message={mosquesError} onRetry={handleRetry} />
        ) : isDesktop ? (
          <div className="grid grid-cols-[1fr_380px] gap-4 h-[75vh]">
            <div className="relative isolate rounded-2xl overflow-hidden border border-[#D4AF37]/20">
              {mosquesLoading ? (
                <div className="h-full flex items-center justify-center bg-[#0a3d2e]">
                  <Loader2 className="w-6 h-6 animate-spin text-[#D4AF37]" />
                </div>
              ) : (
                <>
                  <MosqueMapPane
                    userLocation={userLocation}
                    mosques={filteredMosques}
                    highlightedId={highlightedId}
                    onSelectMosque={handleSelectMosque}
                    onHoverMosque={setHoveredId}
                  />
                  <RecenterButton onClick={requestLocation} />
                </>
              )}
            </div>
            <div className="overflow-y-auto pr-1 space-y-3">
              {mosquesLoading ? (
                <LoadingState showSkeletonCards />
              ) : showEmpty ? (
                <EmptyState
                  radiusKm={radius / 1000}
                  canExpandRadius={radius === RADIUS_DEFAULT}
                  onExpandRadius={handleExpandRadius}
                  filtered={activeFilter !== "all"}
                  onClearFilter={() => setActiveFilter("all")}
                />
              ) : (
                filteredMosques.map((m) => (
                  <MosqueCard
                    key={m.id}
                    mosque={m}
                    selected={selectedMosque?.id === m.id}
                    onSelect={handleSelectMosque}
                    onHover={setHoveredId}
                    registerRef={registerCardRef}
                  />
                ))
              )}
            </div>
          </div>
        ) : mosquesLoading ? (
          <LoadingState showSkeletonCards={viewMode === "list"} />
        ) : viewMode === "map" ? (
          <div className="relative isolate rounded-2xl overflow-hidden border border-[#D4AF37]/20 h-[60vh]">
            <MosqueMapPane
              userLocation={userLocation}
              mosques={filteredMosques}
              highlightedId={highlightedId}
              onSelectMosque={handleSelectMosque}
              onHoverMosque={setHoveredId}
            />
            <RecenterButton onClick={requestLocation} />
          </div>
        ) : showEmpty ? (
          <EmptyState
            radiusKm={radius / 1000}
            canExpandRadius={radius === RADIUS_DEFAULT}
            onExpandRadius={handleExpandRadius}
            filtered={activeFilter !== "all"}
            onClearFilter={() => setActiveFilter("all")}
          />
        ) : (
          <div className="space-y-3">
            {filteredMosques.map((m) => (
              <MosqueCard
                key={m.id}
                mosque={m}
                selected={selectedMosque?.id === m.id}
                onSelect={handleSelectMosque}
                onHover={setHoveredId}
                registerRef={registerCardRef}
              />
            ))}
          </div>
        )}
      </div>

      <MosqueDetailDrawer mosque={selectedMosque} open={!isDesktop && drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  );
}
