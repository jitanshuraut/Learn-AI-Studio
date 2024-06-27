import React from "react";
import Link from "next/link";

// Icons
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
        AI-Powered Course <span className="text-[#8678F9]"> Generation</span>
      </p>
    ),
    href: "/",
    description:
      "Automatically generate comprehensive courses from simple prompts.",
    cta: "Learn More",
  },
  {
    icon: <Coins className="h-6 w-6" />,
    title: (
      <p>
        <span className="text-[#8678F9]"> Personalized</span> Learning Paths
      </p>
    ),
    href: "/",
    description:
      "Tailor-made content to match individual learning preferences and goals.",
    cta: "Learn More",
  },
];

const singleFeatureText: FeatureText[] = [
  {
    icon: <Coins className="h-6 w-6" />,
    title: (
      <p>
        {" "}
        <span className="text-[#8678F9]"> Interactive</span> Content
      </p>
    ),
    href: "/",
    description:
      "Engage learners with multimedia-rich modules, including videos, quizzes, and interactive activities.",
    cta: "Learn More",
  },
];

function KeyFeatures() {
  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="text-7xl text-[#8678F9] text-center font-headingAlt font-bold">
          Features
        </h1>

        <div className="relative">
          {/* First div */}
          <div className="absolute inset-52 flex justify-center items-center">
            <div className="h-96 w-96 max-w-full animate-pulse-slow rounded-full bg-[#8678F9] opacity-20 blur-[100px]" />
          </div>

          {/* Second div */}
          <div className="absolute inset-52 flex justify-center items-center z-10">
            <div className="h-96 w-96 max-w-full animate-pulse-slow rounded-full bg-[#8678F9] opacity-20 blur-[100px]" />
          </div>
        </div>
        <div className=" grid gap-6 md:grid-cols-2">
          {featureText.map(({ icon, title, description, href, cta }, index) => (
            <Link
              href={`${href}`}
              className="flex flex-col justify-between gap-6 rounded-lg border p-6 transition-all hover:-mt-2 hover:mb-2"
              key={index}
            >
              <div className="grid gap-4">
                {icon}
                <h4 className="text-xl text-primary font-headingAlt">
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
        <div>
          {singleFeatureText.map(
            ({ icon, title, description, href, cta }, index) => (
              <Link
                href={`${href}`}
                className="flex flex-col justify-between gap-6 rounded-lg border bg-muted/25 p-6 transition-all hover:-mt-2 hover:mb-2"
                key={index}
              >
                <div className="grid gap-4">
                  {icon}
                  <h4 className="text-xl text-primary font-headingAlt">
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
            )
          )}
        </div>
      </div>
    </>
  );
}

export default KeyFeatures;
