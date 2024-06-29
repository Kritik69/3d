"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CubeScene = dynamic(() => import("@/components/explosion/cube-scene"), {
  ssr: false,
});

export default function Home() {
  const [countdown, setCountdown] = useState(4);

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
    <main
      className="h-full"
      style={{
        background: "linear-gradient(to right, #79161b, black)", // Adjust colors as needed
        height: "100vh",
      }}
    >
      <p
        style={{
          fontSize: "48px",
          color: "#79161b",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {countdown !== 0 ? `Get ready in ${countdown}...` : "Runnn!!!!!!"}
      </p>
      <div style={{ height: "80vh" }}>
        <CubeScene />
      </div>
      {countdown !== 0 ? null : (
        <p
          style={{
            fontSize: "8px",
            color: "#79161b",
            fontWeight: "bold",
            textAlign: "center",
            position: "absolute",
            top: "2%",
            right: "2%",
          }}
        >
          {countdown !== 0
            ? `Get ready in ${countdown}...`
            : "Click on exploded cube to combine!"}
        </p>
      )}
    </main>
  );
}
