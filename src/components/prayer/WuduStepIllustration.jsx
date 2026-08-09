import { motion } from "framer-motion";

// Original single-stroke line-art illustrations for each Wudu step — loose, hand-drawn-style
// silhouettes (head profile, a simple hand shape, a forearm, a foot) built from a small set of
// reusable path fragments, each finished with a small looping animation matching the action
// (falling drips while washing, a swirl while rinsing, a swipe while wiping, a soft burst on
// completion). Styled after — but not copied from — a reference Wudu booklet's clean single-
// stroke illustration style; these are original shapes drawn for this app.

const HEAD_PROFILE =
  "M 46 18 Q 34 18 30 30 Q 27 40 34 47 Q 36 49 38 51 Q 41 55 46 53 Q 50 57 48 62 " +
  "Q 46 66 42 65 Q 40 70 42 76 L 42 88";
const EAR_LOOP = "M 30 38 Q 25 40 27 45 Q 29 48 32 45";

function HeadProfile({ color, showEar }) {
  return (
    <>
      <path d={HEAD_PROFILE} stroke={color} strokeWidth={2.4} strokeLinecap="round" fill="none" />
      {showEar && (
        <path d={EAR_LOOP} stroke={color} strokeWidth={2} strokeLinecap="round" fill="none" />
      )}
    </>
  );
}

function HandBlob({ x, y, rotate = 0, color }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <path
        d="M -10 6 Q -12 -4 -6 -8 Q -2 -11 2 -9 Q 7 -12 10 -8 Q 13 -4 10 2 Q 9 7 4 8 Q -4 10 -10 6 Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M -3 -8 Q -2 -3 -3 2" stroke={color} strokeWidth={1.3} fill="none" />
      <path d="M 2 -9 Q 3 -3 2 3" stroke={color} strokeWidth={1.3} fill="none" />
    </g>
  );
}

function CuppedHands({ color }) {
  return (
    <path
      d="M 26 60 Q 24 50 32 46 Q 38 43 44 46 Q 50 43 56 46 Q 64 50 62 60 Q 60 68 50 68 Q 46 72 42 68 Q 32 68 26 60 Z"
      stroke={color}
      strokeWidth={2.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  );
}

function Forearm({ color }) {
  return (
    <>
      <path
        d="M 40 20 Q 36 20 35 26 L 33 56 Q 32 62 38 64 L 56 64 Q 62 62 60 55 L 58 26 Q 57 20 52 20 Z"
        stroke={color}
        strokeWidth={2.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <HandBlob x={48} y={70} rotate={90} color={color} />
    </>
  );
}

function FootShape({ color }) {
  return (
    <path
      d="M 30 30 Q 28 26 32 24 Q 36 22 38 26 L 40 40 Q 60 40 66 48 Q 70 54 66 60 Q 60 66 44 64 Q 32 62 28 54 Q 26 44 30 30 Z"
      stroke={color}
      strokeWidth={2.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  );
}

function HeadDome({ color }) {
  return (
    <path
      d="M 22 46 Q 20 26 40 20 Q 60 14 70 30 Q 74 40 70 48"
      stroke={color}
      strokeWidth={2.3}
      strokeLinecap="round"
      fill="none"
    />
  );
}

function DripMotif({ color, cx = 50 }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={cx + (i - 1) * 12}
          r={2.4}
          style={{ fill: color }}
          initial={{ cy: 12, opacity: 0 }}
          animate={{ cy: [12, 42], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.32, ease: "easeIn" }}
        />
      ))}
    </>
  );
}

function SwirlMotif({ color, cx = 50, cy = 50 }) {
  return (
    <motion.path
      d={`M ${cx - 12} ${cy} Q ${cx - 4} ${cy - 6} ${cx} ${cy} T ${cx + 16} ${cy}`}
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0.35 }}
      animate={{ pathLength: [0, 1], opacity: [0.35, 1, 0.35] }}
      transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function WipeMotif({ color }) {
  return (
    <motion.circle
      r={3}
      cy={30}
      style={{ fill: color }}
      initial={{ cx: 26 }}
      animate={{ cx: [26, 66, 26] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function BurstMotif({ color }) {
  return (
    <>
      {[14, 21, 28].map((r, i) => (
        <motion.circle
          key={r}
          cx={50}
          cy={55}
          r={r}
          stroke={color}
          strokeWidth={1.4}
          fill="none"
          initial={{ opacity: 0.5, scale: 0.9 }}
          animate={{ opacity: [0.5, 0], scale: [0.9, 1.25] }}
          transition={{ duration: 1.7, repeat: Infinity, delay: i * 0.28, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

const TONES = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
];

function StepArt({ stepIndex, color }) {
  switch (stepIndex) {
    case 0: // hands
      return (
        <>
          <CuppedHands color={color} />
          <path d="M 44 6 L 44 26" stroke={color} strokeWidth={2} strokeLinecap="round" fill="none" opacity={0.5} />
          <DripMotif color={color} cx={44} />
        </>
      );
    case 1: // mouth rinse
      return (
        <>
          <HeadProfile color={color} showEar />
          <HandBlob x={44} y={54} rotate={20} color={color} />
          <SwirlMotif color={color} cx={44} cy={53} />
        </>
      );
    case 2: // nose
      return (
        <>
          <HeadProfile color={color} showEar />
          <HandBlob x={44} y={40} rotate={-10} color={color} />
          <SwirlMotif color={color} cx={44} cy={36} />
        </>
      );
    case 3: // face
      return (
        <>
          <HeadProfile color={color} showEar />
          <HandBlob x={38} y={30} rotate={40} color={color} />
          <DripMotif color={color} cx={40} />
        </>
      );
    case 4: // arms
      return (
        <>
          <Forearm color={color} />
          <DripMotif color={color} cx={46} />
        </>
      );
    case 5: // head masah
      return (
        <>
          <HeadDome color={color} />
          <HandBlob x={40} y={22} rotate={100} color={color} />
          <WipeMotif color={color} />
        </>
      );
    case 6: // ears
      return (
        <>
          <HeadProfile color={color} showEar={false} />
          <path d="M 28 36 Q 22 39 25 45 Q 28 49 33 45" stroke={color} strokeWidth={2.4} strokeLinecap="round" fill="none" />
          <HandBlob x={30} y={41} rotate={-30} color={color} />
          <WipeMotif color={color} />
        </>
      );
    case 7: // feet
      return (
        <>
          <FootShape color={color} />
          <HandBlob x={34} y={54} rotate={60} color={color} />
          <DripMotif color={color} cx={44} />
        </>
      );
    case 8: // completion / dua
    default:
      return (
        <>
          <CuppedHands color={color} />
          <path d="M 30 44 Q 44 30 58 44" stroke={color} strokeWidth={1.6} fill="none" opacity={0.6} />
          <BurstMotif color={color} />
        </>
      );
  }
}

export default function WuduStepIllustration({ stepIndex, className }) {
  const color = TONES[stepIndex % TONES.length];
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <StepArt stepIndex={stepIndex} color={color} />
    </svg>
  );
}
