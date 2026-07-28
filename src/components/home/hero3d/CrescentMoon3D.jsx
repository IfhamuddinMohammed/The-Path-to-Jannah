import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createCrescentShape(outerRadius, cutOffset, cutRadius) {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(cutOffset, 0, cutRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  return shape;
}

export default function CrescentMoon3D({ position = [0, 0, 0], scale = 1, speed = 0.08 }) {
  const mesh = useRef();

  const geometry = useMemo(() => {
    const shape = createCrescentShape(1, 0.2, 1.1);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.035,
      bevelSegments: 3,
      curveSegments: 32,
    });
    geo.center();
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * speed;
  });

  return (
    <mesh ref={mesh} geometry={geometry} position={position} scale={scale} rotation={[0, 0, 0.35]}>
      <meshStandardMaterial
        color="hsl(38, 48%, 62%)"
        metalness={0.6}
        roughness={0.32}
        emissive="hsl(38, 55%, 55%)"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}
