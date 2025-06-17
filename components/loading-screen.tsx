"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const [showIcon, setShowIcon] = useState(false)

  useEffect(() => {
    // Check if user has already seen the loading screen
    const hasVisited = localStorage.getItem("hasVisitedPortfolio")

    // If already visited, skip loading screen
    if (hasVisited) {
      setIsLoading(false)
      return
    }

    // Otherwise, show loading screen
    setIsLoading(true)

    const slowNetwork =
      (navigator as any).connection?.effectiveType === "2g" ||
      (navigator as any).connection?.saveData

    const iconTimer = setTimeout(() => {
      setShowIcon(true)
    }, 300)

    const delay = slowNetwork ? 4000 : 2500
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
      localStorage.setItem("hasVisitedPortfolio", "true") // Mark as visited
    }, delay)

    return () => {
      clearTimeout(iconTimer)
      clearTimeout(loadingTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <div className="relative flex flex-col items-center">
            <AnimatePresence>
              {showIcon && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  className="relative"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 relative z-10 rounded-full border-4 border-white/10 bg-white/5 backdrop-blur-md overflow-hidden shadow-lg">
                    <img
                      src="/favicon.svg" // Use .png if .svg doesn't display well
                      alt="Icon"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Animated glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30 z-0"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 2, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mt-8"
            />

            {/* Message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-white/50 mt-4 text-sm font-mono"
            >
              Hang on...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
