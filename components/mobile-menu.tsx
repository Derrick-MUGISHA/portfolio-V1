"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, Github, Linkedin, Twitter, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Work", path: "/work" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ]

  const socialLinks = [
    { name: "GitHub", icon: <Github className="h-5 w-5" />, url: "https://github.com/erichirwa" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, url: "https://linkedin.com/in/erichirwa" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5" />, url: "https://twitter.com/erichirwa" },
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, url: "https://instagram.com/erichirwa" },
    { name: "YouTube", icon: <Youtube className="h-5 w-5" />, url: "https://youtube.com/erichirwa" },
  ]

  // Check if a path is active (exact match or starts with for nested routes)
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path
    }
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 bg-black/95 backdrop-blur-md md:hidden"
            onClick={onClose}
          />

          {/* Menu Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 top-16 z-50 w-full max-w-sm bg-black/95 backdrop-blur-md md:hidden overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
              <h2 className="text-lg font-semibold text-white">Menu</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>

            <div className="container mx-auto px-6 py-8 flex flex-col h-[calc(100%-4rem)]">
              <nav className="flex flex-col space-y-6 mb-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative"
                  >
                    <Link
                      href={item.path}
                      className={`text-2xl font-medium transition-colors hover:text-white flex items-center ${
                        isActive(item.path) ? "text-white" : "text-white/70"
                      }`}
                      onClick={onClose}
                    >
                      {isActive(item.path) && (
                        <motion.span
                          className="absolute -left-4 w-1.5 h-8 bg-white rounded-full"
                          layoutId="mobileNavIndicator"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto">
                <p className="text-white/50 mb-4">Connect with me:</p>
                <div className="flex flex-wrap gap-6">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors p-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      aria-label={link.name}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8"
                >
                  <Button asChild className="w-full bg-white text-black hover:bg-white/90">
                    <Link href="/contact" onClick={onClose}>
                      LET'S TALK
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

