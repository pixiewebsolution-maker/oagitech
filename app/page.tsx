import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { About, ClientStrip } from "@/components/sections/About";
import { Diving } from "@/components/sections/Diving";
import { Divisions } from "@/components/sections/Divisions";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Training } from "@/components/sections/Training";
import { WhyUs } from "@/components/sections/WhyUs";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ClientStrip />
        <About />
        <Services />
        <Divisions />
        <WhyUs />
        <Diving />
        <Training />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
