"use client"

import { useState } from 'react'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import {Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"

class CardItem  {
  constructor(
    public title: string = "",
    public description: string = "",
    public image: string = "",
    public link: string = "",
  ){}
}

const cardList: CardItem[] = [
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
  const maxNum = 12;
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(-1);
  const [card, setCard] = useState<CardItem>(new CardItem());
  const [cards, setCards] = useState(cardList);

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(keyword.toLowerCase()) ||
    card.description.toLowerCase().includes(keyword.toLowerCase())
  );

  const onSubmit = (formData: FormData) => {
    const temp = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      link: formData.get("link") as string,
    };
    toast.success(JSON.stringify(temp))
    index === -1? setCards([...cards, temp]) : setCards(cards.map((card, i) => (i === index ? temp : card)));
    setOpen(false);
    setIndex(-1);
  }

  const pageCards = (num: number) => filteredCards.slice((num - 1) * maxNum, num * maxNum)

  const openEditCard = (index: number, card: CardItem) => {
    setIndex((page - 1) * maxNum + index );
    setCard(card);
    setOpen(true);
  }

  const openAddItem = () => {
    setIndex(-1);
    setCard(new CardItem());
    setOpen(true);    
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className='h-[6vh] flex flex-row justify-end'>
        <Button variant="outline" onClick={openAddItem} >ADD</Button>
      </div>
      <div className="w-full h-[18vh] grid place-content-center">
        <Input
          className="w-[30vw]" 
          placeholder="Search for a card" 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className='w-[20vw]'>
            <DialogHeader>
              <DialogTitle>{index === -1 ? "Add Card" : "Edit Card"}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <form action={onSubmit} className='flex flex-col gap-2'>
              <div>
                <Label>title</Label>
                <Input name='title' defaultValue={card.title} />
              </div>
              <div>
                <Label>description</Label>
                <Input name='description' defaultValue={card.description} />
              </div>
              <div>
                <Label>image</Label>
                <Input name='image' defaultValue={card.image} />
              </div>
              <div>
                <Label>link</Label>
                <Input name='link' defaultValue={card.link} />
              </div>
              <Button type='submit'>Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full flex flex-col">
        <div className="flex flex-col items-center">
          <div className='w-[75vw]  flex flex-row flex-wrap justify-start gap-4'>
            {filteredCards.length === 0 
            ? (
              <div className='w-full grid place-content-center'>not exists</div>
            )
            : (
              pageCards(page).map((card, index) => (
                <Card className="h-[15vh] w-[18vw] hover:bg-accent" key={index}>
                  <CardHeader>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* <img src={card.image} alt={card.title} /> */}
                  </CardContent>
                  <CardFooter className='flex justify-end'>
                    <Button variant="link" onClick={() => openEditCard(index, card)} >Edit</Button>
                  </CardFooter>
                </Card>
              ))
            )
          }
          </div>
        </div>
        <Pagination className='mt-4'>
          <PaginationContent>
            {Array.from({ length: Math.ceil(filteredCards.length / maxNum) },  (_, i) => i + 1).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink href='#' className='border rounded-md' onClick={() => setPage(index + 1)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
