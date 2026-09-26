export default function Home() {
  return (
    <main className="max-w-prose mx-auto px-6">
      <section className="pt-16 pb-10 text-center">
        <p className="font-display text-gold text-sm tracking-wide mb-4">
          Software engineer, currently studying at USyd
        </p>
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-6">
          Kartik Menon
        </h1>
        <div className="flex justify-center gap-6 font-sans text-sm">
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
        </div>
      </section>

      <section
        className="relative h-[60vh] overflow-hidden"
        style={{ perspective: "400px" }}
      >
        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <p className="font-display text-gold text-lg md:text-xl leading-relaxed text-center max-w-md animate-crawl">
            Two years into a mission at Barclays, building the cloud
            infrastructure that keeps a global bank running.
            <br />
            <br />
            Backup systems deployed. Resiliency tested under fire. Legacy
            servers upgraded before they became a liability.
            <br />
            <br />
            Now charting a new course through a Master of Computer Science
            at the University of Sydney, in search of harder problems and
            bigger systems.
            <br />
            <br />
            The mission continues below.
          </p>
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-space to-transparent" />
      </section>
    </main>
  );
}
