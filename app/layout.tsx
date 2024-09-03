"use client"
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { Separator } from "@/components/ui/separator";
import { ThemeProvider } from "@/components/theme";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className="flex flex-col w-screen h-screen"> 
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="w-full h-[6vh] bg-card">
            <Navbar />
          </div>
          <Separator />
          <div className="flex flex-row w-full h-[94vh]">
            <div className="flex flex-row h-full w-[260px]">
              <Sidebar /> 
            </div>
            <Separator orientation="vertical" />
            <div className="h-full w-full p-4">
              {children}
              <Toaster position="top-center" />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
