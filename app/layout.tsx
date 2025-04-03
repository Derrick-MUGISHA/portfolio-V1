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
  title: "DERRICK MUGISHA - Full Stack Software Developer",
  description:
    "Derrick Mugisha, a Full Stack Software Developer specializing in creating exceptional digital experiences.",
    
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white`}>
      <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet"></link>
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