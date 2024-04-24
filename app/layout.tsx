"use client"
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Menu from "@/components/Menu";
import useTheme from "@/hook/theme"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const darkTheme = useTheme(state => state.dark);
  return (
    <html lang="en" className={darkTheme? "dark": "light"}>
      <body className="flex flex-col w-screen h-screen">
        <div className="w-full h-[50px]">
          <Menu />
        </div>
        <Separator />
        <div className="w-full h-full">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={16} className="min-w-[240px] max-w-[320px] h-full">
              <div className="flex flex-col w-full">
                <Sidebar /> 
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className="p-4">
              <div className="w-full h-full">
                {children} 
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <Separator />
        <div className="w-full h-[50px]">
          footer
        </div>
      </body>
    </html>
  );
}
