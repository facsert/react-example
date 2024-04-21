import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import useTheme from "@/hook/theme";

import {
    SunMoon,
    MoonStar,
} from "lucide-react";

export default function Menu() {
    const switchTheme: () => void = useTheme((state) => state.switch);
    const dark: boolean = useTheme((state) => state.dark);
    return (
        <div className="h-full flex flex-row justify-between items-center px-10">
            <div>
                <h1 className="text-3xl font-bold">Menu</h1>
            </div>
            <div className="flex items-center space-x-2">
                <Button variant="link" size='icon' onClick={switchTheme}>
                    {dark? <SunMoon/> : <MoonStar/>}
                </Button>
            </div>
        </div>
    );
};