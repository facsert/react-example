"use client"
import { useState, ChangeEvent, useEffect, use } from 'react'

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
import { cn } from "@/lib/utils"

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
  const [value, setValue] = useState('')

  const handleInput = (value: string) => {
    setValue(value)
    console.log(value)
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <PromptInput 
        items={SelectList} 
        value={value}
        label="Commit" 
        defaultValue="Banana"  
        onChange={(value) => {
          setValue(value)
          console.log(`Commit ${value}`)
        }}
      />
      <div className='mt-4'>
        Value: {value}
      </div>
    </div>
  );
};

function PromptInput({
  label="label",
  value='',
  className='',
  placeholder='',
  defaultValue,
  onChange,
  items=[],
  ...props
}:{
  label?: string,
  value?: string,
  className?: string,
  placeholder?: string,
  defaultValue?: string,
  onChange?: (value: string) => void,
  items: string[],
}) {

  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(defaultValue || '')
  
  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setOpen(true)
    setInputValue(event.target.value)
    onChange?.(event.target.value)
  }

  const handleSelect = (item: string) => {
    onChange?.(item)
    setInputValue(item)
    setOpen(false)
  }
  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <div className={cn('w-[20vw]', className)}>
            <Label htmlFor='input'> Search </Label>
            <Input
              id="input"
              onClick={() => setOpen(true)}
              onChange={(e) => handleInput(e)} 
              value={value} 
              className="w-full"
              {...props}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <Command>
            <CommandInput value={value}  />
            <CommandList className={cn(`w-[20vw]`, className)}>
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
  );
};