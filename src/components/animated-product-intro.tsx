"use client";

import type { CSSProperties } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { FaIcon } from "@/components/fa-icon";
import { icons } from "@/lib/icons";

type ProductFeature = {
  id: string;
  label: string;
  title: string;
  eyebrow: string;
  summary: string;
  points: string[];
  image: string;
  alt: string;
  icon: IconDefinition;
  glowClass: string;
};

const SWIPE_THRESHOLD = 72;

const featuredProducts: ProductFeature[] = [
  {
    id: "pv-module",
    label: "01",
    title: "PV Module",
    eyebrow: "High-efficiency solar capture",
    summary:
      "Large-format modules designed to deliver clean output, durable framing, and a refined presence for rooftop or utility deployments.",
    points: [
      "Modern commercial profile",
      "Balanced durability",
      "Built for high-yield proposals",
    ],
    image: "/1.svg",
    alt: "Skyworth PV module panels",
    icon: icons.solar,
    glowClass: "bg-[radial-gradient(circle,rgba(18,27,44,0.5),transparent_68%)]",
  },
  {
    id: "pv-inverter",
    label: "02",
    title: "PV Inverter",
    eyebrow: "Stable conversion for smart systems",
    summary:
      "A compact inverter body that keeps the electrical language simple: efficient conversion, clean integration, and installer-friendly form.",
    points: [
      "Installer-friendly footprint",
      "Simple service access",
      "Smart system pairing",
    ],
    image: "/3.svg",
    alt: "Skyworth PV inverter unit",
    icon: icons.conversion,
    glowClass:
      "bg-[radial-gradient(circle,rgba(22,199,232,0.24),transparent_70%)]",
  },
  {
    id: "energy-storage",
    label: "03",
    title: "Energy Storage System",
    eyebrow: "Backup confidence for every project",
    summary:
      "A clean cabinet form that signals reliable storage capacity, scalable deployment, and stronger resilience across critical power applications.",
    points: [
      "Integrated cabinet format",
      "Essential load continuity",
      "Completes solar-to-storage story",
    ],
    image: "/2.svg",
    alt: "Skyworth energy storage system cabinet",
    icon: icons.battery,
    glowClass:
      "bg-[radial-gradient(circle,rgba(0,91,170,0.22),transparent_70%)]",
  },
];

function getRelativeOffset(index: number, activeIndex: number) {
  const total = featuredProducts.length;
  let offset = index - activeIndex;

  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;

  return offset;
}

function getSlideClass(offset: number) {
  if (offset === 0) {
    return "z-30 scale-100 opacity-100 [--slide-x:0%]";
  }

  if (offset === -1) {
    return "z-20 scale-[0.9] opacity-0 [--slide-x:-8%] sm:scale-[0.74] sm:opacity-45 sm:[--slide-x:-58%]";
  }

  if (offset === 1) {
    return "z-20 scale-[0.9] opacity-0 [--slide-x:8%] sm:scale-[0.74] sm:opacity-45 sm:[--slide-x:58%]";
  }

  return "z-10 scale-[0.72] opacity-0 [--slide-x:0%]";
}

function getWrappedIndex(current: number, direction: -1 | 1) {
  const total = featuredProducts.length;
  return (current + direction + total) % total;
}

export function AnimatedProductIntro() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStateRef = useRef<{ pointerId: number; startX: number } | null>(
    null,
  );

  const isPaused = isHoverPaused || isDragging;

  function moveSlide(direction: -1 | 1) {
    setActiveIndex((current) => {
      return getWrappedIndex(current, direction);
    });
  }

  const advanceSlide = useEffectEvent(() => {
    setActiveIndex((current) => getWrappedIndex(current, 1));
  });

  useEffect(() => {
    if (isPaused) return;

    const intervalId = window.setInterval(() => {
      advanceSlide();
    }, 3600);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isPaused]);

  const activeProduct = featuredProducts[activeIndex];

  function endDrag() {
    dragStateRef.current = null;
    setDragOffset(0);
    setIsDragging(false);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
    };

    setDragOffset(0);
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (dragStateRef.current?.pointerId !== event.pointerId) {
      return;
    }

    setDragOffset(event.clientX - dragStateRef.current.startX);
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (dragStateRef.current?.pointerId !== event.pointerId) {
      return;
    }

    if (Math.abs(dragOffset) >= SWIPE_THRESHOLD) {
      moveSlide(dragOffset < 0 ? 1 : -1);
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
    endDrag();
  }

  function handlePointerCancel(event: React.PointerEvent<HTMLDivElement>) {
    if (dragStateRef.current?.pointerId !== event.pointerId) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
    endDrag();
  }

  return (
    <section
      className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsHoverPaused(true)}
      onMouseLeave={() => setIsHoverPaused(false)}
    >
      <div className="absolute inset-x-0 top-0 h-52 bg-[radial-gradient(circle_at_top,rgba(0,91,170,0.12),transparent_72%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-[radial-gradient(circle_at_bottom,rgba(22,199,232,0.08),transparent_72%)]" />

      <div className="relative mx-auto max-w-[1480px]">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-brand-blue">
            Motion Showcase
          </p>
          <h2 className="mt-5 text-[clamp(2.5rem,5vw,4.9rem)] font-medium leading-[1.02] text-slate-950">
            A cleaner way to present the{" "}
            <span className="bg-[linear-gradient(90deg,#005baa_0%,#16c7e8_100%)] bg-clip-text text-transparent">
              full Skyworth stack.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600">
            One smooth product runway that moves through capture, conversion,
            and storage without crowding the page with too many boxes.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {featuredProducts.map((product, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={product.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`inline-flex items-center gap-3 border-b pb-3 text-left transition-all duration-500 ${
                  isActive
                    ? "border-brand-blue text-slate-950"
                    : "border-transparent text-slate-400 hover:border-slate-200 hover:text-slate-700"
                }`}
                aria-pressed={isActive}
              >
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 ${
                    isActive
                      ? "bg-brand-blue text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <FaIcon icon={product.icon} size={16} />
                </span>
                <span>
                  <span className="block text-[0.72rem] font-semibold tracking-[0.24em] text-slate-400">
                    {product.label}
                  </span>
                  <span className="mt-1 block text-lg font-semibold">
                    {product.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Swipe on mobile or drag with your mouse to explore.
        </p>

        <div className="relative mt-12 min-h-[430px] sm:min-h-[580px] lg:min-h-[640px]">
          <div
            className={`absolute inset-0 select-none overflow-hidden rounded-[2rem] [touch-action:pan-y] ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            <div className="absolute left-1/2 top-[18%] h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(22,199,232,0.12),transparent_70%)] blur-3xl sm:h-[380px] sm:w-[380px]" />
            <div className="absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.2),transparent)] sm:block" />
            <p className="pointer-events-none absolute inset-x-0 top-[56%] hidden -translate-y-1/2 text-center text-[clamp(4.5rem,12vw,10rem)] font-semibold uppercase tracking-[0.24em] text-slate-100 lg:block">
              showcase
            </p>

            {featuredProducts.map((product, index) => {
              const offset = getRelativeOffset(index, activeIndex);
              const isActive = offset === 0;
              const slideStyle = {
                "--drag-x": isActive ? `${dragOffset}px` : "0px",
                transitionDuration: isDragging ? "0ms" : undefined,
              } as CSSProperties & Record<"--drag-x", string>;

              return (
                <div
                  key={product.id}
                  className={`absolute left-1/2 top-1/2 w-[min(82vw,360px)] transition-all ease-[cubic-bezier(0.16,1,0.3,1)] [transform:translate3d(calc(-50%+var(--slide-x)+var(--drag-x,0px)),-50%,0)] sm:w-[360px] lg:w-[430px] ${
                    isDragging ? "duration-0" : "duration-700"
                  } ${getSlideClass(offset)}`}
                  style={slideStyle}
                  aria-hidden={!isActive}
                >
                  <div className="relative mx-auto flex justify-center">
                    <div
                      className={`absolute inset-x-[14%] top-[8%] h-28 rounded-full blur-3xl ${product.glowClass} ${
                        isActive ? "float-drift" : ""
                      }`}
                    />
                    <div className="relative aspect-[0.95/1] w-full">
                      <Image
                        src={product.image}
                        alt={product.alt}
                        fill
                        priority={index === 0}
                        sizes="(min-width: 1024px) 430px, 82vw"
                        className="object-contain object-center"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-blue">
            {activeProduct.eyebrow}
          </p>
          <h3 className="mt-4 text-[clamp(2rem,4vw,3.6rem)] font-medium tracking-[-0.04em] text-slate-950">
            {activeProduct.title}
          </h3>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600">
            {activeProduct.summary}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-500">
            {activeProduct.points.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>

          <div className="mx-auto mt-8 flex max-w-xl gap-3">
            {featuredProducts.map((product, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    isActive ? "bg-brand-blue" : "bg-slate-200"
                  }`}
                  aria-label={`Show ${product.title}`}
                />
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/products"
              className="inline-flex min-h-12 items-center gap-3 bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-brand-blue"
            >
              Explore Products <FaIcon icon={icons.arrowRight} size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center gap-3 border border-slate-200 px-6 text-sm font-semibold text-slate-950 transition hover:border-brand-blue hover:text-brand-blue"
            >
              Request Consultation <FaIcon icon={icons.arrowRight} size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
