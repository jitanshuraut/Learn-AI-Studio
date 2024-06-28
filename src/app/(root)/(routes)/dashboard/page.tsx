"use client"
import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

function page() {
  const session = useCurrentUser();
  const router = useRouter();
  if (!session) {
    router.push("/register");
  }
  return <div>page</div>;
}

export default page;
