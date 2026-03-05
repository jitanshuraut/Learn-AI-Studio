"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { CourseProvider } from "@/components/course-provider";
import { ReactNode } from "react";
import toast, { Toaster } from "react-hot-toast";

interface ProvidersProps {
    children: ReactNode;
    session: any;
}

export function Providers({ children, session }: ProvidersProps) {
    return (
        <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <CourseProvider>
                    {children}
                    <Toaster />
                </CourseProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}