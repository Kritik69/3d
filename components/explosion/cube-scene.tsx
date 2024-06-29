import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useSpring, animated } from "react-spring";
import Cube from "./cube";
import { Center, Text, Html } from "@react-three/drei";

const Scene = () => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown === 0) {
      null;
    } else {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <Canvas gl={{ antialias: true }} dpr={[1, 1.5]}>
      <directionalLight position={[-5, -5, -5]} intensity={2} />
      <Suspense fallback={null}>
        <Center>
          <Cube />
        </Center>
      </Suspense>
    </Canvas>
  );
};

export default Scene;
