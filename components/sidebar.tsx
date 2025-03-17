"use client"

import { useState } from "react"
import { LayoutDashboard, HardDrive, BarChart3, Settings, Users, Bell, HelpCircle, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: HardDrive, label: "Devices" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Users, label: "Pool" },
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help" },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-muted/40 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-14 items-center border-b px-3 py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="mr-2"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        {!collapsed && <span className="text-xl font-bold">Braidpool</span>}
      </div>
      <nav className="flex-1 overflow-auto p-2">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Button
                variant={item.active ? "secondary" : "ghost"}
                className={cn("w-full justify-start", collapsed ? "px-2" : "px-3")}
              >
                <item.icon className={cn("h-5 w-5", item.active ? "text-primary" : "text-muted-foreground")} />
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t p-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary" />
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">Miner_01</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

