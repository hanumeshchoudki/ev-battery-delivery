import { Header } from "@/components/header"
import { UberStyleHero } from "@/components/uber-style-hero"
import { ServiceSuggestions } from "@/components/service-suggestions"
import { AccountSection } from "@/components/account-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <UberStyleHero />
      <ServiceSuggestions />
      <AccountSection />
      <Footer />
    </main>
  )
}
