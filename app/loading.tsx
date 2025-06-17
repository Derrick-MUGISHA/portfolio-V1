"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        {/* Icon Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 relative z-10 rounded-full border-4 border-white/10 bg-white/5 overflow-hidden shadow-lg">
            <img
              src="/favicon.svg" // Make sure this file is in your `public/` directory
              alt="Loading Icon"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Animated Glow Behind the Icon */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30 z-0"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </motion.div>

        {/* Animated Progress Bar */}
        <div className="mt-6 w-[160px] h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="w-2/3 h-full bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
          />
        </div>
      </div>
    </div>
  )
}
