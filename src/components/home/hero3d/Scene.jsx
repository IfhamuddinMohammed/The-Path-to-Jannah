import { Float } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import GeometricStar from "./GeometricStar";
import CrescentMoon3D from "./CrescentMoon3D";
import GoldStarfield from "./GoldStarfield";
import CameraRig from "./CameraRig";

export default function Scene({ pointerRef, reducedMotion, isMobile }) {
  // The hero's text column stays capped at a fixed max-width and centered, but
  // this canvas is always full-bleed — on a wide desktop window the old fixed
  // world-space coordinates (tuned for one "typical" width) drifted into/over
  // the text and buttons. Positioning as a fraction of the actual current
  // viewport (drei's frustum size at z=0) keeps both objects tucked toward the
  // corners regardless of how wide or narrow the window actually is.
  const { viewport } = useThree();
  const halfW = viewport.width / 2;
  const halfH = viewport.height / 2;

  const starPosition = isMobile
    ? [0, -halfH * 0.7, -5]
    : [-halfW * 0.15, -halfH * 0.5, -3.8];
  const moonPosition = isMobile
    ? [halfW * 0.4, halfH * 0.55, -1]
    : [halfW * 0.6, halfH * 0.45, -1];

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} color="#FDFBF7" />
      <pointLight position={[-3, -2, 3]} intensity={0.7} color="hsl(38, 55%, 55%)" />

      <GoldStarfield count={reducedMotion ? 200 : 700} />

      <CameraRig pointerRef={pointerRef}>
        <Float
          speed={reducedMotion ? 0 : 1.2}
          rotationIntensity={reducedMotion ? 0 : 0.3}
          floatIntensity={reducedMotion ? 0 : 0.6}
        >
          <GeometricStar
            position={starPosition}
            scale={isMobile ? 0.55 : 0.75}
            speed={reducedMotion ? 0 : 0.15}
          />
        </Float>
        <Float
          speed={reducedMotion ? 0 : 0.8}
          rotationIntensity={0.1}
          floatIntensity={reducedMotion ? 0 : 0.4}
        >
          <CrescentMoon3D
            position={moonPosition}
            scale={isMobile ? 0.42 : 0.5}
            speed={reducedMotion ? 0 : 0.08}
          />
        </Float>
      </CameraRig>

      {!reducedMotion && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.5} mipmapBlur />
        </EffectComposer>
      )}
    </>
  );
}
