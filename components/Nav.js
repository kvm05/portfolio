"use client";

import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/education", label: "Education" },
  { href: "/skills", label: "Skills" },
];

export default function Nav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const updateVisibility = () => {
      const hasScrollbar = document.documentElement.scrollHeight > window.innerHeight;

      if (!hasScrollbar) {
        setIsVisible(true);
      } else if (window.scrollY < previousScrollY) {
        setIsVisible(true);
      } else if (window.scrollY > previousScrollY) {
        setIsVisible(false);
      }

      previousScrollY = window.scrollY;
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    updateVisibility();

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <nav className={`sticky top-0 z-20 backdrop-blur-sm bg-black/30 border-b border-white/10 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="w-[70%] mx-auto px-6 py-4 flex items-center justify-between font-display">
        <Link href="/" className="font-display rounded px-3 py-1 text-lg tracking-wide">
          <Logo />
        </Link>
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
