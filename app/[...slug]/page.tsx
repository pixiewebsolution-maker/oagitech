import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CardGrid, Chips, ExploreMore, Facts, Overview, PointGrid, ServiceList, shell, Split, type Card } from "@/components/page/Blocks";
import { PageHero, type Crumb } from "@/components/page/PageHero";
import { Faq } from "@/components/sections/Faq";
import { aboutByRoute, contentRoutes, hubByRoute, servicePageByRoute, trainingByRoute } from "@/data/catalog";
import { company } from "@/data/company";
import { divisions, itemCount, pagesInDivision, type ServicePage } from "@/data/services";
import { trainingCategories, trainingMethods } from "@/data/training";

const routeOf = (slug: string[]) => "/" + slug.join("/");

// Every route is listed in generateStaticParams and prerendered, so the instant-navigation check isn't needed here.
export const instant = false;

export function generateStaticParams() {
  return contentRoutes.map((r) => ({ slug: r.slice(1).split("/") }));
}

function metaFor(route: string): { title: string; description: string; image: string } | null {
  const s = servicePageByRoute(route);
  if (s) return { title: s.navLabel, description: `${s.tagline} ${s.intro[0]}`, image: s.hero };
  const h = hubByRoute(route);
  if (h) return { title: h.title, description: h.tagline, image: h.hero };
  const t = trainingByRoute(route);
  if (t) return { title: t.name, description: `${t.tagline} ${t.intro[0]}`, image: t.hero };
  const a = aboutByRoute(route);
  if (a) return { title: a.navLabel, description: a.tagline, image: a.hero };
  return null;
}

const describe = (text: string) => (text.length > 158 ? text.slice(0, 155).replace(/\s+\S*$/, "") + "..." : text);

export async function generateMetadata({ params }: PageProps<"/[...slug]">): Promise<Metadata> {
  const { slug } = await params;
  const route = routeOf(slug);
  const m = metaFor(route);
  if (!m) return {};
  const description = describe(m.description);
  return { title: m.title, description, alternates: { canonical: route }, openGraph: { title: m.title, description, url: route, images: [{ url: m.image, alt: m.title }] } };
}

const toCard = (p: ServicePage): Card => ({ title: p.navLabel, text: p.tagline, href: p.route, photo: p.hero, count: itemCount(p) });

/** Other services to suggest at the bottom of a service page. */
function relatedServices(page: ServicePage): { title: string; cards: Card[]; viewAll?: string } {
  const siblings = pagesInDivision(page.division).filter((p) => p.route !== page.route);
  if (siblings.length) return { title: `More ${divisions[page.division].short}`, cards: siblings.map(toCard), viewAll: divisions[page.division].hub };
  const others = Object.values(divisions)
    .filter((d) => d.key !== page.division)
    .map((d) => ({ title: d.name, text: d.blurb, href: d.hub, photo: d.photo }));
  return { title: "Other services", cards: others };
}

export default async function Page({ params }: PageProps<"/[...slug]">) {
  const { slug } = await params;
  const route = routeOf(slug);

  // ---- Service page ----
  const service = servicePageByRoute(route);
  if (service) {
    const div = divisions[service.division];
    const crumbs: Crumb[] = [{ label: "Home", href: "/" }];
    if (div.hub !== service.route) crumbs.push({ label: div.short, href: div.hub });
    crumbs.push({ label: service.navLabel });
    const total = itemCount(service);
    const related = relatedServices(service);
    return (
      <>
        <Header />
        <main>
          <PageHero title={service.navLabel} tagline={service.tagline} image={service.hero} crumbs={crumbs} cta={{ label: "Request a quote", href: `/contact?subject=${encodeURIComponent(service.navLabel)}` }} />
          <div className="bg-paper">
            <div className={shell}>
              <Overview intro={service.intro} aside={<Facts facts={[{ value: String(total), label: total === 1 ? "Service" : "Services" }, { value: String(service.groups.length), label: service.groups.length === 1 ? "Group" : "Groups" }]} />} />
              {service.groups.map((g) => (
                <Split key={g.name} heading={g.name} meta={`${g.items.length} ${g.items.length === 1 ? "item" : "items"}`}>
                  {g.intro ? <p className="mb-8 text-[1.05rem] leading-relaxed text-mute">{g.intro}</p> : null}
                  <ServiceList items={g.items} />
                </Split>
              ))}
              {service.extra?.map((x) => (
                <Split key={x.heading} heading={x.heading}>
                  {x.body?.map((b, i) => (
                    <p key={i} className="mb-6 text-[1.08rem] leading-relaxed text-mute">
                      {b}
                    </p>
                  ))}
                  {x.points ? <PointGrid points={x.points} /> : null}
                </Split>
              ))}
              {service.note ? (
                <div className="border-t border-line py-10">
                  <p className="max-w-[48rem] text-[0.95rem] leading-relaxed text-mute">{service.note}</p>
                </div>
              ) : null}
            </div>
          </div>
          {service.faqs?.length ? <Faq faqs={service.faqs} title={`${service.navLabel} FAQs`} tone="paper-2" /> : null}
          <ExploreMore title={related.title} cards={related.cards} viewAll={related.viewAll} />
        </main>
        <Footer />
      </>
    );
  }

  // ---- Hub page (NDT, Calibration, Underwater, Training) ----
  const hub = hubByRoute(route);
  if (hub) {
    const isTraining = hub.route === "/training";
    return (
      <>
        <Header />
        <main>
          <PageHero title={hub.title} tagline={hub.tagline} image={hub.hero} crumbs={[{ label: "Home", href: "/" }, { label: hub.title }]} cta={isTraining ? { label: "Register for a course", href: "/training/register" } : undefined} />
          <div className="bg-paper">
            <div className={shell}>
              <Overview intro={hub.intro} />
              <section className="border-t border-line py-16 md:py-24">
                <CardGrid cards={hub.cards.map((c) => ({ ...c, countLabel: isTraining ? "courses" : "services" }))} />
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ---- Training category ----
  const tc = trainingByRoute(route);
  if (tc) {
    const others = trainingCategories.filter((c) => c.route !== tc.route).map((c) => ({ title: c.name, text: c.tagline, href: c.route, photo: c.hero, count: c.courses.length, countLabel: "courses" }));
    return (
      <>
        <Header />
        <main>
          <PageHero
            title={tc.name}
            tagline={tc.tagline}
            image={tc.hero}
            crumbs={[{ label: "Home", href: "/" }, { label: "Training", href: "/training" }, { label: tc.name }]}
            cta={{ label: "Register for a course", href: `/training/register?category=${tc.slug}` }}
          />
          <div className="bg-paper">
            <div className={shell}>
              <Overview intro={tc.intro} aside={<Facts facts={[{ value: String(tc.courses.length), label: "Courses" }, { value: String(trainingMethods.length), label: "Delivery methods" }]} />} />
              <Split heading="Courses" meta={`${tc.courses.length} courses in category ${tc.letter}`}>
                <ul className="border-t border-line">
                  {tc.courses.map((c) => (
                    <li key={c.code} className="border-b border-line">
                      <Link href={`/training/register?course=${c.code}`} className="group grid grid-cols-[5.5rem_1fr_auto] items-center gap-4 py-5">
                        <span className="text-[0.85rem] font-medium tabular-nums text-fog">{c.code}</span>
                        <span className="text-[1.1rem] font-medium tracking-[-0.015em] text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">{c.title}</span>
                        <span className="flex items-center gap-1.5 text-[0.9rem] font-medium text-mute transition-colors group-hover:text-ink">
                          Register <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Split>
              <Split heading="Who it is for">
                <PointGrid points={tc.audience.map((a) => ({ title: a, text: "" }))} />
              </Split>
              <Split heading="How it is delivered">
                <p className="mb-8 text-[1.08rem] leading-relaxed text-mute">Choose the format that suits your team when you register. Courses can also be arranged for groups at your site.</p>
                <Chips items={[...trainingMethods]} />
              </Split>
            </div>
          </div>
          <ExploreMore title="Other training categories" cards={others} viewAll="/training" />
        </main>
        <Footer />
      </>
    );
  }

  // ---- About pages ----
  const ab = aboutByRoute(route);
  if (ab) {
    const crumbs: Crumb[] = [{ label: "Home", href: "/" }];
    if (ab.route !== "/about") crumbs.push({ label: "About", href: "/about" });
    crumbs.push({ label: ab.navLabel });
    const cta = ab.route === "/about/career" ? { label: "Send your CV", href: `mailto:${company.email}?subject=${encodeURIComponent("Career enquiry")}` } : { label: "Contact us", href: "/contact" };
    const serviceCards = Object.values(divisions).map((d) => ({ title: d.name, text: d.blurb, href: d.hub, photo: d.photo }));
    return (
      <>
        <Header />
        <main>
          <PageHero title={ab.navLabel} tagline={ab.tagline} image={ab.hero} crumbs={crumbs} cta={cta} />
          <div className="bg-paper">
            <div className={shell}>
              <Overview intro={ab.intro} />
              {ab.sections.map((s) => (
                <Split key={s.heading} heading={s.heading}>
                  {s.body?.map((b, i) => (
                    <p key={i} className="mb-6 text-[1.08rem] leading-relaxed text-mute">
                      {b}
                    </p>
                  ))}
                  {s.points ? <PointGrid points={s.points} /> : null}
                  {s.list ? <Chips items={s.list} /> : null}
                  {s.logos ? (
                    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {s.logos.map((l) => (
                        <li key={l.src} className="grid aspect-[16/9] place-items-center overflow-hidden rounded-2xl bg-[#efeef0]">
                          <Image src={l.src} alt={l.name} title={l.name} width={334} height={185} className="h-full w-full object-contain" />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Split>
              ))}
            </div>
          </div>
          <ExploreMore title="Our services" cards={serviceCards} />
        </main>
        <Footer />
      </>
    );
  }

  notFound();
}

