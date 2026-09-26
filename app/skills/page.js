import { skills } from "../../lib/data";

export default function SkillsPage() {
  return (
    <main className="max-w-prose mx-auto px-6 py-16 animate-fadeIn">
      <h1 className="font-display text-2xl text-gold mb-10">Skills</h1>
      <div className="panel p-6 space-y-3">
        {skills.map((s) => (
          <p key={s.label} className="font-display text-white/80">
            <span className="text-white/50">{s.label}: </span>
            {s.items}
          </p>
        ))}
      </div>
    </main>
  );
}
