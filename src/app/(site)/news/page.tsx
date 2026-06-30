import { Section } from "@/components/ui";
import { articles } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "News and Events",
  description: "PV articles and events managed through CMS-ready data models.",
  path: "/news",
});

export default function NewsPage() {
  return (
    <Section eyebrow="Updates" title="News and events">
      <div className="grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <article
            key={article.id}
            className="rounded-md border border-slate-200 bg-white p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              {article.type} · {article.publishedAt}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">
              {article.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {article.excerpt}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
