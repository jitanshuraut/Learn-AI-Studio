"use client";
import AboutSection from "@/components/LandingPage-Sections/about-section";
import { FAQ } from "@/components/LandingPage-Sections/faq-section";
import Footer from "@/components/LandingPage-Sections/footer-section";
import HeroSection from "@/components/LandingPage-Sections/hero-section";
import HowItWorks from "@/components/LandingPage-Sections/how-It-works";
import KeyFeatures from "@/components/LandingPage-Sections/key-features";
import Testimonials from "@/components/LandingPage-Sections/testimonials";
import Section from "@/components/ui/LandingPage/Section";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import FloatingNav from "@/components/ui/LandingPage/floating-navbar";


const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "About",
    link: "/posts",
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];
export default function Home() {

  return (
    <div>
   

      <header>
        <FloatingNav navItems={navItems} />
      </header>
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

        <Section>
          <Footer />
        </Section>
      </div>
    </div>
  );
}
