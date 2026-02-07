"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Target,      // Goals icon
  DollarSign,  // Finance icon
  Activity,    // Health icon
  Users,       // Network icon
  BarChart3,   // Insights icon
  Settings     // Settings icon
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Goals", href: "/dashboard/goals", icon: Target },
  { name: "Finance", href: "/dashboard/finance", icon: DollarSign },
  { name: "Health", href: "/dashboard/health", icon: Activity },
  { name: "Network", href: "/dashboard/network", icon: Users },
]

const bottomNavigation = [
  { name: "Insights", href: "/dashboard/insights", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[60px] bg-navy/95 backdrop-blur-sm flex flex-col items-center py-6 space-y-8">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center justify-center">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
          <span className="text-white font-bold text-xl">C</span>
        </div>
      </Link>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col items-center space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                "hover:bg-white/10",
                isActive && "bg-white/20"
              )}
              title={item.name}
            >
              <Icon className="w-5 h-5 text-white" />
            </Link>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="flex flex-col items-center space-y-2">
        {bottomNavigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                "hover:bg-white/10",
                isActive && "bg-white/20"
              )}
              title={item.name}
            >
              <Icon className="w-5 h-5 text-white" />
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
