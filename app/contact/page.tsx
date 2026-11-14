import type { Metadata } from "next";
import { Factory, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Suspense } from "react";
import { ContactForm, ContactFormFromUrl } from "@/components/page/ContactForm";
import { PageHero } from "@/components/page/PageHero";
import { Reveal } from "@/components/Reveal";
import { company } from "@/data/company";
import { about, photos } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact OAGITECH in Yanbu, Saudi Arabia for inspection, NDT, calibration, diving and training enquiries.",
  alternates: { canonical: "/contact" },
};

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Al Rabie District, Yanbu, Saudi Arabia")}`;

export default function ContactPage() {
  const cards = [
    { icon: Phone, label: "Call", value: company.phone, href: company.phoneHref },
    { icon: MessageCircle, label: "WhatsApp", value: company.phone, href: company.whatsappHref, external: true },
    { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
    { icon: MapPin, label: "Office", value: company.address, href: mapsHref, external: true },
  ];

  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Contact Us"
          tagline="Tell us what needs inspecting, testing, calibrating or training. Our team will get back to you."
          image={photos.offshoreHaze}
          crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
          cta={{ label: "WhatsApp us", href: company.whatsappHref }}
        />
        <section className="bg-paper">
          <div className="mx-auto grid max-w-[1500px] gap-14 px-5 py-20 md:px-12 md:py-28 lg:grid-cols-12 xl:px-16">
            <div className="lg:col-span-5">
              <p className="label text-mute">Get in touch</p>
              <Reveal>
                <h2 className="heading mt-5 text-[clamp(2.2rem,4vw,3.8rem)] text-ink">Let’s talk about your next job.</h2>
              </Reveal>
              <ul className="mt-10 grid gap-3">
                {cards.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex items-start gap-4 rounded-2xl border border-line bg-white/60 p-5 transition-colors hover:border-ink hover:bg-white"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-amber">
                        <c.icon aria-hidden className="h-5 w-5" strokeWidth={1.8} />
                      </span>
                      <span>
                        <span className="label block text-mute">{c.label}</span>
                        <span className="mt-0.5 block text-[1.05rem] font-medium leading-snug text-ink">{c.value}</span>
                      </span>
                    </a>
                  </li>
                ))}
                <li className="flex items-start gap-4 rounded-2xl border border-line p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper-2 text-ink">
                    <Factory aria-hidden className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="label block text-mute">Industries served</span>
                    <span className="mt-0.5 block text-[1.05rem] font-medium leading-snug text-ink">{about.sectors.join(" · ")}</span>
                  </span>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="rounded-[28px] bg-paper-2 p-6 md:p-10">
                <h2 className="text-[1.6rem] font-medium tracking-[-0.025em] text-ink">Send an enquiry</h2>
                <p className="mt-2 text-[1rem] text-mute">Share a few details and we’ll prepare a quote.</p>
                <div className="mt-8">
                  <Suspense fallback={<ContactForm />}>
                    <ContactFormFromUrl />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
