"use client";

import { startTransition, useEffect, useState } from "react";
import { FaIcon } from "@/components/fa-icon";
import { Reveal } from "@/components/reveal";
import { icons } from "@/lib/icons";

const videoSlides = [
  {
    id: "trusted-partner",
    label: "Trusted Partner",
    titleTop: "From Factory to Field",
    titleBottomPrefix: "Your Trusted Partner in",
    accent: " Clean Energy",
    description:
      "We provide full-stack, customized photovoltaic and energy storage solutions with comprehensive operation and maintenance services.",
    descriptionTwo:
      "Our services cover five continents with documentation-first support for EPCs, distributors, and project developers.",
    video: "/05.mp4",
    icon: icons.award,
  },
  {
    id: "global-reach",
    label: "Global Reach",
    titleTop: "Built for Scale",
    titleBottomPrefix: "Ready for",
    accent: " Global Reach",
    description:
      "From procurement strategy to factory-backed delivery, Skyworth helps solar projects move faster with reliable production depth.",
    descriptionTwo:
      "Cross-border coordination, technical support, and batch-ready documentation keep every shipment aligned with project timelines.",
    video: "/58.mp4",
    icon: icons.location,
  },
  {
    id: "worldwide-trusted",
    label: "Worldwide Trusted",
    titleTop: "Engineered to Deliver",
    titleBottomPrefix: "Worldwide Trusted",
    accent: " Execution",
    description:
      "We connect product performance, compliance readiness, and responsive service into one dependable solar supply experience.",
    descriptionTwo:
      "That means smoother approvals, clearer communication, and stronger confidence from factory floor to installed field assets.",
    video: "/8x.mp4",
    icon: icons.growth,
  },
];

export function GlobalReachVideoShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      startTransition(() => {
        setActiveIndex((current) => (current + 1) % videoSlides.length);
      });
    }, 6500);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeSlide = videoSlides[activeIndex];

  return (
    <section className="bg-[#020816] px-4 py-18 text-white sm:px-6 sm:py-22 lg:px-8">
      <Reveal className="mx-auto max-w-[1480px]">
        <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#020816] shadow-[0_28px_120px_rgba(0,0,0,0.35)] sm:rounded-[42px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(18,199,232,0.18),transparent_36%),radial-gradient(circle_at_bottom,rgba(0,91,170,0.16),transparent_34%)]" />

          <div className="absolute inset-0">
            <video
              key={activeSlide.id}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="cinema-fade-in h-full w-full object-cover object-center"
            >
              <source src={activeSlide.video} type="video/mp4" />
            </video>
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,22,0.2)_0%,rgba(2,8,22,0.28)_20%,rgba(2,8,22,0.48)_54%,rgba(2,8,22,0.88)_100%)]" />

          <div className="relative z-10 flex min-h-[680px] flex-col items-center justify-between px-5 py-10 text-center sm:min-h-[760px] sm:px-8 sm:py-14 lg:min-h-[860px] lg:px-14 lg:py-16">
            <div className="cinema-slide-up mx-auto max-w-5xl">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/72 sm:text-sm">
                Solar Capability Reel
              </p>
              <h2 className="mt-5 text-[clamp(2.25rem,5.2vw,5rem)] font-medium leading-[1.05] text-white">
                {activeSlide.titleTop}
                <br />
                <span className="text-white">
                  {activeSlide.titleBottomPrefix}
                </span>
                <span className="bg-[linear-gradient(90deg,#0ea5e9_0%,#22d3ee_100%)] bg-clip-text text-transparent">
                  {activeSlide.accent}
                </span>
              </h2>
              <div className="mx-auto mt-8 max-w-4xl space-y-3 text-sm leading-7 text-white/82 sm:text-base sm:leading-8">
                <p>{activeSlide.description}</p>
                <p>{activeSlide.descriptionTwo}</p>
              </div>
            </div>

            <div className="mt-12 flex w-full max-w-4xl flex-col items-center gap-4 sm:mt-16">
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {videoSlides.map((slide, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => {
                        startTransition(() => {
                          setActiveIndex(index);
                        });
                      }}
                      className={`group inline-flex items-center gap-3 rounded-full border px-4 py-3 text-left transition-all duration-500 sm:px-5 ${
                        isActive
                          ? "border-cyan-300/70 bg-white/12 text-white shadow-[0_12px_40px_rgba(14,165,233,0.24)]"
                          : "border-white/12 bg-black/18 text-white/72 hover:border-cyan-300/40 hover:bg-white/8 hover:text-white"
                      }`}
                      aria-pressed={isActive}
                    >
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                          isActive
                            ? "border-cyan-300/70 bg-cyan-300/16 text-cyan-200"
                            : "border-white/18 bg-white/6 text-white/70"
                        }`}
                      >
                        <FaIcon icon={slide.icon} size={14} />
                      </span>
                      <span className="text-sm font-medium tracking-[-0.02em]">
                        {slide.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-3">
                {videoSlides.map((slide, index) => (
                  <button
                    key={`${slide.id}-dot`}
                    type="button"
                    onClick={() => {
                      startTransition(() => {
                        setActiveIndex(index);
                      });
                    }}
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      index === activeIndex
                        ? "w-10 bg-cyan-300 shadow-[0_0_22px_rgba(34,211,238,0.55)]"
                        : "w-2.5 bg-white/35 hover:bg-white/60"
                    }`}
                    aria-label={`Show ${slide.label} video`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
