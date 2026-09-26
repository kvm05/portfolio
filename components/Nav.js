"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/education", label: "Education" },
  { href: "/skills", label: "Skills" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-20 backdrop-blur-sm bg-black/30 border-b border-white/10">
      <div className="max-w-3xl mx-auto px-6 py-4 flex flex-wrap gap-6 font-display text-sm tracking-wide">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={
              pathname === l.href
                ? "text-gold"
                : "text-white/60 hover:text-white transition-colors"
            }
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
