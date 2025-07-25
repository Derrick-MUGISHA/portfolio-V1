"use client";

import { DemoOne } from "@/components/Newbg";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="relative w-full h-screen overflow-hidden text-white flex items-center justify-center bg-black">
      {/* Background DemoOne components */}
      <div className="absolute inset-0 z-0">
        <DemoOne />
      </div>

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-10" />

      {/* Animated 404 */}
      <div className="relative z-20 flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="flex text-[8rem] font-bold leading-none relative h-[10rem] items-center justify-center">
          {/* First 4 - falls from top */}
          <motion.span
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            4
          </motion.span>

          {/* 0 - rises from bottom */}
          <motion.span
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            0
          </motion.span>

          {/* Second 4 - slides from right */}
          <motion.span
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            4
          </motion.span>
        </div>

        {/* Message and navigation */}
        <motion.div
          className="max-w-md z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl mb-3">
            Oops! We couldn’t find that page.
          </h2>
          <p className="text-gray-300 text-sm mb-6">
            The path <code className="text-yellow-300">{pathname}</code> does not exist.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-white text-black rounded-md font-semibold hover:bg-yellow-300 transition"
          >
            Return to homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
