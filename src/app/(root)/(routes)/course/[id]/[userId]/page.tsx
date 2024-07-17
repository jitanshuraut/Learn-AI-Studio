"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type CourseData = {
  name: string;
  numberofdays: number;
  Introduction: string[];
  Assessment: string[];
  Conclusion: string[];
  ReferenceBooks: {
    title: string;
    version: string;
    author: string;
    source: string;
  }[];
  CourseStructureInfluence: string;
  [key: string]:
    | string
    | number
    | string[]
    | { title: string; version: string; author: string; source: string }[]
    | undefined;
};

const extractAndDecodeSegments = (url: string): [string, string] => {
  const segments = url.split("/");
  const lastSegment = segments[segments.length - 1];
  const secondToLastSegment = segments[segments.length - 2];
  const decodeBase64 = (str: string) =>
    Buffer.from(str, "base64").toString("utf-8");

  return [decodeBase64(secondToLastSegment), decodeBase64(lastSegment)];
};

const extractDays = (
  courseData: CourseData
): { day: string; modules: string[] }[] => {
  const days: { day: string; modules: string[] }[] = [];

  for (const key in courseData) {
    if (key.startsWith("Day")) {
      const modules = courseData[key] as string[];
      days.push({ day: key, modules });
    }
  }

  return days;
};

function Home() {
  const pathname = usePathname();
  const search = pathname;

  const [userid, courseid] = extractAndDecodeSegments(search);
  const jsonString: string = localStorage.getItem(courseid) || "";

  const parsedJson = JSON.parse(jsonString);
  const { course, coursestructure } = parsedJson;

  const coursestructure_new = JSON.parse(coursestructure);
  const daysWithModules = extractDays(coursestructure_new);
  console.log(daysWithModules);
  const parsedCourseStructure = JSON.parse(coursestructure);

  Object.keys(parsedCourseStructure).forEach((key) => {
    if (key.startsWith("Day")) {
      coursestructure_new[key] = parsedCourseStructure[key];
    }
  });

  const [selectedDay, setSelectedDay] = useState(1);

  const nextDay = () => {
    const days = Object.keys(daysWithModules);
    const currentIndex = selectedDay;
    let nextIndex = (currentIndex + 1) % days.length;
    if (nextIndex == 0) {
      nextIndex = days.length;
    }
    setSelectedDay(nextIndex);
  };

  return (
    <>
      <div className="flex">
        <div className="w-1/5 z-50 h-screen p-4 bg-primary-foreground">
          <h2 className="text-xl font-bold mb-4">Days</h2>
          <ul>
            {daysWithModules.map((dayData, index) => (
              <li
                key={dayData.day}
                className={`p-2 mb-1 rounded-md cursor-pointer ${dayData.day === "Day " + selectedDay ? "bg-[#8678F9] text-white" : "bg-primary-foreground"}`}
                onClick={() => setSelectedDay(index)}
              >
                {dayData.day}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-3/4 h-screen p-4">
          <h2 className="text-2xl font-bold mb-4">Day {selectedDay}</h2>
          <ul className="list-disc pl-5">
            {daysWithModules
              .find((day) => day.day === "Day " + selectedDay)
              ?.modules.map((module, index) => (
                <li key={index} className="mb-2">
                  {module}
                </li>
              ))}
          </ul>
          <button
            className="px-2 py-1 bg-white text-black rounded-md mt-4"
            onClick={nextDay}
          >
            Next Day
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
