import React from "react";

const generateRandomWidth = () => {
  const min = 200;
  const max = 760;
  return `${Math.floor(Math.random() * (max - min + 1)) + min}px`;
};

const Loader = () => {
  return (
    <div role="status" className="w-full animate-pulse my-3">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
      <div
        className={`h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[${generateRandomWidth()}] mb-2.5`}
      ></div>
      <div
        className={`h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[${generateRandomWidth()}] mb-2.5`}
      ></div>
      <div
        className={`h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[${generateRandomWidth()}] mb-2.5`}
      ></div>
      <div
        className={`h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[${generateRandomWidth()} ]`}
      ></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default function ContentLoader() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((index: number) => {
        return Loader();
      })}
    </>
  );
}
