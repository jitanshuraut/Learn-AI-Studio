import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CourseData } from '@/types';
import pptxgen from "pptxgenjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const extractAndDecodeSegments = (url: string): [string, string] => {
  const segments = url.split("/");
  const lastSegment = segments[segments.length - 1];
  const secondToLastSegment = segments[segments.length - 2];
  const decodeBase64 = (str: string) =>
    Buffer.from(str, "base64").toString("utf-8");

  return [decodeBase64(secondToLastSegment), decodeBase64(lastSegment)];
};

export const extractDays = (
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

export const placeholders_arr = (): string[] => {
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
  return placeholders;
}

export const PPT_generator = async (current_content: string, current_module: string) => {
  try {
    const response = await fetch(`/api/ppt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: current_content,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch PPT file");
    }

    // server now returns a binary PPTX file
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${current_module}.pptx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating PPT:", error);
  }
};