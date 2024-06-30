import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

function Coursescard() {
  return (
    <div className="flex flex-col justify-center bg-primary-foreground p-4 rounded-md shadow-md border border-gray-800">
      <Image
        src="/courses.png"
        width={350}
        height={50}
        alt="courses image"
        className="object-contain rounded-lg"
      />
      <h1 className="font-bold mt-5 text-xl">
        Introduction to Machine learning
      </h1>
      <p className="text-gray-400 text-sm mt-1">
        Machine learning uses algorithms to analyze data, learn from it, and
        make predictions or decisions without explicit programming.
      </p>
      <div className="flex justify-between items-center mt-5">
        <div className="w-[50%] bg-gray-200 rounded-lg overflow-hidden">
          <div className="bg-blue-500 text-xs leading-none py-1 text-center text-white w-[60%]"></div>
        </div>
        <p>60%</p>
        <button className="bg-white text-black px-2 py-1 rounded-md w-[30%] flex justify-between items-center ">
          continue <ArrowUpRight size={16} strokeWidth={1} />
        </button>
      </div>
    </div>
  );
}

export default Coursescard;
