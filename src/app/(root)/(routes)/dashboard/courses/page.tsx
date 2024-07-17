"use client";
import React, { useState, useEffect, Suspense } from "react";
import Coursescard from "@/components/ui/DashBoard/courses-card";
import { useCurrentUser } from "@/hooks/use-current-user";

const IMG_arr = ["/c4.png", "/c3.png", "/c2.jpg", "/c1.jpg"];

function useUserCourses(userId: string) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getUserCourses/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error as Error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  if (error) {
    throw error;
  }

  return data;
}

const CoursesList = ({ userId }: { userId: string }) => {
  const courses = useUserCourses(userId);
  // console.log(courses);
  // console.log(Math.ceil(Math.random() * 100) % 3);

  return (
    <>
      {courses &&
        courses.map((course: any) => (
          <Coursescard key={course.id} course={course} UserId={userId} />
        ))}
    </>
  );
};

function Page() {
  const session = useCurrentUser();
  const userId: any = session?.id;
  console.log(userId);

  if (!userId) {
    return <div>Loading...</div>; // Or some placeholder while the session is loading
  }

  return (
    <div className="grid z-50 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[90vh] overflow-scroll hide-scrollbar">
      <Suspense fallback={<div>Loading courses...</div>}>
        <CoursesList userId={userId} />
      </Suspense>
    </div>
  );
}

export default Page;
