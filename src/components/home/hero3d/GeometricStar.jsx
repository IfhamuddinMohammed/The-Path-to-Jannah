import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createStarShape(points, outerRadius, innerRadius) {
  const shape = new THREE.Shape();
  const angleStep = Math.PI / points;
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = i * angleStep - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

export default function GeometricStar({ position = [0, 0, 0], scale = 1, speed = 0.15 }) {
  const mesh = useRef();

  const geometry = useMemo(() => {
    const shape = createStarShape(8, 1, 0.42);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 4,
      curveSegments: 2,
    });
    geo.center();
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.z += delta * speed;
  });

  return (
    <mesh ref={mesh} geometry={geometry} position={position} scale={scale}>
      <meshStandardMaterial
        color="hsl(38, 40%, 52%)"
        metalness={0.85}
        roughness={0.28}
        emissive="hsl(38, 55%, 50%)"
        emissiveIntensity={0.22}
      />
    </mesh>
  );
}
