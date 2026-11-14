import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageBody } from "@/components/page/PageBody";
import { PageHero, type Crumb } from "@/components/page/PageHero";
import { PageCards, Related } from "@/components/page/Related";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/sections/Faq";
import { about } from "@/data/site";
import { categories, heroImage, hubByRoute, pageByRoute, pages, pagesIn, splitTitle, type CategoryKey, type Page } from "@/data/catalog";
import { company } from "@/data/company";

const routeOf = (slug: string[]) => "/" + slug.join("/");

// Every route is listed in generateStaticParams and prerendered, so the instant-navigation check isn't needed here.
export const instant = false;

export function generateStaticParams() {
  const hubs = Object.values(categories)
    .map((c) => c.hub)
    .filter((h): h is string => Boolean(h));
  return [...pages.map((p) => p.route), ...hubs].map((r) => ({ slug: r.slice(1).split("/") }));
}

const describe = (text: string) => (text.length > 158 ? text.slice(0, 155).replace(/\s+\S*$/, "") + "…" : text);

export async function generateMetadata({ params }: PageProps<"/[...slug]">): Promise<Metadata> {
  const { slug } = await params;
  const route = routeOf(slug);
  const page = pageByRoute(route);
  if (page) {
    const description = describe(page.intro[0] ?? categories[page.category].blurb);
    return { title: page.navLabel, description, alternates: { canonical: route }, openGraph: { title: page.navLabel, description, url: route, images: [{ url: heroImage(page), alt: page.navLabel }] } };
  }
  const hub = hubByRoute(route);
  if (hub) return { title: hub.name, description: hub.blurb, alternates: { canonical: route }, openGraph: { title: hub.name, description: hub.blurb, url: route, images: [{ url: hub.photo, alt: hub.name }] } };
  return {};
}

// Single-page categories borrow related pages from the closest group
const relatedFallback: Partial<Record<CategoryKey, CategoryKey[]>> = {
  welding: ["inspection", "ndt"],
  civil: ["inspection"],
  underwater: ["diving"],
};

function hubPagesFor(key: CategoryKey): Page[] {
  const list = pagesIn(key);
  if (key === "manufacturing") {
    const ups = pageByRoute("/calibration/ups-online-offline");
    if (ups) list.splice(1, 0, ups);
  }
  return list;
}

export default async function Page({ params }: PageProps<"/[...slug]">) {
  const { slug } = await params;
  const route = routeOf(slug);
  const page = pageByRoute(route);

  if (page) {
    const cat = categories[page.category];
    const { headline, tagline } = splitTitle(page);
    const hero = heroImage(page);
    const crumbs: Crumb[] = [{ label: "Home", href: "/" }];
    if (cat.hub) crumbs.push({ label: cat.name, href: cat.hub });
    crumbs.push({ label: page.navLabel });
    const siblings = pagesIn(page.category).filter((p) => p.route !== page.route);
    const related = siblings.length ? siblings : (relatedFallback[page.category] ?? []).flatMap((k) => pagesIn(k)).slice(0, 6);
    const cta =
      page.category === "training"
        ? { label: "Enrol now", href: `/contact?subject=${encodeURIComponent(page.navLabel)}` }
        : page.route === "/about/career"
          ? { label: "Send your CV", href: `mailto:${company.email}?subject=${encodeURIComponent("Career enquiry")}` }
          : { label: "Request a quote", href: `/contact?subject=${encodeURIComponent(page.navLabel)}` };

    return (
      <>
        <Header />
        <main>
          <PageHero title={headline} tagline={tagline ?? cat.blurb} image={hero} crumbs={crumbs} cta={cta} />
          <PageBody page={page} heroSrc={hero} />
          {page.faqs.length ? <Faq faqs={page.faqs} label="FAQ" title={`${page.navLabel} FAQs`} tone="paper-2" /> : null}
          <Related page={page} siblings={related} />
        </main>
        <Footer />
      </>
    );
  }

  const hub = hubByRoute(route);
  if (!hub) notFound();
  const items = hubPagesFor(hub.key);

  return (
    <>
      <Header />
      <main>
        <PageHero title={hub.name} tagline={hub.blurb} image={hub.photo} crumbs={[{ label: "Home", href: "/" }, { label: hub.name }]} />
        <section className="bg-paper">
          <div className="mx-auto max-w-[1500px] px-5 py-20 md:px-12 md:py-28 xl:px-16">
            <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
              <p className="label text-mute lg:col-span-3">{items.length} pages</p>
              <Reveal className="lg:col-span-8">
                <h2 className="heading text-[clamp(1.9rem,3.4vw,3.2rem)] text-ink">{hub.key === "about" ? about.statement : hub.blurb}</h2>
              </Reveal>
            </div>
            <PageCards items={items} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
