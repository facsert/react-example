"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
    AlertDialog, 
    AlertDialogTrigger, 
    AlertDialogContent, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogDescription, 
    AlertDialogFooter,  
    AlertDialogAction, 
    AlertDialogCancel 
} from "@/components/ui/alert-dialog";

const buttons: {name: string, variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"}[] = [
    {
        name: "Default",
        variant: "default",
    },
    {
        name: "Destructive",
        variant: "destructive",
    },
    {
        name: "Outline",
        variant: "outline",
    },
    {
        name: "Secondary",
        variant: "secondary",
    },
    {
        name: "Ghost",
        variant: "ghost",
    },
    {
        name: "Link",
        variant: "link",
    }
]
export default function ButtonPage() {
    // const [count, setCount] = useState(0);
    return (
       <>
           <div className="w-full h-full grid grid-cols-3 grid-rows-2 gap-5">
               {buttons.map((button) => {
                   return (
                    <Card key={button.name} 
                        className="flex flex-row justify-center items-center hover:bg-accent"
                    >
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant={button.variant} >{button.name}</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>{button.name} button Clicked</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </Card>
                   )
               })}
           </div>
       </>
    );
}