"use client";

import { experience } from "../../lib/data";
import { useLoading } from "../../components/LoadingContext";

export default function ExperiencePage() {
  const { mounted } = useLoading();

  if (mounted) return null;

  return (
    <main className="w-[70%] mx-auto py-16 animate-fadeIn">
      <h1 className="font-display text-2xl text-gold mb-10">Experience</h1>
      <div className="space-y-10">
        {experience.map((job) => (
          <div key={job.company} className="panel p-6">
            <div className="flex flex-wrap justify-between items-baseline gap-x-4">
              <h2 className="font-display font-medium text-lg">
                {job.role}, {job.company}
              </h2>
              <span className="font-display text-sm text-white/50">{job.dates}</span>
            </div>
            <p className="font-display text-sm text-white/50 mb-3">{job.place}</p>
            <ul className="font-display text-white/80 leading-relaxed space-y-2 list-disc list-outside ml-5">
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
