import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, heroImage, type Page } from "@/data/catalog";
import { Reveal } from "../Reveal";

/** Photo cards linking to pages — used for "More in this category" and on category hubs. */
export function PageCards({ items, dark = false }: { items: Page[]; dark?: boolean }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => (
        <li key={p.route}>
          <Reveal delay={(i % 3) * 0.06}>
            <Link href={p.route} className="group relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-[24px] bg-ink p-6 text-white">
              <Image src={heroImage(p)} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover opacity-75 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
              <span aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,14,15,0.7)_0%,rgba(13,14,15,0.15)_45%,rgba(13,14,15,0.85)_100%)]" />
              <span className="relative flex justify-end">
                <span className={`grid h-11 w-11 place-items-center rounded-full transition-all duration-500 ${dark ? "bg-white/15 backdrop-blur" : "bg-white/20 backdrop-blur"} group-hover:bg-amber group-hover:text-ink`}>
                  <ArrowUpRight aria-hidden className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.8} />
                </span>
              </span>
              <span className="relative">
                <span className="block text-[1.45rem] font-medium leading-tight tracking-[-0.025em]">{p.navLabel}</span>
                {p.intro[0] ? <span className="mt-2 line-clamp-2 text-[0.92rem] leading-relaxed text-white/75">{p.intro[0]}</span> : null}
              </span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export function Related({ page, siblings }: { page: Page; siblings: Page[] }) {
  if (!siblings.length) return null;
  const cat = categories[page.category];
  return (
    <section aria-labelledby="related-title" className="bg-ink text-paper">
      <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-12 md:py-32 xl:px-16">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-fog">Explore more</p>
            <h2 id="related-title" className="heading mt-4 text-[clamp(2.2rem,4vw,3.8rem)]">
              More in {cat.name}
            </h2>
          </div>
          {cat.hub ? (
            <Link href={cat.hub} className="pill glass text-white">
              View all
              <span className="pill-disc bg-white text-ink">
                <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
              </span>
            </Link>
          ) : null}
        </div>
        <PageCards items={siblings.slice(0, 6)} dark />
      </div>
    </section>
  );
}
