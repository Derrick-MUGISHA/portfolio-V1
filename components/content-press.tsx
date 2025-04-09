"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Share2, Copy, Printer, Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function ContentPress() {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied!",
        description: "The page URL has been copied to your clipboard.",
      })
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Your browser doesn't support clipboard access. Please copy the URL manually.",
        variant: "destructive",
      })
    }
    setIsOpen(false)
  }

  const handlePrint = () => {
    try {
      window.print()
    } catch (err) {
      toast({
        title: "Print failed",
        description: "Unable to open print dialog. Please try again.",
        variant: "destructive",
      })
    }
    setIsOpen(false)
  }

  const handleDownloadPDF = () => {
    toast({
      title: "Feature coming soon",
      description: "PDF download will be available in the next update.",
    })
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg p-0 flex items-center justify-center"
          aria-label="Content Press"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </motion.div>

      {/* Content Press popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 left-6 z-50 w-64 rounded-xl bg-background border shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="bg-primary p-3 flex justify-between items-center">
              <h3 className="text-primary-foreground font-medium">Content Press</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-7 w-7 rounded-full bg-background/20 hover:bg-background/30 text-primary-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-3 space-y-2">
              <Button variant="ghost" className="w-full justify-start text-left" onClick={handleCopyLink}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </Button>
              <Button variant="ghost" className="w-full justify-start text-left" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Print Page
              </Button>
              <Button variant="ghost" className="w-full justify-start text-left" onClick={handleDownloadPDF}>
                <Download className="mr-2 h-4 w-4" />
                Download as MY Cv
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

