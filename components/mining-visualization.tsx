"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ArrowUpRight, TrendingUp, Clock } from "lucide-react"

// Sample data - would be replaced with real API data
const miningData = [
  { time: "00:00", beads: 12, hashRate: 45 },
  { time: "04:00", beads: 19, hashRate: 52 },
  { time: "08:00", beads: 15, hashRate: 49 },
  { time: "12:00", beads: 22, hashRate: 58 },
  { time: "16:00", beads: 28, hashRate: 62 },
  { time: "20:00", beads: 25, hashRate: 60 },
  { time: "24:00", beads: 30, hashRate: 65 },
]

const dailyData = [
  { day: "Mon", beads: 120, hashRate: 48 },
  { day: "Tue", beads: 132, hashRate: 52 },
  { day: "Wed", beads: 145, hashRate: 55 },
  { day: "Thu", beads: 155, hashRate: 58 },
  { day: "Fri", beads: 165, hashRate: 60 },
  { day: "Sat", beads: 180, hashRate: 62 },
  { day: "Sun", beads: 190, hashRate: 65 },
]

export default function MiningVisualization() {
  const [activeTab, setActiveTab] = useState("today")
  const [totalBeads, setTotalBeads] = useState(0)
  const [avgHashRate, setAvgHashRate] = useState(0)

  useEffect(() => {
    // Calculate totals based on active tab
    const data = activeTab === "today" ? miningData : dailyData

    const beadsTotal = data.reduce((sum, item) => sum + item.beads, 0)
    const hashRateAvg = data.reduce((sum, item) => sum + item.hashRate, 0) / data.length

    // Animate counters
    let beadsCounter = 0
    let hashCounter = 0
    const interval = setInterval(() => {
      if (beadsCounter < beadsTotal) {
        beadsCounter += Math.ceil(beadsTotal / 20)
        setTotalBeads(Math.min(beadsCounter, beadsTotal))
      }

      if (hashCounter < hashRateAvg) {
        hashCounter += hashRateAvg / 20
        setAvgHashRate(Math.min(hashCounter, hashRateAvg))
      }

      if (beadsCounter >= beadsTotal && hashCounter >= hashRateAvg) {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [activeTab])

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50">
        <Tabs defaultValue="today" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Mining Performance</CardTitle>
              <CardDescription>Real-time visualization of mining activity</CardDescription>
            </div>
            <TabsList className="w-[240px]">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Beads Mined</p>
              <h3 className="text-2xl font-bold">{totalBeads.toFixed(0)}</h3>
              <p className="text-xs text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +12.5% from previous period
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Hash Rate</p>
              <h3 className="text-2xl font-bold">{avgHashRate.toFixed(1)} TH/s</h3>
              <p className="text-xs text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +5.2% from previous period
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="today" value={activeTab} onValueChange={setActiveTab}>
          <div className="mt-6 h-[300px]">
            <TabsContent value="today" className="h-full mt-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={miningData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-xs" />
                  <YAxis yAxisId="left" className="text-xs" />
                  <YAxis yAxisId="right" orientation="right" className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      borderColor: "var(--border)",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="beads"
                    name="Beads Mined"
                    stroke="hsl(var(--primary))"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="hashRate"
                    name="Hash Rate (TH/s)"
                    stroke="#E67E22"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="week" className="h-full mt-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis yAxisId="left" className="text-xs" />
                  <YAxis yAxisId="right" orientation="right" className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      borderColor: "var(--border)",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="beads" name="Beads Mined" fill="hsl(var(--primary))" />
                  <Bar yAxisId="right" dataKey="hashRate" name="Avg Hash Rate (TH/s)" fill="#E67E22" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

