// Original full-body, faceless, side-profile robed silhouettes for the four core Salah
// postures — standing, ruku' (bowing), sujood (prostration), and sitting. Styled after, but not
// copied from, a reference booklet's clean single-stroke illustration of a person in Sujood
// that the user shared: a soft rounded outline with a couple of interior fold-lines for the
// robe, no facial features, light fill + a bolder stroke. These are original shapes drawn for
// this app, in its own palette rather than the reference's blue.

function Standing({ color, fill }) {
  return (
    <>
      <circle cx="50" cy="20" r="8" style={{ fill, stroke: color }} strokeWidth={2} />
      <path
        d="M 43 27 Q 38 31 37 40 L 35 78 Q 34 85 41 87 L 59 87 Q 66 85 65 78 L 63 40 Q 62 31 57 27 Z"
        style={{ fill, stroke: color }}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path d="M 44 45 L 42 75 M 56 45 L 58 75" stroke={color} strokeWidth={1} opacity={0.5} fill="none" />
      <path d="M 47 55 Q 50 58 53 55" stroke={color} strokeWidth={1.5} fill="none" opacity={0.7} />
    </>
  );
}

function Ruku({ color, fill }) {
  return (
    <>
      <circle cx="20" cy="56" r="7" style={{ fill, stroke: color }} strokeWidth={2} />
      <path
        d="M 26 56 Q 40 50 54 52 Q 62 53 66 58 L 70 60 L 68 66 L 30 62 Q 27 61 26 58 Z"
        style={{ fill, stroke: color }}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M 60 58 Q 76 58 78 66 L 80 82 Q 81 88 74 89 L 63 89 Q 57 88 58 82 L 58 64 Z"
        style={{ fill, stroke: color }}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path d="M 34 60 Q 37 68 40 78" stroke={color} strokeWidth={2} strokeLinecap="round" fill="none" />
      <path d="M 64 68 L 66 82 M 71 68 L 72 82" stroke={color} strokeWidth={1} opacity={0.5} fill="none" />
    </>
  );
}

function Sujood({ color, fill }) {
  return (
    <>
      <circle cx="18" cy="78" r="6.5" style={{ fill, stroke: color }} strokeWidth={2} />
      <path
        d="M 23 76 Q 34 70 44 66 Q 55 61 64 60"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 60 58 Q 74 54 82 61 L 85 74 Q 86 82 78 84 L 65 85 Q 59 83 61 77 Z"
        style={{ fill, stroke: color }}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M 40 68 Q 30 73 22 78"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
      />
      <path d="M 68 66 Q 74 70 76 78" stroke={color} strokeWidth={1} opacity={0.5} fill="none" />
    </>
  );
}

function Sitting({ color, fill }) {
  return (
    <>
      <circle cx="53" cy="34" r="7.5" style={{ fill, stroke: color }} strokeWidth={2} />
      <path
        d="M 45 42 Q 40 45 40 52 L 40 72 Q 53 78 66 72 L 66 52 Q 66 45 61 42 Z"
        style={{ fill, stroke: color }}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M 33 72 Q 27 77 33 82 L 74 82 Q 80 77 73 72 Q 60 76 53 74 Q 45 76 33 72 Z"
        style={{ fill, stroke: color }}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path d="M 47 50 L 46 68 M 59 50 L 60 68" stroke={color} strokeWidth={1} opacity={0.5} fill="none" />
    </>
  );
}

const POSTURES = { standing: Standing, ruku: Ruku, sujood: Sujood, sitting: Sitting };

export default function SalahPostureSilhouette({ posture, className, color = "hsl(var(--primary))" }) {
  const Posture = POSTURES[posture] || Standing;
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <Posture color={color} fill="hsl(var(--primary) / 0.12)" />
    </svg>
  );
}
