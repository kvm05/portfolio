import { projects } from "../../lib/data";

export default function ProjectsPage() {
  return (
    <main className="max-w-prose mx-auto px-6 py-16">
      <h1 className="font-display text-2xl text-gold mb-10">Projects</h1>
      <div className="space-y-8">
        {projects.map((p) => (
          <div key={p.name} className="panel p-6">
            <h2 className="font-display font-medium text-lg">{p.name}</h2>
            <p className="font-display text-sm text-white/50 mb-1">{p.tagline}</p>
            <p className="font-display text-sm text-white/40 mb-2">{p.tools}</p>
            <p className="font-display text-white/80 leading-relaxed">{p.description}</p>
            {p.note && (
              <p className="font-display text-sm text-teal mt-2">{p.note}</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
