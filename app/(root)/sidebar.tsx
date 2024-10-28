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
  type LucideIcon,
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
        title: "Form",
        url: "/form",
      },
    ],
  },
{
  title: "Layouts",
  icon: Bot,
  items: [
    {
      title: "Flow",
      url: "/flow",
    },
    {
      title: "Form",
      url: "/forms",
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
                      <SidebarMenuSubButton asChild onClick={() => router.push(item.url)}>
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

