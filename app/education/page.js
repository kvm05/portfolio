"use client";

import { education } from "../../lib/data";
import { useLoading } from "../../components/LoadingContext";

export default function EducationPage() {
  const { mounted } = useLoading();

  if (mounted) return null;

  return (
    <main className="w-[70%] mx-auto py-16 animate-fadeIn">
      <h1 className="font-display text-2xl text-gold mb-10">Education</h1>
      <div className="space-y-6">
        {education.map((e) => (
          <div key={e.school} className="panel p-6 flex flex-wrap justify-between items-baseline gap-x-4">
            <div>
              <h2 className="font-display font-medium">{e.school}</h2>
              <p className="font-display text-sm text-white/70">{e.degree}</p>
            </div>
            <span className="font-display text-sm text-white/50">{e.dates}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
