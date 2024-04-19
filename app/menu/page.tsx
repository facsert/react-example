
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
];

export default function MenuPage() {
    const [value, setValue] = useState("default");
    return (
       <div className="flex flex-col justify-center items-center">
            <Command className="w-full rounded-lg border shadow-md">
            {/* <CommandDialog open={true} onOpenChange={() => {}}> */}
                <CommandInput placeholder="Type a command or search..."  defaultValue={value}/>
                
                    <CommandEmpty>
                        No results found.
                    </CommandEmpty>
                    <CommandList>
                    <CommandGroup heading="General">
                        {menus.map((menu) => {
                            return (
                                // <div key={menu.value} className="hover:bg-accent">
                                <CommandItem disabled={false} key={menu.value} value={menu.value} onSelect={(currentValue) => setValue(currentValue)}>
                                    {menu.value}
                                </CommandItem>
                                // </div>
                            );
                        })}
                    </CommandGroup>
                </CommandList>
            </Command>
            <Button>{value}</Button>
       </div>
    );
}