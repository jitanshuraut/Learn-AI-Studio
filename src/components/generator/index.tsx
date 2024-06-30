"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/DashBoard/placeholders-and-vanish-input";

export function Placeholders() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
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
    </div>
  );
}
