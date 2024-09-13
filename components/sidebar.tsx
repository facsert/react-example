// "use client"
import { useRouter } from 'next/navigation';
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

import { 
  Home, 
  UserRound, 
  Command as CommandIcon,
  CreditCard,
  AlignJustify,
  ListCollapse,
  Table2,
  CircleGauge,
  SquareGanttChart,
  Pencil,
  Grid2X2,
  ListMinus,
  FileUp,
} from "lucide-react";

type Item = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const homePages: Item[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <CircleGauge className="mr-2 h-4 w-4" />,
  },
  {
    name: 'Flow',
    href: '/flow',
    icon: <SquareGanttChart className="mr-2 h-4 w-4" />,
  },
  {
    name: 'Forms',
    href: '/forms',
    icon: <Pencil className="mr-2 h-4 w-4" />,
  },
  {
    name: 'Tasks',
    href: '/tasks',
    icon: <Grid2X2 className="mr-2 h-4 w-4" />,
  },
  {
    name: 'Login',
    href: '/login',
    icon: <UserRound className="mr-2 h-4 w-4" />,
  },
]

const componentsPages:Item[] = [
  {
    name: 'Accordion',
    href: '/accordion',
    icon: <ListCollapse className="mr-2 h-4 w-4"/>,
  },
  {
    name: 'Form',
    href: '/form',
    icon: <Pencil className="mr-2 h-4 w-4" />,
  },
  {
    name: 'Button',
    href: '/button',
    icon: <CommandIcon className="mr-2 h-4 w-4" />,
  },
  {
    name: 'Card',
    href: '/card',
    icon: <CreditCard className="mr-2 h-4 w-4" />,
  },
  {
    name: 'Menu',
    href: '/menu',
    icon: <AlignJustify className="mr-2 h-4 w-4" />,
  },
  {
    name: 'Table',
    href: '/table',
    icon: <Table2 className="mr-2 h-4 w-4" />,
  },
  {
    name: 'Upload',
    href: '/upload',
    icon: <FileUp  className="mr-2 h-4 w-4" />,
  },
  {
    name: 'Combobox',
    href: '/combobox',
    icon: <ListMinus className="mr-2 h-4 w-4" />,
  },
  {
    name: 'Socket',
    href: '/socket',
    icon: <ListMinus className="mr-2 h-4 w-4" />,
  },
];

export default function Sidebar() {
  const router = useRouter();
  return (
    <Command className='w-full h-full'>
      <CommandInput placeholder="search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Layout">
          {homePages.map((page) => {
            return (
              <CommandItem 
                key={page.name} 
                className='pl-8 mb-1'
                onSelect={() => router.push(page.href)}
              >
                {page.icon}
                <span>{page.name}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Components">
          {componentsPages.map((page) => {
            return (
              <CommandItem 
                key={page.name}
                className='pl-8 mb-1'
                onSelect={() => router.push(page.href)}
              >
                {page.icon}
                <span>{page.name}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};