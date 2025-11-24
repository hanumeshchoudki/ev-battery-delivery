"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Battery, MapPin, Clock, User, Phone, Star, Package, Calendar, CreditCard } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

interface Order {
  id: string
  created_at: string
  service_address: any
  service_type: string
  charge_level: string
  status: string
  total_price: number
  scheduled_time: string | null
  provider_id: string | null
  provider_name: string | null
  provider_phone: string | null
  provider_rating: number | null
  completed_at: string | null
  cancelled_at: string | null
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "cancelled">("active")
  const router = useRouter()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast.error("Please log in to view your orders")
        router.push("/auth/login")
        return
      }

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_id", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Supabase error:", error)
        throw error
      }

      const formattedOrders = data?.map((order: any) => ({
        id: order.id,
        created_at: order.created_at,
        service_address: order.service_address,
        service_type: order.service_type || "instant",
        charge_level: order.charge_level || "80%",
        status: order.status,
        total_price: order.total_price,
        scheduled_time: order.scheduled_time,
        provider_id: order.provider_id,
        provider_name: null,
        provider_phone: null,
        provider_rating: null,
        completed_at: order.completed_at,
        cancelled_at: order.cancelled_at,
      })) || []

      setOrders(formattedOrders)
    } catch (error: any) {
      console.error("Error fetching orders:", error)
      toast.error("Failed to load orders")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "accepted":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "in_progress":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const filterOrders = (orders: Order[]) => {
    switch (activeTab) {
      case "active":
        return orders.filter((order) => 
          ["pending", "accepted", "in_progress"].includes(order.status.toLowerCase())
        )
      case "completed":
        return orders.filter((order) => order.status.toLowerCase() === "completed")
      case "cancelled":
        return orders.filter((order) => order.status.toLowerCase() === "cancelled")
      default:
        return orders
    }
  }

  const filteredOrders = filterOrders(orders)

  const handleCancelOrder = (orderId: string) => {
    const confirmed = window.confirm("Are you sure you want to cancel this order?")
    
    if (!confirmed) {
      return
    }

    // Remove the order from the local state (UI only)
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId))
    toast.success("Order cancelled successfully")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatLocation = (location: any) => {
    if (typeof location === "string") return location
    if (location?.address) return location.address
    if (location?.coordinates) return `${location.coordinates.lat}, ${location.coordinates.lng}`
    return "Location not available"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-16 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Orders</h1>
            <p className="text-gray-600">View and track all your charging service orders</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("active")}
              className={`pb-3 px-4 font-medium transition-colors relative ${
                activeTab === "active"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Active Orders
              {orders.filter((o) => ["pending", "accepted", "in_progress"].includes(o.status.toLowerCase())).length > 0 && (
                <span className="ml-2 bg-black text-white text-xs px-2 py-0.5 rounded-full">
                  {orders.filter((o) => ["pending", "accepted", "in_progress"].includes(o.status.toLowerCase())).length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`pb-3 px-4 font-medium transition-colors relative ${
                activeTab === "completed"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab("cancelled")}
              className={`pb-3 px-4 font-medium transition-colors relative ${
                activeTab === "cancelled"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Cancelled
            </button>
          </div>

          {/* Orders List */}
          {isLoading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
              <p className="text-gray-600">Loading your orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <Card className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">
                {activeTab === "active"
                  ? "You don't have any active orders at the moment."
                  : activeTab === "completed"
                  ? "You haven't completed any orders yet."
                  : "No cancelled orders."}
              </p>
              {activeTab === "active" && (
                <Button asChild className="bg-black hover:bg-gray-800 text-white">
                  <Link href="/order">Book a Charge</Link>
                </Button>
              )}
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Left Section - Order Details */}
                    <div className="flex-1 space-y-4">
                      {/* Order Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                            <Badge className={`${getStatusColor(order.status)} border`}>
                              {getStatusText(order.status)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(order.created_at)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">₹{order.total_price}</div>
                        </div>
                      </div>

                      {/* Service Type & Charge Info */}
                      <div className="flex gap-6 py-3 border-y border-gray-100">
                        <div className="flex items-center gap-2">
                          <Battery className="w-5 h-5 text-orange-600" />
                          <div>
                            <div className="text-xs text-gray-500">Service Type</div>
                            <div className="font-medium capitalize">{order.service_type.replace('_', ' ')}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="text-xs text-gray-500">Charge Level</div>
                            <div className="font-medium">{order.charge_level}</div>
                          </div>
                        </div>
                      </div>

                      {/* Location Info */}
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="text-xs text-gray-500 mb-1">Service Location</div>
                            <div className="text-sm">{formatLocation(order.service_address)}</div>
                          </div>
                        </div>
                        {order.scheduled_time && order.status !== "completed" && (
                          <div className="flex items-start gap-2">
                            <Clock className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="text-xs text-gray-500 mb-1">Scheduled Time</div>
                              <div className="text-sm">{formatDate(order.scheduled_time)}</div>
                            </div>
                          </div>
                        )}
                        {order.completed_at && (
                          <div className="flex items-start gap-2">
                            <Clock className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="text-xs text-gray-500 mb-1">Completed At</div>
                              <div className="text-sm">{formatDate(order.completed_at)}</div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Provider Info */}
                      {order.provider_name && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-xs text-gray-500 mb-2">Service Provider</div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <div className="font-medium">{order.provider_name}</div>
                                {order.provider_phone && (
                                  <div className="text-sm text-gray-600 flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    {order.provider_phone}
                                  </div>
                                )}
                              </div>
                            </div>
                            {order.provider_rating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{order.provider_rating.toFixed(1)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex flex-col gap-2 lg:w-40">
                      {order.status.toLowerCase() === "in_progress" || order.status.toLowerCase() === "accepted" ? (
                        <Button asChild className="bg-black hover:bg-gray-800 text-white">
                          <Link href={`/tracking/${order.id}`}>Track Order</Link>
                        </Button>
                      ) : null}
                      
                      {order.status.toLowerCase() === "completed" && (
                        <>
                          <Button asChild variant="outline">
                            <Link href={`/orders/${order.id}`}>View Receipt</Link>
                          </Button>
                          <Button variant="outline">Rate Service</Button>
                        </>
                      )}
                      
                      {order.status.toLowerCase() === "pending" && (
                        <Button 
                          variant="outline" 
                          className="border-red-300 text-red-600 hover:bg-red-50"
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          Cancel Order
                        </Button>
                      )}
                      
                      <Button asChild variant="ghost" className="text-sm">
                        <Link href={`/help`}>Get Help</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
