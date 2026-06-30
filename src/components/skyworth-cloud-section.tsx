"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaIcon } from "@/components/fa-icon";
import { Reveal } from "@/components/reveal";
import { icons } from "@/lib/icons";

const cloudFeatures = [
  {
    title: "Plant Overview",
    text: "Track real-time power output, daily generation, consumption, self-sufficiency rate, and grid export performance from one clean dashboard.",
  },
  {
    title: "Device Management",
    text: "Review PV modules, inverters, batteries, and data loggers with status visibility that helps teams stay informed at all times.",
  },
  {
    title: "Alarm Notifications",
    text: "Receive instant abnormal-condition alerts and access historical records so issues can be identified and resolved faster.",
  },
];

const cloudScreens = [
  {
    src: "/skyworth-cloud/1.svg",
    alt: "Skyworth Cloud app screen 1",
    title: "Data Synchronization",
    className: "",
    imageClassName: "max-h-[300px] sm:max-h-[320px] lg:max-h-[340px]",
  },
  {
    src: "/skyworth-cloud/2.svg",
    alt: "Skyworth Cloud app screen 2",
    title: "Data Overview",
    className: "",
    imageClassName: "max-h-[300px] sm:max-h-[320px] lg:max-h-[340px]",
  },
  {
    src: "/skyworth-cloud/3.svg",
    alt: "Skyworth Cloud app screen 3",
    title: "Real-time Alarms",
    className: "",
    imageClassName: "max-h-[300px] sm:max-h-[320px] lg:max-h-[340px]",
  },
  {
    src: "/skyworth-cloud/4.svg",
    alt: "Skyworth Cloud app screen 4",
    title: "Device Information",
    className: "",
    imageClassName: "max-h-[300px] sm:max-h-[320px] lg:max-h-[340px]",
  },
];

const playStoreUrl =
  "https://play.google.com/store/apps/details?id=com.solavita.cloud&pcampaignid=web_share&pli=1";

export function SkyworthCloudSection() {
  const [activeScreen, setActiveScreen] = useState<
    (typeof cloudScreens)[number] | null
  >(null);
  const [zoomVisible, setZoomVisible] = useState(false);

  useEffect(() => {
    if (!activeScreen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeZoom();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeScreen]);

  function openZoom(screen: (typeof cloudScreens)[number]) {
    setZoomVisible(false);
    setActiveScreen(screen);
    window.requestAnimationFrame(() => setZoomVisible(true));
  }

  function closeZoom() {
    setZoomVisible(false);
    window.setTimeout(() => setActiveScreen(null), 220);
  }

  return (
    <>
      <section className="bg-white px-4 py-18 sm:px-6 sm:py-22 lg:px-8">
        <div className="mx-auto max-w-[1480px]">
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
            <Reveal>
              <div className="max-w-2xl">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-[18px] border border-slate-200 bg-black shadow-[0_14px_32px_rgba(2,12,27,0.14)]">
                    <Image
                      src="/skyworth-cloud/icon.png"
                      alt="Skyworth Cloud app icon"
                      width={54}
                      height={54}
                      className="h-12 w-12 object-contain"
                    />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-blue">
                      Skyworth Cloud
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-500">
                      Real-time solar monitoring, device visibility, and alarm
                      updates from anywhere.
                    </p>
                  </div>
                </div>

                <h2 className="mt-6 text-[clamp(2rem,4.4vw,4.4rem)] font-medium leading-[1.04] text-slate-950">
                  Real-time control at
                  <br />
                  your fingertips.
                </h2>

                <p className="mt-6 text-base leading-8 text-slate-600 sm:max-w-2xl">
                  Skyworth Cloud keeps monitoring simple: check plant
                  performance, review connected devices, and respond to alarms in
                  one mobile workflow that feels fast, practical, and easy to
                  use in the field.
                </p>

                <div className="mt-8 grid gap-4">
                  {cloudFeatures.map((feature, index) => (
                    <Reveal
                      key={feature.title}
                      delayMs={90 + index * 90}
                      className="h-full"
                    >
                      <article className="hover-sweep rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition sm:px-6">
                        <div className="flex items-start gap-4">
                          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue">
                            <FaIcon icon={icons.check} size={18} />
                          </span>
                          <div>
                            <h3 className="text-xl font-semibold text-slate-950">
                              {feature.title}
                            </h3>
                            <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-[0.98rem]">
                              {feature.text}
                            </p>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <Link
                    href={playStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-[18px] transition hover:scale-[1.02]"
                    aria-label="Get it on Google Play"
                  >
                    <Image
                      src="/logo_playstore.png"
                      alt="Get it on Google Play"
                      width={250}
                      height={96}
                      className="h-auto w-[210px] object-contain sm:w-[230px]"
                    />
                  </Link>
                  <p className="text-sm leading-6 text-slate-500">
                    Updated on June 16, 2026 • Rated 3+ • Productivity
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={140}>
              <div className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#eef5fb_100%)] p-4 shadow-[0_26px_80px_rgba(15,23,42,0.08)] sm:p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,91,170,0.09),transparent_42%)]" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.72))]" />

                <div className="relative z-10">
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {cloudScreens.map((screen) => (
                      <div
                        key={screen.src}
                        className={`group flex flex-col items-center ${screen.className}`}
                      >
                        <p className="text-center text-[1.02rem] font-semibold leading-7 text-slate-800">
                          {screen.title}
                        </p>

                        <div className="relative mt-6 flex min-h-[340px] w-full items-center justify-center sm:min-h-[360px] lg:min-h-[390px]">
                          <div className="absolute inset-x-4 top-1/2 h-40 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.12),transparent_70%)] blur-2xl" />
                          <button
                            type="button"
                            onClick={() => openZoom(screen)}
                            className="relative z-10 inline-flex cursor-zoom-in items-center justify-center rounded-[20px] outline-none transition duration-500 hover:-translate-y-1 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-4"
                            aria-label={`Open ${screen.title} preview`}
                          >
                            <Image
                              src={screen.src}
                              alt={screen.alt}
                              width={595}
                              height={842}
                              unoptimized
                              className={`h-auto w-auto max-w-full object-contain object-center ${screen.imageClassName}`}
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-4 border-t border-slate-200/80 pt-5">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-slate-950 shadow-[0_12px_24px_rgba(15,23,42,0.14)]">
                      <Image
                        src="/skyworth-cloud/icon.png"
                        alt="Skyworth Cloud icon"
                        width={34}
                        height={34}
                        className="h-8 w-8 object-contain"
                      />
                    </span>
                    <p className="text-sm leading-7 text-slate-600 sm:text-base">
                      Tap or click any screen to open a larger preview with a
                      smooth zoom transition.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {activeScreen ? (
        <div
          className={`fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(6,12,20,0.76)] px-4 py-8 backdrop-blur-sm transition duration-200 ${
            zoomVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeZoom}
        >
          <button
            type="button"
            aria-label="Close preview"
            onClick={closeZoom}
            className="absolute right-5 top-5 inline-flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/15 bg-white/10 text-white transition hover:bg-white/16 sm:right-7 sm:top-7"
          >
            <FaIcon icon={icons.close} size={18} />
          </button>

          <div
            className={`relative w-full max-w-[960px] rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,#10151d_0%,#0c1118_100%)] px-5 pb-8 pt-6 shadow-[0_30px_100px_rgba(0,0,0,0.38)] transition duration-300 sm:px-8 sm:pb-10 sm:pt-8 ${
              zoomVisible ? "scale-100 opacity-100" : "scale-[0.92] opacity-0"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-center text-lg font-semibold text-white sm:text-xl">
              {activeScreen.title}
            </p>
            <div className="relative mt-6 flex min-h-[60vh] items-center justify-center">
              <div className="absolute inset-x-10 top-1/2 h-56 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(22,199,232,0.18),transparent_72%)] blur-3xl" />
              <Image
                src={activeScreen.src}
                alt={activeScreen.alt}
                width={595}
                height={842}
                unoptimized
                className="relative z-10 h-auto max-h-[72vh] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
