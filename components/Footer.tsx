import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { menu } from "@/data/catalog";
import { company } from "@/data/company";
import { certifications, photos } from "@/data/site";
import { Reveal } from "./Reveal";

type FooterGroup = { label: string; hub?: string; links: { label: string; href: string }[] };

const group = (label: string): FooterGroup => {
  const g = menu.find((m) => m.label === label)!;
  return { label, hub: g.feature?.href, links: g.links ?? [] };
};

/** Five columns; the short groups share a column so nothing gets squeezed. */
const footerColumns: FooterGroup[][] = [
  [group("Inspection"), group("NDT")],
  [group("Calibration")],
  [group("Underwater & Marine")],
  [group("Training")],
  [
    { ...group("About Us"), label: "Company" },
    { label: "Digital", links: [{ label: "Software & IT", href: "/software-it" }] },
  ],
];

export function Footer() {
  return (
    <footer id="contact" className="bg-ink p-2.5 text-paper md:p-3">
      {/* Call to action panel */}
      <div className="relative overflow-hidden rounded-[22px] md:rounded-[30px]">
        <Image src={photos.offshoreHaze} alt="" fill sizes="(min-width:768px) 100vw, 200vw" quality={85} className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,14,15,0.88)_0%,rgba(13,14,15,0.55)_55%,rgba(13,14,15,0.25)_100%)]" />
        <div className="relative grid gap-12 px-6 py-20 md:px-12 md:py-28 lg:grid-cols-12 xl:px-16">
          <div className="lg:col-span-7">
            <p className="label text-white/70">Get in touch</p>
            <Reveal>
              <h2 className="display mt-6 text-[clamp(3.4rem,8vw,8rem)] uppercase">
                Let’s talk about
                <br />
                your next job.
              </h2>
            </Reveal>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="pill bg-amber text-ink hover:bg-amber-2">
                Request a quote
                <span className="pill-disc bg-ink text-white">
                  <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
                </span>
              </Link>
              <a href={company.whatsappHref} target="_blank" rel="noopener noreferrer" className="pill glass text-white hover:bg-white/25">
                WhatsApp us
                <span className="pill-disc bg-white text-ink">
                  <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
                </span>
              </a>
            </div>
          </div>

          <ul className="grid content-end gap-3 lg:col-span-4 lg:col-start-9">
            <li>
              <a href={company.phoneHref} className="glass flex items-center gap-4 rounded-2xl p-5 transition-colors hover:bg-white/20">
                <Phone aria-hidden className="h-5 w-5 text-amber" strokeWidth={1.8} />
                <span>
                  <span className="label block text-white/60">Call</span>
                  <span className="text-[1.1rem] font-medium">{company.phone}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="glass flex items-center gap-4 rounded-2xl p-5 transition-colors hover:bg-white/20">
                <Mail aria-hidden className="h-5 w-5 text-amber" strokeWidth={1.8} />
                <span>
                  <span className="label block text-white/60">Email</span>
                  <span className="text-[1.1rem] font-medium">{company.email}</span>
                </span>
              </a>
            </li>
            <li className="glass flex items-center gap-4 rounded-2xl p-5">
              <MapPin aria-hidden className="h-5 w-5 shrink-0 text-amber" strokeWidth={1.8} />
              <span>
                <span className="label block text-white/60">Visit</span>
                <span className="text-[1rem] font-medium leading-snug">{company.address}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Brand row, then link columns: every page from the menu */}
      <div className="mx-auto max-w-[1500px] px-3 pb-12 pt-20 md:px-9 md:pt-24 xl:px-13">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <Image src="/brand/oagitech-logo-header.png" alt="OAGITECH" width={937} height={303} unoptimized className="h-14 w-auto" />
            <p className="mt-6 max-w-[24rem] text-[1rem] leading-relaxed text-fog">
              Inspection, testing, calibration, underwater services and HSE training from Yanbu, Kingdom of Saudi Arabia.
            </p>
          </div>
          <div className="lg:col-span-7 lg:justify-self-end">
            <Link href="/about/certifications-and-awards" className="text-[0.9rem] font-medium text-paper transition-colors hover:text-amber">
              Certifications & accreditations
            </Link>
            <ul className="mt-4 flex flex-wrap gap-2 lg:max-w-[40rem]">
              {certifications.map((m) => (
                <li key={m} className="rounded-full border border-white/10 px-3 py-1 text-[0.82rem] text-white/70">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-white/10 pt-14 md:gap-x-10 lg:grid-cols-5">
          {footerColumns.map((col, i) => (
            <div key={i} className="grid content-start gap-12">
              {col.map((g) => (
                <nav key={g.label} aria-label={g.label}>
                  <p className="text-[1rem] font-medium text-paper">
                    {g.hub ? (
                      <Link href={g.hub} className="transition-colors hover:text-amber">
                        {g.label}
                      </Link>
                    ) : (
                      g.label
                    )}
                  </p>
                  <ul className="mt-5 grid gap-3 text-[0.92rem] leading-snug">
                    {g.links.map((l) => (
                      <li key={l.href + l.label}>
                        <Link href={l.href} className="text-white/60 transition-colors hover:text-amber">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <a href={company.brochure} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-paper underline underline-offset-4 hover:text-amber">
            Download company profile <ArrowUpRight aria-hidden className="h-4 w-4" />
          </a>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[0.92rem] text-white/60">
            <a href={company.phoneHref} className="hover:text-amber">{company.phone}</a>
            <a href={`mailto:${company.email}`} className="hover:text-amber">{company.email}</a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-3 md:px-9 xl:px-13">
        <p aria-hidden className="display select-none text-center text-[25vw] leading-[0.8] text-ink-3 xl:text-[25rem]">
          OAGITECH
        </p>
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-[0.85rem] text-fog md:flex-row md:justify-between">
          <p>© 2026 OAGITECH, Oil & Gas Inspection Technology. All rights reserved.</p>
          <p>Yanbu · Kingdom of Saudi Arabia</p>
        </div>
      </div>
    </footer>
  );
}
