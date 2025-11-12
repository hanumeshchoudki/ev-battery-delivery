import { OrderFlow } from "@/components/order-flow"
import { Header } from "@/components/header"

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <OrderFlow />
      </div>
    </main>
  )
}
