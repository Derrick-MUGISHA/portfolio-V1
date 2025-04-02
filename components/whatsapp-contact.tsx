"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WhatsAppContact() {
  const [isOpen, setIsOpen] = useState(false)
  const phoneNumber = "+250793094202" // Replace with your actual WhatsApp number
  const defaultMessage = "Hello! I'm interested in discussing a potential project."

  return (
    <>
      {/* Floating button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg p-0 flex items-center justify-center"
          aria-label="Contact on WhatsApp"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* WhatsApp popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 rounded-xl bg-white shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="bg-green-500 p-4 flex justify-between items-center">
              <h3 className="text-white font-medium">WhatsApp Contact</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 bg-white text-black">
              <p className="text-gray-600 mb-4">
                Send me a message on WhatsApp and I'll get back to you as soon as possible!
              </p>
              <div className="flex flex-col space-y-2">
                <a
                  href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-center transition-colors"
                >
                  Start Chat
                </a>
                <Button variant="outline" onClick={() => setIsOpen(false)} className="border-gray-300 text-gray-700">
                  Maybe Later
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

