"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Shield, Zap, ThermometerIcon, Wrench, Server, User } from "lucide-react"

import Layout from "@/components/layout"

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [temperatureThreshold, setTemperatureThreshold] = useState(75)
  const [hashRateThreshold, setHashRateThreshold] = useState(20)
  const [refreshRate, setRefreshRate] = useState("60")

  return (
    <Layout>
      <div className="grid gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <Tabs defaultValue="notifications">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
            <TabsTrigger value="api">API Configuration</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Configure how you want to receive alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications" className="font-medium">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  {emailNotifications && (
                    <div className="ml-6 space-y-2">
                      <Label htmlFor="email-address">Email Address</Label>
                      <Input id="email-address" placeholder="your@email.com" />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications" className="font-medium">
                        Push Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">Receive alerts in your browser</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification-frequency">Notification Frequency</Label>
                  <Select defaultValue="immediate">
                    <SelectTrigger id="notification-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly Digest</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Notification Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="thresholds" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Alert Thresholds
                </CardTitle>
                <CardDescription>Set thresholds for when alerts should be triggered</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <Label>Temperature Threshold: {temperatureThreshold}°C</Label>
                      <ThermometerIcon className="h-4 w-4 text-orange-500" />
                    </div>
                    <Slider
                      value={[temperatureThreshold]}
                      min={50}
                      max={90}
                      step={1}
                      onValueChange={(value) => setTemperatureThreshold(value[0])}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Alert when device temperature exceeds this threshold
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label>Hash Rate Drop Threshold: {hashRateThreshold}%</Label>
                      <Zap className="h-4 w-4 text-yellow-500" />
                    </div>
                    <Slider
                      value={[hashRateThreshold]}
                      min={5}
                      max={50}
                      step={1}
                      onValueChange={(value) => setHashRateThreshold(value[0])}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Alert when hash rate drops by this percentage from the average
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="offline-threshold">Offline Alert Delay</Label>
                  <Select defaultValue="5">
                    <SelectTrigger id="offline-threshold">
                      <SelectValue placeholder="Select delay" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 minute</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Wait this long before alerting when a device goes offline
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Threshold Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  API Configuration
                </CardTitle>
                <CardDescription>Configure API connections and data refresh settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="btc-node">Bitcoin Node URL</Label>
                  <Input id="btc-node" placeholder="http://localhost:8332" />
                  <p className="text-xs text-muted-foreground mt-1">URL of your Bitcoin node for RPC connections</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rpc-username">RPC Username</Label>
                    <Input id="rpc-username" placeholder="username" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rpc-password">RPC Password</Label>
                    <Input id="rpc-password" type="password" placeholder="••••••••" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price-api">Price API Endpoint</Label>
                  <Select defaultValue="coingecko">
                    <SelectTrigger id="price-api">
                      <SelectValue placeholder="Select API" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="coingecko">CoinGecko</SelectItem>
                      <SelectItem value="coinmarketcap">CoinMarketCap</SelectItem>
                      <SelectItem value="binance">Binance</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="refresh-rate">Data Refresh Rate (seconds)</Label>
                  <Select value={refreshRate} onValueChange={setRefreshRate}>
                    <SelectTrigger id="refresh-rate">
                      <SelectValue placeholder="Select refresh rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                      <SelectItem value="300">5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="test-connection" className="font-medium">
                      Test Connection
                    </Label>
                    <p className="text-sm text-muted-foreground">Verify API connections are working</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Server className="mr-2 h-4 w-4" />
                    Test Connection
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save API Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Settings
                </CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="Miner_01" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time (ET)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                      <SelectItem value="cet">Central European Time (CET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dark-mode" className="font-medium">
                      Dark Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">Enable dark mode for the dashboard</p>
                  </div>
                  <Switch id="dark-mode" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics" className="font-medium">
                      Usage Analytics
                    </Label>
                    <p className="text-sm text-muted-foreground">Allow anonymous usage data collection</p>
                  </div>
                  <Switch id="analytics" defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Account Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

