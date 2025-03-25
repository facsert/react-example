
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Navbar() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="w-full flex flex-row justify-between items-center">
      <div>
        <SidebarTrigger />
      </div>
      <div className="flex items-center space-x-2 pr-2">
        <Button variant="ghost" size="icon" onClick={() => {
          setTheme(theme === "dark"?"light": "dark")
        }}>
          {theme === "dark"
          ? <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
          : <SunIcon className="h-[1.2rem] w-[1.2rem]" />
        }
        </Button>
      </div>
    </div>
  );
}
