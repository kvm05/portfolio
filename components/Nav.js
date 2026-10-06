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

const resumeClasses =
  "font-display text-sm font-bold border border-gold text-black bg-gold px-3 py-1 rounded hover:bg-transparent hover:text-gold hover:border-gold transition-colors";

export default function Nav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close it if the window grows into the desktop layout
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

  const linkClass = (href) =>
    pathname === href ? "text-gold" : "text-white/60 hover:text-white transition-colors";

  return (
    <nav
      className={`sticky top-0 z-20 backdrop-blur-sm border-b border-white/10 transition-all duration-300 ${
        open ? "bg-space/95" : "bg-black/30"
      } ${isVisible || open ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="w-full lg:w-[70%] mx-auto px-6 py-4 flex items-center justify-between font-display">
        <Link href="/" className="font-display rounded py-1 w-10 text-lg tracking-wide shrink-0">
          <img src="/km-logo-fill.svg" alt="KM" />
          {/* <Logo /> */}
        </Link>

        {/* Desktop: links and resume sit directly in the row */}
        <div className="hidden lg:contents">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
          <a href="/Kartik_Resume.pdf" download className={resumeClasses}>
            Resume
          </a>
        </div>

        {/* Mobile and tablet: hamburger */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="lg:hidden -mr-2 p-2 text-white/80 hover:text-white focus:outline-none focus-visible:text-gold transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6 L18 18 M18 6 L6 18" />
            ) : (
              <path d="M4 7 H20 M4 12 H20 M4 17 H20" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-white/10 px-6 pb-5 pt-2 flex flex-col animate-fadeIn font-display"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`py-3 border-b border-white/5 ${linkClass(l.href)}`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/Kartik_Resume.pdf"
            download
            className={`${resumeClasses} mt-4 text-center py-2`}
          >
            Resume
          </a>
        </div>
      )}
    </nav>
  );
}