import Image from "next/image";
import Link from "next/link";
import { FaIcon } from "@/components/fa-icon";
import { Reveal } from "@/components/reveal";
import { icons } from "@/lib/icons";
import type { Article, CaseStudy } from "@/lib/types";

type StoryItem = Pick<Article, "id" | "title" | "publishedAt">;

const storyImages: Record<string, string> = {
  "case-java-utility":
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=80",
  "case-rooftop":
    "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=80",
  "article-quality":
    "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
  "event-jakarta":
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
} as const;

function formatStoryDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function LatestStoriesSection({
  featuredStudy,
  sideStories,
}: {
  featuredStudy: CaseStudy;
  sideStories: StoryItem[];
}) {
  return (
    <section className="bg-white px-4 py-22 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1520px]">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[860px]">
            <p className="flex items-center gap-3 text-[0.8rem] font-medium uppercase tracking-[0.22em] text-black">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-blue" />
              Latest News
            </p>
            <h2 className="mt-6 max-w-[12ch] text-[clamp(2.6rem,5vw,5rem)] font-medium leading-[1.02] text-black">
              Get Our Latest <span className="text-brand-blue">Stories</span>
            </h2>
          </div>

          <Link
            href="/news"
            className="hover-sweep inline-flex min-h-14 items-center gap-3 self-start rounded-full bg-[linear-gradient(90deg,#005baa,#0fd3ff)] px-8 text-base font-medium text-white"
          >
            More News <FaIcon icon={icons.arrowRight} size={18} />
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-8 xl:grid-cols-[1.02fr_0.98fr]">
          <Reveal delayMs={60}>
            <Link
              href="/case-studies"
              className="hover-sweep group block overflow-hidden bg-[#eff5fb] shadow-[0_28px_90px_rgba(8,24,47,0.08)]"
            >
              <div className="relative aspect-[1.13/1] overflow-hidden">
                <Image
                  src={storyImages[featuredStudy.id]}
                  alt={featuredStudy.title}
                  fill
                  sizes="(min-width: 1280px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-10">
                <p className="text-sm font-medium text-slate-500">
                  {featuredStudy.projectSize} · {featuredStudy.location}
                </p>
                <h3 className="mt-4 max-w-[18ch] text-[clamp(1.9rem,2.6vw,3rem)] font-medium leading-[1.08] text-black">
                  {featuredStudy.title}
                </h3>
                <p className="mt-4 max-w-[54ch] text-base leading-7 text-slate-600">
                  {featuredStudy.summary}
                </p>
              </div>
            </Link>
          </Reveal>

          <div className="flex flex-col divide-y divide-slate-200">
            {sideStories.map((story, index) => (
              <Reveal key={story.id} delayMs={120 + index * 70}>
                <Link
                  href="/news"
                  className="hover-sweep group grid gap-5 py-6 sm:grid-cols-[290px_minmax(0,1fr)] sm:items-center"
                >
                  <div className="relative aspect-[1.55/1] overflow-hidden rounded-[4px] bg-slate-100">
                    <Image
                      src={storyImages[story.id]}
                      alt={story.title}
                      fill
                      sizes="(min-width: 640px) 290px, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                    <div>
                      <h3 className="max-w-[18ch] text-[clamp(1.6rem,2.1vw,2.45rem)] font-medium leading-[1.14] text-black transition group-hover:text-brand-blue">
                        {story.title}
                      </h3>
                      <p className="mt-5 text-base text-slate-400">
                        {formatStoryDate(story.publishedAt)}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-3 text-base font-medium text-slate-700 transition group-hover:text-brand-blue">
                      Learn More <FaIcon icon={icons.arrowRight} size={18} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
