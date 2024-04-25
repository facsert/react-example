"use client"
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Menu from "@/components/Menu";
import useTheme from "@/hook/theme"

import { Separator } from "@/components/ui/separator";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const darkTheme = useTheme(state => state.dark);
  return (
    <html lang="en" className={darkTheme? "dark": "light"}>
      <body className="flex flex-col w-screen h-screen">
        <div className="w-full h-[6vh]">
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
          </div>
        </div>
        <Separator />
        <div className="w-full h-[6vh]">
          footer
        </div>
      </body>
    </html>
  );
}
