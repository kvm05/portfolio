"use client";

import { useEffect, useState } from "react";
import { GiRocket } from "react-icons/gi";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const LINES = Array.from({ length: 16 }, (_, i) => i * 22.5);

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const hide = setTimeout(() => setVisible(false), 2000);
    const unmount = setTimeout(() => setMounted(false), 2500);
    return () => {
      clearTimeout(hide);
      clearTimeout(unmount);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-space flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
        <g transform="translate(200,200)">
          {LINES.map((deg, i) => (
            <line
              key={deg}
              x1="0"
              y1="0"
              x2="0"
              y2="-180"
              stroke="white"
              strokeWidth="1"
              transform={`rotate(${deg})`}
              style={{
                strokeDasharray: 180,
                strokeDashoffset: 180,
                animation: "hyperspace 1.2s ease-out forwards",
                animationDelay: `${i * 20}ms`,
              }}
            />
          ))}
        </g>
      </svg>

      <div className="animate-launch">
            <DotLottieReact
              src="RocketLaunch.lottie"
              loop
              autoplay
            />
      </div>
    </div>
  );
}