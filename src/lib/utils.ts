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
      throw new Error("Failed to fetch PPT data");
    }

    const data = await response.json();

    let slides;
    try {
      // Directly assign the slides object without parsing
      slides = data.response.slides;
      if (typeof slides !== 'object') {
        throw new Error("Slides data is not an object");
      }
    } catch (e) {
      // console.log("Error processing slides data");
      // console.log(data);
      throw new Error("Invalid format in slides data");
    }

    // console.log(slides);


    const pptx = new pptxgen();
    const processSlideData = (slideData: any) => {
      Object.keys(slideData).forEach((slideKey) => {
        const slide = pptx.addSlide();
        slide.addText(slideData[slideKey].title, { x: 0.5, y: 0.8, fontSize: 24, bold: true });
        slide.addText(slideData[slideKey].content, { x: 0.5, y: 2.1, fontSize: 18 });

        if (Array.isArray(slideData[slideKey].bulletPoints)) {
          const formattedBulletPoints = slideData[slideKey].bulletPoints.map((point: any) => ({
            text: point,
            options: { bullet: true, fontSize: 18 }
          }));
          slide.addText(formattedBulletPoints, { x: 0.5, y: 4.0 });
        } else if (typeof slideData[slideKey].bulletPoints === 'string') {
          slide.addText(slideData[slideKey].bulletPoints, { x: 0.5, y: 4.0, fontSize: 18 });
        }
      });
    };

    if (Array.isArray(slides)) {
      slides.forEach(processSlideData);
    } else {
      processSlideData(slides);
    }

    pptx.writeFile({ fileName: `${current_module}.pptx` });
  } catch (error) {
    console.error("Error generating PPT:", error);
  }
};