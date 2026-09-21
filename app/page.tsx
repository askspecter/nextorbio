import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Providers } from "@/components/Providers";
import { Product } from "@/components/Product";
import { BuyCredits } from "@/components/BuyCredits";
import { ApiDemo } from "@/components/ApiDemo";
import { Pricing } from "@/components/Pricing";
import { Analytics } from "@/components/Analytics";
import { Faq } from "@/components/Faq";
import { CtaFooter } from "@/components/CtaFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Providers />
        <Product />
        <BuyCredits />
        <ApiDemo />
        <Pricing />
        <Analytics />
        <Faq />
        <CtaFooter />
      </main>
    </>
  );
}
