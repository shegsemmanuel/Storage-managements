"use client"

import { LayoutDashboard, FileText, ImageIcon, Video, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Documents", href: "/dashboard/documents" },
  { icon: ImageIcon, label: "Images", href: "/dashboard/images" },
  { icon: Video, label: "Media", href: "/dashboard/media" },
  { icon: MoreHorizontal, label: "Others", href: "/dashboard/others" },
]

interface SidebarProps {
  activeItem?: string
}

export function Sidebar({ activeItem }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-background border-r border-border flex flex-col">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-primary">Store It</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || activeItem === item.label
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-4 pb-4">
        <div className="bg-pink-50 rounded-2xl p-6 flex items-center justify-center">
          <img
            src="/new-one.jpg"
            alt="Folder illustration"
            className="w-32 h-32 object-contain"
          />
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-3">
          <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold">
            EP
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">emma paul</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
