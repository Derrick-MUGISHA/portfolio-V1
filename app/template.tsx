"use client"

import type { ReactNode } from "react"
import { AnimatePresence } from "framer-motion"
import PageTransition from "@/components/page-transition"

export default function Template({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <PageTransition>{children}</PageTransition>
    </AnimatePresence>
  )
}

