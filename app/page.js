"use client";

import Link from "next/link";
import { useLoading } from "../components/LoadingContext";
import { education, experience, projects, skills } from "../lib/data";
import { TbChevronCompactDown } from "react-icons/tb";

const pagePreviews = [
  {
    href: "/experience",
    title: "Experience",
    eyebrow: "Mission log",
    description: "Cloud infrastructure, migrations and security upgrades.",
    detail: `${experience.length} roles, including ${experience[0].company}`,
  },
  {
    href: "/projects",
    title: "Projects",
    eyebrow: "Systems built",
    description: "Applied AI, accessible products and full-stack platforms.",
    detail: `${projects.length} featured projects`,
  },
  {
    href: "/education",
    title: "Education",
    eyebrow: "Training",
    description: "Computer science study across Mumbai and Sydney.",
    detail: `${education.length} academic milestones`,
  },
  {
    href: "/skills",
    title: "Skills",
    eyebrow: "Toolkit",
    description: "Languages, frameworks, cloud services and data platforms.",
    detail: skills.map((skill) => skill.label).join(" · "),
  },
];

export default function Home() {
  const { mounted } = useLoading();

  if (mounted) return null;

  return (
    <main className="w-full px-6 lg:w-[70%] lg:px-0 min-h-[83vh] mx-auto animate-fadeIn py-8 lg:py-10">
      <section
        className="w-full flex flex-col lg:min-h-[80vh]"
        style={{ perspective: "400px" }}
      >
        <div className="flex flex-1 flex-col lg:flex-row items-center lg:items-start gap-8">
          <div className="flex items-center justify-center w-64 sm:w-72 h-full my-auto border-2 lg:mr-16 border-gold overflow-hidden animate-crtOn shrink-0">
            <img
              src="/Kartik_Photo.jpeg"
              alt="Kartik Menon"
              className="w-full h-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_3px)] animate-scanFade"
              style={{ animationDelay: "1.1s" }}
            />
          </div>

          <div className="flex-1 w-full my-auto text-left animate-crawl" style={{ transformOrigin: "top" }}>
            <p className="font-display text-gold text-xs sm:text-sm tracking-wide mb-2 sm:mb-4">
              Software engineer, currently studying at USyd
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight mb-3 sm:mb-6">
              Kartik Menon
            </h1>

            <p className="font-display text-gold text-base  leading-relaxed text-left lg:text-justify">
              Two years into a mission at Barclays, building the cloud
              infrastructure that keeps a global bank running. Backup systems
              deployed, resiliency tested under fire, legacy servers upgraded
              before they became a liability. Now charting a new course
              through a Master of Computer Science at the University of
              Sydney, in search of harder problems and bigger systems.
            </p>
            <Link
              href="#explore-mission"
              onClick={(event) => {
                event.preventDefault();
                const target = document.getElementById("explore-mission");
                if (!target) return;

                const start = window.scrollY;
                const distance = target.getBoundingClientRect().top;
                const duration = 1800;
                const startedAt = performance.now();

                const animateScroll = (timestamp) => {
                  const progress = Math.min((timestamp - startedAt) / duration, 1);
                  const eased =
                    progress < 0.5
                      ? 4 * progress ** 3
                      : 1 - ((-2 * progress + 2) ** 3) / 2;

                  window.scrollTo(0, start + distance * eased);

                  if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                  }
                };

                requestAnimationFrame(animateScroll);
              }}
              className="flex flex-col items-center justify-center self-center font-display text-xs uppercase tracking-widest text-white/50 hover:text-gold transition-colors mt-2 sm:mt-8  animate-crawl"
              style={{ transformOrigin: "top" }}
              
            >
              <p>Scroll down to explore the mission</p>
              <span
                aria-hidden="true"
                className="flex items-center justify-center text-lg text-gold mt-2 animate-bounce"
                style={{ animationIterationCount: 2 }}
              >
                <TbChevronCompactDown />
              </span>
            </Link>
          </div>
        </div>

        
      </section>

      <section id="explore-mission" aria-labelledby="explore-heading" className="min-h-[83vh] flex items-center justify-center flex-col my-8 lg:mb-10">
        <div className="flex items-baseline justify-between gap-4 my-4 w-full">
          <h2 id="explore-heading" className="font-display text-lg text-gold">
            Explore the mission
          </h2>
          <span className="font-display text-xs text-white/40">Choose a heading</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pagePreviews.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="panel group p-5 transition duration-200 hover:-translate-y-1 hover:border-gold/60 hover:bg-white/[0.08] focus:outline-none focus-visible:border-gold"
            >
              <p className="font-display text-xs uppercase tracking-widest text-teal mb-2">
                {page.eyebrow}
              </p>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-medium group-hover:text-gold transition-colors">
                  {page.title}
                </h3>
                <span aria-hidden="true" className="font-display text-gold">
                  ↗
                </span>
              </div>
              <p className="font-display text-sm text-white/70 leading-relaxed mt-2">
                {page.description}
              </p>
              <p className="font-display text-xs text-white/40 mt-4">{page.detail}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}