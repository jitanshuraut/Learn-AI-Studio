import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Archive } from "lucide-react";
import { Heart } from "lucide-react";

interface Course {
  id: string;
  userId: string;
  courseName: string;
  Introduction: string;
  numberOfDays: number;
  ModuleCreated: number;
  structure: any;
  createdAt: Date;
  updatedAt: Date;
}
type CoursescardProps = {
  course: Course;
  UserId: string;
  archiveDefault: number;
};

const SetData = async (courseId: string, archive: number) => {
  try {
    const response = await fetch(`/api/setArchive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId: courseId,
        archive: archive,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log("Response data:", data);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

function Coursescard({ course, UserId, archiveDefault }: CoursescardProps) {
  const encodeBase64 = (str: string) => {
    return Buffer.from(str).toString("base64");
  };

  const Progress = String(
    ((course.ModuleCreated / (3 * course.numberOfDays)) * 100).toFixed(0)
  );

  const handelArchive = () => {
    SetData(course.id, (archive + 1) % 2);
    setarchive((archive + 1) % 2);
  };

  const [archive, setarchive] = useState<number>(archiveDefault);
  if (archive == archiveDefault) {
    return (
      <div className="flex  flex-col max-h-80 justify-between  bg-primary-foreground p-4 rounded-md shadow-md border z-100 border-gray-800">
        <h1 className="font-bold mt-5 text-2xl">{course.courseName}</h1>
        <p className="text-gray-400 text-sm mt-1 overflow-y-scroll h-[70%] hide-scrollbar ">
          {course.Introduction &&
            course.Introduction.split(" ").slice(0, 100).join(" ") + ".."}
        </p>
        <div className="flex justify-between items-center mt-5">
          <div className="flex justify-between items-center w-[50%]">
            <div className="w-[80%] bg-gray-200 rounded-lg overflow-hidden">
              <div
                className={`bg-blue-500 text-xs leading-none py-1 text-center text-white`}
                style={{ width: `${Progress}%` }}
              ></div>
            </div>
            <p>{Progress}%</p>
          </div>

          <div className="flex justify-between items-center w-[40%]">
            <Link
              className="bg-white  text-black px-2 py-1 rounded-md w-[70%] flex justify-center items-center"
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
            <Archive
              className={`mx-2 cursor-pointer ${archive == 1 ? "text-[#8678F9]" : ""}  `}
              onClick={() => {
                // console.log(archive);
                handelArchive();
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Coursescard;
