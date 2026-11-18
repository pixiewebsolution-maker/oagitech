import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Point, ServiceItem } from "@/data/services";
import { Reveal } from "../Reveal";

export const shell = "mx-auto max-w-[1500px] px-5 md:px-12 xl:px-16";

/** Opening statement for a page: first paragraph at statement size, the rest as body text. */
export function Overview({ intro, aside }: { intro: string[]; aside?: React.ReactNode }) {
  const [lead, ...rest] = intro;
  return (
    <section aria-label="Overview" className="grid gap-10 py-20 md:py-28 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="label text-mute">Overview</p>
        {aside ? <div className="mt-8">{aside}</div> : null}
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        <Reveal>
          <p className="heading text-[clamp(1.7rem,2.9vw,2.8rem)] text-ink">{lead}</p>
        </Reveal>
        {rest.map((p, i) => (
          <Reveal key={i} delay={0.06 * (i + 1)}>
            <p className="mt-6 max-w-[44rem] text-[1.08rem] leading-relaxed text-mute">{p}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** Small fact tiles shown beside the overview. */
export function Facts({ facts }: { facts: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-3">
      {facts.map((f) => (
        <div key={f.label} className="rounded-2xl border border-line p-5">
          <dd className="display text-[2.6rem] leading-none text-ink">{f.value}</dd>
          <dt className="label mt-3 text-mute">{f.label}</dt>
        </div>
      ))}
    </dl>
  );
}

/** A titled block with a sticky heading on the left and content on the right. */
export function Split({ heading, meta, children }: { heading: string; meta?: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <h2 className="heading text-[clamp(1.9rem,3vw,2.9rem)] text-ink">{heading}</h2>
              {meta ? <p className="mt-4 text-[1rem] font-medium text-mute">{meta}</p> : null}
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">{children}</div>
      </div>
    </section>
  );
}

/** Service list: rows with descriptions, or a compact multi-column list when items are names only. */
export function ServiceList({ items }: { items: ServiceItem[] }) {
  const described = items.some((i) => i.text);
  if (described) {
    return (
      <ul className="border-t border-line">
        {items.map((it) => (
          <li key={it.code ?? it.name} className="grid gap-2 border-b border-line py-6 md:grid-cols-[7rem_1fr] md:gap-6">
            <span className="text-[0.85rem] font-medium tabular-nums text-fog md:pt-1">{it.code}</span>
            <div>
              <h3 className="text-[1.2rem] font-medium tracking-[-0.02em] text-ink">{it.name}</h3>
              {it.text ? <p className="mt-2 text-[1rem] leading-relaxed text-mute">{it.text}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="grid gap-x-8 border-t border-line sm:grid-cols-2">
      {items.map((it) => (
        <li key={it.code ?? it.name} className="flex items-baseline gap-3 border-b border-line py-3.5 text-[1rem] text-ink">
          {it.code ? (
            <span className="w-[4.6rem] shrink-0 text-[0.82rem] font-medium tabular-nums text-fog">{it.code}</span>
          ) : (
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 translate-y-[-0.15em] rounded-full bg-amber" />
          )}
          <span>{it.name}</span>
        </li>
      ))}
    </ul>
  );
}

export function PointGrid({ points }: { points: Point[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-[22px] bg-line sm:grid-cols-2">
      {points.map((p) => (
        <li key={p.title} className="bg-paper p-6 md:p-7">
          <span aria-hidden className="block h-1.5 w-7 rounded-full bg-amber" />
          <h3 className="mt-5 text-[1.15rem] font-medium tracking-[-0.02em] text-ink">{p.title}</h3>
          {p.text ? <p className="mt-2 text-[0.98rem] leading-relaxed text-mute">{p.text}</p> : null}
        </li>
      ))}
    </ul>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className="rounded-full border border-line px-4 py-2 text-[0.95rem] font-medium text-ink">
          {t}
        </li>
      ))}
    </ul>
  );
}

export type Card = { title: string; text: string; href: string; photo: string; count?: number; countLabel?: string };

/** Photo cards linking to other pages (hubs and "explore more"). */
export function CardGrid({ cards }: { cards: Card[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c, i) => (
        <li key={c.href}>
          <Reveal delay={(i % 3) * 0.06}>
            <Link href={c.href} className="group relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-[24px] bg-ink p-6 text-white">
              <Image src={c.photo} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover opacity-75 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
              <span aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,14,15,0.65)_0%,rgba(13,14,15,0.15)_45%,rgba(13,14,15,0.88)_100%)]" />
              <span className="relative flex items-center justify-between">
                {c.count ? <span className="rounded-full bg-white/15 px-3 py-1.5 text-[0.85rem] font-medium backdrop-blur">{c.count} {c.countLabel ?? "services"}</span> : <span />}
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white/20 backdrop-blur transition-all duration-500 group-hover:bg-amber group-hover:text-ink">
                  <ArrowUpRight aria-hidden className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.8} />
                </span>
              </span>
              <span className="relative">
                <span className="block text-[1.45rem] font-medium leading-tight tracking-[-0.025em]">{c.title}</span>
                <span className="mt-2 line-clamp-2 text-[0.92rem] leading-relaxed text-white/75">{c.text}</span>
              </span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export function ExploreMore({ title, cards, viewAll }: { title: string; cards: Card[]; viewAll?: string }) {
  if (!cards.length) return null;
  return (
    <section aria-labelledby="explore-title" className="bg-ink text-paper">
      <div className={`${shell} py-24 md:py-32`}>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-fog">Explore more</p>
            <h2 id="explore-title" className="heading mt-4 text-[clamp(2.2rem,4vw,3.8rem)]">
              {title}
            </h2>
          </div>
          {viewAll ? (
            <Link href={viewAll} className="pill glass text-white">
              View all
              <span className="pill-disc bg-white text-ink">
                <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
              </span>
            </Link>
          ) : null}
        </div>
        <CardGrid cards={cards.slice(0, 6)} />
      </div>
    </section>
  );
}
