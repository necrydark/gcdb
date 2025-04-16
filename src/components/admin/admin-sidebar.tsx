"use client"

import * as React from "react"
import { ChevronRight, LayoutDashboard, Package, Shield, Users, Wand2 } from "lucide-react"
import { T } from "gt-next";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/src/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/src/components/ui/sidebar"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"

// Navigation items
const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    isActive: true,
  },
  {
    title: "Materials",
    icon: Package,
    href: "/materials",
    subItems: [
      { title: "View All", href: "/admin/materials" },
      { title: "Add New", href: "/admin/materials/new" },
      { title: "Categories", href: "/materials/categories" },
    ],
  },
  {
    title: "Characters",
    icon: Wand2,
    href: "/characters",
    subItems: [
      { title: "View All", href: "/admin/characters" },
      { title: "Add New", href: "/admin/characters/new" },
      { title: "Classes", href: "/characters/classes" },
    ],
  },
  {
    title: "Users",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Relics",
    icon: Shield,
    href: "/relics",
    subItems: [
      { title: "View All", href: "/admin/relics" },
      { title: "Add New", href: "/admin/relics/new" },
      { title: "Rarities", href: "/relics/rarities" },
    ],
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon" className="!bg-purple-950">
      <T>
      <SidebarHeader>
      <div className="flex items-center gap-2 py-2 px-4 transition-all duration-200 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0">
          <Shield className="h-6 w-6 text-primary shrink-0" />
          <h1 className="text-xl font-bold transition-opacity duration-200 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden">
            Admin Portal
          </h1>
        </div>
      </SidebarHeader>  
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <React.Fragment key={item.title}>
                  {item.subItems && isCollapsed ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton tooltip={item.title}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </PopoverTrigger>
                      <PopoverContent side="right" align="start" className="p-0 w-48">
                        <div className="p-2">
                          <div className="font-medium mb-1">{item.title}</div>
                          <ul className="space-y-1">
                            {item.subItems.map((subItem) => (
                              <li key={subItem.title}>
                                <a
                                  href={subItem.href}
                                  className="block w-full text-sm px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground"
                                >
                                  {subItem.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : item.subItems ? (
                    <Collapsible className="w-full">
                      <SidebarMenuItem>
                        <CollapsibleTrigger className="w-full" asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <a href={subItem.href}>{subItem.title}</a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title}>
                        <a href={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      </T>

    </Sidebar>
  )
}
