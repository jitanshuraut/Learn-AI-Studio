"use client";
// import React, { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";

// type CourseData = {
//   name: string;
//   numberofdays: number;
//   Introduction: string[];
//   Assessment: string[];
//   Conclusion: string[];
//   ReferenceBooks: {
//     title: string;
//     version: string;
//     author: string;
//     source: string;
//   }[];
//   CourseStructureInfluence: string;
//   [key: string]:
//     | string
//     | number
//     | string[]
//     | { title: string; version: string; author: string; source: string }[]
//     | undefined;
// };

// const extractAndDecodeSegments = (url: string): [string, string] => {
//   const segments = url.split("/");
//   const lastSegment = segments[segments.length - 1];
//   const secondToLastSegment = segments[segments.length - 2];
//   const decodeBase64 = (str: string) =>
//     Buffer.from(str, "base64").toString("utf-8");

//   return [decodeBase64(secondToLastSegment), decodeBase64(lastSegment)];
// };

// const extractDays = (
//   courseData: CourseData
// ): { day: string; modules: string[] }[] => {
//   const days: { day: string; modules: string[] }[] = [];

//   for (const key in courseData) {
//     if (key.startsWith("Day")) {
//       const modules = courseData[key] as string[];
//       days.push({ day: key, modules });
//     }
//   }

//   return days;
// };

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

// async function Home() {
//   const pathname = usePathname();
//   const search = pathname;

//   const [userid, courseid] = extractAndDecodeSegments(search);
//   const jsonString: string = localStorage.getItem(courseid) || "";

//   const parsedJson = JSON.parse(jsonString);
//   const { course, coursestructure } = parsedJson;

//   const coursestructure_new = JSON.parse(coursestructure);
//   const daysWithModules = extractDays(coursestructure_new);

//   const str_mod = daysWithModules[0].modules[0];
//   const colonIndex = str_mod.indexOf(":");
//   const content = str_mod.slice(colonIndex + 1).trim();
//   console.log(content);
//   const parsedCourseStructure = JSON.parse(coursestructure);

//   Object.keys(parsedCourseStructure).forEach((key) => {
//     if (key.startsWith("Day")) {
//       coursestructure_new[key] = parsedCourseStructure[key];
//     }
//   });

//   const [selectedDay, setSelectedDay] = useState<number>(1);

//   const nextDay = () => {
//     const days = Object.keys(daysWithModules);
//     const currentIndex = selectedDay;
//     let nextIndex = (currentIndex + 1) % days.length;
//     if (nextIndex == 0) {
//       nextIndex = days.length;
//     }
//     setSelectedDay(nextIndex);
//   };

// useEffect(() => {
//   const fetchCourseData = async () => {
//     try {
//       const selectedDayData = daysWithModules.find(
//         (day) => day.day === `Day ${selectedDay}`
//       );
//       if (selectedDayData) {
//         const module = selectedDayData.modules[0];
//         const contentIndex = module.indexOf(":");
//         const content = module.slice(contentIndex + 1).trim();

//         // await fetchData({ module: content, course, userid });
//         console.log(content);
//         console.log(course);
//         console.log(userid);
//       }
//     } catch (error) {
//       console.error("Error fetching course data:", error);
//     }
//   };

//   // fetchCourseData();
//   console.log(selectedDay);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [selectedDay]);

//   return (
//     <>
//       <div className="flex">
//         <div className="w-1/5 z-50 h-screen p-4 bg-primary-foreground">
//           <h2 className="text-xl font-bold mb-4">Days</h2>
//           <ul>
//             {daysWithModules.map((dayData, index) => (
//               <li
//                 key={dayData.day}
//                 className={`p-2 mb-1 rounded-md cursor-pointer ${dayData.day === "Day " + selectedDay ? "bg-[#8678F9] text-white" : "bg-primary-foreground"}`}
//                 onClick={() => setSelectedDay(index)}
//               >
//                 {dayData.day}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="w-3/4 h-screen p-4">
//           <h2 className="text-2xl font-bold mb-4">Day {selectedDay}</h2>
//           <ul className="list-disc pl-5">
//             {daysWithModules
//               .find((day) => day.day === "Day " + selectedDay)
//               ?.modules.map((module, index) => (
//                 <li key={index} className="mb-2">
//                   {module}
//                 </li>
//               ))}
//           </ul>
//           <button
//             className="px-2 py-1 bg-white text-black rounded-md mt-4"
//             onClick={() => {
//               nextDay();
//             }}
//           >
//             Next Day
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Home;

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
  content: string;
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
    const daysWithModules = extractDays(coursestructure_new);

    const [selectedDay, setSelectedDay] = useState<number>(1);
    const [ModulesData, setModulesData] = useState<ModuleData[]>([]);
    const [loading, setLoading] = useState(false);

    const nextDay = () => {
      setSelectedDay((prevDay) => {
        const nextIndex = (prevDay % daysWithModules.length) + 1;
        return nextIndex;
      });
    };

    useEffect(() => {
      const fetchCourseData = async () => {
        try {
          setLoading(true);
          const selectedDayData = daysWithModules.find(
            (day) => day.day === `Day ${selectedDay}`
          );
          if (selectedDayData) {
            for (let i = 0; i < selectedDayData.modules.length; i++) {
              const existingData = ModulesData.find(
                (data) => data.day === selectedDay && data.module === i + 1
              );

              if (!existingData) {
                const module = selectedDayData.modules[i];
                const contentIndex = module.indexOf(":");
                const content = module.slice(contentIndex + 1).trim();

                const data_Fetch = await fetchData({
                  moduleNumber: String(i + 1),
                  courseId: courseid,
                  dayNumber: String(selectedDay),
                  userId: userid,
                });
                const newData = {
                  day: selectedDay,
                  module: i + 1,
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
          }
        } catch (error) {
          console.error("Error fetching course data:", error);
          setLoading(false);
        }
      };

      fetchCourseData();
      console.log(selectedDay);
    }, [selectedDay]);

    const selectedDayModules = ModulesData.filter(
      (data) => data.day === selectedDay
    );

    if (loading) {
      return (
        <div className="flex h-[100vh] ">
          <div className="w-1/5 z-50 h-screen p-4 bg-primary-foreground">
            <h2 className="text-xl font-bold mb-4">Days</h2>
            <ul>
              {daysWithModules.map((dayData, index) => (
                <li
                  key={dayData.day}
                  className={`p-2 mb-1 rounded-md cursor-pointer ${
                    dayData.day === `Day ${selectedDay}`
                      ? "bg-[#8678F9] text-white"
                      : "bg-primary-foreground"
                  }`}
                  onClick={() => setSelectedDay(index + 1)}
                >
                  {dayData.day}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-3/4 mx-auto">
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
            <div className="w-1/5 z-50 h-screen p-4 bg-primary-foreground">
              <h2 className="text-xl font-bold mb-4">Days</h2>
              <ul>
                {daysWithModules.map((dayData, index) => (
                  <li
                    key={dayData.day}
                    className={`p-2 mb-1 rounded-md cursor-pointer ${
                      dayData.day === `Day ${selectedDay}`
                        ? "bg-[#8678F9] text-white"
                        : "bg-primary-foreground"
                    }`}
                    onClick={() => setSelectedDay(index + 1)}
                  >
                    {dayData.day}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-3/4 mx-auto">
              <h2 className="text-2xl font-bold mb-4">Day {selectedDay}</h2>

              <div className="flex justify-around">
                <div className="p-4 h-[85vh] overflow-y-scroll hide-scrollbar w-3/4">
                  <div className="pl-5">
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

                <div className="bg-[#8678F9] z-50 p-4 rounded-md w-1/5">
                  {daysWithModules
                    .find((day) => day.day === `Day ${selectedDay}`)
                    ?.modules.map((module, index) => (
                      <p key={index} className="mb-2 text-white font-bold">
                        {module}
                      </p>
                    ))}
                </div>
              </div>

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
  } else {
    return "wating for conentent";
  }
};

export default Home;
