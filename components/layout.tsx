"use client";

import type React from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  // SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  HardDrive,
  BarChart3,
  Settings,
  Users,
  Bell,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";

interface LayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: HardDrive, label: "Devices", href: "/devices" },
  { icon: BarChart3, label: "Market", href: "/market" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: Users, label: "Pool", href: "#" },
  { icon: Bell, label: "Notifications", href: "#" },
  { icon: HelpCircle, label: "Help", href: "#" },
];

export default function Layout({ children }: LayoutProps) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  console.log(theme);

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center p-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="text-lg font-bold text-primary-foreground">
                  <Image
                    src="/braidpool.jpeg"
                    alt="logo"
                    width="200"
                    height="200"
                    className="rounded-full"
                  />
                </span>
              </div>
              <span className="ml-2 text-xl font-bold">Braidpool</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <Link href={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <div>
                      <item.icon className="h-5 w-5" />
                      <span className="">{item.label}</span>
                      </div>
                  </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center p-4">
              <div className="h-8 w-8 rounded-full bg-primary" />
              <div className="ml-3">
                <p className="text-sm font-medium">Miner_01</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1">
          <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Braidpool Monitoring</h1>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>
          </header>
          <main className="container mx-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
