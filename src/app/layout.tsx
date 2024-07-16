import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";
import toast, { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";
import { RootLayoutProps } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LearnAI Studio",
  description:
    "Transforming prompts into personalized learning experiences with AI",
};

const fontHeading = localFont({
  src: "../../public/assets/fonts/CalSans-SemiBold.ttf",
  variable: "--font-heading",
});
const fontHeadingAlt = localFont({
  src: "../../public/assets/fonts/cd-semi.otf",
  variable: "--font-headingAlt",
});

const fontSubHeading = localFont({
  src: "../../public/assets/fonts/product-font.ttf",
  variable: "--font-subheading",
});
const fontSubAlt = localFont({
  src: "../../public/assets/fonts/jakarta.ttf",
  variable: "--font-subalt",
});

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <div className="">
          <body
            className={`antialiased  overflow-x-hidden overflow-y-auto  relative h-full w-full bg-slate-950     text-slate-900 dark:text-slate-50 ${inter.className} ${fontHeading.variable} ${fontSubHeading.variable} ${fontHeadingAlt.variable} ${fontSubAlt.variable}  `}
          >
            <div className="absolute bottom-0 left-[-10%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            <div className="absolute bottom-0 right-[-10%] top-[-5%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <div className="w-full mx-auto py-[-50px] px-0 font-subalt ">
                <main>{children}</main>
              </div>
              <Toaster />
            </ThemeProvider>
          </body>
        </div>
      </html>
    </SessionProvider>
  );
}
