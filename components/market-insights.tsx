"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Bitcoin, Zap, DollarSign, TrendingUp, TrendingDown } from "lucide-react"

// Sample data - would be replaced with real API data
const btcPriceData = [
  { time: "00:00", price: 51200 },
  { time: "04:00", price: 51500 },
  { time: "08:00", price: 52000 },
  { time: "12:00", price: 51800 },
  { time: "16:00", price: 52500 },
  { time: "20:00", price: 53000 },
  { time: "24:00", price: 53200 },
]

const energyPriceData = [
  { time: "00:00", price: 0.12 },
  { time: "04:00", price: 0.11 },
  { time: "08:00", price: 0.13 },
  { time: "12:00", price: 0.14 },
  { time: "16:00", price: 0.15 },
  { time: "20:00", price: 0.13 },
  { time: "24:00", price: 0.12 },
]

export default function MarketInsights() {
  const [btcPrice, setBtcPrice] = useState(0)
  const [btcChange, setBtcChange] = useState(0)
  const [energyPrice, setEnergyPrice] = useState(0)
  const [profitability, setProfitability] = useState(0)

  useEffect(() => {
    // Simulate API data loading with animated counters
    const targetBtcPrice = 53200
    const targetEnergyPrice = 0.12
    const targetProfitability = 0.00023

    let btcCounter = 0
    let energyCounter = 0
    let profitCounter = 0

    const interval = setInterval(() => {
      if (btcCounter < targetBtcPrice) {
        btcCounter += targetBtcPrice / 20
        setBtcPrice(Math.min(btcCounter, targetBtcPrice))
      }

      if (energyCounter < targetEnergyPrice) {
        energyCounter += targetEnergyPrice / 20
        setEnergyPrice(Math.min(energyCounter, targetEnergyPrice))
      }

      if (profitCounter < targetProfitability) {
        profitCounter += targetProfitability / 20
        setProfitability(Math.min(profitCounter, targetProfitability))
      }

      if (btcCounter >= targetBtcPrice && energyCounter >= targetEnergyPrice && profitCounter >= targetProfitability) {
        clearInterval(interval)
        setBtcChange(3.9)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="h-full">
      <CardHeader className="bg-muted/50">
        <CardTitle>Market Insights</CardTitle>
        <CardDescription>BTC price and mining profitability</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20">
              <Bitcoin className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">BTC Price</p>
              <h3 className="text-2xl font-bold">
                ${btcPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </h3>
              <p className={`text-xs flex items-center ${btcChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                {btcChange >= 0 ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                {btcChange >= 0 ? "+" : ""}
                {btcChange}% (24h)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <p className="text-xs font-medium text-muted-foreground">Energy Price</p>
              </div>
              <h3 className="text-xl font-bold">${energyPrice.toFixed(2)}/kWh</h3>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <p className="text-xs font-medium text-muted-foreground">BTC/TH/Day</p>
              </div>
              <h3 className="text-xl font-bold">{profitability.toFixed(5)} BTC</h3>
            </div>
          </div>

          <Tabs defaultValue="btc">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="btc">BTC Price</TabsTrigger>
              <TabsTrigger value="energy">Energy Price</TabsTrigger>
            </TabsList>
            <TabsContent value="btc" className="h-[200px] pt-4 mt-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={btcPriceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    formatter={(value) => [`$${value}`, "BTC Price"]}
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      borderColor: "var(--border)",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Line type="monotone" dataKey="price" stroke="#f59e0b" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="energy" className="h-[200px] pt-4 mt-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={energyPriceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    formatter={(value) => [`$${value}/kWh`, "Energy Price"]}
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      borderColor: "var(--border)",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Line type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}

