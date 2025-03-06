"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  ChevronRight,
  CircleUserRound,
  type LucideIcon,
  FileCode,
} from "lucide-react"

import {
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


type MenuItem = {
  title: string
  url: string
  icon?: LucideIcon
}

type MenuGroup = {
  title: string
  icon?: LucideIcon
  items: MenuItem[]
}

const pageList: MenuGroup[] = [
  {
    title: "Components",
    icon: SquareTerminal,
    items: [
      {
        title: "Button",
        url: "/button",
      },
      {
        title: "Card",
        url: "/card",
      },
      {
        title: "Combobox",
        url: "/combobox",
      },
      {
        title: "Editor",
        url: "/editor",
      },
      {
        title: "Form",
        url: "/form",
      },
      {
        title: "PromptInput",
        url: "/promptInput",
      },
      {
        title: "Websocket",
        url: "/websocket",
      },
    ],
  },
{
  title: "Layouts",
  icon: Bot,
  items: [
    {
      title: "Accordion",
      url: "/accordion",
    },
    {
      title: "Flow",
      url: "/flow",
    },
    {
      title: "Form",
      url: "/forms",
    },
    {
      title: "Login",
      url: "/login",
    },
    {
      title: "Search",
      url: "/search",
    },
    {
      title: "Table",
      url: "/table",
    },
    {
      title: "Upload",
      url: "/upload",
    },
  ],
},{
  title: "CSS",
  icon: FileCode,
  items: [
    {
      title: "Flex",
      url: "/flex",
    },
    {
      title: "Grid",
      url: "/grid",
    },
  ],
}
]

function SidebarMain({sidebarGroups, ...props}: {sidebarGroups: MenuGroup[]}) {
  const router = useRouter()
  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {sidebarGroups.map((group) => (
          <Collapsible
            key={group.title}
            asChild
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  {group.icon && <group.icon />}
                  <span>{group.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {group.items?.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuSubButton className="hover:bg-card cursor-pointer" asChild onClick={() => router.push(item.url)}>
                        <span>{item.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        Menu
      </SidebarHeader>
      <SidebarContent>
        <SidebarMain sidebarGroups={pageList} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

