import { Battery, Clock, Car, Zap, Shield, Truck } from "lucide-react"

export function ServiceSuggestions() {
  const services = [
    {
      icon: Battery,
      title: "Battery Swap",
      description: "Quick battery replacement for your EV",
      color: "bg-gray-100",
    },
    {
      icon: Zap,
      title: "Fast Charge",
      description: "Rapid charging service at your location",
      color: "bg-blue-50",
    },
    {
      icon: Car,
      title: "Fleet Service",
      description: "Bulk charging for commercial fleets",
      color: "bg-green-50",
    },
    {
      icon: Clock,
      title: "Scheduled",
      description: "Plan your charging in advance",
      color: "bg-purple-50",
    },
    {
      icon: Shield,
      title: "Emergency",
      description: "24/7 emergency battery service",
      color: "bg-red-50",
    },
    {
      icon: Truck,
      title: "Mobile Unit",
      description: "Portable charging station delivery",
      color: "bg-yellow-50",
    },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-black mb-8">Suggestions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div key={index} className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
