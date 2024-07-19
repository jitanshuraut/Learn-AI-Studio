"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { Disc } from "lucide-react";
import { Module } from "module";
const fetchData = async ({
  moduleNumber,
  courseId,
  dayNumber,
  userId,
}: {
  moduleNumber: string;
  courseId: string;
  dayNumber: string;
  userId: string;
}) => {
  try {
    const response = await fetch(`/api/getModule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId: courseId,
        dayNumber: dayNumber,
        userId: userId, // Assuming userId is defined elsewhere
        moduleNumber: moduleNumber,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it further up the call stack
  }
};

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

interface ModuleData {
  day: number;
  module: number;
  content: {
    data: string;
  };
}

const Home: React.FC = () => {
  const pathname = usePathname();
  const search = pathname;

  const [userid, courseid] = extractAndDecodeSegments(search);
  const jsonString: string | null = localStorage.getItem(courseid);

  if (jsonString != null) {
    const parsedJson = JSON.parse(jsonString);
    const { course, coursestructure } = parsedJson;

    const coursestructure_new = JSON.parse(coursestructure);
    console.log(coursestructure_new);
    const daysWithModules = extractDays(coursestructure_new);

    const [selectedDay, setSelectedDay] = useState<number>(1);
    const [selectModule, setselectModule] = useState<number>(1);
    const [ModulesData, setModulesData] = useState<ModuleData[]>([]);
    const [loading, setLoading] = useState(false);

    const nextDay = () => {
      setSelectedDay((prevDay) => {
        const nextIndex = (prevDay % daysWithModules.length) + 1;
        return nextIndex;
      });
      setselectModule(1);
    };

    useEffect(() => {
      const fetchCourseData = async () => {
        try {
          setLoading(true);
          const selectedDayData = daysWithModules.find(
            (day) => day.day === `Day ${selectedDay}`
          );
          if (selectedDayData) {
            // for (let i = 0; i < selectedDayData.modules.length; i++) {
            const existingData = ModulesData.find(
              (data) => data.day === selectedDay && data.module === selectModule
            );

            if (!existingData) {
              const module = selectedDayData.modules[selectModule - 1];
              const contentIndex = module.indexOf(":");
              const content = module.slice(contentIndex + 1).trim();

              const data_Fetch = await fetchData({
                moduleNumber: String(selectModule),
                courseId: courseid,
                dayNumber: String(selectedDay),
                userId: userid,
              });
              const newData = {
                day: selectedDay,
                module: selectModule,
                content: data_Fetch,
              };

              setModulesData((prevModulesData) => {
                const exists = prevModulesData.some(
                  (data) =>
                    data.day === newData.day &&
                    data.module === newData.module &&
                    data.content === newData.content
                );
                if (exists) {
                  return prevModulesData; // If exists, return the previous data
                } else {
                  return [...prevModulesData, newData]; // If not, append the new data
                }
              });
              console.log(selectedDayData);
            }
          }

          setLoading(false);
          console.log(ModulesData);
          // console.log(content);
          // console.log(coursestructure_new['name']);
          // console.log(userid);
          // }
        } catch (error) {
          console.error("Error fetching course data:", error);
          setLoading(false);
        }
      };

      fetchCourseData();
      console.log(selectedDay);
    }, [selectedDay, selectModule]);

    const selectedDayModules = ModulesData.filter(
      (data) => data.day === selectedDay && data.module === selectModule
    );

    if (selectedDayModules.length == 0) {
      return (
        <div className="flex h-[100vh] ">
          <div className="w-[10%] z-50 h-screen p-4 bg-primary-foreground">
            <h2 className="text-xl font-bold mb-4">Days</h2>
            <ul>
              {daysWithModules.map((dayData, index) => (
                <li
                  key={dayData.day}
                  className={`p-2 flex  mb-1 rounded-md cursor-pointer ${
                    dayData.day === `Day ${selectedDay}`
                      ? "bg-[#8678F9] text-white justify-start"
                      : "bg-primary-foreground"
                  }`}
                  onClick={() => setSelectedDay(index + 1)}
                >
                  {dayData.day}{" "}
                  {dayData.day === `Day ${selectedDay}` ? (
                    <Disc className="text-sm text-white mx-2" />
                  ) : (
                    ""
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-[85%] mx-auto  p-4">
            <h2 className="text-2xl font-bold mb-4">Day {selectedDay}</h2>

            <div className="flex justify-around">
              <div className="p-4 h-[87vh] overflow-y-scroll hide-scrollbar w-3/4">
                <div className="flex flex-col items-center justify-center">
                  <Image
                    className="rounded-full mx-auto"
                    width="300"
                    height="300"
                    alt="Loading..."
                    src="/loader.gif"
                  />
                  <h1>Generating</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      console.log(ModulesData);

      return (
        <>
          <div className="flex h-[100vh]">
            <div className="w-[10%] z-50 h-screen p-4 bg-primary-foreground">
              <h2 className="text-xl font-bold mb-4">Days</h2>
              <ul>
                {daysWithModules.map((dayData, index) => (
                  <li
                    key={dayData.day}
                    className={`p-2 mb-1 flex rounded-md cursor-pointer ${
                      dayData.day === `Day ${selectedDay}`
                        ? "bg-[#8678F9] text-white justify-start "
                        : "bg-primary-foreground"
                    }`}
                    onClick={() => setSelectedDay(index + 1)}
                  >
                    {dayData.day}
                    {dayData.day === `Day ${selectedDay}` ? (
                      <Disc className="text-xs  text-white mx-2" />
                    ) : (
                      ""
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-[85%] mx-auto p-4 ">
              <h2 className="text-2xl font-bold mb-4">
                Day {selectedDay} of{" "}
                <span className="text-[#8678F9]">
                  {coursestructure_new.name}
                </span>{" "}
              </h2>

              <div className="flex justify-around">
                <div className="p-4 h-[85vh] overflow-y-scroll hide-scrollbar w-3/4">
                  <div className="">
                    {selectedDayModules.map((moduleData, index) => (
                      <div
                        key={index}
                        className="mb-2"
                        dangerouslySetInnerHTML={{
                          __html: moduleData.content["data"],
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-start w-1/5">
                  <h1 className="my-2 font-bold">Modules</h1>
                  <div className=" bg-primary-foreground  flex flex-col z-50 p-4 rounded-md w-full ">
                    {daysWithModules
                      .find((day) => day.day === `Day ${selectedDay}`)
                      ?.modules.map((module, index) => (
                        <p
                          key={index}
                          className={`mb-2 text-white text-sm p-3  ${index + 1 == selectModule ? "bg-[#8678F9]" : "border-2"}  font-bold  rounded-md cursor-pointer`}
                          onClick={() => {
                            setselectModule(index + 1);
                          }}
                        >
                          {module.split(": ")[1]}
                        </p>
                      ))}
                  </div>

                  <button
                    className="px-2 w-full py-1 flex justify-center z-50 bg-white text-black rounded-md mt-4"
                    onClick={nextDay}
                  >
                    Next Day <MoveRight className="text-[#8678F9] mx-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  } else {
    return "wating for conentent";
  }
};

export default Home;
