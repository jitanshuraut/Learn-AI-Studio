"use client";
import React from "react";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  Brain,
  Boxes,
  DollarSign,
  UserCog,
} from "lucide-react";
import { logout } from "@/actions/logout";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useRouter, useSearchParams } from "next/navigation";

function Navbar() {
  const router = useRouter();
  return (
    <>
      <div className="hidden z-10 border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-[#8678F9]">Ai-Learn Studio</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2  cursor-pointer text-primary transition-all hover:text-[#8678F9] hover:bg-white"
              >
                <Brain className="h-4 w-4" />
                Genrate Courses
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all cursor-pointer  hover:text-[#8678F9] hover:bg-white"
              >
                <Boxes className="h-4 w-4" />
                Courses
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg  px-3 py-2 cursor-pointer text-muted-foreground transition-all hover:text-[#8678F9] hover:bg-white"
              >
                <DollarSign className="h-4 w-4" />
                Credit
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer text-muted-foreground transition-all hover:text-[#8678F9] hover:bg-white"
              >
                <UserCog className="h-4 w-4" />
                Setting
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
