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
    link: "#home",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "About",
    link: "#about",
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];
export default function Home() {
  localStorage.clear();

  return (
    <div>
      <header>
        <FloatingNav navItems={navItems} />
      </header>
      <div className="w-full flex flex-col justify-center items-center gap-6 font-subalt ">
        <div>
          <div className="absolute inset-0 -z-10 h-[97vh] rounded-3xl mx-auto  w-[97%] items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
          <HeroSection />
        </div>
        {/* <div class="relative h-full w-full bg-white"><div class="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div></div> */}

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
