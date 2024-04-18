import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Menu({dark, setDark}) {
    return (
        <div className="h-full flex flex-row justify-between items-center px-10">
            <div>
                <h1 className="text-3xl font-bold">Menu</h1>
            </div>
            <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" onCheckedChange={() => setDark(!dark)}/>
                <Label htmlFor="airplane-mode">{dark? 'Dark': 'Light'}</Label>
            </div>
        </div>
    );
};