import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: "ನಮ್ಮ Charge - EV Battery Delivery Platform",
  description:
    "Revolutionary EV battery delivery and charging service. Get your electric vehicle powered up with on-demand battery delivery.",
  keywords: "EV charging, battery delivery, electric vehicle, mobile charging, on-demand charging, Namma Charge",
  authors: [{ name: "Namma Charge" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  )
}
