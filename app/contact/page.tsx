"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Send, Mail, MapPin, Phone, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import AnimatedBackground from "@/components/animated-background"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Send data to API route
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to: "derrickmugisha169@gmail.com" // The recipient email
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Show success notification
        toast({
          title: "Message sent successfully!",
          description: "Thank you! Your email has been sent to Derrick.",
          variant: "default",
          className: "bg-green-600 text-white border-green-700",
        })
        
        // Show success message in form
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 5000)
        
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        toast({
          title: "Error sending message",
          description: data.error || "Something went wrong. Please try again.",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      })
      console.error("Error sending email:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Three.js Animated Background */}
      <div className="fixed inset-0 -z-10">
         <AnimatedBackground />
      </div>

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button asChild variant="ghost" className="text-white hover:text-white/80 -ml-4">
              <Link href="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h1>
            <p className="text-xl text-white/70 mb-12">
              Have a project in mind? Let's discuss how I can help bring your ideas to life.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                  {showSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-600/90 text-white p-4 rounded-lg mb-6 flex items-center"
                    >
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Thank you for your message!</p>
                        <p className="text-sm text-white/90">Your email has been successfully sent to Derrick.</p>
                      </div>
                    </motion.div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-white font-medium">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-white/5 border-white/10 text-white"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-white font-medium">
                          Your Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-white/5 border-white/10 text-white"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-white font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 text-white"
                        placeholder="Project Inquiry"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-white font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="min-h-[150px] bg-white/5 border-white/10 text-white"
                        placeholder="Tell me about your project..."
                      />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full bg-white text-black hover:bg-white/90">
                      {loading ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              <div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                    <p className="text-white/70 mb-6">Feel free to reach out through any of the following channels.</p>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <Mail className="h-5 w-5 text-white mr-3 mt-0.5" />
                        <div>
                          <p className="text-white font-medium">Email</p>
                          <a
                            href="mailto:derrickmugisha169@gmail.com"
                            className="text-white/70 hover:text-white transition-colors"
                          >
                            derrickmugisha169@gmail.com
                          </a>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <MapPin className="h-5 w-5 text-white mr-3 mt-0.5" />
                        <div>
                          <p className="text-white font-medium">Location</p>
                          <p className="text-white/70">Kigali, Rwanda</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Phone className="h-5 w-5 text-white mr-3 mt-0.5" />
                        <div>
                          <p className="text-white font-medium">Phone</p>
                          <a href="tel:+250793094202" className="text-white/70 hover:text-white transition-colors">
                            +250 793 094 202
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
                    <div className="flex space-x-4">
                      <Link
                        href="https://github.com/Derrick-MUGISHA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      </Link>
                      <Link
                        href="https://www.linkedin.com/in/derrickmugisha"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </Link>
                      <Link
                        href="https://x.com/__derr1ck__?t=IwhvURRPQKJQTS4HEbCsHQ&s=09"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="py-8 bg-black/90 backdrop-blur-md border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/70">© {new Date().getFullYear()} DERRICK MUGISHA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}