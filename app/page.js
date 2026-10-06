"use client";

import { useLoading } from "../components/LoadingContext";

export default function Home() {
  const { mounted } = useLoading();

  if (mounted) return null;

  return (
    <main className="w-full px-6 lg:w-[70%] lg:px-0 min-h-[83vh] mx-auto my-auto animate-fadeIn flex items-center pt-6 pb-24 lg:py-0">
      <section
        className="h-full w-full flex flex-col lg:flex-row items-center lg:items-start gap-8"
        style={{ perspective: "400px" }}
      >
        <div className="relative w-64 sm:w-60 h-full my-auto border-2 lg:mr-16 border-gold overflow-hidden animate-crtOn shrink-0">
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
          <p className="font-display text-gold text-sm tracking-wide mb-4">
            Software engineer, currently studying at USyd
          </p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
            Kartik Menon
          </h1>

          <p className="font-display text-gold text-base lg:text-lg leading-relaxed text-left lg:text-justify">
            Two years into a mission at Barclays, building the cloud
            infrastructure that keeps a global bank running. Backup systems
            deployed, resiliency tested under fire, legacy servers upgraded
            before they became a liability. Now charting a new course
            through a Master of Computer Science at the University of
            Sydney, in search of harder problems and bigger systems.
          </p>
        </div>
      </section>
    </main>
  );
}