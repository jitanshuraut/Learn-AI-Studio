import React from "react";
import Link from "next/link";
import { Coins, ArrowRight } from "lucide-react";

type FeatureText = {
  icon: JSX.Element;
  title: React.ReactNode;
  description: string;
  href?: string;
  cta?: string;
};

const featureText: FeatureText[] = [
  {
    icon: <Coins className="h-6 w-6" />,
    title: (
      <p>
        Create <span className="text-[#8678F9]"> Account</span>
      </p>
    ),
    href: "/",
    description: "Create Your account and get 100 credit for free",
    cta: "Learn More",
  },
  {
    icon: <Coins className="h-6 w-6" />,
    title: (
      <p>
        Input a <span className="text-[#8678F9]"> Promp</span>
      </p>
    ),
    href: "/",
    description:
      "Users enter a topic or prompt that they want to develop into a course.",
    cta: "Learn More",
  },

  {
    icon: <Coins className="h-6 w-6" />,
    title: (
      <p>
        AI Course <span className="text-[#8678F9]"> Generation</span>
      </p>
    ),
    href: "/",
    description:
      "The AI processes the prompt, generating a structured course outline, content modules, and interactive elements.",
    cta: "Learn More",
  },
];

function HowItWorks() {
  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="text-7xl text-[#8678F9] text-center font-headingAlt font-bold">
          How It Works
        </h1>

        <div className="mt-6 grid gap-6 md:mt-12 md:grid-cols-3">
          {featureText.map(({ icon, title, description, href, cta }, index) => (
            <Link
              href={`${href}`}
              className="flex flex-col justify-between gap-6 rounded-lg border p-6 transition-all hover:-mt-2 hover:mb-2"
              key={index}
            >
              <div className="grid gap-4">
                {icon}
                <h4 className="text-md text-primary font-bold  font-headingAlt">
                  Step : {index + 1}
                </h4>

                <h4 className="text-xl text-primary  font-headingAlt">
                  {title}
                </h4>
                <p className="text-base opacity-75">{description}</p>
              </div>
              {cta && (
                <div className="flex h-fit items-center text-sm font-semibold">
                  <p>{cta}</p> <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default HowItWorks;
