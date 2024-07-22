import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "../../ui/button";

function AboutSection() {
  return (
    <div id="about" className="w-[95%] mx-auto">
      <div className="flex justify-between items-center md:flex-row flex-col">
        <div className="md:w-[30%] w-auto flex h-96 overflow-hidden rounded-lg border">
          <Image
            src="/dummy.png"
            width={200}
            height={200}
            alt="placeholder"
            className="w-full object-contain"
          />
        </div>
        <div className="md:w-[60%] w-auto flex flex-col py-8">
          <h3 className="text-4xl font-headingAlt my-3">
            Turning prompts into{" "}
            <span className="text-[#8678F9]"> personalized</span> educational
            journeys with <span className="text-[#8678F9]">AI</span>.
          </h3>
          <p className="font-light text-md leading-[1.4] opacity-70 my-3 ">
            LearnAI Studio is a cutting-edge platform that harnesses the power
            of artificial intelligence to craft bespoke educational courses.
            With a simple prompt, users can generate detailed and structured
            learning modules tailored to their unique needs, creating an
            engaging and personalized learning experience.
          </p>
          <div className=" flex items-center gap-2 my-4">
            <Button className="w-fit" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
            <Button className="w-fit" variant="link" asChild>
              <Link href="#">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
