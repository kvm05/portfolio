"use client";

import { useState } from "react";
import { experience } from "../../lib/data";
import { useLoading } from "../../components/LoadingContext";

// Drop each logo into /public/ using these file names (or edit the paths).
const logos = {
  Barclays: "/barclays-logo.png",
  "Procura / Advance Mobility": "/procura-logo.png",
  "Arcon Techsolutions": "/arcon-logo.jpg",
};

function Logo({ company, small = false }) {
  const [failed, setFailed] = useState(false);
  const src = logos[company];

  if (!src || failed) {
    return (
      <span
        className={`font-display font-medium text-white/60 ${
          small ? "text-sm" : "text-4xl"
        }`}
      >
        {company.charAt(0)}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={`${company} logo`}
      onError={() => setFailed(true)}
      className="block h-full w-full object-contain object-center"
    />
  );
}

export default function ExperiencePage() {
  const { mounted } = useLoading();
  const [selected, setSelected] = useState(null);

  if (mounted) return null;

  const job = experience.find((j) => j.company === selected);

  return (
    <main className="w-[70%] min-h-[83vh] mx-auto py-8 flex flex-col animate-fadeIn">
      <h1 className="font-display text-2xl text-gold mb-6 shrink-0">Experience</h1>

      {!job ? (
        // Nothing selected: tiles centred in the space below the heading
        <div className="flex-1 flex items-center my-auto">
          <div className="grid grid-cols-3 gap-4 w-full animate-fadeIn">
            {experience.map((j) => (
              <button
                key={j.company}
                type="button"
                onClick={() => setSelected(j.company)}
                className="panel !bg-white/[0.07] hover:!bg-white/[0.12] text-left overflow-hidden flex flex-col transition duration-200 hover:-translate-y-1 hover:border-white/30 focus:outline-none focus-visible:border-gold"
              >
                <div className="h-[clamp(8rem,30vh,16rem)] w-full flex items-center justify-center p-4">
                  <Logo company={j.company} />
                </div>
                <h2 className="font-display font-medium text-sm sm:text-base px-4 py-3">
                  {j.company}
                </h2>
              </button>
            ))}
          </div>
        </div>
      ) : (
        // One selected: tiles collapse into capsules at the top, details below
        <>
          <div className="flex flex-wrap gap-3 shrink-0 animate-fadeIn">
            {experience.map((j) => {
              const active = j.company === selected;
              return (
                <button
                  key={j.company}
                  type="button"
                  onClick={() => setSelected(active ? null : j.company)}
                  aria-pressed={active}
                  className={`panel !bg-transparent !rounded-full flex items-center gap-3 pl-2 pr-5 py-2 transition duration-200 hover:border-white/30 focus:outline-none focus-visible:border-gold ${
                    active ? "!border-gold" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <span className="h-8 w-8 shrink-0 flex items-center justify-center">
                    <Logo company={j.company} small />
                  </span>
                  <span className="font-display text-sm font-medium">{j.company}</span>
                </button>
              );
            })}
          </div>

          <div
            key={job.company}
            className="panel p-6 mt-4 min-h-0 overflow-y-auto animate-fadeIn"
          >
            <div className="flex flex-wrap justify-between items-baseline gap-x-4">
              <h2 className="font-display font-medium text-lg">
                {job.role}, <span className="text-teal">{job.company}</span>
              </h2>
              <span className="font-display text-sm text-white/50">{job.dates}</span>
            </div>
            <p className="font-display text-sm text-white/50 mb-4">{job.place}</p>
            <ul className="font-sans text-white/80 leading-relaxed space-y-2 list-disc list-outside ml-5">
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </main>
  );
}