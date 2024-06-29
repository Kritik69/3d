"use client";

import { Text, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AnimationAction, Group, MathUtils } from "three";

// useGLTF("/jambusariyas_animation_2.glb");

export default function Cube() {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { damping: 0.5, stiffness: 10 });
  const group = useRef<Group>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const { nodes, animations, scene } = useGLTF(
    "/jambusariyas_animation_FULL.glb"
  );
  const { actions } = useAnimations(animations, scene);

  useFrame(({ camera }) => {
    group.current?.rotateY(MathUtils.degToRad(0.3));
    // console.log(actions);
    Object.keys(actions).forEach((key) => {
      const action = actions[key] as AnimationAction;
      action.play().paused = true;
      action.time = spring.get();
    });
  });

  useEffect(() => {
    setTimeout(() => {
      motionVal.set(1);
    }, 3500);
  }, []);

  const handleClick = () => {
    if (isAnimating) {
      motionVal.set(0);
    } else {
      motionVal.set(1);
    }
    setIsAnimating(!isAnimating);
  };

  return (
    // <group
    //   onPointerUp={() => motionVal.set(0)}
    //   onPointerDown={() => motionVal.set(0.5)}
    //   ref={group}
    // >
    <group onClick={handleClick} ref={group}>
      <primitive object={scene} />
    </group>
  );
}
