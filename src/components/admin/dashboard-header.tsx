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
import ThemeToggle from "../ThemeToggle"

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
    <header className="flex h-16 items-center justify-between border-b px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-2 text-white" />
        <h2 className="text-lg font-semibold text-white">Admin</h2>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-purple-950 hover:text-white">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback className="text-black">GC</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm">
                <span className="font-medium ">{user?.username}</span>
                <span className="text-xs ">{user?.email}</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <Link  href={"/profile"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <Link href={"/profile/settings"}>Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span onClick={onClick}>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
      </div>
    </header>
  )
}
