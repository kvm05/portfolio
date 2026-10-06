"use client";

import { useEffect, useRef, useState } from "react";
import { useLoading } from "./LoadingContext";

const PHRASES = [
  "Calibrating the hyperdrive",
  "Warming up the cloud",
  "Compiling coffee into code",
  "Spinning up a few containers",
  "Checking for off-by-one errors",
  "Asking the rubber duck for advice",
  "Rerouting power to the front end",
  "Plotting a course through the stack",
  "Reticulating splines",
  "Counting stars in constant time",
  "Pushing to prod on a Friday",
  "Almost there, I promise",
];

const LINE_REM = 2; // height of one carousel line
const STEP_MS = 700; // time between phrases
const MAX_STEPS = 5; // 0.7s x 5 = 3.5s, then the jump ends

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const smooth = (n) => n * n * (3 - 2 * n);

export default function LoadingScreen() {
  const { visible, mounted } = useLoading();
  const canvasRef = useRef(null);
  const [phrases, setPhrases] = useState(PHRASES);
  const [index, setIndex] = useState(0);

  // Shuffle on the client only, so server and client markup match on first render
  useEffect(() => {
    setPhrases(shuffle(PHRASES));
  }, []);

  // Vertical carousel
  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setIndex((i) => Math.min(i + 1, MAX_STEPS));
    }, STEP_MS);
    return () => clearInterval(timer);
  }, [mounted]);

  // Hyperspace jump (4s): stars accelerate into streaks, flash, then drop out of warp
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let stars = [];
    let raf;
    let last = performance.now();
    const start = last;
    const COUNT = 520;

    const spawn = (star, anywhere) => {
      star.angle = Math.random() * Math.PI * 2;
      star.r = w * (0.04 + Math.random() * 0.96);
      star.z = anywhere ? 1 + Math.random() * (w * 2 - 1) : w * 2;
      return star;
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: COUNT }, () => spawn({}, true));
    };

    const draw = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = (now - start) / 1000;

      // Speed ramps up hard, then eases back out as the jump ends
      const ramp = 1.5 + 90 * Math.pow(Math.min(t / 3.2, 1), 3);
      const exit = smooth(clamp((t - 3.5) / 0.5, 0, 1));
      const speed = reduceMotion ? 3 : ramp * (1 - exit) + 1.5 * exit;
      const step = speed * dt * 60;

      const cx = w / 2;
      const cy = h / 2;
      const focal = w * 0.35;
      const depth = w * 2;

      ctx.fillStyle = "rgba(5, 7, 13, 0.4)";
      ctx.fillRect(0, 0, w, h);

      ctx.lineCap = "round";
      for (const s of stars) {
        s.z -= step;
        const cos = Math.cos(s.angle);
        const sin = Math.sin(s.angle);
        const r1 = (s.r / s.z) * focal;
        const x1 = cx + cos * r1;
        const y1 = cy + sin * r1;

        if (s.z < 1 || x1 < -50 || x1 > w + 50 || y1 < -50 || y1 > h + 50) {
          spawn(s, false);
          continue;
        }

        const r0 = (s.r / (s.z + step * 3)) * focal;
        const near = 1 - s.z / depth;
        ctx.strokeStyle = `rgba(200, 222, 255, ${(0.15 + near * 0.85).toFixed(2)})`;
        ctx.lineWidth = 0.5 + near * 1.8;
        ctx.beginPath();
        ctx.moveTo(cx + cos * r0, cy + sin * r0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }

      // White flash at the moment of the jump
      if (!reduceMotion && t > 3.0) {
        const flash = t < 3.5 ? smooth(clamp((t - 3.0) / 0.5, 0, 1)) : 1 - smooth(clamp((t - 3.5) / 0.5, 0, 1));
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.hypot(w, h) / 1.6);
        grad.addColorStop(0, `rgba(255, 255, 255, ${flash})`);
        grad.addColorStop(0.5, `rgba(190, 215, 255, ${flash * 0.75})`);
        grad.addColorStop(1, `rgba(5, 7, 13, ${flash * 0.2})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    ctx.fillStyle = "#05070d";
    ctx.fillRect(0, 0, w, h);
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-space overflow-hidden transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      role="status"
      aria-label="Loading"
    >
      <style>{`
        @keyframes hj-content-out {
          0%, 72% { opacity: 1; }
          88%, 100% { opacity: 0; }
        }
        @keyframes hj-logo-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes hj-pulse {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(232, 185, 91, 0.35)); }
          50% { filter: drop-shadow(0 0 22px rgba(232, 185, 91, 0.7)); }
        }
      `}</style>

      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />

      <div
        className="absolute inset-0"
        style={{ animation: "hj-content-out 4s linear forwards" }}
      >
        {/* Logo, dead centre */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="rounded-full p-6"
            style={{
              background:
                "radial-gradient(circle, rgba(5,7,13,0.75) 0%, rgba(5,7,13,0.45) 55%, rgba(5,7,13,0) 100%)",
              animation: "hj-logo-in 0.8s ease-out both",
            }}
          >
            <img
              src="/km-logo-fill.svg"
              alt="KM"
              className="w-24 sm:w-28 block"
              style={{ animation: "hj-pulse 1.6s ease-in-out infinite" }}
            />
          </div>
        </div>

        {/* Vertical phrase carousel under the logo */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[90%] max-w-md overflow-hidden"
          style={{
            top: "calc(50% + 6.5rem)",
            height: `${LINE_REM * 3}rem`,
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
            maskImage:
              "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
          }}
        >
          <div
            className="transition-transform duration-500 ease-out"
            style={{ transform: `translateY(${(1 - index) * LINE_REM}rem)` }}
          >
            {phrases.slice(0, MAX_STEPS + 2).map((phrase, i) => (
              <div
                key={phrase}
                className={`flex items-center justify-center text-center font-display text-xs sm:text-sm tracking-widest uppercase transition-colors duration-500 ${
                  i === index ? "text-white" : "text-white/25"
                }`}
                style={{ height: `${LINE_REM}rem` }}
              >
                {phrase}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}