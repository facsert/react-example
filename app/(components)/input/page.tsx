"use client"
import { useState, ChangeEvent } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const SelectList = [
  "Apple",
  "Banana",
  "Pear",
  "Peach",
  "Water",
  "Rice",
  "Beef"
]

export default function InputPage() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setOpen(true)
    setValue(event.target.value)
  }

  const handleSelect = (item: string) => {
    setValue(item)
    setOpen(false)
  }
  return (
    <div className='flex justify-center'>
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <div>
            <Label htmlFor='input'> Search </Label>
            <Input id="input" onClick={() => setOpen(true)} onChange={(e) => handleInput(e)} value={value} className='w-[15vw]'  />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <Command>
            <CommandInput value={value}  />
            <CommandList>
              <CommandEmpty>Not Found</CommandEmpty>
              {SelectList.map((item, index) => (
                <CommandItem
                  key={index}
                  value={item}
                  onSelect={() => handleSelect(item)}
                  >
                    {item}
                  </CommandItem>
              ))}
            </CommandList>
          </Command>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    </div>
  );
};