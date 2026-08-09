import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  RAKAH_TYPES,
  RAKAH_TYPE_META,
  PRAYER_RAKAH_CHART,
  JUMMAH_STRUCTURE,
  EID_STRUCTURE,
  SUNNAH_MUAKKADAH_NOTE,
  WITR_MADHAB_NOTE,
  EID_MADHAB_NOTE,
} from "@/data/namazFormat";

// Visual weight tracks obligation strength — Farz heaviest (solid), Witr Wajib nearly as heavy
// but visibly distinct, Sunnah Mu'akkadah medium, Sunnah Ghair Mu'akkadah the same hue but
// outlined only (still Sunnah, just less emphasized), Nafl lightest (voluntary, no fixed count).
const CHIP_STYLES = {
  [RAKAH_TYPES.FARZ]: "bg-primary text-primary-foreground border-primary",
  [RAKAH_TYPES.WITR_WAJIB]: "bg-primary/70 text-primary-foreground border-primary/70",
  [RAKAH_TYPES.SUNNAH_MUAKKADAH]: "bg-accent text-accent-foreground border-accent",
  [RAKAH_TYPES.SUNNAH_GHAIR_MUAKKADAH]: "bg-transparent text-accent border-accent border-dashed",
  [RAKAH_TYPES.NAFL]: "bg-muted text-muted-foreground border-border",
  [RAKAH_TYPES.EID_PRAYER]: "bg-primary/70 text-primary-foreground border-primary/70",
};

function RakahChip({ segment }) {
  const meta = RAKAH_TYPE_META[segment.type];
  return (
    <span
      title={segment.note || meta.description}
      className={cn(
        "inline-flex flex-col items-center justify-center px-3 py-1.5 rounded-lg border text-center min-w-[4.5rem]",
        CHIP_STYLES[segment.type]
      )}
    >
      <span className="text-base font-bold leading-none">{segment.count}</span>
      <span className="text-[10px] uppercase tracking-wide leading-none mt-0.5">
        {segment.label || meta.label}
      </span>
    </span>
  );
}

function TotalBadge({ segments }) {
  const total = segments.reduce((sum, s) => sum + (s.count || 0), 0);
  return (
    <span className="text-xs text-muted-foreground shrink-0">{total} rak'ah total</span>
  );
}

function PrayerRow({ prayer }) {
  return (
    <div className="p-4 rounded-xl border border-border">
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <div className="flex items-baseline gap-2">
          <h3 className="font-display text-lg font-semibold text-primary">{prayer.label}</h3>
          <span className="arabic-font text-accent">{prayer.arabic}</span>
        </div>
        <TotalBadge segments={prayer.segments} />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {prayer.segments.map((segment, i) => (
          <div key={i} className="flex items-center gap-2">
            <RakahChip segment={segment} />
            {i < prayer.segments.length - 1 && (
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Jummah and Eid both fall outside the plain daily-prayer row shape above — each mixes rak'ah
// chips with a non-rak'ah Khutbah segment, so they share this renderer instead of PrayerRow.
function SpecialPrayerRow({ structure, title }) {
  return (
    <div className="pt-6 border-t border-border">
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <div className="flex items-baseline gap-2">
          <h3 className="font-display text-xl font-semibold text-primary">{title}</h3>
          <span className="arabic-font text-accent">{structure.arabic}</span>
        </div>
      </div>
      {(structure.appliesTo || structure.note) && (
        <p className="text-sm text-muted-foreground mb-4">{structure.appliesTo || structure.note}</p>
      )}
      <div className="p-4 rounded-xl border border-border">
        <div className="flex flex-wrap items-center gap-2">
          {structure.segments.map((segment, i) => {
            const isLast = i === structure.segments.length - 1;
            return (
              <div key={i} className="flex items-center gap-2">
                {segment.type === "khutbah" ? (
                  <span
                    title={segment.note}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg border border-dashed border-border text-sm font-medium text-muted-foreground"
                  >
                    {segment.label}
                  </span>
                ) : (
                  <div className="flex flex-col items-center gap-0.5">
                    <RakahChip segment={segment} />
                    {segment.caption && (
                      <span className="text-[10px] text-muted-foreground">{segment.caption}</span>
                    )}
                  </div>
                )}
                {!isLast && <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Legend() {
  const order = [
    RAKAH_TYPES.FARZ,
    RAKAH_TYPES.WITR_WAJIB,
    RAKAH_TYPES.EID_PRAYER,
    RAKAH_TYPES.SUNNAH_MUAKKADAH,
    RAKAH_TYPES.SUNNAH_GHAIR_MUAKKADAH,
    RAKAH_TYPES.NAFL,
  ];
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground mb-6">
      {order.map((type) => (
        <div key={type} className="flex items-center gap-1.5">
          <span className={cn("w-3 h-3 rounded-sm border shrink-0", CHIP_STYLES[type])} />
          <span>
            <span className="font-medium text-foreground">{RAKAH_TYPE_META[type].fullLabel}</span>
            {" — "}
            {RAKAH_TYPE_META[type].description}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function NamazFormatChart() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">
          Daily Prayer Format
        </h2>
        <p className="text-xl text-accent arabic-font mb-2">ترتيب الصلاة</p>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Each prayer's full rak'ah sequence, in the order you actually pray it — not just the
          Farz, but the Sunnah, Nafl, and Witr around it.
        </p>
      </div>

      <Legend />

      <div className="space-y-3">
        {PRAYER_RAKAH_CHART.map((prayer) => (
          <PrayerRow key={prayer.key} prayer={prayer} />
        ))}
      </div>

      <SpecialPrayerRow structure={JUMMAH_STRUCTURE} title={`${JUMMAH_STRUCTURE.label} (Friday Prayer)`} />
      <SpecialPrayerRow structure={EID_STRUCTURE} title="Eid Prayer" />

      <div className="space-y-3">
        <div className="p-4 rounded-xl bg-accent/5 border-l-4 border-accent text-sm text-muted-foreground">
          {SUNNAH_MUAKKADAH_NOTE}
        </div>
        <div className="p-4 rounded-xl bg-primary/5 border-l-4 border-primary text-sm text-muted-foreground">
          <span className="font-medium text-foreground">A note on Witr: </span>
          {WITR_MADHAB_NOTE}
        </div>
        <div className="p-4 rounded-xl bg-primary/5 border-l-4 border-primary text-sm text-muted-foreground">
          <span className="font-medium text-foreground">A note on Eid: </span>
          {EID_MADHAB_NOTE}
        </div>
      </div>
    </div>
  );
}
