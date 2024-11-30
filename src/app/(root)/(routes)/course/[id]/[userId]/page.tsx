"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MoveRight, ArrowLeft, Disc } from "lucide-react";
import ContentLoader from "@/components/ui/content-skeleton";
import Link from "next/link";
import { ModuleData_Fetch } from "@/types";
import { extractAndDecodeSegments, extractDays } from "@/lib/utils";
import Image from "next/image";
import Draggable from "react-draggable";
import { X, ChevronRight } from 'lucide-react';
import { set } from "zod";
import { render } from 'react-dom'
import Markdown from 'markdown-to-jsx'


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
    const startTime = performance.now();
    const response = await fetch(`/api/getModule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId,
        dayNumber,
        userId,
        moduleNumber,
      }),
    });
    const endTime = performance.now(); // End time
    const duration = endTime - startTime; // Calculate duration
    console.log(`API call took ${duration.toFixed(2)}ms`);
    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const Home: React.FC = () => {
  const pathname = usePathname();
  const search = pathname;

  const [userid, courseid] = extractAndDecodeSegments(search);
  let jsonString: string | null = localStorage.getItem(courseid);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectModule, setSelectModule] = useState<number>(1);
  const [modulesData, setModulesData] = useState<ModuleData_Fetch[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [current_content, set_current_content] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [queryFlag, setQueryFlag] = useState<boolean>(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setQuery("");
    setAnswer("");

  };

  const handleSubmit = async () => {
    console.log("Query submitted:", query);
    setAnswer("");
    setQueryFlag(true);
    const response = await fetch(`/api/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        content: current_content,
      }),
    });
    const data = await response.json();
    console.log(data);
    setAnswer(data.response);
    setQueryFlag(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (jsonString != null) {
      const parsedJson = JSON.parse(jsonString);
      const { course, coursestructure } = parsedJson;
      const coursestructure_new = JSON.parse(coursestructure);
      console.log("form coursestructure_new");
      console.log(coursestructure_new);
      const daysWithModules = extractDays(coursestructure_new);

      const fetchCourseData = async () => {
        try {
          setLoading(true);
          const selectedDayData = daysWithModules.find(
            (day) => day.day === `Day ${selectedDay}`
          );

          if (selectedDayData) {
            const existingData = modulesData.find(
              (data) => data.day === selectedDay && data.module === selectModule
            );

            if (!existingData) {
              const module = selectedDayData.modules[selectModule - 1];
              const contentIndex = module.indexOf(":");
              const content = module.slice(contentIndex + 1).trim();

              const dataFetch = await fetchData({
                moduleNumber: String(selectModule),
                courseId: courseid,
                dayNumber: String(selectedDay),
                userId: userid,
              });

              const newData = {
                day: selectedDay,
                module: selectModule,
                content: dataFetch,
              };

              setModulesData((prevModulesData: ModuleData_Fetch[]) => {
                const exists = prevModulesData.some(
                  (data) =>
                    data.day === newData.day &&
                    data.module === newData.module &&
                    data.content === newData.content
                );
                if (exists) {
                  return prevModulesData;
                } else {
                  return [...prevModulesData, newData];
                }
              });

              console.log(selectedDayData);
            }
          }

          // if (selectedDayData) {
          //   set_current_content(selectedDayData.modules[selectModule - 1]);
          // }

          setLoading(false);
          console.log(modulesData);
        } catch (error) {
          console.error("Error fetching course data:", error);
          setLoading(false);
        }
      };

      fetchCourseData();
      console.log(selectedDay);
    } else {
      try {
        const getCourse = async () => {
          const response = await fetch(`/api/getSearchCourse`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              courseId: courseid,
            }),
          });
          // console.log(response);
          const data = await response.json();
          console.log(data);
          const data_localstorage = {
            course: courseid,
            coursestructure: data.structure,
          };
          localStorage.setItem(data.id, JSON.stringify(data_localstorage));
          jsonString = data.structure;
          window.location.reload();
        };

        getCourse();
      } catch (error) { }
    }
  }, [selectedDay, selectModule, jsonString]);

  const daysWithModules = jsonString
    ? extractDays(JSON.parse(JSON.parse(jsonString).coursestructure))
    : [];
  const selectedDayModules = modulesData.filter(
    (data) => data.day === selectedDay && data.module === selectModule
  );

  useEffect(() => {
    if (selectedDayModules.length > 0) {
      set_current_content(selectedDayModules[0].content["data"]);
    }
  }, [selectedDayModules]);

  const nextDay = () => {
    setSelectedDay((prevDay) => {
      const nextIndex = (prevDay % daysWithModules.length) + 1;
      return nextIndex;
    });
    setSelectModule(1);
  };

  return (
    <div className="flex h-[100vh]">
      <div className="w-[30%] md:w-[10%] z-50 h-screen p-4 bg-primary-foreground">
        <Link
          className="mb-6 mx-auto flex justify-center p-2 border-2 rounded-md"
          href="/dashboard/courses"
        >
          <ArrowLeft className="mx-1" />
          <h2>Home</h2>
        </Link>

        <ul>
          {daysWithModules.map((dayData, index) => (
            <li
              key={dayData.day}
              className={`p-2 flex mb-1 rounded-md cursor-pointer ${dayData.day === `Day ${selectedDay}`
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

      <div className="w-[70%] md:w-[85%] mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">
          Day {selectedDay} of{" "}
          <span className="text-[#8678F9] mx-2">
            {jsonString
              ? JSON.parse(JSON.parse(jsonString).coursestructure).name
              : ""}
          </span>
        </h2>

        <div className="flex justify-around md:flex-row flex-col-reverse ">
          <div className="p-4 h-[87vh] overflow-y-scroll hide-scrollbar md:w-3/4 w-full">

            {selectedDayModules.length === 0 ? (
              <ContentLoader />
            ) : (

              <div>
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
            )}
          </div>

          <div className="flex flex-col items-start md:w-1/5 w-full">
            <div className="flex justify-evenly bg-[#8678F9] p-2 m-1 border rounded-md items-center  w-full">
              <button onClick={handleOpenModal}>Chat with Document</button>
              <Image
                className="rounded-full bg-white p-1"
                width="25"
                height="25"
                alt=""
                src="/chat_logo.svg"
              />
            </div>
            <h1 className="my-2 font-bold">Modules</h1>
            <div className="bg-primary-foreground flex flex-col z-50 p-4 rounded-md w-full">
              {daysWithModules
                .find((day) => day.day === `Day ${selectedDay}`)
                ?.modules.map((module, index) => (
                  <p
                    key={index}
                    className={`mb-2 text-white text-sm p-3 ${index + 1 === selectModule ? "bg-[#8678F9]" : "border-2"
                      } font-bold rounded-md cursor-pointer`}
                    onClick={() => {
                      setSelectModule(index + 1);
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
      {isModalOpen && (
        <Draggable>
          <div className="fixed z-50 top-1/2 left-1/2  flex items-center justify-center">
            <div className="bg-white p-4 rounded-md  shadow-lg h-96 w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#8678F9]">Ask Your Query</h2>
                <button onClick={handleCloseModal} className="text-red-500"> <X /></button>
              </div>
              <div className="h-full w-full">
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    className="w-[90%] border mx-auto p-2 rounded-md bg-white text-black"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button onClick={handleSubmit}>
                    <ChevronRight className="text-[#8678F9]" />
                  </button>
                </div>
                <div className="mt-4 p-2 rounded-md overflow-y-auto border h-60 custom-scrollbar">
                  <p className="text-black">
                    {answer === "" && queryFlag ? <ContentLoader /> : (<Markdown options={{ wrapper: 'article' }}>
                      {answer}
                    </Markdown>)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      )}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default Home;
