"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface Option {
  value: string;
  label: string;
}

// 修改样式, 多选下拉，单选下拉(单次点击退出)
export default function ComboBoxResponsive({
  statusList,
  setValue,
}: {
  statusList: Option[];
  setValue: (value: Option) => void;
}) {
  const [open, setOpen] = useState(false);
  const [Option, setOption] = useState<Option | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {Option ? <>{Option.label}</> : <>Select Options(beta)</>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Filter status..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {statusList.map((status) => (
                <CommandItem
                  key={status.value}
                  value={status.value}
                  onSelect={(value) => {
                    setOption(
                      statusList.find((priority) => priority.value === value) ||
                        null
                    );
                    setValue(status);
                    setOpen(false);
                  }}
                >
                  {status.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
