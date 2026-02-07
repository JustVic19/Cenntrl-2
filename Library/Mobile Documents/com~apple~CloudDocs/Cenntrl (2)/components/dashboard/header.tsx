"use client"

import { Search, Bell, HelpCircle, Settings as SettingsIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/lib/auth/client"
import { useRouter } from "next/navigation"

interface HeaderProps {
  user: {
    name: string | null
    email: string
    image: string | null
  }
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/login")
  }

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || user.email[0].toUpperCase()

  return (
    <header className="h-16 flex items-center justify-between px-6">
      {/* LEFT SPACER */}
      <div className="flex-1"></div>

      {/* CENTERED SEARCH */}
      <div className="w-full max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search goals, transactions, contacts..."
            className="pl-10 bg-white rounded-xl border-0 shadow-sm w-full"
          />
        </div>
      </div>

      {/* Icons + User - RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-end space-x-2">
        {/* Email Icon */}
        <Button variant="ghost" size="icon" className="bg-white rounded-xl shadow-sm hover:scale-110 transition-transform">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </Button>

        {/* Notifications Bell */}
        <Button variant="ghost" size="icon" className="bg-white rounded-xl shadow-sm hover:scale-110 transition-transform relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        {/* Help */}
        <Button variant="ghost" size="icon" className="bg-white rounded-xl shadow-sm hover:scale-110 transition-transform">
          <HelpCircle className="w-5 h-5 text-gray-600" />
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="icon" className="bg-white rounded-xl shadow-sm hover:scale-110 transition-transform">
          <SettingsIcon className="w-5 h-5 text-gray-600" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-3 hover:opacity-80 transition ml-2">
              <Avatar className="w-9 h-9">
                <AvatarImage src={user.image || undefined} />
                <AvatarFallback className="bg-goals-purple text-white text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">{user.name || "User"}</p>
                <p className="text-xs text-gray-500">View profile</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
