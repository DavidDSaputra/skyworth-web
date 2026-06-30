"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaIcon } from "@/components/fa-icon";
import { icons } from "@/lib/icons";

export function HeroBanner() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const viewportHeight = window.innerHeight || 1;
      const progress = Math.min(window.scrollY / viewportHeight, 1);
      setScrollProgress(progress);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scale = 1.02 + scrollProgress * 0.06;
  const translateY = scrollProgress * 18;

  return (
    <section className="hero-shell relative isolate -mt-[108px] overflow-hidden bg-brand-ink pt-[108px] text-white">
      <div
        className="absolute inset-0 -z-20 will-change-transform"
        style={{
          transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        }}
      >
        <Image
          src="/hero_banner.png"
          alt="Skyworth hero banner"
          fill
          preload
          sizes="100vw"
          quality={100}
          className="object-cover object-center"
          style={{ objectPosition: "center 34%" }}
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/12 via-black/12 to-black/38" />
      <div className="mx-auto flex min-h-[720px] max-w-7xl flex-col items-center justify-center px-4 pb-20 pt-28 text-center sm:min-h-[740px] sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
        <p className="animate-reveal text-xs font-medium uppercase tracking-[0.32em] text-white/80">
          Make every ray count
        </p>
        <h1 className="animate-reveal animate-delay-1 mt-5 max-w-5xl text-[clamp(2.8rem,6vw,5.6rem)] font-light leading-[1.02] text-white">
          Clean Energy,
          <br />
          Smart Industry.
        </h1>
        <p className="animate-reveal animate-delay-2 mt-6 max-w-3xl text-sm font-medium leading-6 text-white/88 sm:text-base">
          Experience the future of sustainable procurement with technical PV
          modules, tracked datasheets, project proof, and fast RFQ follow-up.
        </p>
        <div className="animate-reveal animate-delay-3 mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center gap-3 bg-black px-5 text-sm font-medium text-white transition hover:bg-brand-blue"
          >
            Get Started <FaIcon icon={icons.arrowRight} size={18} />
          </Link>
          <Link
            href="/why-us"
            className="inline-flex min-h-12 items-center gap-3 border border-black/70 bg-white/85 px-5 text-sm font-medium text-black backdrop-blur transition hover:bg-white"
          >
            Learn More <FaIcon icon={icons.arrowRight} size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
