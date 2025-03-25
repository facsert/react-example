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
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col w-screen h-screen"> 
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
          <AppSidebar className="bg-muted/50" />
            <main className="h-full w-full flex flex-col">
              <div className="h-[5vh] flex flex-col justify-center bg-muted/50">
                <Navbar />
              </div>
              <Separator />
              <div className="h-full w-full p-2">
                {children}
                <Toaster position="top-center" richColors closeButton />
              </div>
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}