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
} from "lucide-react";

const homePages: {name: string, href: string, icon: React.ReactNode}[] = [
    {
        name: 'Home',
        href: '/',
        icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
        name: 'About',
        href: '/about',
        icon: <UserRound className="mr-2 h-4 w-4" />,
    },
]

const componentsPages:{name: string, href: string, icon: React.ReactNode}[] = [
    {
        name: 'Accordion',
        href: '/accordion',
        icon: <ListCollapse className="mr-2 h-4 w-4"/>,
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
];

export default function Sidebar() {
    const router = useRouter();
    return (
        <Command className='w-full w-full'>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Index">
                {homePages.map((page) => {
                        return (
                            <CommandItem className='pl-8' key={page.name} onSelect={() => router.push(page.href)}>
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
                            <CommandItem className='pl-8' key={page.name} onSelect={() => router.push(page.href)}>
                                {page.icon}
                                <span>{page.name}</span>
                            </CommandItem>
                        );
                    })}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}