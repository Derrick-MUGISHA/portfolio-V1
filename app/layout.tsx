import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import ResponsiveNavigation from "@/components/responsive-navigation"
import LoadingScreen from "@/components/loading-screen"
import WhatsAppContact from "@/components/whatsapp-contact"
import ContentPress from "@/components/content-press"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Jean Eric Hirwa - Full Stack Software Developer",
  description:
    "Portfolio of Jean Eric Hirwa, a Full Stack Software Developer specializing in creating exceptional digital experiences.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <LoadingScreen />
          <ResponsiveNavigation />
          {children}
          <WhatsAppContact />
          <ContentPress />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'