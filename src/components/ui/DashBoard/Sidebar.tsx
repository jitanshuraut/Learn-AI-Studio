"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Brain, Boxes, DollarSign } from "lucide-react";
import { logout } from "@/actions/logout";
import { Button } from "../button";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState<string>("Generate Courses");

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <>
      <div className="hidden z-10 border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image 
            src="/dummy.png"
            width={40}
            height={40}
            className="rounded-xl"
            />
              <span className="text-[#8678F9]">Ai-Learn Studio</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                onClick={() => handleLinkClick("Generate Courses")}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer transition-all ${
                  activeLink === "Generate Courses"
                    ? "text-primary"
                    : "text-muted-foreground"
                } hover:text-[#8678F9] hover:bg-white`}
                href={"/dashboard"}
              >
                <Brain className="h-4 w-4" />
                Generate Courses
              </Link>
              <Link
                onClick={() => handleLinkClick("Courses")}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer transition-all ${
                  activeLink === "Courses"
                    ? "text-primary"
                    : "text-muted-foreground"
                } hover:text-[#8678F9] hover:bg-white`}
                href={"/dashboard/courses"}
              >
                {/* <Link href={"/dashboard/courses"}> */}
                <Boxes className="h-4 w-4" />
                Courses
              </Link>

              <Link
                onClick={() => handleLinkClick("Credit")}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer transition-all ${
                  activeLink === "Credit"
                    ? "text-primary"
                    : "text-muted-foreground"
                } hover:text-[#8678F9] hover:bg-white`}
                href={"/dashboard/credit"}
              >
                <DollarSign className="h-4 w-4" />
                Credit
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Button
              size="sm"
              className="w-full"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Log out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
