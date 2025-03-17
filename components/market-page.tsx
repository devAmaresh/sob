"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Calculator } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

import Layout from "@/components/layout"
import MarketInsights from "@/components/market-insights"

// Sample data for extended market view
const btcPriceExtended = [
  { date: "Jan", price: 42000 },
  { date: "Feb", price: 44500 },
  { date: "Mar", price: 47000 },
  { date: "Apr", price: 45000 },
  { date: "May", price: 48000 },
  { date: "Jun", price: 50000 },
  { date: "Jul", price: 52000 },
  { date: "Aug", price: 51000 },
  { date: "Sep", price: 53000 },
  { date: "Oct", price: 54000 },
  { date: "Nov", price: 56000 },
  { date: "Dec", price: 53200 },
]

const energyPriceExtended = [
  { date: "Jan", price: 0.11 },
  { date: "Feb", price: 0.12 },
  { date: "Mar", price: 0.13 },
  { date: "Apr", price: 0.12 },
  { date: "May", price: 0.11 },
  { date: "Jun", price: 0.1 },
  { date: "Jul", price: 0.11 },
  { date: "Aug", price: 0.12 },
  { date: "Sep", price: 0.13 },
  { date: "Oct", price: 0.14 },
  { date: "Nov", price: 0.13 },
  { date: "Dec", price: 0.12 },
]

const profitabilityData = [
  { date: "Jan", profit: 0.00018 },
  { date: "Feb", profit: 0.00019 },
  { date: "Mar", profit: 0.0002 },
  { date: "Apr", profit: 0.00019 },
  { date: "May", profit: 0.00021 },
  { date: "Jun", profit: 0.00022 },
  { date: "Jul", profit: 0.00023 },
  { date: "Aug", profit: 0.00022 },
  { date: "Sep", profit: 0.00024 },
  { date: "Oct", profit: 0.00025 },
  { date: "Nov", profit: 0.00024 },
  { date: "Dec", profit: 0.00023 },
]

export default function MarketPage() {
  const [btcPrice, setBtcPrice] = useState(53200)
  const [energyPrice, setEnergyPrice] = useState(0.12)
  const [hashRate, setHashRate] = useState(110)
  const [powerConsumption, setPowerConsumption] = useState(3250)

  // Calculate profitability
  const dailyBtcRevenue = hashRate * 0.00000212 // Example calculation
  const dailyPowerCost = (powerConsumption / 1000) * 24 * energyPrice
  const dailyProfitUsd = dailyBtcRevenue * btcPrice - dailyPowerCost
  const monthlyProfitUsd = dailyProfitUsd * 30
  const breakEvenDays = dailyProfitUsd > 0 ? 10000 / dailyProfitUsd : Number.POSITIVE_INFINITY // Example with $10,000 miner cost

  return (
    <Layout>
      <div className="grid gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Market & Profitability</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2 lg:col-span-2">
            <CardHeader>
              <CardTitle>BTC Price History</CardTitle>
              <CardDescription>12-month price trend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={btcPriceExtended}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, "BTC Price"]}
                      contentStyle={{
                        backgroundColor: "rgba(255,255,255,0.9)",
                        borderColor: "var(--border)",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Area type="monotone" dataKey="price" stroke="#f59e0b" fill="#f59e0b20" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Market</CardTitle>
              <CardDescription>Live market data</CardDescription>
            </CardHeader>
            <CardContent>
              <MarketInsights />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Mining Profitability</CardTitle>
              <CardDescription>Historical BTC/TH/Day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={profitabilityData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      formatter={(value) => [`${value.toFixed(5)} BTC`, "BTC/TH/Day"]}
                      contentStyle={{
                        backgroundColor: "rgba(255,255,255,0.9)",
                        borderColor: "var(--border)",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Energy Price Trends</CardTitle>
              <CardDescription>12-month energy price ($/kWh)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={energyPriceExtended}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      formatter={(value) => [`$${value}/kWh`, "Energy Price"]}
                      contentStyle={{
                        backgroundColor: "rgba(255,255,255,0.9)",
                        borderColor: "var(--border)",
                        borderRadius: "0.5rem",
                        
                      }}
                    />
                    <Line type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profitability Calculator</CardTitle>
            <CardDescription>Calculate your mining profitability based on current market conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="btc-price">BTC Price (USD)</Label>
                  <Input
                    id="btc-price"
                    type="number"
                    value={btcPrice}
                    onChange={(e) => setBtcPrice(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="energy-price">Energy Price ($/kWh)</Label>
                  <Input
                    id="energy-price"
                    type="number"
                    step="0.01"
                    value={energyPrice}
                    onChange={(e) => setEnergyPrice(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Hash Rate (TH/s): {hashRate}</Label>
                  <Slider
                    value={[hashRate]}
                    min={10}
                    max={200}
                    step={1}
                    onValueChange={(value) => setHashRate(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Power Consumption (W): {powerConsumption}</Label>
                  <Slider
                    value={[powerConsumption]}
                    min={1000}
                    max={5000}
                    step={50}
                    onValueChange={(value) => setPowerConsumption(value[0])}
                  />
                </div>
              </div>

              <div className="rounded-lg border p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Profitability Results</p>
                    <h3 className="text-2xl font-bold">${dailyProfitUsd.toFixed(2)}/day</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Daily BTC Revenue</p>
                    <p className="text-lg font-semibold">{dailyBtcRevenue.toFixed(8)} BTC</p>
                    <p className="text-sm text-muted-foreground">${(dailyBtcRevenue * btcPrice).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Daily Power Cost</p>
                    <p className="text-lg font-semibold">${dailyPowerCost.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      {((powerConsumption * 24) / 1000).toFixed(1)} kWh/day
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Monthly Profit</p>
                    <p className="text-lg font-semibold">${monthlyProfitUsd.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Break-even</p>
                    <p className="text-lg font-semibold">
                      {breakEvenDays === Number.POSITIVE_INFINITY ? "N/A" : `${Math.round(breakEvenDays)} days`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

