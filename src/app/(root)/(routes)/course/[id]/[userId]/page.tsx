"use client";
import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const courseData: Record<string, string[]> = {
  "Day 1": [
    "Understanding LinkedIn's Algorithm and Content Visibility",
    "Identifying Your Target Audience and Defining Your Content Goals",
    "Mastering LinkedIn Content Formats: Articles, Posts, and Updates",
  ],
  "Day 2": [
    "Crafting Compelling Headlines that Grab Attention",
    "Writing Engaging Introductions that Hook Your Audience",
    "Building Narrative and Storytelling for Impactful Content",
  ],
  "Day 3": [
    "Utilizing Visuals, Images, and Videos to Enhance Engagement",
    "Incorporating Calls to Action for Desired Outcomes",
    "Building Your LinkedIn Content Calendar and Posting Strategy",
  ],
  "Day 4": [
    "Leveraging Hashtags and Keywords for Discoverability",
    "Engaging with Your Audience: Comments, Replies, and Interactions",
    "Analyzing Content Performance and Optimizing for Growth",
  ],
  "Day 5": [
    "Content Curation and Sharing Relevant Industry Insights",
    "Building Relationships and Collaborating with Influencers",
    "Utilizing LinkedIn Analytics and Data for Informed Decision Making",
  ],
  "Day 6": [
    "Writing for Different LinkedIn Content Types: Company Pages, Groups, and Events",
    "Promoting Your LinkedIn Content: Cross-Platform Sharing and Amplification",
    "Ethical Considerations and Best Practices for LinkedIn Content Writing",
  ],
  "Day 7": [
    "Case Studies and Examples of High-Engagement LinkedIn Content",
    "Content Tools and Resources for LinkedIn Content Writers",
    "Building a Strong LinkedIn Profile for Content Amplification",
  ],
};

const Home: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Day 1");

  // Function to handle next day navigation
  const nextDay = () => {
    const days = Object.keys(courseData);
    const currentIndex = days.indexOf(selectedDay);
    const nextIndex = (currentIndex + 1) % days.length;
    setSelectedDay(days[nextIndex]);
  };

  const markdown: string = `## Footnote \n * [x] done`;

 

  return (
    <div className="flex">
      {/* Sidebar with day selection */}
      <div className="w-1/5 z-50 h-screen p-4 bg-primary-foreground">
        <h2 className="text-xl font-bold mb-4">Days</h2>
        <ul>
          {Object.keys(courseData).map((day) => (
            <li
              key={day}
              className={`p-2 mb-1 rounded-md cursor-pointer ${day === selectedDay ? "bg-[#8678F9] text-white" : "bg-primary-foreground"}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </li>
          ))}
        </ul>
      </div>

      {/* Main content area with course modules and Markdown */}
      <div className="w-3/4 h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">{selectedDay}</h2>
        <ul className="list-disc pl-5">
          {courseData[selectedDay].map((module, index) => (
            <li key={index} className="mb-2">
              {module}
            </li>
          ))}
        </ul>
        {/* Render Markdown content */}
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
        {/* Button for next day */}
        <button
          className="px-2 py-1 bg-white text-black rounded-md mt-4"
          onClick={nextDay}
        >
          Next Day
        </button>
      </div>
    </div>
  );
};

export default Home;
