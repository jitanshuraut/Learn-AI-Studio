"use client";
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
  DollarSign,
} from "lucide-react";
import React, { useContext } from "react";
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

function Top_Bar() {
  const session = useCurrentUser();
  const { Credit, setCredit } = useCredit();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col">
          <nav className="grid gap-2 text-lg z-90 font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Ai-Learn Studio</span>
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Genrate Courses
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Courses
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Package className="h-5 w-5" />
              Credit
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Users className="h-5 w-5" />
              Setting
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
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>

      <div className="mx-2 px-2 py-1  border border-white rounded-md flex justify-between">
        <p>Credit :{Credit}</p>{" "}
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
