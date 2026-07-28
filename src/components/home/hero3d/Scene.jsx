import { Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import GeometricStar from "./GeometricStar";
import CrescentMoon3D from "./CrescentMoon3D";
import GoldStarfield from "./GoldStarfield";
import CameraRig from "./CameraRig";

export default function Scene({ pointerRef, reducedMotion, isMobile }) {
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
            position={isMobile ? [0, -5.2, -5] : [-0.4, -3, -3.8]}
            scale={isMobile ? 0.65 : 1.1}
            speed={reducedMotion ? 0 : 0.15}
          />
        </Float>
        <Float
          speed={reducedMotion ? 0 : 0.8}
          rotationIntensity={0.1}
          floatIntensity={reducedMotion ? 0 : 0.4}
        >
          <CrescentMoon3D
            position={isMobile ? [1.6, 3.4, -1] : [3.1, 2, -1]}
            scale={isMobile ? 0.5 : 0.7}
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
