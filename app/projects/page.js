"use client";

import { useState } from "react";
import { projects } from "../../lib/data";
import { useLoading } from "../../components/LoadingContext";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectsPage() {
  const { mounted } = useLoading();
  const [selected, setSelected] = useState(null);

  if (mounted) return null;

  const project = projects.find((p) => p.name === selected);

  return (
    <main className="w-full px-6 lg:w-[70%] lg:px-0 min-h-[83vh] mx-auto pt-6 pb-24 lg:py-8 flex flex-col animate-fadeIn">
      <h1 className="font-display text-2xl text-gold mb-6 shrink-0">Projects</h1>

      {!project ? (
        // Nothing selected: tiles centred in the space below the heading.
        // From md up the tiles share grid rows (subgrid), so every title and every
        // subtitle lines up across the three tiles however many lines they wrap to.
        <div className="flex-1 flex items-center my-auto">
          <div className="grid grid-cols-1 gap-4 w-full animate-fadeIn md:grid-cols-3 md:gap-x-4 md:gap-y-0 md:grid-rows-[1fr_auto_1fr_auto] md:min-h-[clamp(11rem,33vh,19rem)]">
            {projects.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setSelected(p.name)}
                className="panel !bg-white/[0.07] hover:!bg-white/[0.12] overflow-hidden flex flex-col text-left transition duration-200 hover:-translate-y-1 hover:border-white/30 focus:outline-none focus-visible:border-gold md:row-span-4 md:grid md:[grid-template-rows:subgrid] md:gap-0"
              >
                <h2 className="font-display font-medium text-lg text-left px-5 py-5 md:[grid-row:2] flex items-center">
                  {p.name}
                </h2>
                <p className="font-display text-sm text-white/60 leading-relaxed text-left px-5 pt-2 pb-5 md:[grid-row:4]">
                  {p.tagline}
                </p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        // One selected: tiles collapse into capsules at the top, details below
        <>
          <div className="flex flex-wrap gap-3 shrink-0 animate-fadeIn">
            {projects.map((p) => {
              const active = p.name === selected;
              return (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setSelected(active ? null : p.name)}
                  aria-pressed={active}
                  className={`panel  !bg-white/[0.07] hover:!bg-white/[0.12] !rounded-full px-4 sm:px-5 py-2 transition duration-200 hover:border-white/30 focus:outline-none focus-visible:border-gold ${
                    active ? "!border-gold" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <span className="font-display text-sm font-medium">{p.name}</span>
                </button>
              );
            })}
          </div>

          <div
            key={project.name}
            className="panel p-5 sm:p-6 mt-4 min-h-0 overflow-y-auto animate-fadeIn"
          >
            <h2 className="font-display font-medium text-lg">{project.name}</h2>
            <p className="font-display text-sm text-white/50 mb-1">{project.tagline}</p>
            <p className="font-display text-sm text-white/40 mb-4">{project.tools}</p>
            <p className="font-display text-white/80 leading-relaxed">
              {project.description}
            </p>
            {project.note && (
              <p className="font-display text-sm text-teal mt-3">{project.note} </p> 
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-xs text-teal mt-3 inline-block "
              >
                IEEE<FaExternalLinkAlt className="inline-block ml-1 hover:underline w-2 my-auto h-full" />
              </a>
            )}
          </div>
        </>
      )}
    </main>
  );
}