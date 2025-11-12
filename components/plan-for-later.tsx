import { Button } from "@/components/ui/button"

export function PlanForLater() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-8 text-white">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">Reserve</span>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium ml-2">Book</span>
              </div>
              <h3 className="text-3xl font-bold">Get your charge right with ನಮ್ಮ Charge Reserve</h3>
              <p className="text-blue-100">Choose date and time</p>
              <div className="flex space-x-4">
                <select className="bg-white text-black px-4 py-2 rounded-lg">
                  <option>Now</option>
                  <option>Later today</option>
                  <option>Tomorrow</option>
                </select>
                <select className="bg-white text-black px-4 py-2 rounded-lg">
                  <option>Time</option>
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                </select>
              </div>
              <Button className="bg-black hover:bg-gray-800 text-white w-full py-3 rounded-lg">Book</Button>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-black">Benefits</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <p className="font-medium text-black">Reserve your charging time up to 30 days in advance</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <p className="font-medium text-black">Earn and redeem rewards to meet your ride</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <p className="font-medium text-black">Cancel at no charge up to 60 minutes in advance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
