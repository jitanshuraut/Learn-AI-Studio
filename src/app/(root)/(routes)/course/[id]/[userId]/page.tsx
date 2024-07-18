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
  const markdownContent = `
  ## Introduction to HTML and Web Development
  
  Welcome to the exciting world of web development! This module serves as your foundational guide to understanding HTML, the core language of the internet. We'll explore its fundamental principles, learn how to create basic web pages, and grasp essential concepts to empower you in building interactive websites.
  
  ### 1. What is HTML?
  
  HTML, or HyperText Markup Language, is the standard markup language for creating web pages. It acts like the blueprint for your website, defining the structure and content of each page. HTML allows you to arrange text, images, videos, and interactive elements in a visually appealing and functional manner.
  
  ### 2. HTML Elements: Building Blocks of Web Pages
  
  At the heart of HTML are **elements**, which define the content and structure of a web page. Every element consists of an opening tag, content, and a closing tag. Here's a basic example:
  
  \`\`\`html
  <h1>This is a heading</h1>
  <p>This is a paragraph of text.</p>
  \`\`\`
  
  Elements can be nested within each other, creating a hierarchical structure that represents the relationship between different parts of your web page.
  
  ### 3. Common HTML Elements
  
  Let's explore some frequently used HTML elements:
  
  * **Heading Elements (\`<h1>\` to \`<h6>\`):** Define different levels of headings. \`<h1>\` is the most important, used for main titles, while \`<h6>\` is the least, often used for subheadings.
  
  * **Paragraph Element (\`<p>\`):** Used for creating blocks of text.
  
  * **Image Element (\`<img>\`):** Inserts an image into the page. Requires a \`src\` attribute for specifying the image file path.
  
  * **Link Element (\`<a>\`):** Creates links to other web pages or resources. The \`href\` attribute specifies the target URL.
  
  * **List Elements (\`<ul>\`, \`<ol>\`):** Create unordered (bulleted) and ordered (numbered) lists. List items are defined using the \`<li>\` element.
  
  * **Table Element (\`<table>\`):** Creates a table to display data in a structured format. Includes elements like \`<tr>\` for rows, \`<th>\` for table headers, and \`<td>\` for table cells.
  
  ### 4. Attributes: Modifying Elements
  
  Attributes provide additional information about HTML elements and customize their behavior:
  
  * **\`src\` attribute for \`<img>\`:** Specifies the image source.
  * **\`href\` attribute for \`<a>\`:** Specifies the URL for the link.
  * **\`alt\` attribute for \`<img>\`:** Provides alternative text for images, used by screen readers or when images fail to load.
  
  ### 5. Creating Your First HTML Page
  
  Let's create a simple HTML file:
  
  \`\`\`html
  <!DOCTYPE html>
  <html>
  <head>
    <title>My First Website</title>
  </head>
  <body>
    <h1>Welcome to my Website!</h1>
    <p>This is my first web page.</p>
  </body>
  </html>
  \`\`\`
  
  * **\`<!DOCTYPE html>\`:** Declares the document type.
  * **\`<html>\`:** The root element of the HTML document.
  * **\`<head>\`:** Contains metadata about the page, like the title, which appears in the browser tab.
  * **\`<title>\`:** Sets the title of the web page.
  * **\`<body>\`:** Contains the visible content of the web page.
  
  ### 6. Practical Applications: Building Basic Websites
  
  HTML is a versatile tool for building various types of websites:
  
  * **Personal Blog:** Structure blog posts, titles, images, and links.
  * **Simple Portfolio:** Showcase your work with images, text descriptions, and links to your projects.
  * **Informational Website:** Provide information using headings, paragraphs, and images.
  
  ### 7. Conclusion
  
  This module introduced you to the fundamental concepts of HTML, laying the groundwork for your journey into web development. You learned about HTML elements, attributes, and how to create a basic web page. Remember, practice is key to mastering HTML. Experiment with creating your own web pages and explore further resources to expand your knowledge!
  `;
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
            const module = selectedDayData.modules[0];
            const contentIndex = module.indexOf(":");
            const content = module.slice(contentIndex + 1).trim();

            const data_Fetch = await fetchData({
              moduleNumber: "1",
              courseId: courseid,
              dayNumber: String(selectedDay),
              userId: userid,
            });
            const newData = {
              day: selectedDay,
              module: 1,
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

    if (loading) {
      return "Wait a second content is loading";
    } else {
      console.log(ModulesData);

      return (
        <>
          <div className="flex">
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

            <div className="w-3/4 h-screen p-4">
              <h2 className="text-2xl font-bold mb-4">Day {selectedDay}</h2>
              <ul className="list-disc pl-5">
                {daysWithModules
                  .find((day) => day.day === `Day ${selectedDay}`)
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
              <Markdown remarkPlugins={[remarkGfm]}>{markdownContent}</Markdown>
            </div>
          </div>
        </>
      );
    }
  } else {
    return "wating";
  }
};

export default Home;
