import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";

export default function AccordionPage() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Accordion type="multiple" className="w-1/2 h-full">
        <AccordionItem value="Group-1">
          <AccordionTrigger>Group 1</AccordionTrigger>
          <AccordionContent className="p-0">
            <Button variant="ghost" className="h-full w-full">
              Items - 1
            </Button>
          </AccordionContent>
          <AccordionContent className="p-0">
            <Button variant="ghost" className="h-full w-full">
              Items - 2
            </Button>
          </AccordionContent>
          <AccordionContent className="p-0">
            <Button variant="ghost" className="h-full w-full">
              Items - 3
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Group-2">
          <AccordionTrigger>Group 2</AccordionTrigger>
          <AccordionContent className="p-0">
            <Button variant="ghost" className="h-full w-full">
              Items - 1
            </Button>
          </AccordionContent>
          <AccordionContent className="p-0">
            <Button variant="ghost" className="h-full w-full">
              Items - 2
            </Button>
          </AccordionContent>
          <AccordionContent className="p-0">
            <Button variant="ghost" className="h-full w-full">
              Items - 3
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Group-3">
          <AccordionTrigger>Group 2</AccordionTrigger>
          <AccordionContent className="p-0">
            <Button variant="ghost" className="h-full w-full">
              Items - 1
            </Button>
          </AccordionContent>
          <AccordionContent className="p-0">
            <Button variant="ghost" className="h-full w-full">
              Items - 2
            </Button>
          </AccordionContent>
          <AccordionContent className="p-0">
            <Button variant="ghost" className="h-full w-full">
              Items - 3
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
