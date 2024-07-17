import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

function Coursescard({ course, UserId }: any) {
  const encodeBase64 = (str: string) => {
    return Buffer.from(str).toString("base64");
  };
  return (
    <div className="flex  flex-col max-h-72 justify-between  bg-primary-foreground p-4 rounded-md shadow-md border z-100 border-gray-800">
      <h1 className="font-bold mt-5 text-2xl">{course.courseName}</h1>
      <p className="text-gray-400 text-sm mt-1">
        {course.Introduction &&
          course.Introduction.split(" ").slice(0, 100).join(" ") + ".."}
      </p>
      <div className="flex justify-between items-center mt-5">
        <div className="w-[50%] bg-gray-200 rounded-lg overflow-hidden">
          <div className="bg-blue-500 text-xs leading-none py-1 text-center text-white w-[60%]"></div>
        </div>
        <p>60%</p>

        <Link
          className="bg-white  text-black px-2 py-1 rounded-md w-[30%] flex justify-between items-center"
          href={`/course/${encodeBase64(UserId)}/${encodeBase64(course.id)}`}
          target="_blank"
          onClick={() => {
            const data = {
              course: course.id,
              coursestructure: course.structure,
            };
            localStorage.setItem(course.id, JSON.stringify(data));
          }}
        >
          continue <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default Coursescard;
