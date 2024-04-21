"use client"

import { useRouter } from 'next/navigation';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import {
    Button
} from "@/components/ui/button"

import { 
    Home, 
    UserRound, 
    Command,
    CreditCard,
    AlignJustify,
    ListCollapse,
    StretchHorizontal,
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
        name: 'Button',
        href: '/button',
        icon: <Command className="mr-2 h-4 w-4" />,
    },
    {
        name: 'Accordion',
        href: '/accordion',
        icon: <ListCollapse className="mr-2 h-4 w-4"/>,
    },
    {
        name: 'Menu',
        href: '/menu',
        icon: <AlignJustify className="mr-2 h-4 w-4" />,
    },
    {
        name: 'Card',
        href: '/card',
        icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
];

const settingPages:{name: string, href: string, icon: React.ReactNode}[] = [];

export default function Sidebar() {
    const router = useRouter();
    return (
        <div className="flex flex-col  py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Discover
            </h2>
          </div>
          <div className="space-y-0">
          <Accordion type="multiple" className="w-[240px] h-full">
                <AccordionItem value="Group-1">
                <AccordionTrigger className='w-full'><p className="w-full pl-5 text-start">Home</p></AccordionTrigger>
                    {homePages.map((page) => {
                        return (
                            <AccordionContent key={page.name} className="p-0">
                                <Button 
                                  variant='ghost'
                                  key={page.name}
                                  className="w-full pl-20 justify-start"
                                  onClick={() => router.push(page.href)}
                                >
                                    {page.icon} {page.name}
                                </Button>
                            </AccordionContent>
                        )
                    })}
                </AccordionItem>
                <AccordionItem value="Group-2">
                <AccordionTrigger className='w-full'><p className="w-full pl-5 text-start">Components</p></AccordionTrigger>
                {componentsPages.map((page) => {
                        return (
                            <AccordionContent key={page.name} className="p-0">
                                <Button 
                                  variant='ghost'
                                  key={page.name}
                                  className="w-full pl-20 justify-start"
                                  onClick={() => router.push(page.href)}
                                >
                                    {page.icon} {page.name}
                                </Button>
                            </AccordionContent>
                        )
                    })}
                </AccordionItem>
                <AccordionItem value="Group-3">
                    <AccordionTrigger className='w-full'><p className="w-full pl-5 text-start">Setting</p></AccordionTrigger>
                    {settingPages.map((page) => {
                        return (
                            <AccordionContent key={page.name} className="p-0">
                                <Button 
                                  variant='ghost'
                                  key={page.name}
                                  className="w-full pl-20 justify-start"
                                  onClick={() => router.push(page.href)}
                                >
                                    {page.icon} {page.name}
                                </Button>
                            </AccordionContent>
                        )
                    })}
                </AccordionItem>
            </Accordion>
          </div>
        </div>
    );
};