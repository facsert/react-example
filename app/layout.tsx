"use client"
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Menu from "@/components/Menu";
import useTheme from "@/hook/theme"
import { Toaster } from "@/components/ui/sonner"

import { Separator } from "@/components/ui/separator";

// bg-muted/90
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const darkTheme = useTheme(state => state.dark);
  return (
    <html lang="en" className={darkTheme? "dark": "light"}>
      <body className="flex flex-col w-screen h-screen bg-muted/100"> 
        <div className="w-full h-[6vh] bg-card">
          <Menu />
        </div>
        <Separator />
        <div className="flex flex-row w-full h-[88vh]">
          <div className="flex flex-row h-[88vh] w-[260px]">
            <Sidebar /> 
          </div>
          <Separator orientation="vertical" />
          <div className="h-[88vh] w-full p-4">
            {children}
            <Toaster position="top-center" />
          </div>
        </div>
        <Separator />
        <div className="w-full h-[6vh] bg-card">
        </div>
      </body>
    </html>
  );
}
