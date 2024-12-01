import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from "@/components/ui/card";

type CardItem = {
  title: string;
  description: string;
  image: string;
  link: string;
}

const cards: CardItem[] = [
  {
    title: "Apple",
    description: "This is the first card",
    image: "https://via.placeholder.com/150",
    link: "#",
  },
  {
    title: "Banana",
    description: "This is the second card",
    image: "https://via.placeholder.com/150",
    link: "#",
  },
  {
    title: "Pear",
    description: "This is the third card",
    image: "https://via.placeholder.com/150",
    link: "#",
  },
  {
    title: "Peach",
    description: "This is the fourth card",
    image: "https://via.placeholder.com/150",
    link: "#",
  },
  {
    title: "Orange",
    description: "This is the fifth card",
    image: "https://via.placeholder.com/150",
    link: "#",
  },
];

export default function SearchPage() {
  return (
      <Command className="rounded-lg border shadow-md w-[40vw]">
        <CommandInput></CommandInput>
        <CommandList className="flex flex-row flex-wrap w-full gap-2">
          <CommandEmpty className="w-full text-center p-4 hover:bg-gray-100">Not Found</CommandEmpty>
          {cards.map((card, index) => (
            <CommandItem key={index} className="inline-block hover:shadow-lg rounded-lg p-0 mx-2 my-2">
              <Card className="h-full w-full">
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* <img src={card.image} alt={card.title} /> */}
                  <CardDescription>{card.description}</CardDescription>
                </CardContent>
              </Card>
            </CommandItem>
          ))}
        </CommandList>
      </Command>
  );
};