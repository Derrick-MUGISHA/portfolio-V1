"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ChatBotWithWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)

  const phoneNumber = "+250793094202"
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
          aria-label="Open AI Chat"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </Button>
      </motion.div>

      {/* AI + WhatsApp popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[360px] h-[540px] rounded-xl bg-white shadow-xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-green-500 p-4 flex justify-between items-center">
              <h3 className="text-white font-medium">Chat With Me</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* AI Chat Embed */}
            <div className="flex-1 bg-white">
              <iframe
                src="https://your-ai-chat-source.com/embed" // Replace with your AI chat iframe source
                title="AI Chat Assistant"
                className="w-full h-full border-0"
              />
            </div>

            {/* WhatsApp CTA */}
            <div className="p-3 border-t bg-gray-50">
              <a
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors"
              >
                Or Message on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
