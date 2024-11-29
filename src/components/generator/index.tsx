"use client";
import { PlaceholdersAndVanishInput } from "@/components/ui/DashBoard/placeholders-and-vanish-input";
import { ArrowUpRight } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useCredit } from "../credit-provider";
import { CourseCardProps } from "@/types";
import { useBlur } from "@/components/ui/blur-provider";
import { createWorker } from 'tesseract.js';
import { Paperclip } from 'lucide-react';
import { CircleX } from 'lucide-react';


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

const encodeBase64 = (str: string) => {
  if (typeof str !== "string") {
    // throw new TypeError('The input must be a string.');
    console.log("The input must be a string");
  }
  return Buffer.from(str).toString("base64");
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export function Placeholders() {
  const { isBlurred, setIsBlurred } = useBlur();
  const [Query, setQuery] = useState<string>("deep learning");
  const [generating, setGenerating] = useState<boolean>(false);
  const [isDisable, setisDisable] = useState<boolean>(false);
  const [course, setcourse] = useState<{ [key: string]: any }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [ocrResult, setOcrResult] = useState<string>('');
  const [ocrStatus, setOcrStatus] = useState<string>('');
  const session: any = useCurrentUser();
  const { Credit, setCredit } = useCredit();


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      console.log(e.target.files[0].name);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Query.length > e.target.value.length) {
      setcourse({});
      setErrorMessage(null);
    }
    setQuery(e.target.value);
  };


  const readImageText = async (): Promise<string> => {
    if (!file) return '';

    setOcrStatus('Processing...');
    const worker = await createWorker('eng', 1, {
      logger: m => console.log(m), // Add logger here
    });

    try {
      const {
        data: { text },
      } = await worker.recognize(file);

      setOcrResult(text);
      setOcrStatus('Completed');
      return text;
    } catch (error) {
      console.error(error);
      setOcrStatus('Error occurred during processing.');
      return '';
    } finally {
      await worker.terminate();
    }
  };


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGenerating(true);

    if (Credit < 0) {
      setisDisable(true);
      setErrorMessage("Insufficient credits");
    }

    setCredit(Credit - 1);

    let updatedQuery = Query;
    if (file) {
      const ocrText = await readImageText();
      const serializedOcrText = ocrText.replace(/\s+/g, ' ').trim();
      updatedQuery += " Based on " + serializedOcrText;
      setQuery(updatedQuery);
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/genrateOutline`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            course: updatedQuery,
            userId: session.id,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        if (data.message != null) {
          setErrorMessage(data.message);
          setcourse({});
        } else {
          setErrorMessage(null);
          console.log(typeof data);
          console.log(data);
          setcourse(data);
        }
        setGenerating(false);
      } catch (error) {
        setErrorMessage("Failed to fetch courses. Please try again.");
        setcourse({});
      }
    };

    fetchData();
  };



  const renderContent = () => {
    if (Query.trim() === "") {
      return null;
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

    if (errorMessage) {
      return (
        <div className="flex flex-col items-center justify-center">
          <Image
            className="mx-auto"
            width="100"
            height="100"
            alt="Loading..."
            src="/Danger.png"
          />
          <p className="text-red-500">{errorMessage}</p>
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
      console.log(course);
      return (
        <div className="border-2 w-[90%] mx-auto p-4 rounded-md">
          <div className="flex justify-between md:flex-row flex-col my-2">
            <h1 className="text-2xl font-extrabold text-[#8678F9] mt-3">
              {course.name ? toTitleCase(course.name) : 'Course Name Not Available'}
            </h1>
            <Link
              className="mt-5 z-10 px-2 py-1 flex items-center justify-between bg-white text-black rounded-md cursor-pointer"
              href={`/dashboard/courses`}
              target="_blank"
            >
              Check it out <ArrowUpRight size={16} className="ml-2" />
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-1">
            {course.Introduction
              ? course.Introduction.join(" ")
              : "No Introduction Available"}
          </p>
          <div className="mt-3 mb-7">
            <p className="text-xl font-bold text-[#8678F9]">ReferenceBooks</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-2">
              {course.ReferenceBooks.map((book: any, index: number) => (
                <div
                  key={index}
                  className="border-2 p-2 flex justify-around items-center cursor-pointer"
                  onClick={() => {
                    window.open(book.source, "_blank");
                  }}
                >
                  <h3>{book.title}</h3>
                  <ArrowUpRight size={16} className="ml-2" />
                </div>
              ))}
            </div>
          </div>
          <h2 className="text-xl font-bold text-[#8678F9]">Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto p-1">
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
    <div
      className={`h-[40rem] overflow-scroll flex flex-col justify-start items-center   px-4 hide-scrollbar ${isBlurred == true ? "blur-sm" : ""}`}
    >
      <h2 className="mb-10 sm:mb-20 text-xl  text-center sm:text-5xl dark:text-white text-black">
        Your <span className="text-[#8678F9] font-bold"> Questions</span>, Our{" "}
        <span className="text-[#8678F9] font-bold">Courses</span>
      </h2>

      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        handleFileChange={handleFileChange}
        onSubmit={onSubmit}
        isDisabled={isDisable}
      />

      {
        file ?
          <div className="flex justify-start w-2/5 border p-3 ">
            <div className="flex justify-evenly items-center bg-[#8678F9] p-3 rounded-md">
              <Paperclip size={15} className="mr-2" />
              {file.name}
              <div className="ml-2">
                <CircleX className="cursor-pointer" onClick={() => { setFile(null) }} />
              </div>
            </div>
          </div> : ""
      }


      <div className="min-h-28 mt-5 w-full ">{renderContent()}</div>
    </div>
  );
}
