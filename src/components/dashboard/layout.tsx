"use client"

import React from "react"
// Link import removed - use <a> tags instead
// usePathname import removed
import { cn } from "@/lib/utils"
import { Home, Settings, Play, User } from "lucide-react"

interface SidebarNavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const sidebarNavItems: SidebarNavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Workflows",
    href: "/workflow",
    icon: <Play className="h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-4 w-4" />,
  },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-gray-800 bg-black">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">AI Workflow</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            <Link
              href="/profile"
              className="flex items-center text-sm font-medium transition-colors hover:text-primary"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </nav>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full py-6 pl-8 pr-6 lg:py-8">
            <nav className="flex flex-col space-y-2">
              {sidebarNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium",
                    pathname === item.href
                      ? "bg-gray-800/50 /50 text-white"
                      : "text-gray-400 hover:bg-gray-800/50 /50 hover:text-white"
                  )}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
} 