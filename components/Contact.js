"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FaEnvelope, FaTimes } from "react-icons/fa";

const fieldClass =
  "w-full bg-transparent border border-white/20 rounded px-3 py-2 font-display text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors";

export default function Contact() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorText, setErrorText] = useState("");
  const [progress, setProgress] = useState(0); // 0 to 100, drives the button fill
  const sectionRef = useRef(null);
  const nameRef = useRef(null);

  // Close the form when moving to another page
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // When it opens, bring the form into view below the page content
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      nameRef.current?.focus({ preventScroll: true });
    }, 50);
    return () => clearTimeout(timer);
  }, [open]);

  // While sending, creep towards 88% so the bar always looks alive
  useEffect(() => {
    if (status !== "sending") return;
    const timer = setInterval(() => {
      setProgress((p) => p + (88 - p) * 0.07);
    }, 120);
    return () => clearInterval(timer);
  }, [status]);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setProgress(0);
    setErrorText("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorText(json.error || "Something went wrong. Please try again.");
        setProgress(0);
        setStatus("error");
        return;
      }
      form.reset();
      setProgress(100);
      setStatus("filled");
      // Let the full bar be seen before swapping to the thank-you message
      await new Promise((r) => setTimeout(r, 900));
      setStatus("sent");
    } catch {
      setErrorText("Something went wrong. Please try again.");
      setProgress(0);
      setStatus("error");
    }
  }

  const label =
    status === "sending" ? "Sending..." : status === "filled" ? "Sent" : "Send message";

  return (
    <>
      {/* Form: sits in normal flow, directly below the page content */}
      {open && (
        <section
          ref={sectionRef}
          id="contact"
          className="w-full px-6 lg:w-[70%] lg:px-0 mx-auto min-h-screen flex flex-col justify-center pt-24 pb-[calc(7vh+4rem)] animate-fadeIn"
        >
          <div className="w-full mx-auto">
          <h2 className="font-display text-2xl text-gold mb-6">Contact me</h2>

          <div className="panel p-5 sm:p-6">
            {status === "sent" ? (
              <div className="font-display">
                <p className="text-white/90">Thanks, your message is on its way.</p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-sm text-gold hover:underline"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="block font-display text-sm text-white/50 mb-1">Name</span>
                    <input
                      ref={nameRef}
                      name="name"
                      type="text"
                      required
                      maxLength={100}
                      autoComplete="name"
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className="block font-display text-sm text-white/50 mb-1">Email</span>
                    <input
                      name="email"
                      type="email"
                      required
                      maxLength={200}
                      autoComplete="email"
                      className={fieldClass}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="block font-display text-sm text-white/50 mb-1">Message</span>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    maxLength={5000}
                    className={`${fieldClass} resize-y`}
                  />
                </label>

                {/* Honeypot for bots, hidden from people and screen readers */}
                <input
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "sending" || status === "filled"}
                    className="relative overflow-hidden font-display text-sm font-bold border border-gold text-gold px-5 py-2 rounded transition-colors hover:bg-gold hover:text-black disabled:cursor-not-allowed disabled:hover:bg-transparent"
                  >
                    {/* Base label: gold text on the empty track */}
                    <span className="relative">{label}</span>
                    {/* Fill layer: same label in dark text, revealed left to right */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center bg-gold text-black transition-[clip-path] duration-200 ease-linear "
                      style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
                    >
                      {label}
                    </span>
                  </button>
                  {status === "error" && (
                    <p role="alert" className="font-display text-sm text-red-400">
                      {errorText}
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
          </div>
        </section>
      )}

      {/* Floating button, always bottom right, just above the footer */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="contact"
        className="fixed right-4 sm:right-8 bottom-[max(calc(7vh+1rem),4.5rem)] z-30 flex items-center gap-2 font-display text-sm font-bold border border-gold text-black bg-gold px-3 py-3 rounded-full shadow-lg shadow-black/40 hover:bg-space hover:text-gold transition-colors"
      >
        {open ? <FaTimes aria-hidden="true" /> : <FaEnvelope aria-hidden="true" />}
      </button>
    </>
  );
}