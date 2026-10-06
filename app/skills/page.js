"use client";

import { useState } from "react";
import {
  FaJava,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaAws,
  FaCode,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiNextdotjs,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiFirebase,
} from "react-icons/si";
import { skills } from "../../lib/data";
import { useLoading } from "../../components/LoadingContext";

// Keys match the item names in lib/data.js. Anything missing falls back to a generic code icon.
const icons = {
  Java: FaJava,
  Python: FaPython,
  "C++": SiCplusplus,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  JavaScript: FaJs,
  React: FaReact,
  "Next.js": SiNextdotjs,
  "Node.js": FaNodeJs,
  AWS: FaAws,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  Firebase: SiFirebase,
};

// 3D flip around the vertical axis. Mouse and touch each trigger one full turn.
function SkillIcon({ name, Icon }) {
  const [on, setOn] = useState(false);

  return (
    <li
      title={name}
      className="group p-2 cursor-default"
      onPointerEnter={() => {
        setOn(true);
      }}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse") return;
        setOn(true);
      }}
    >
      <span
        className="block w-fit"
        style={{
          transformOrigin: "50% 50%",
          animation: on ? "skill-spin-3d 1.0s linear 1" : "none",
        }}
        onAnimationEnd={() => setOn(false)}
      >
        <Icon
          aria-label={name}
          role="img"
          className={`block text-5xl sm:text-6xl transition-colors duration-50 group-hover:text-gold ${
            on ? "text-gold" : "text-white/80"
          }`}
        />
      </span>
    </li>
  );
}

export default function SkillsPage() {
  const { mounted } = useLoading();

  if (mounted) return null;

  return (
    <main className="w-full px-6 lg:w-[70%] lg:px-0 mx-auto pb-24 lg:py-10 animate-fadeIn">
      <style>{`@keyframes skill-spin-3d { from { transform: perspective(300px) rotateY(0deg); } to { transform: perspective(300px) rotateY(360deg); } }`}</style>
      <h1 className="font-display text-2xl text-gold mb-8 lg:mb-10">Skills</h1>
      <div className="panel p-5 sm:p-6 space-y-8">
        {skills.map((s) => (
          <section key={s.label}>
            <h2 className="font-display text-sm text-white/50 mb-4 text-center">{s.label}</h2>
            <ul className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {s.items.split(",").map((raw) => {
                const name = raw.trim();
                const Icon = icons[name] || FaCode;
                return <SkillIcon key={name} name={name} Icon={Icon} />;
              })} 
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}