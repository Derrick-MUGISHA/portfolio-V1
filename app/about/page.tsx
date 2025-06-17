"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ChevronLeft, ChevronRight, Code, Terminal, Cpu, Server, Database, Braces } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import AnimatedBackground from "@/components/animated-background"
import { DemoOne } from "@/components/Newbg"

export default function AboutPage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const images = [
    {
      src: "https://clone-15su.onrender.com/images/IMG-20231225-WA0019-removebg-preview__1_-removebg-preview.png",
      alt: "Me during a coding session",
      caption: "Deep in the zone, debugging a particularly tricky recursive function.",
    },
    {
      src: "/placeholder.svg?height=600&width=800&text=Conference+Talk",
      alt: "Speaking at a tech conference",
      caption: "Sharing my insights on modern web development frameworks at DevCon 2023.",
    },
    {
      src: "/placeholder.svg?height=600&width=800&text=Team+Collaboration",
      alt: "Collaborating with team",
      caption: "Whiteboarding session with my team - where the magic happens!",
    },
    {
      src: "/placeholder.svg?height=600&width=800&text=Hackathon+Winner",
      alt: "Winning a hackathon",
      caption: "Celebrating after our team won first place at the 48-hour CodeJam hackathon.",
    },
    {
      src: "/placeholder.svg?height=600&width=800&text=Outdoor+Adventure",
      alt: "Hiking adventure",
      caption:
        "Finding inspiration in nature - sometimes the best code solutions come when you're away from the screen.",
    },
  ]

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  useEffect(() => {
    if (!autoplay) return

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      nextImage()
    }, 5000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [activeImageIndex, autoplay])

  const funFacts = [
    "I once debugged a production issue while on a roller coaster. Talk about debugging under pressure!",
    "My first computer had less processing power than today's smart toasters. It took 5 minutes to load Minesweeper.",
    "I've written so many lines of code that if printed, they would stretch from my desk to the coffee machine and back 42 times.",
    "I name my development branches after sci-fi characters. My team knows when I'm working on something complex when they see a pull request from 'HAL9000'.",
    "I have a rubber duck named Quackers that has helped me solve more bugs than Stack Overflow.",
    "My personal record for consecutive hours coding is 18. My personal record for consecutive hours debugging a single issue is also 18. Coincidence? I think not.",
    "I can type at 120 WPM, but only when writing code. Ask me to type normal English and I suddenly forget how keyboards work.",
  ]

  return (
    <div className="relative min-h-screen w-full">
          {/* Full Screen Background */}
          <div className="fixed inset-0 w-full h-full -z-10">
            <DemoOne />
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

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Me</h1>
              <p className="text-xl text-white/70 mb-8">
                <span className="text-green-400 font-mono">const</span>{" "}
                <span className="text-yellow-400 font-mono">developer</span> = {"{"}
                <span className="text-purple-400 font-mono"> name</span>:{" "}
                <span className="text-green-400 font-mono">"DERRICK MUGISHA"</span>,
                <span className="text-purple-400 font-mono"> passion</span>:{" "}
                <span className="text-green-400 font-mono">"Building amazing digital experiences"</span>,
                <span className="text-purple-400 font-mono"> caffeineLevel</span>:{" "}
                <span className="text-blue-400 font-mono">Infinity</span> {"}"}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl border border-white/20 group">
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"
                      onMouseEnter={() => setAutoplay(false)}
                      onMouseLeave={() => setAutoplay(true)}
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-white text-lg">{images[activeImageIndex].caption}</p>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/30 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/30 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={images[activeImageIndex].src || "/placeholder.svg"}
                          alt={images[activeImageIndex].alt}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="flex justify-center mt-4 space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setActiveImageIndex(index)
                          setAutoplay(false)
                          setTimeout(() => setAutoplay(true), 10000)
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          activeImageIndex === index ? "bg-white w-6" : "bg-white/30"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Hello, World!</h2>
                  <div className="space-y-4 text-white/80">
                    <p>
                      I'm DERRICK MUGISHA, a passionate Full Stack Developer with a love for creating elegant solutions to
                      complex problems. My journey in tech began when I disassembled my first computer at age 16 (much
                      to my parents' dismay) and has evolved into a career building software that makes a difference.
                    </p>
                    <p>
                      With over 1+ years of professional experience, I've worked across the entire development stack,
                      from crafting pixel-perfect frontends with React and Three.js to architecting robust backend
                      systems with Node.js and various databases.
                    </p>
                    <p>
                      When I'm not in front of a computer, you might find me hiking in the mountains, experimenting with
                      new cooking recipes, or diving into a good sci-fi novel. I believe that diverse experiences fuel
                      creativity in problem-solving.
                    </p>
                    <p className="text-green-400 font-mono">
                      // TODO: Learn more languages, travel more places, build more awesome things
                    </p>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-white mb-4">Fun Fact</h3>
                    <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                      <CardContent className="p-6">
                        <p className="text-white/80 italic">
                          "{funFacts[Math.floor(Math.random() * funFacts.length)]}"
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8">My Tech Stack</h2>

              <Tabs defaultValue="frontend" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
                  <TabsTrigger
                    value="frontend"
                    className="data-[state=active]:bg-white/10 text-white data-[state=active]:text-white"
                  >
                    <Code className="mr-2 h-4 w-4" />
                    Frontend
                  </TabsTrigger>
                  <TabsTrigger
                    value="backend"
                    className="data-[state=active]:bg-white/10 text-white data-[state=active]:text-white"
                  >
                    <Server className="mr-2 h-4 w-4" />
                    Backend
                  </TabsTrigger>
                  <TabsTrigger
                    value="tools"
                    className="data-[state=active]:bg-white/10 text-white data-[state=active]:text-white"
                  >
                    <Terminal className="mr-2 h-4 w-4" />
                    Tools & DevOps
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="frontend" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "React", icon: "⚛️", level: 95 },
                      { name: "TypeScript", icon: "TS", level: 90 },
                      { name: "Next.js", icon: "N", level: 92 },
                      { name: "Three.js", icon: "3D", level: 85 },
                      { name: "Tailwind CSS", icon: "🌊", level: 95 },
                      { name: "Framer Motion", icon: "🔄", level: 88 },
                      { name: "Redux", icon: "🔄", level: 85 },
                      { name: "CSS/SASS", icon: "🎨", level: 90 },
                    ].map((tech, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="text-2xl mr-2">{tech.icon}</span>
                            <h3 className="font-medium text-white">{tech.name}</h3>
                          </div>
                          <span className="text-sm text-white/60">{tech.level}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2.5">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
                            style={{ width: `${tech.level}%` }}
                          ></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="backend" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "Node.js", icon: "🟢", level: 92 },
                      { name: "Express", icon: "🚂", level: 90 },
                      { name: "MongoDB", icon: "🍃", level: 88 },
                      { name: "PostgreSQL", icon: "🐘", level: 85 },
                      { name: "Firebase", icon: "🔥", level: 90 },
                      { name: "GraphQL", icon: "◢", level: 80 },
                      { name: "REST API", icon: "🔌", level: 95 },
                      { name: "Python", icon: "🐍", level: 75 },
                    ].map((tech, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="text-2xl mr-2">{tech.icon}</span>
                            <h3 className="font-medium text-white">{tech.name}</h3>
                          </div>
                          <span className="text-sm text-white/60">{tech.level}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2.5">
                          <div
                            className="bg-gradient-to-r from-green-500 to-teal-500 h-2.5 rounded-full"
                            style={{ width: `${tech.level}%` }}
                          ></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="tools" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "Git", icon: "🔄", level: 95 },
                      { name: "Docker", icon: "🐳", level: 85 },
                      { name: "AWS", icon: "☁️", level: 80 },
                      { name: "Vercel", icon: "▲", level: 90 },
                      { name: "CI/CD", icon: "🔄", level: 85 },
                      { name: "Jest", icon: "🃏", level: 88 },
                      { name: "Webpack", icon: "📦", level: 80 },
                      { name: "Figma", icon: "🎨", level: 75 },
                    ].map((tech, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="text-2xl mr-2">{tech.icon}</span>
                            <h3 className="font-medium text-white">{tech.name}</h3>
                          </div>
                          <span className="text-sm text-white/60">{tech.level}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2.5">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-red-500 h-2.5 rounded-full"
                            style={{ width: `${tech.level}%` }}
                          ></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8">My Studies</h2>

              <div className="relative border-l-2 border-white/20 pl-8 space-y-12">
                {[
                  {
                    year: "2023 - Present",
                    title: "Senior Full Stack Developer",
                    company: "TechFusion Inc.",
                    description:
                      "Leading development of enterprise applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting scalable solutions.",
                    icon: <Cpu className="h-6 w-6 text-purple-400" />,
                  },
                  {
                    year: "2021 - 2023",
                    title: "Full Stack Developer",
                    company: "InnovateCorp",
                    description:
                      "Developed and maintained web applications for clients across various industries. Implemented CI/CD pipelines and improved development workflows.",
                    icon: <Braces className="h-6 w-6 text-blue-400" />,
                  },
                  {
                    year: "2019 - 2021",
                    title: "Frontend Developer",
                    company: "DesignHub",
                    description:
                      "Created responsive and accessible user interfaces for web applications. Specialized in animation and interactive experiences.",
                    icon: <Code className="h-6 w-6 text-green-400" />,
                  },
                  // {
                  //   year: "2018 - 2019",
                  //   title: "Junior Developer",
                  //   company: "StartupLaunch",
                  //   description:
                  //     "Started career as a junior developer working on frontend projects. Learned the fundamentals of web development and collaborative coding.",
                  //   icon: <Terminal className="h-6 w-6 text-yellow-400" />,
                  // },
                  // {
                  //   year: "2014 - 2018",
                  //   title: "Computer Science Degree",
                  //   company: "Tech University",
                  //   description:
                  //     "Graduated with a degree in Computer Science with focus on software development and algorithms.",
                  //   icon: <Database className="h-6 w-6 text-red-400" />,
                  // },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute left-[-41px] top-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                      {item.icon}
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                      <div className="text-white/60 mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <div className="text-white/80 mb-4">{item.company}</div>
                      <p className="text-white/70">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Let's Connect</h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Whether you want to discuss a project, talk about technology, or just say hello, I'd love to hear from
                you!
              </p>
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                <Link href="/contact">Get In Touch</Link>
              </Button>

              <div className="mt-8 text-white/60 font-mono text-sm">
                <p>while(alive) {"{"}</p>
                <p className="ml-4">code();</p>
                <p className="ml-4">learn();</p>
                <p className="ml-4">create();</p>
                <p>{"}"}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

