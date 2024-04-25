
"use client"
import { Button } from "@/components/ui/button";
import { 
    Command,
    CommandDialog,
    CommandInput,
    CommandEmpty,
    CommandList,
    CommandGroup,
    CommandItem,
    CommandSeparator,
} from "@/components/ui/command";
import { useState } from "react";

const menus = [
    {
        label: "Profile",
        value: "profile",
    },
    {
        label: "Billing",
        value: "billing",
    },
    {
        label: "Settings",
        value: "settings",
    },
    {
        label: "Logout",
        value: "logout",
    },
    {
        label: "Logout",
        value: "logout",
    },
    {
        label: "Billing",
        value: "billing",
    },
    {
        label: "Settings",
        value: "settings",
    },
    {
        label: "Logout",
        value: "logout",
    },
    {
        label: "Logout",
        value: "logout",
    },
];

export default function MenuPage() {
    const [value, setValue] = useState("default");
    return (
       <div className="flex flex-col justify-center items-center h-full">
            <Command className="w-full rounded-lg border shadow-md">
                <CommandInput placeholder="Type a command or search..."  defaultValue={value}/>
                    <CommandEmpty>
                        No results found.
                    </CommandEmpty>
                <CommandList>
                    <CommandGroup heading="General" className="h-full">
                        {menus.map((menu) => {
                            return (
                                <CommandItem className="my-1" disabled={false} key={menu.value} value={menu.value} onSelect={(currentValue) => setValue(currentValue)}>
                                    {menu.value}
                                </CommandItem>
                            );
                        })}
                    </CommandGroup>
                </CommandList>
            </Command>
       </div>
    );
}