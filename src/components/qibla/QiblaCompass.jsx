import { RefreshCw } from "lucide-react";
import { bearingToCompassPoint } from "@/lib/qibla";
import { cn } from "@/lib/utils";

const ALIGNMENT_THRESHOLD_DEG = 8;

function angleDiff(a, b) {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

export default function QiblaCompass({
  qiblaDirection,
  deviceHeading,
  compassSupported,
  isCalibrating,
}) {
  const relativeAngle = qiblaDirection - deviceHeading;
  const isAligned =
    compassSupported && angleDiff(qiblaDirection, deviceHeading) <= ALIGNMENT_THRESHOLD_DEG;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64">
        <div
          className={cn(
            "absolute inset-0 rounded-full border-4 bg-card shadow-lg transition-colors duration-300",
            isAligned ? "border-primary shadow-primary/30" : "border-border"
          )}
        >
          <div className="absolute inset-4 rounded-full border border-border">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-bold text-muted-foreground">N</div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-bold text-muted-foreground">S</div>
            <div className="absolute top-1/2 left-2 -translate-y-1/2 text-sm font-bold text-muted-foreground">W</div>
            <div className="absolute top-1/2 right-2 -translate-y-1/2 text-sm font-bold text-muted-foreground">E</div>

            {qiblaDirection !== null && (
              <div
                className="absolute top-1/2 left-1/2 origin-bottom"
                style={{
                  transform: `translate(-50%, -100%) rotate(${relativeAngle}deg)`,
                  height: "88px",
                }}
              >
                <div
                  className={cn(
                    "w-8 h-8 -ml-4 rounded-full border-2 bg-card shadow-md flex items-center justify-center text-lg transition-colors duration-300",
                    isAligned ? "border-primary ring-2 ring-primary/40" : "border-accent"
                  )}
                >
                  🕋
                </div>
                <div
                  className={cn(
                    "w-1 h-14 mx-auto transition-colors duration-300",
                    isAligned ? "bg-primary" : "bg-accent"
                  )}
                />
              </div>
            )}

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-foreground/60" />
            </div>
          </div>
        </div>

        {compassSupported && (
          <div
            className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-card border border-border shadow flex items-center justify-center"
            title="Move your phone in a figure-8 motion to calibrate"
          >
            <RefreshCw
              className={cn(
                "w-4 h-4 text-muted-foreground",
                isCalibrating && "animate-spin"
              )}
              style={isCalibrating ? { animationDuration: "1.5s" } : undefined}
            />
          </div>
        )}
      </div>

      {qiblaDirection !== null && (
        <div className="text-center mt-4">
          <p className="text-2xl font-semibold text-primary font-display">
            {qiblaDirection.toFixed(1)}°{" "}
            <span className="text-lg text-accent">{bearingToCompassPoint(qiblaDirection)}</span>
          </p>
          {isAligned && (
            <p className="text-sm font-medium text-primary mt-1">
              You're facing the Qibla
            </p>
          )}
        </div>
      )}
    </div>
  );
}
