"use client";
import AboutSection from "@/components/about-section";
import { FAQ } from "@/components/faq-section";
import HeroSection from "@/components/hero-section";
import HowItWorks from "@/components/how-It-works";
import KeyFeatures from "@/components/key-features";
import Testimonials from "@/components/testimonials";
import Section from "@/components/ui/Section";

export default function Home() {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-6 font-subalt ">
        <div>
          <HeroSection />
        </div>

        <div className="my-3">
          <Section>
            <AboutSection />
          </Section>
        </div>

        <Section>
          <KeyFeatures />
        </Section>

        <Section>
          <HowItWorks />
        </Section>

        <Section>
          <Testimonials />
        </Section>

        <Section>
          <FAQ />
        </Section>
      </div>
    </>
  );
}
