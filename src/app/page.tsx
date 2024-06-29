import AboutSection from "@/components/about-section";
import { FAQ } from "@/components/faq-section";
import Footer from "@/components/footer-section";
import HeroSection from "@/components/hero-section";
import HowItWorks from "@/components/how-It-works";
import KeyFeatures from "@/components/key-features";
import Testimonials from "@/components/testimonials";
import Section from "@/components/ui/Section";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import FloatingNav from "@/components/ui/floating-navbar";

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
