"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "Working with DERRICK MUGISHA was an absolute pleasure. His technical expertise and attention to detail resulted in a product that exceeded our expectations. He was communicative throughout the entire process and delivered on time.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager, InnovateCorp",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "DERRICK MUGISHA's ability to understand our business needs and translate them into elegant technical solutions was impressive. He's not just a developer, but a true problem solver who adds value to any project.",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Founder, DesignHub",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "We hired DERRICK MUGISHA to rebuild our company website and the results were outstanding. His technical skills combined with an eye for design created a website that perfectly represents our brand and has significantly improved our conversion rates.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Wilson",
    role: "CTO, FinTech Solutions",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "DERRICK MUGISHA helped us develop a complex financial application with strict security requirements. His code quality and attention to security best practices were exceptional. I would highly recommend him for any challenging project.",
    rating: 5,
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      next()
    }, 5000)

    return () => clearInterval(interval)
  }, [current, autoplay])

  return (
    <div className="relative">
      <div className="absolute -top-12 right-0 flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={prev}
          className="rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={next}
          className="rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>

      <div className="overflow-hidden">
        <div
          className="relative h-[400px] md:h-[300px]"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 h-full flex flex-col">
                <div className="text-white/50 mb-6">
                  <Quote className="h-10 w-10" />
                </div>

                <p className="text-white text-lg mb-6 flex-grow">"{testimonials[current].content}"</p>

                <div className="flex items-center">
                  <Avatar className="h-12 w-12 border-2 border-white/20">
                    <AvatarImage src={testimonials[current].image} alt={testimonials[current].name} />
                    <AvatarFallback className="bg-white/10 text-white">
                      {testimonials[current].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="ml-4">
                    <h4 className="text-white font-semibold">{testimonials[current].name}</h4>
                    <p className="text-white/70 text-sm">{testimonials[current].role}</p>
                  </div>

                  <div className="ml-auto flex">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-yellow-400"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all ${current === index ? "bg-white w-6" : "bg-white/30"}`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

