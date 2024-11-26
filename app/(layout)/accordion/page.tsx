"use client"

import { useState, ChangeEvent, MouseEvent } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Plus, Trash2 } from 'lucide-react'

class Person {
  constructor(
    public name: string = "John",
    public age: number = 18,
  ) {}
}

export default function AccordionPage() {
  const [persons, setPersons] = useState<Person[]>([new Person()])

  const handleChange = (index: number, event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setPersons(persons.map((person, i) => index === i? {...person, [name]: value } : person));
  };

  const addItem = (index: number, event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setPersons(pre => [...pre.slice(0, index + 1), new Person(), ...pre.slice(index + 1)]);
  };

  const deleteItem = (index: number, event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setPersons(persons.filter((_, i) => i !== index));
  };
  
  const displayPersons = () => {
    toast.success(`number: ${persons.length} persons: [${persons.map(person => person.name).join(', ')}]`)
  }
  return (
    <div className="p-4 flex flex-col gap-4">
      <Accordion type="multiple" className="w-full px-8">
        {persons.map((person, index) => (
          <AccordionItem  key={index} value={`item-${index}`}>
            <div className="flex justify-between items-center">
              <AccordionTrigger>
                {`item-${index}`}
              </AccordionTrigger>
              <div>
              <Button onClick={(event) => addItem(index, event)}>
              <Plus className="h-4 w-4" />
                Add
              </Button>
              <Button disabled={persons.length === 1} onClick={(event) => deleteItem(index, event)}>
              <Trash2 className="h-4 w-4" />
                Delete
              </Button>
              </div>
            </div>
            <AccordionContent>
              <Card className="flex flex-col gap-4 px-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    name='name' 
                    type="text" 
                    id="name" 
                    defaultValue={person.name}
                    onChange={(e) => handleChange(index, e)}
                    value={person.name}
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    name='age' 
                    type="number" 
                    id="age" 
                    defaultValue={person.age}
                    onChange={(e) => handleChange(index, e)}
                    value={person.age}
                  />
                </div>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button onClick={displayPersons}>Display Person</Button>
    </div>
  )
}