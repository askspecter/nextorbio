import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BuyCredits } from "@/components/BuyCredits";
import { Trust } from "@/components/Trust";
import { ApiDemo } from "@/components/ApiDemo";
import { Pricing } from "@/components/Pricing";
import { LiquidityBook } from "@/components/LiquidityBook";
import { Analytics } from "@/components/Analytics";
import { Migration } from "@/components/Migration";
import { Faq } from "@/components/Faq";
import { CtaFooter } from "@/components/CtaFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BuyCredits />
        <Trust />
        <ApiDemo />
        <Pricing />
        <LiquidityBook />
        <Analytics />
        <Migration />
        <Faq />
        <CtaFooter />
      </main>
    </>
  );
}
