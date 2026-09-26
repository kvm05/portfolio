export default function Home() {
  return (
    <main className="max-w-prose mx-auto px-6 animate-fadeIn">
      <section
        className="pt-16 pb-16 flex flex-col md:flex-row items-start gap-8"
        style={{ perspective: "400px" }}
      >
        <div className="relative w-64 h-full my-auto mr-8 border-2 border-gold rounded-md overflow-hidden animate-crtOn shrink-0">
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

        <div className="flex-1 text-left w-auto">
          <div className="animate-crawl" style={{ transformOrigin: "top" }}>
            <p className="font-display text-gold text-sm tracking-wide mb-4">
              Software engineer, currently studying at USyd
            </p>
            <h1 className="font-display text-4xl md:text-5xl leading-tight mb-6 truncate">
              Kartik Menon
            </h1>
            {/* <div className="flex gap-6 font-sans text-sm">
              <a href="mailto:kartikmenon.2002@gmail.com" className="text-teal hover:underline">
                kartikmenon.2002@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/kvmenon"
                className="text-teal hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/kvmenon
              </a>
            </div> */}
          </div>

          <p
            className="font-display text-gold text-base md:text-lg leading-relaxed mt-8 animate-crawl"
            style={{ transformOrigin: "top", animationDelay: "0.3s" }}
          >
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