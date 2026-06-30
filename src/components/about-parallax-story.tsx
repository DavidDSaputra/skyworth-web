"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaIcon } from "@/components/fa-icon";
import { Reveal } from "@/components/reveal";
import { icons } from "@/lib/icons";

const storyStats = [
  {
    label: "Listed Group",
    value: "2",
    detail: "Skyworth Group + Skyworth Digital",
  },
  {
    label: "Professional Staff",
    value: "40000+",
    detail: "Engineering, supply, and delivery teams",
  },
  {
    label: "Market Coverage",
    value: "5 Continents",
    detail: "Localized support for diverse solar projects",
  },
];

export function AboutParallaxStory() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const viewportHeight = window.innerHeight || 1;
      const progress = Math.min(window.scrollY / (viewportHeight * 1.15), 1);
      setScrollProgress(progress);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const imageTranslateY = scrollProgress * 56;
  const imageScale = 1 + scrollProgress * 0.08;
  const contentTranslateY = scrollProgress * -14;

  return (
    <section className="relative isolate overflow-hidden bg-[#030b17] px-4 pb-16 pt-28 text-white sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_bottom,rgba(0,91,170,0.18),transparent_36%)]" />

      <div className="relative mx-auto max-w-[1480px]">
        <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-slate-950 shadow-[0_30px_120px_rgba(0,0,0,0.34)] sm:rounded-[42px]">
          <div
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `translate3d(0, ${imageTranslateY}px, 0) scale(${imageScale})`,
            }}
          >
            <Image
              src="/about-us.png"
              alt="Skyworth renewable energy infrastructure"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,11,23,0.12)_0%,rgba(3,11,23,0.28)_22%,rgba(3,11,23,0.5)_56%,rgba(3,11,23,0.88)_100%)]" />

          <div
            className="relative z-10 flex min-h-[720px] flex-col justify-between px-5 py-10 sm:min-h-[820px] sm:px-8 sm:py-12 lg:min-h-[900px] lg:px-14 lg:py-16"
            style={{ transform: `translate3d(0, ${contentTranslateY}px, 0)` }}
          >
            <Reveal className="mx-auto max-w-5xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-200/84 sm:text-sm">
                About Skyworth PV
              </p>
              <h1 className="mt-5 text-[clamp(2.45rem,6vw,5.6rem)] font-medium leading-[1.02] text-white">
                From Industrial Backbone
                <br />
                to
                <span className="bg-[linear-gradient(90deg,#ffffff_0%,#8be8ff_48%,#0ea5e9_100%)] bg-clip-text text-transparent">
                  {" "}
                  Trusted Solar Delivery
                </span>
              </h1>
              <div className="mx-auto mt-7 max-w-4xl space-y-3 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
                <p>
                  Inspired by the layered visual storytelling on the official
                  Skyworth PV About Us page, this section introduces the brand
                  with a cinematic, parallax-led presentation.
                </p>
                <p>
                  We connect group-scale manufacturing strength, technical
                  service capability, and project-focused execution into one
                  dependable solar partner story.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6">
              <Reveal className="h-full" delayMs={120}>
                <div className="relative overflow-hidden rounded-[28px] border border-slate-800/90 bg-[linear-gradient(180deg,rgba(7,17,31,0.96),rgba(3,11,23,0.98))] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.28)] sm:p-7">
                  <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.22),transparent_70%)] blur-2xl spotlight-breathe" />
                  <div className="flex items-start gap-4">
                    <span className="mt-1 inline-flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/28 bg-cyan-300/10 text-cyan-200">
                      <FaIcon icon={icons.company} size={20} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/72">
                        Group Story
                      </p>
                      <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.7rem)] font-medium leading-[1.06] text-white">
                        Built on large-scale manufacturing, sharpened for
                        real-world project execution.
                      </h2>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-[0.98rem]">
                        Skyworth PV extends a broader industrial platform into
                        solar-focused delivery: consultation, product selection,
                        documentation, and responsive support for B2B energy
                        projects.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/products"
                      className="inline-flex min-h-12 items-center gap-3 bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                    >
                      Explore Products{" "}
                      <FaIcon icon={icons.arrowRight} size={16} />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex min-h-12 items-center gap-3 border border-white/22 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Talk to Sales <FaIcon icon={icons.arrowRight} size={16} />
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal className="h-full" delayMs={220}>
                <div className="grid h-full gap-3">
                  {storyStats.map((item, index) => (
                    <div
                      key={item.label}
                      className={`relative overflow-hidden rounded-[24px] border border-slate-800/90 bg-[linear-gradient(180deg,rgba(5,14,27,0.94),rgba(2,8,18,0.98))] px-5 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] sm:px-6 ${
                        index === 1 ? "parallax-card-float" : ""
                      }`}
                    >
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-cyan-200/70">
                        {item.label}
                      </p>
                      <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                        {item.value}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/68">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
