"use client"
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { Separator } from "@/components/ui/separator";
import { ThemeProvider } from "@/app/(root)/theme"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/(root)/sidebar"
import Navbar from "@/app/(root)/navbar"


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
          <SidebarProvider>
          <AppSidebar />
            <main className="h-full w-full flex flex-col">
              <div className="h-[5vh] flex flex-col justify-center bg-sidebar">
                <Navbar />
              </div>
              <Separator />
              <div className="h-full w-full p-2">
                {children}
                <Toaster position="top-center" />
              </div>
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}