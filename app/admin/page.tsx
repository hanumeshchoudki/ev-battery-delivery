"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Battery,
  TrendingUp,
  MapPin,
  Clock,
  DollarSign,
  Package,
  Star,
  Phone,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download,
} from "lucide-react"
import { BackgroundAds } from "@/components/background-ads"

const mockOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    battery: "Tesla Model S Battery",
    location: "123 Main St, San Francisco",
    status: "In Progress",
    provider: "Alex Rodriguez",
    amount: 299,
    time: "2 hours ago",
  },
  {
    id: "ORD-002",
    customer: "Sarah Wilson",
    battery: "BMW i3 Battery",
    location: "456 Oak Ave, Oakland",
    status: "Completed",
    provider: "Maria Garcia",
    amount: 199,
    time: "4 hours ago",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    battery: "Nissan Leaf Battery",
    location: "789 Pine St, Berkeley",
    status: "Pending",
    provider: "David Chen",
    amount: 149,
    time: "1 hour ago",
  },
]

const mockProviders = [
  {
    id: "PRV-001",
    name: "Alex Rodriguez",
    rating: 4.9,
    completedOrders: 847,
    vehicle: "Tesla Model Y Service",
    status: "Active",
    location: "San Francisco",
    earnings: 12450,
  },
  {
    id: "PRV-002",
    name: "Maria Garcia",
    rating: 4.8,
    completedOrders: 623,
    vehicle: "Ford Transit EV",
    status: "Active",
    location: "Oakland",
    earnings: 9800,
  },
  {
    id: "PRV-003",
    name: "David Chen",
    rating: 4.7,
    completedOrders: 456,
    vehicle: "Rivian R1T Service",
    status: "Offline",
    location: "Berkeley",
    earnings: 7200,
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500"
      case "in progress":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      case "active":
        return "bg-green-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative">
      <BackgroundAds />

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Admin <span className="text-blue-400">Dashboard</span>
            </h1>
            <p className="text-slate-300">Manage your EV battery delivery platform</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Provider
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-blue-600">
              Orders
            </TabsTrigger>
            <TabsTrigger value="providers" className="data-[state=active]:bg-blue-600">
              Service Providers
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Total Orders</CardTitle>
                  <Package className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">2,847</div>
                  <p className="text-xs text-green-400">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Active Providers</CardTitle>
                  <Users className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">156</div>
                  <p className="text-xs text-green-400">+8% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">$89,450</div>
                  <p className="text-xs text-green-400">+23% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Avg Rating</CardTitle>
                  <Star className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">4.8</div>
                  <p className="text-xs text-green-400">+0.2 from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Recent Orders</CardTitle>
                  <CardDescription className="text-slate-400">Latest battery delivery requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                        <div>
                          <div className="text-white font-medium">{order.customer}</div>
                          <div className="text-slate-400 text-sm">{order.battery}</div>
                        </div>
                        <div className="text-right">
                          <Badge className={`${getStatusColor(order.status)} text-white`}>{order.status}</Badge>
                          <div className="text-slate-400 text-sm mt-1">${order.amount}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Top Providers</CardTitle>
                  <CardDescription className="text-slate-400">Highest rated service providers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockProviders.slice(0, 3).map((provider) => (
                      <div
                        key={provider.id}
                        className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {provider.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <div className="text-white font-medium">{provider.name}</div>
                            <div className="flex items-center text-yellow-400 text-sm">
                              <Star className="w-3 h-3 fill-current mr-1" />
                              {provider.rating}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">{provider.completedOrders}</div>
                          <div className="text-slate-400 text-sm">orders</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">All Orders</CardTitle>
                    <CardDescription className="text-slate-400">Manage battery delivery orders</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="text-white font-medium">{order.id}</div>
                          <div className="text-slate-400 text-sm">{order.time}</div>
                        </div>
                        <div>
                          <div className="text-white">{order.customer}</div>
                          <div className="text-slate-400 text-sm">{order.battery}</div>
                        </div>
                        <div>
                          <div className="text-slate-300 text-sm flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {order.location}
                          </div>
                          <div className="text-slate-400 text-sm">Provider: {order.provider}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={`${getStatusColor(order.status)} text-white`}>{order.status}</Badge>
                        <div className="text-white font-medium">${order.amount}</div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Providers Tab */}
          <TabsContent value="providers" className="space-y-6">
            <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Service Providers</CardTitle>
                    <CardDescription className="text-slate-400">Manage your delivery team</CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Provider
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">
                            {provider.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{provider.name}</div>
                          <div className="flex items-center text-yellow-400 text-sm mb-1">
                            <Star className="w-3 h-3 fill-current mr-1" />
                            {provider.rating} ({provider.completedOrders} orders)
                          </div>
                          <div className="text-slate-400 text-sm">{provider.vehicle}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-white font-medium">${provider.earnings}</div>
                          <div className="text-slate-400 text-sm">Earnings</div>
                        </div>
                        <div className="text-center">
                          <Badge className={`${getStatusColor(provider.status)} text-white`}>{provider.status}</Badge>
                          <div className="text-slate-400 text-sm mt-1">{provider.location}</div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                          >
                            <Phone className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-600 text-red-400 hover:bg-red-900/20 bg-transparent"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Trends</CardTitle>
                  <CardDescription className="text-slate-400">Monthly revenue growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-slate-700/30 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                      <div className="text-white font-medium">Revenue Chart</div>
                      <div className="text-slate-400 text-sm">Analytics visualization would go here</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Service Areas</CardTitle>
                  <CardDescription className="text-slate-400">Coverage map</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-slate-700/30 rounded-lg">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <div className="text-white font-medium">Coverage Map</div>
                      <div className="text-slate-400 text-sm">Geographic analytics would go here</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-400" />
                    Avg Delivery Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">28 min</div>
                  <p className="text-green-400 text-sm">-5 min from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Battery className="w-5 h-5 mr-2 text-yellow-400" />
                    Battery Types
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">12</div>
                  <p className="text-blue-400 text-sm">Different models supported</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="w-5 h-5 mr-2 text-green-400" />
                    Customer Satisfaction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">96%</div>
                  <p className="text-green-400 text-sm">+2% from last month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
