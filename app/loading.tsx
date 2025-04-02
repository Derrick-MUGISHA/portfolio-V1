"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <div className="text-5xl font-bold text-white relative z-10">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">MD</span>
          </div>

          {/* Animated glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 z-0"
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

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "150px" }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mt-6"
        />
      </div>
    </div>
  )
}

