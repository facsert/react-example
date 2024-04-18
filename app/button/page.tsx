import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const buttons = [
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
    return (
       <>
           <div className="w-full h-full grid grid-cols-3 grid-rows-2 gap-5">
               {buttons.map((button) => {
                   return (
                    <Card key={button.name} className="flex flex-row justify-center items-center">
                        <Button variant={button.variant}>{button.name}</Button>
                    </Card>
               )
               })}
               {/* <Button variant="default">Default</Button>
               <Button variant="destructive">destructive</Button>
               <Button variant="outline">outline</Button>
               <Button variant="secondary">secondary</Button>
               <Button variant="ghost">ghost</Button>
               <Button variant="link">link</Button> */}
           </div>
       </>
    );
}