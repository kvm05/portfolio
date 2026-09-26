"use client";

import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";

const links = [
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/education", label: "Education" },
  { href: "/skills", label: "Skills" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-20 backdrop-blur-sm bg-black/30 border-b border-white/10">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-center gap-8">
        <Link href="/" className="font-display rounded px-3 py-1 text-lg tracking-wide">
          <Logo />
        </Link>
        <div className="flex flex-wrap justify-center gap-6 font-display text-sm tracking-wide">
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
        <a
          href="/Kartik_Resume.pdf"
          download
          className="font-display text-sm font-bold border border-gold text-black bg-gold px-3 py-1 rounded hover:bg-transparent hover:text-gold hover:border-gold transition-colors"
        >
          Resume
        </a>
      </div>
    </nav>
  );
}
