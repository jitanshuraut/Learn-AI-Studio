"use client";
import { PlaceholdersAndVanishInput } from "@/components/ui/DashBoard/placeholders-and-vanish-input";
import { ArrowUpRight } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/use-current-user";

interface CourseCardProps {
  day: string;
  modules: string[];
}

function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const CourseCard = ({ day, modules }: CourseCardProps) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 m-4">
      <h2 className="text-md font-bold mb-4 text-[#8678F9]">{day}</h2>
      <ul className="list-disc pl-5">
        {modules.map((module: string, index: number) => (
          <li key={index} className="mb-1 text-sm">
            {module}
          </li>
        ))}
      </ul>
    </div>
  );
};

const placeholders = [
  "Courses on Introduction to Algorithms",
  "Courses on Data Structures and Algorithms",
  "Courses on Operating Systems",
  "Courses on Database Management Systems",
  "Courses on Computer Networks",
  "Courses on Compiler Design",
  "Courses on Software Engineering",
  "Courses on Object-Oriented Programming with Java",
  "Courses on Web Development with JavaScript",
  "Courses on Software Systems using Python",
  "Courses on Machine Learning",
  "Courses on Deep Learning",
  "Courses on Artificial Intelligence",
  "Courses on Natural Language Processing",
  "Courses on Computer Graphics",
  "Courses on Human-Computer Interaction",
  "Courses on Cloud Computing",
  "Courses on Big Data Analytics",
  "Courses on Internet of Things",
  "Courses on Blockchain Technology",
  "Courses on Cyber Security",
  "Courses on Cryptography",
  "Courses on Parallel and Distributed Computing",
  "Courses on Mobile Application Development",
  "Courses on Game Development",
  "Courses on Augmented Reality and Virtual Reality",
  "Courses on Quantum Computing",
  "Courses on Robotics",
];

export function Placeholders() {
  const [Query, setQuery] = useState<string>("deep learning");
  const [generating, setGenerating] = useState<boolean>(false);
  const [prev, setprev] = useState<number>(0);
  const [course, setcourse] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const session: any = useCurrentUser();
  console.log("Session");
  console.log(session);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (Query.length > e.target.value.length) {
      setcourse({});
    }
    setQuery(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    setGenerating(true);
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/genrateOutline`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            course: Query,
            userId: session.id,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        console.log(data);
        if (data.message === "Error") {
          setErrorMessage("Error");
          setcourse({});
        } else if (data.message === "Insufficient credits") {
          setErrorMessage("Insufficient credits");
          setcourse({});
        } else {
          setErrorMessage(null); // Clear any previous error messages
          setcourse(data);
        }
        setGenerating(false);
      } catch (error) {
        console.log("Error fetching data:", error);
        setErrorMessage("Failed to fetch courses. Please try again.");
        setcourse({});
      }
    };

    fetchData();
  };

  const renderContent = () => {
    if (Query.trim() === "") {
      return null; // Return nothing if Query is empty
    }

    if (generating) {
      return (
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
      );
    }

    if (errorMessage == "Error") {
      return (
        <div className="flex flex-col items-center justify-center">
          <Image
            className="mx-auto"
            width="100"
            height="100"
            alt="Loading..."
            src="/Danger.png"
          />
          <p className="text-red-500">
            Error due to generation of harmful or biomedical content.
          </p>
        </div>
      );
    }

    if (errorMessage == "Insufficient credits") {
      return (
        <div className="flex flex-col items-center justify-center">
          <Image
            className="rounded-full mx-auto"
            width="200"
            height="200"
            alt="Loading..."
            src="/break.png"
          />
          <p className="text-red-500"> Insufficient credits </p>
        </div>
      );
    }

    if (Object.keys(course).length > 0) {
      return (
        <div className="border-2 w-[90%] mx-auto p-4 rounded-md">
          <div className="flex justify-between">
            <h1 className="text-2xl font-extrabold text-[#8678F9] mt-3">
              {toTitleCase(Query)}
            </h1>
            <Link
              className="mt-5 z-10 px-2 py-1 flex items-center justify-between bg-white text-black rounded-md cursor-pointer"
              href={"/course/1/12"}
              target="_blank"
            >
              Check it out <ArrowUpRight size={16} className="ml-2" />
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-1">
            {course.Introduction
              ? course.Introduction[0]
              : "No Introduction Available"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto p-4">
            {Object.keys(course).map((day) =>
              day.includes("Day") &&
              Array.isArray(course[day]) &&
              course[day].length > 0 ? (
                <CourseCard key={day} day={day} modules={course[day]} />
              ) : null
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="h-[40rem] overflow-scroll flex flex-col justify-start  items-center px-4 hide-scrollbar">
      <h2 className="mb-10 sm:mb-20 text-xl  text-center sm:text-5xl dark:text-white text-black">
        Your <span className="text-[#8678F9] font-bold"> Questions</span>, Our{" "}
        <span className="text-[#8678F9] font-bold">Courses</span>
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />

      <div className="min-h-28 mt-5 w-full ">{renderContent()}</div>
    </div>
  );
}
