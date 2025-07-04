"use client"

import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/src/components/ui/sidebar"
import { useCurrentUser } from "@/hooks/use-current-user"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signOut } from "next-auth/react"
import ThemeToggle from "../theme-toggle"

export function DashboardHeader() {
    const user = useCurrentUser();
    const router = useRouter();
    const onClick = () => {
        signOut();
      };

    if(!user) {
        router.push("/auth/login")
    }
  return (
    <header className="flex h-16 items-center justify-between border-b border-b-white px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-2 hover:bg-purple-400 dark:hover:bg-purple-700 text-white hover:text-white" />
        <h2 className="text-lg font-semibold text-white">Admin</h2>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center  rounded-[5px] gap-2 px-2 hover:bg-purple-600  dark:hover:bg-purple-900 hover:text-white">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback className="text-black dark:text-white">GC</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm">
                <span className="font-medium text-white">{user?.username}</span>
                <span className="text-xs text-white">{user?.email}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 dark:bg-purple-950 bg-purple-700">
            <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator  className="bg-white" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="dark:focus:bg-purple-900 text-white rounded-[5px] focus:text-white focus:bg-purple-600">
               
                <Link  href={"/profile"} className="inline-flex items-center">
                <User className="mr-2 h-4 w-4" />
                Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="dark:focus:bg-purple-900 rounded-[5px] text-white focus:text-white focus:bg-purple-600">
                <Link href={"/profile/settings"} className="inline-flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                
                Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-white" />
            <DropdownMenuItem className="dark:focus:bg-purple-900 rounded-[5px] text-white focus:text-white focus:bg-purple-600">
              <button type="button" onClick={onClick} className="cursor-pointer inline-flex items-center">
              <LogOut className="mr-2 h-4 w-4" />
                
                Log out</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
      </div>
    </header>
  )
}
