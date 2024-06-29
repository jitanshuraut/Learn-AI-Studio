import React from "react";
import Image from "next/image";
import { Button } from "@react-email/components";
import ButtonStd from "@/components/ui/button-std";
import { ArrowUpRight } from "lucide-react";
import Coursescard from "@/components/ui/courses-card";

function page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[90vh] overflow-scroll hide-scrollbar">
      <Coursescard />
      <Coursescard />
      <Coursescard />
      <Coursescard />
    </div>
  );
}

export default page;
