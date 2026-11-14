import Image from "next/image";
import type { Img, Item, Page, Section, Sub } from "@/data/catalog";
import { Reveal } from "../Reveal";

const used = (src: string, set: Set<string>) => {
  if (set.has(src)) return true;
  set.add(src);
  return false;
};

function Items({ items, dark = false }: { items: Item[]; dark?: boolean }) {
  if (!items.length) return null;
  const withText = items.filter((i) => i.text).length;
  const muted = dark ? "text-fog" : "text-mute";
  const line = dark ? "border-white/12" : "border-line";

  if (withText >= items.length / 2) {
    // Titled points: two-up cards when few, rows when many
    if (items.length <= 6) {
      return (
        <ul className={`mt-8 grid gap-px overflow-hidden rounded-[22px] ${dark ? "bg-white/12" : "bg-line"} sm:grid-cols-2`}>
          {items.map((it) => (
            <li key={it.title} className={`${dark ? "bg-ink" : "bg-paper"} p-6 md:p-7`}>
              <span aria-hidden className="block h-1.5 w-7 rounded-full bg-amber" />
              <h4 className="mt-5 text-[1.15rem] font-medium tracking-[-0.02em]">{it.title}</h4>
              {it.text ? <p className={`mt-2 text-[0.96rem] leading-relaxed ${muted}`}>{it.text}</p> : null}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <ul className={`mt-8 border-t ${line}`}>
        {items.map((it) => (
          <li key={it.title} className={`grid gap-2 border-b ${line} py-5 md:grid-cols-[1fr_1.4fr] md:gap-8`}>
            <h4 className="text-[1.08rem] font-medium tracking-[-0.015em]">{it.title}</h4>
            <p className={`text-[0.96rem] leading-relaxed ${muted}`}>{it.text}</p>
          </li>
        ))}
      </ul>
    );
  }

  if (items.length > 8) {
    // Long equipment/scope lists: compact multi-column list
    return (
      <ul className={`mt-8 grid gap-x-8 border-t ${line} sm:grid-cols-2 xl:grid-cols-3`}>
        {items.map((it) => (
          <li key={it.title} className={`flex items-center gap-3 border-b ${line} py-3 text-[0.98rem]`}>
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
            {it.title}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="mt-8 flex flex-wrap gap-2">
      {items.map((it) => (
        <li key={it.title} className={`rounded-full border ${line} px-4 py-2 text-[0.95rem] font-medium`}>
          {it.title}
        </li>
      ))}
    </ul>
  );
}

function SubBlock({ sub }: { sub: Sub }) {
  return (
    <div className="border-t border-line pt-7">
      <h3 className="text-[1.4rem] font-medium leading-snug tracking-[-0.025em] text-ink md:text-[1.55rem]">{sub.heading}</h3>
      {sub.body.map((p, i) => (
        <p key={i} className="mt-3 text-[1.02rem] leading-relaxed text-mute">
          {p}
        </p>
      ))}
      <Items items={sub.items} />
    </div>
  );
}

function SectionImages({ images, seen, alt }: { images: Img[]; seen: Set<string>; alt: string }) {
  const fresh = images.filter((i) => !used(i.src, seen));
  if (!fresh.length) return null;
  const small = fresh.filter((i) => i.w > 0 && i.w < 420);
  if (fresh.length >= 4 && small.length >= fresh.length / 2) {
    // Logos (accreditations, partners)
    return (
      <ul className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {fresh.map((i) => (
          <li key={i.src} className="grid aspect-[3/2] place-items-center rounded-2xl border border-line bg-white p-4">
            <Image src={i.src} alt="" width={i.w || 300} height={i.h || 200} className="max-h-full w-auto object-contain" />
          </li>
        ))}
      </ul>
    );
  }
  const photos = fresh.filter((i) => i.w >= 600).slice(0, 2);
  if (!photos.length) return null;
  return (
    <div className={`mt-10 grid gap-3 ${photos.length > 1 ? "sm:grid-cols-2" : ""}`}>
      {photos.map((i, k) => (
        <div key={i.src} className={`relative overflow-hidden rounded-[22px] ${photos.length > 1 ? "aspect-[4/3]" : "aspect-[16/9]"}`}>
          <Image src={i.src} alt={k === 0 ? alt : ""} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}

function SectionBlock({ s, seen }: { s: Section; seen: Set<string> }) {
  return (
    <section className="border-t border-line py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <h2 className="heading text-[clamp(1.9rem,3vw,2.9rem)] text-ink">{s.heading}</h2>
              {s.note ? <p className="mt-4 text-[1rem] font-medium text-mute">{s.note}</p> : null}
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal delay={0.08}>
            {s.body.map((p, i) => (
              <p key={i} className={`${i ? "mt-5" : ""} text-[1.08rem] leading-relaxed text-mute`}>
                {p}
              </p>
            ))}
            <Items items={s.items} />
          </Reveal>
          {s.subs.length ? (
            <div className={`${s.body.length || s.items.length ? "mt-12" : ""} grid gap-10`}>
              {s.subs.map((sub) => (
                <Reveal key={sub.heading}>
                  <SubBlock sub={sub} />
                </Reveal>
              ))}
            </div>
          ) : null}
          <SectionImages images={s.images} seen={seen} alt={s.heading} />
        </div>
      </div>
    </section>
  );
}

/** Pages whose sections are just a heading and a photo (e.g. Civil/Structural/Geo) read best as a card grid. */
function CardGrid({ sections, seen }: { sections: Section[]; seen: Set<string> }) {
  return (
    <ul className="grid gap-4 border-t border-line pt-16 sm:grid-cols-2 lg:grid-cols-3 md:pt-24">
      {sections.map((s, i) => {
        const img = s.images.find((x) => !seen.has(x.src)) ?? s.images[0];
        if (img) seen.add(img.src);
        return (
          <li key={s.heading}>
            <Reveal delay={(i % 3) * 0.06}>
              <div className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[24px] bg-ink p-6 text-white">
                {img ? <Image src={img.src} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover opacity-85 transition-transform duration-[1.2s] group-hover:scale-105" /> : null}
                <span aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,14,15,0)_35%,rgba(13,14,15,0.9)_100%)]" />
                <h2 className="relative text-[1.5rem] font-medium leading-tight tracking-[-0.025em]">{s.heading}</h2>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}

export function PageBody({ page, heroSrc }: { page: Page; heroSrc: string }) {
  const seen = new Set<string>([heroSrc]);
  // Only the opening sentence gets statement size; the rest of that paragraph reads as body text
  const [first = "", ...others] = page.intro;
  const cut = first.length > 170 ? first.search(/(?<=[a-z0-9)])\.\s+[A-Z]/) : -1;
  const lead = cut > 40 ? first.slice(0, cut + 1) : first;
  const rest = cut > 40 ? [first.slice(cut + 1).trim(), ...others] : others;
  const pageImgs = [...page.images, ...page.sections.flatMap((s) => s.images)].filter((i) => i.w >= 600);
  const overviewImg = pageImgs.find((i) => !seen.has(i.src));
  if (overviewImg) seen.add(overviewImg.src);
  const cardsOnly = page.sections.length >= 3 && page.sections.every((s) => !s.body.length && !s.items.length && !s.subs.length && s.images.length);

  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-[1500px] px-5 md:px-12 xl:px-16">
        {lead ? (
          <section aria-label="Overview" className="grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <p className="label text-mute">Overview</p>
              {overviewImg ? (
                <Reveal>
                  <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[26px]">
                    <Image src={overviewImg.src} alt={page.navLabel} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
                  </div>
                </Reveal>
              ) : null}
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                <p className="heading text-[clamp(1.6rem,2.7vw,2.6rem)] text-ink">{lead}</p>
              </Reveal>
              {rest.map((p, i) => (
                <Reveal key={i} delay={0.06 * (i + 1)}>
                  <p className="mt-6 text-[1.08rem] leading-relaxed text-mute">{p}</p>
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}

        {cardsOnly ? (
          <div className="pb-24">
            <CardGrid sections={page.sections} seen={seen} />
          </div>
        ) : (
          <div className={lead ? "" : "pt-8"}>
            {page.sections.map((s) => (
              <SectionBlock key={s.heading} s={s} seen={seen} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
