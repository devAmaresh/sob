"use client"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import DeviceMonitoring from "@/components/device-monitoring"
import MiningVisualization from "@/components/mining-visualization"
import MarketInsights from "@/components/market-insights"
import Layout from "@/components/layout"

export default function Dashboard() {
  return (
    <Layout>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-full lg:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">Mining Performance</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/market" className="flex items-center gap-1">
                View Market <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <MiningVisualization />
        </div>
        <div className="col-span-full md:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">Market Insights</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/market" className="flex items-center gap-1">
                View Details <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <MarketInsights />
        </div>
        <div className="col-span-full mt-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">Device Monitoring</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/devices" className="flex items-center gap-1">
                View All Devices <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <DeviceMonitoring />
        </div>
      </div>
    </Layout>
  )
}

