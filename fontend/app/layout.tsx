import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Montserrat, Cormorant_Garamond } from "next/font/google"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollAnimationProvider } from "@/components/scroll-animation-provider"
import { ChatButton } from "@/components/ai-chat/chat-button"

import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: "OGCamping Private - Premium Camping Services at Tri An Lake",
  description:
    "Discover the perfect camping experience with premium facilities and dedicated support staff at Tri An Lake.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${montserrat.variable} ${playfair.variable} ${cormorant.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ScrollAnimationProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
              <ChatButton />
            </div>
          </ScrollAnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
