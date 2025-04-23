"use client"

import * as React from "react"
import { ChevronRight, LayoutDashboard, Package, Shield, Users, Wand2, Sandwich, Utensils, Home } from "lucide-react"
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
import { usePathname } from "next/navigation"


// TODO: Add Food & Ingredients
// Navigation items
const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Materials",
    icon: Package,
    href: "/materials",
    subItems: [
      { title: "View All", href: "/dashboard/materials" },
      { title: "Add New", href: "/dashboard/materials/new" },
    ],
    disabled: false,
  },
  {
    title: "Characters",
    icon: Wand2,
    href: "/characters",
    subItems: [
      { title: "View All", href: "/dashboard/characters" },
      { title: "Add New", href: "/dashboard/characters/new" },
    ],
    disabled: false,
  },
  {
    title: "Users",
    icon: Users,
    href: "/dashboard/users",
    disabled: false,
  },
  {
    title: "Relics",
    icon: Shield,
    href: "/relics",
    subItems: [
      { title: "View All", href: "/dashboard/relics" },
      { title: "Add New", href: "/dashboard/relics/new" },
    ],
    
    disabled: false,
  },
  {
    title: "Food (Coming Soon)",
    icon: Utensils,
    href: "/food",
    subItems: [
      { title: "View All", href: "/dashboard/food" },
      { title: "Add New", href: "/dashboard/food/new" },
    ],
    disabled: true,
  },
  {
    title: "Ingredients (Coming Soon)",
    icon: Sandwich,
    href: "/ingredients",
    subItems: [
      { title: "View All", href: "/dashboard/ingredients" },
      { title: "Add New", href: "/dashboard/ingredients/new" },
    ],
    disabled: true,
  },
  {
    title: "Back To Wiki",
    icon: Home,
    href: "/profile",
  }
]

export function AppSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"
  const pathname = usePathname()

  // Helper function to check if a route is active
  const isRouteActive = (href: string) => {
    // For the dashboard, only match exact path
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    // For other routes, check if the pathname starts with the href
    return pathname.startsWith(href)
  }

  // Helper function to check if a subitem is active
  const isSubItemActive = (href: string) => {
    return pathname === href
  }

  return (
    <Sidebar collapsible="icon" className="!bg-purple-950">
      <SidebarHeader>
      <div className="flex items-center gap-2 py-2 px-4 transition-all duration-200 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0">
          <Shield className="h-6 w-6 text-white shrink-0" />
          <h1 className="text-xl font-bold transition-opacity duration-200 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:overflow-hidden">
            Admin Portal
          </h1>
        </div>
      </SidebarHeader>  
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="dark:text-gray-300 text-gray-500">Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <React.Fragment key={item.title}>
                  {item.subItems && isCollapsed ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton className="rounded-[5px]" tooltip={item.title}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </PopoverTrigger>
                      <PopoverContent side="right" align="start" className="p-0 w-48">
                        <div className="p-2">
                          <div className="font-medium mb-1 text-blue">{item.title}</div>
                          <ul className="space-y-1">
                            {item.subItems.map((subItem) => (
                              <li key={subItem.title}>
                                <a
                                  href={subItem.href}
                                  className={`block w-full text-sm px-2 py-1.5 rounded-[5px] hover:bg-accent hover:text-accent-foreground ${
                                    isSubItemActive(subItem.href) ? "bg-accent text-accent-foreground font-medium" : ""
                                  }`}
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
                    <Collapsible disabled={item.disabled} className="w-full">
                      <SidebarMenuItem>
                        <CollapsibleTrigger className="w-full" asChild>
                          <SidebarMenuButton className="rounded-[5px]" tooltip={item.title}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem  key={subItem.title}>
                                <SidebarMenuSubButton className="rounded-[5px]" asChild isActive={isSubItemActive(subItem.href)}>
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
                      <SidebarMenuButton asChild className="rounded-[5px]" tooltip={item.title} isActive={isRouteActive(item.href)}>
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

    </Sidebar>
  )
}
