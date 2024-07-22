"use client";
import Link from "next/link";
import {
  Home,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  DollarSign,
  Brain,
  Boxes,
  Archive,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Badge } from "./badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/LandingPage/card";
import { Input } from "@/components/ui/LandingPage/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/DashBoard/sheet";
import { useCurrentUser } from "@/hooks/use-current-user";
import Image from "next/image";
import { useCredit } from "@/components/credit-provider";
import useDebounce from "@/hooks/useDebounce";
import { useBlur } from "@/components/ui/blur-provider";

interface DataItem {
  id: string;
  name: string;
}

function Top_Bar() {
  const session: any = useCurrentUser();
  const { Credit, setCredit } = useCredit();
  const [Query, setQuery] = useState<string>("");
  const [dataQuery, setdataQuery] = useState<DataItem[]>([]);
  const [prevLength, setPrevLength] = useState<number>(0);
  const { isBlurred, setIsBlurred } = useBlur();
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const handelsubmit = async () => {
    try {
      const response = await fetch(`/api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Query: Query,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      console.log(data);
      setdataQuery(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedSearchTerm = useDebounce(Query, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      handelsubmit();
      setIsBlurred(true);
      console.log("Fetching data for:", debouncedSearchTerm);
    } else {
      setdataQuery([]);
      setIsBlurred(false);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (Query.length < prevLength) {
      setdataQuery([]);
      setIsBlurred(false);
    }
    setPrevLength(Query.length);
  }, [Query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputContainerRef.current &&
        !inputContainerRef.current.contains(event.target as Node)
      ) {
        setdataQuery([]);
        setIsBlurred(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsBlurred]);

  const handleFocus = () => {
    setIsBlurred(false);
  };

  const handleBlur = () => {
    if (!Query) {
      setIsBlurred(true);
    }
  };

  const encodeBase64 = (str: string) => {
    return Buffer.from(str).toString("base64");
  };

  const [activeLink, setActiveLink] = useState<string>("Generate Courses");

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <header
      className={`flex z-50 h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6`}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu
              className="h-5 w-5"
              onClick={() => {
                console.log("hey bro ");
              }}
            />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col">
          <nav className="grid gap-2 text-lg z-90 font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Image
                  src="/dummy.png"
                  width={40}
                  alt="logo"
                  height={40}
                  className="rounded-xl"
                />
                <span className="text-[#8678F9]">Ai-Learn Studio</span>
              </Link>
            </Link>
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
            <Link
              onClick={() => handleLinkClick("Archive")}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer transition-all ${
                activeLink === "Archive"
                  ? "text-primary"
                  : "text-muted-foreground"
              } hover:text-[#8678F9] hover:bg-white`}
              href={"/dashboard/archive"}
            >
              <Archive className="h-4 w-4" />
              Archive
            </Link>
          </nav>
          <div className="mt-auto">
            <Card>
              <CardContent>
                <Button size="sm" className="w-full">
                  Log out
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1" ref={inputContainerRef}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handelsubmit();
          }}
        >
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              onChange={(e) => {
                const value = e.target.value;
                if (value.length < Query.length) {
                  setdataQuery([]);
                }
                setQuery(value);
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </form>
        {dataQuery.length > 0 && Query.length > 0 ? (
          <div className="absolute top-14 z-50 w-96 p-2 bg-white rounded-md">
            <ul className="flex flex-col">
              {dataQuery.map((item) => (
                <Link
                  key={item.id}
                  className="p-2 my-1 bg-primary-foreground border-2 cursor-pointer rounded-md"
                  href={`/course/${encodeBase64(session.id)}/${encodeBase64(item.id)}`}
                  target="_blank"
                >
                  {item.name}
                </Link>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="mx-2 px-2 py-1 border border-white rounded-md flex justify-between">
        <p>Credit :{Credit}</p>
        <DollarSign className="text-[#8678F9] text-sm" />
      </div>

      <Button variant="secondary" size="icon" className="rounded-full">
        {session?.image ? (
          <Image
            src={session.image}
            alt="User Image"
            width={50}
            height={50}
            className="rounded-xl"
          />
        ) : (
          <Image
            src="/profile.png"
            alt="User Image"
            width={50}
            height={50}
            className="rounded-xl"
          />
        )}
        <span className="sr-only">Toggle user menu</span>
      </Button>
    </header>
  );
}

export default Top_Bar;
