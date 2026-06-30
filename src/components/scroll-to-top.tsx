"use client";

import { useEffect, useMemo, useState } from "react";
import { FaIcon } from "@/components/fa-icon";
import { icons } from "@/lib/icons";

function getScrollMetrics() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress =
    scrollableHeight > 0
      ? Math.min(Math.max(scrollTop / scrollableHeight, 0), 1)
      : 0;

  return {
    progress,
    shouldShow: scrollTop > 360,
  };
}

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () =>
      setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    let ticking = false;

    const updateScrollState = () => {
      const metrics = getScrollMetrics();
      setIsVisible(metrics.shouldShow);
      setProgress(metrics.progress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    updateScrollState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const ringStyle = useMemo(
    () => ({
      background: `conic-gradient(#16c7e8 ${progress * 360}deg, rgba(148,163,184,0.24) 0deg)`,
    }),
    [progress],
  );

  return (
    <div
      className={`pointer-events-none fixed bottom-5 right-4 z-40 transition-all duration-300 sm:bottom-6 sm:right-6 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0"
      }`}
    >
      <div className="absolute inset-2 rounded-full bg-[radial-gradient(circle,rgba(22,199,232,0.22),transparent_72%)] blur-xl" />
      <button
        type="button"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth",
          })
        }
        aria-label="Scroll to top"
        className="pointer-events-auto relative grid h-14 w-14 place-items-center rounded-full border border-white/70 bg-white/90 text-slate-950 shadow-[0_18px_40px_rgba(15,23,42,0.16)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(15,23,42,0.18)]"
      >
        <span
          className="absolute inset-0 rounded-full p-[2px]"
          style={ringStyle}
          aria-hidden="true"
        >
          <span className="block h-full w-full rounded-full bg-white/92" />
        </span>
        <span className="absolute inset-[6px] rounded-full border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(240,247,255,0.96)_100%)]" />
        <span className="relative flex flex-col items-center justify-center gap-0.5">
          <FaIcon icon={icons.arrowUp} size={15} className="text-brand-blue" />
          <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Top
          </span>
        </span>
      </button>
    </div>
  );
}
