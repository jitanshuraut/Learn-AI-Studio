"use client";
import React, { useState, useEffect, Suspense } from "react";
import Coursescard from "@/components/ui/DashBoard/courses-card";
import { useCurrentUser } from "@/hooks/use-current-user";
import Loader from "@/components/ui/card-skeleton";
import { useBlur } from "@/components/ui/blur-provider";

function useUserCourses(userId: string) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getUserCourses/${userId}/0`);
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
  if (courses) {
    return (
      <>
        {courses &&
          courses.map((course: any) => (
            <Coursescard
              key={course.id}
              course={course}
              UserId={userId}
              archiveDefault={0}
            />
          ))}
      </>
    );
  } else {
    return (
      <>
        {[1, 2, 3, 4, 5].map((index: number) => {
          return <Loader key={index} />;
        })}
      </>
    );
  }
};

function Page() {
  const session = useCurrentUser();
  const userId: any = session?.id;
  const { isBlurred, setIsBlurred } = useBlur();

  if (!userId) {
    return <Loader />;
  }

  return (
    <div
      className={`grid z-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[90vh] overflow-scroll hide-scrollbar ${isBlurred == true ? "blur-sm" : ""}`}
    >
      <Suspense fallback={<div>Loading courses...</div>}>
        <CoursesList userId={userId} />
      </Suspense>
    </div>
  );
}

export default Page;
