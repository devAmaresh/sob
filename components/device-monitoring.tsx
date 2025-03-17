"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, RefreshCw } from "lucide-react"

// Sample data - would be replaced with real API data
const devices = [
  {
    id: "device-001",
    name: "Antminer S19 Pro",
    status: "active",
    hashRate: 110,
    power: 3250,
    efficiency: 29.5,
    temperature: 65,
    uptime: "5d 12h 32m",
    lastSeen: "Just now",
  },
  {
    id: "device-002",
    name: "Whatsminer M30S++",
    status: "active",
    hashRate: 112,
    power: 3472,
    efficiency: 31.0,
    temperature: 68,
    uptime: "3d 8h 15m",
    lastSeen: "Just now",
  },
  {
    id: "device-003",
    name: "Avalon A1246",
    status: "warning",
    hashRate: 85,
    power: 3010,
    efficiency: 35.4,
    temperature: 72,
    uptime: "2d 4h 45m",
    lastSeen: "2m ago",
  },
  {
    id: "device-004",
    name: "Antminer S19j Pro",
    status: "active",
    hashRate: 104,
    power: 3050,
    efficiency: 29.3,
    temperature: 63,
    uptime: "7d 2h 18m",
    lastSeen: "Just now",
  },
  {
    id: "device-005",
    name: "Whatsminer M30S",
    status: "offline",
    hashRate: 0,
    power: 0,
    efficiency: 0,
    temperature: 0,
    uptime: "0d 0h 0m",
    lastSeen: "2h 15m ago",
  },
]

interface DeviceMonitoringProps {
  onDeviceSelect?: (deviceId: string) => void
}

export default function DeviceMonitoring({ onDeviceSelect }: DeviceMonitoringProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate API refresh
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "offline":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader className="bg-muted/50">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Device Monitoring</CardTitle>
            <CardDescription>Status and performance of connected mining devices</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search devices..."
                className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button size="icon" variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              <span className="sr-only">Refresh</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead>Device</TableHead>
                <TableHead className="text-right">Hash Rate</TableHead>
                <TableHead className="text-right">Power</TableHead>
                <TableHead className="text-right">Efficiency</TableHead>
                <TableHead className="text-right">Temp</TableHead>
                <TableHead className="text-right">Uptime</TableHead>
                <TableHead className="text-right">Last Seen</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.map((device) => (
                <TableRow
                  key={device.id}
                  className={onDeviceSelect ? "cursor-pointer hover:bg-muted/50" : ""}
                  onClick={() => onDeviceSelect && onDeviceSelect(device.id)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`relative flex h-3 w-3 ${device.status !== "offline" ? "animate-pulse" : ""}`}>
                        <span
                          className={`absolute inline-flex h-full w-full rounded-full ${getStatusColor(device.status)} opacity-75`}
                        ></span>
                        <span
                          className={`relative inline-flex rounded-full h-3 w-3 ${getStatusColor(device.status)}`}
                        ></span>
                      </span>
                      <Badge
                        variant={
                          device.status === "active"
                            ? "default"
                            : device.status === "warning"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{device.name}</TableCell>
                  <TableCell className="text-right">{device.hashRate} TH/s</TableCell>
                  <TableCell className="text-right">{device.power} W</TableCell>
                  <TableCell className="text-right">{device.efficiency} J/TH</TableCell>
                  <TableCell className="text-right">{device.temperature}°C</TableCell>
                  <TableCell className="text-right">{device.uptime}</TableCell>
                  <TableCell className="text-right">{device.lastSeen}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            onDeviceSelect && onDeviceSelect(device.id)
                          }}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Restart Device</DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit Settings</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

