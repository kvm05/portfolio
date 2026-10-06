"use client";

import { useEffect, useState } from "react";
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // FontAwesome variant

const links = [
  {
    href: "https://www.linkedin.com/in/kvmenon",
    label: "LinkedIn",
    icon: (
      <FaLinkedin />
    ),
  },
  {
    href: "https://github.com/kvm05",
    label: "GitHub",
    icon: (
      <FaGithub />
    ),
  },
];

export default function Footer() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const updateVisibility = () => {
      const hasScrollbar = document.documentElement.scrollHeight > window.innerHeight;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

      if (!hasScrollbar || atBottom) {
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
    <footer className={`w-full fixed px-6 lg:px-[15%] bottom-0 h-[7vh] min-h-[3.25rem] inset-x-0 z-20 flex flex-row justify-between bg-black/30 backdrop-blur-sm border-t border-white/10 transition-transform duration-300 ${isVisible ? "translate-y-0" : "translate-y-full"}`}>
      <div className='w-fit whitespace-nowrap text-gold/50 py-4 text-xs font-display flex items-center'>
        Kartik Menon &copy; {new Date().getFullYear()}
      </div>
      <div className="lg:px-6 py-4 flex items-center gap-6 lg:gap-8">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            aria-label={l.label}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel={l.href.startsWith("http") ? "noreferrer" : undefined}
            className="text-gold/50 hover:text-gold transition-colors"
          >
            {l.icon}
          </a>
        ))}
      </div>
    </footer>
  );
}