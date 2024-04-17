"use client"

import { Button } from "./ui/button";
import { useRouter } from 'next/navigation';
import Image from "next/image";

import { 
    Home, 
    UserRound, 
    Command,
    CreditCard,
    Layers
} from "lucide-react";
 

const pages = [
    {
        name: 'Home',
        href: '/',
        icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
        name: 'Button',
        href: '/button',
        icon: <Command className="mr-2 h-4 w-4" />,
    },
    {
        name: 'Card',
        href: '/card',
        icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
        name: 'About',
        href: '/about',
        icon: <UserRound className="mr-2 h-4 w-4" />,
    },
];

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
            {pages.map((page) => (
                <Button className="w-full px-4 justify-start" variant='ghost' key={page.name} onClick={() => router.push(page.href)}>
                {page.icon} {page.name}
                </Button>
            ))}
          </div>
        </div>
    );
};