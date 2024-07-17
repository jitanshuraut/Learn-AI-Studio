"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface CourseContextProps {
  courseData: {
    courseId: string;
    jsonData: object;
  } | null;
  setCourseData: (data: { courseId: string; jsonData: object }) => void;
}

const CourseContext = createContext<CourseContextProps | undefined>(undefined);

export const CourseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [courseData, setCourseData] =
    useState<CourseContextProps["courseData"]>(null);

  return (
    <CourseContext.Provider value={{ courseData, setCourseData }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = (): CourseContextProps => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};
