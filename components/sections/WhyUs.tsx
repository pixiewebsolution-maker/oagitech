import Image from "next/image";
import { activities, photos, reasons } from "@/data/site";
import { Reveal } from "../Reveal";

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="bg-paper-2">
      <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-12 md:py-36 xl:px-16">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="label text-mute">Why choose us</p>
              <Reveal>
                <h2 id="why-title" className="heading mt-5 text-[clamp(2.4rem,4.6vw,4.4rem)] text-ink">
                  Our commitment to safer, better-run operations.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="relative mt-10 aspect-[5/4] overflow-hidden rounded-[26px]">
                  <Image src={photos.welderSparks} alt="Welder working on steel with sparks flying" fill sizes="(min-width:1024px) 38vw, 100vw" className="object-cover" />
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="grid gap-px overflow-hidden rounded-[26px] bg-line sm:grid-cols-2">
              {reasons.map((r, i) => (
                <li key={r.title} className="bg-paper p-7 md:p-9">
                  <Reveal delay={i * 0.06}>
                    <span aria-hidden className="block h-1.5 w-8 rounded-full bg-amber" />
                    <h3 className="heading mt-7 text-[1.6rem] text-ink">{r.title}</h3>
                    <p className="mt-3 text-[0.98rem] leading-relaxed text-mute">{r.text}</p>
                  </Reveal>
                </li>
              ))}
            </ul>

            <div className="mt-20">
              <p className="label text-mute">Business activities</p>
              <ul className="mt-6 border-t border-line">
                {activities.map((a, i) => (
                  <li key={a.title} className="border-b border-line">
                    <Reveal delay={i * 0.04} y={16}>
                      <div className="grid gap-2 py-6 md:grid-cols-[1fr_1.3fr] md:gap-8">
                        <h3 className="text-[1.25rem] font-medium tracking-[-0.02em] text-ink">{a.title}</h3>
                        <p className="text-[0.98rem] leading-relaxed text-mute">{a.text}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
