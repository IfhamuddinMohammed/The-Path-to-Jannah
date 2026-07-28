import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function CameraRig({ pointerRef, children }) {
  const group = useRef();

  useFrame(() => {
    if (!group.current || !pointerRef?.current) return;
    const { x, y } = pointerRef.current;
    group.current.rotation.y += (x * 0.18 - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (-y * 0.1 - group.current.rotation.x) * 0.04;
  });

  return <group ref={group}>{children}</group>;
}
