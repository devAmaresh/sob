"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  ThermometerIcon,
  Zap,
  Clock,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Layout from "@/components/layout";
import DeviceMonitoring from "@/components/device-monitoring";

// Sample data for device details
const deviceDetails = {
  id: "device-001",
  name: "Antminer S19 Pro",
  status: "active",
  hashRate: 110,
  power: 3250,
  efficiency: 29.5,
  temperature: 65,
  uptime: "5d 12h 32m",
  lastSeen: "Just now",
  serialNumber: "AMS19P-20220315-0042",
  firmware: "Braiins OS+ 22.02.2",
  pool: "braidpool.example.com:3333",
  worker: "worker1",
  location: "Mining Farm A - Rack 3",
  alerts: [
    {
      id: 1,
      type: "warning",
      message: "Temperature spike detected",
      timestamp: "2023-05-15 14:32:45",
    },
    {
      id: 2,
      type: "info",
      message: "Hashrate fluctuation",
      timestamp: "2023-05-14 09:17:22",
    },
    {
      id: 3,
      type: "error",
      message: "Connection lost",
      timestamp: "2023-05-10 22:05:11",
    },
  ],
};

// Sample historical data
const hashRateHistory = [
  { time: "Day 1", value: 105 },
  { time: "Day 2", value: 108 },
  { time: "Day 3", value: 112 },
  { time: "Day 4", value: 109 },
  { time: "Day 5", value: 111 },
  { time: "Day 6", value: 110 },
  { time: "Day 7", value: 113 },
];

const temperatureHistory = [
  { time: "Day 1", value: 62 },
  { time: "Day 2", value: 64 },
  { time: "Day 3", value: 67 },
  { time: "Day 4", value: 65 },
  { time: "Day 5", value: 66 },
  { time: "Day 6", value: 65 },
  { time: "Day 7", value: 68 },
];

const powerHistory = [
  { time: "Day 1", value: 3200 },
  { time: "Day 2", value: 3220 },
  { time: "Day 3", value: 3280 },
  { time: "Day 4", value: 3240 },
  { time: "Day 5", value: 3260 },
  { time: "Day 6", value: 3250 },
  { time: "Day 7", value: 3270 },
];

export default function DevicesPage() {
  // const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  // const handleRefresh = () => {
  //   setIsRefreshing(true);
  //   // Simulate API refresh
  //   setTimeout(() => setIsRefreshing(false), 1000);
  // };

  return (
    <Layout>
      <div className="grid gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Mining Devices</h1>
        </div>

        {selectedDevice ? (
          <div className="grid gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                Device Details: {deviceDetails.name}
              </h2>
              <Button variant="outline" onClick={() => setSelectedDevice(null)}>
                Back to All Devices
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Hash Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Activity className="mr-2 h-4 w-4 text-primary" />
                    <div className="text-2xl font-bold">
                      {deviceDetails.hashRate} TH/s
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Temperature
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <ThermometerIcon className="mr-2 h-4 w-4 text-orange-500" />
                    <div className="text-2xl font-bold">
                      {deviceDetails.temperature}°C
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Power</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                    <div className="text-2xl font-bold">
                      {deviceDetails.power} W
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-blue-500" />
                    <div className="text-2xl font-bold">
                      {deviceDetails.uptime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Device Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Serial Number
                      </dt>
                      <dd className="text-sm">{deviceDetails.serialNumber}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Firmware
                      </dt>
                      <dd className="text-sm">{deviceDetails.firmware}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Pool
                      </dt>
                      <dd className="text-sm">{deviceDetails.pool}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Worker
                      </dt>
                      <dd className="text-sm">{deviceDetails.worker}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Location
                      </dt>
                      <dd className="text-sm">{deviceDetails.location}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Efficiency
                      </dt>
                      <dd className="text-sm">
                        {deviceDetails.efficiency} J/TH
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alerts & Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deviceDetails.alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="flex items-start gap-2 rounded-lg border p-3"
                      >
                        <AlertTriangle
                          className={`h-5 w-5 ${
                            alert.type === "error"
                              ? "text-red-500"
                              : alert.type === "warning"
                              ? "text-yellow-500"
                              : "text-blue-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {alert.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance History</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="hashrate">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="hashrate">Hash Rate</TabsTrigger>
                    <TabsTrigger value="temperature">Temperature</TabsTrigger>
                    <TabsTrigger value="power">Power</TabsTrigger>
                  </TabsList>
                  <div className="h-[300px] mt-4">
                    <TabsContent value="hashrate" className="h-full mt-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={hashRateHistory}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            className="stroke-muted"
                          />
                          <XAxis dataKey="time" className="text-xs" />
                          <YAxis className="text-xs" />
                          <Tooltip
                            formatter={(value) => [
                              `${value} TH/s`,
                              "Hash Rate",
                            ]}
                            contentStyle={{
                              backgroundColor: "rgba(255,255,255,0.9)",
                              borderColor: "var(--border)",
                              borderRadius: "0.5rem",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </TabsContent>
                    <TabsContent value="temperature" className="h-full mt-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={temperatureHistory}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            className="stroke-muted"
                          />
                          <XAxis dataKey="time" className="text-xs" />
                          <YAxis className="text-xs" />
                          <Tooltip
                            formatter={(value) => [`${value}°C`, "Temperature"]}
                            contentStyle={{
                              backgroundColor: "rgba(255,255,255,0.9)",
                              borderColor: "var(--border)",
                              borderRadius: "0.5rem",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#f97316"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </TabsContent>
                    <TabsContent value="power" className="h-full mt-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={powerHistory}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            className="stroke-muted"
                          />
                          <XAxis dataKey="time" className="text-xs" />
                          <YAxis className="text-xs" />
                          <Tooltip
                            formatter={(value) => [`${value} W`, "Power"]}
                            contentStyle={{
                              backgroundColor: "rgba(255,255,255,0.9)",
                              borderColor: "var(--border)",
                              borderRadius: "0.5rem",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#eab308"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        ) : (
          <DeviceMonitoring onDeviceSelect={setSelectedDevice} />
        )}
      </div>
    </Layout>
  );
}
