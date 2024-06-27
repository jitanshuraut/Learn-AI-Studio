"use client";
import HeroSection from "@/components/hero-section";

export default function Home() {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-6 font-subalt ">
        <div>
          <HeroSection />
        </div>
        <div className="h-[100vh]"></div>
      </div>
    </>
  );
}
