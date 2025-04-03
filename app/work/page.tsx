"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Github, ExternalLink, Code, Star, GitFork, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnimatedBackground from "@/components/animated-background"
import { fetchGitHubData } from "@/lib/github"
import type { GitHubData } from "@/types/github"

interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  image: string
  link: string
  skills: string[]
}

export default function WorkPage() {
  const [gitHubData, setGitHubData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("projects")

  useEffect(() => {
    const getGitHubData = async () => {
      try {
        const data = await fetchGitHubData("Derrick-MUGISHA")
        setGitHubData(data)
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error)
      } finally {
        setLoading(false)
      }
    }

    getGitHubData()
  }, [])

  const certificates: Certificate[] = [
    {
      id: "cert1",
      title: "Full Stack Web Development",
      issuer: "Udacity",
      date: "2022",
      image: "/placeholder.svg?height=300&width=500&text=Web+Development+Certificate",
      link: "https://example.com/cert1",
      skills: ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
    },
    {
      id: "cert2",
      title: "Advanced React & Redux",
      issuer: "Coursera",
      date: "2021",
      image: "/placeholder.svg?height=300&width=500&text=React+Certificate",
      link: "https://example.com/cert2",
      skills: ["React", "Redux", "React Hooks", "Context API"],
    },
    {
      id: "cert3",
      title: "Python for Data Science",
      issuer: "DataCamp",
      date: "2020",
      image: "/placeholder.svg?height=300&width=500&text=Python+Certificate",
      link: "https://example.com/cert3",
      skills: ["Python", "NumPy", "Pandas", "Matplotlib"],
    },
    {
      id: "cert4",
      title: "UI/UX Design Fundamentals",
      issuer: "Interaction Design Foundation",
      date: "2021",
      image: "/placeholder.svg?height=300&width=500&text=UI/UX+Certificate",
      link: "https://example.com/cert4",
      skills: ["Figma", "User Research", "Wireframing", "Prototyping"],
    },
    {
      id: "cert5",
      title: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2022",
      image: "/placeholder.svg?height=300&width=500&text=AWS+Certificate",
      link: "https://example.com/cert5",
      skills: ["AWS", "Lambda", "S3", "DynamoDB", "CloudFormation"],
    },
  ]

  const featuredProjects = [
    {
      id: "project1",
      title: "A youtube clone",
      description:
        "A full-stack youtube clone platform with product real time search functionality, filter functionality, and more.",
      image: "https://www.citypng.com/public/uploads/preview/hd-aesthetic-youtube-yt-black-red-outline-logo-symbol-sign-icon-png-7017516951203758jnlahzimi.png",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      demoLink: "https://youtube-erv2.onrender.com/",
      githubLink: "https://github.com/Derrick-MUGISHA/youtube",
      featured: true,
    },
    {
      id: "project2",
      title: "Text to speech app",
      description: "A Text to speech website showcasing many languages it can spell in different ways.",
      image: "https://i.pinimg.com/736x/39/cb/c7/39cbc7d4698e49bf5699f683b9efbb02.jpg",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
      demoLink: "https://speech-xgo8.onrender.com",
      githubLink: "https://github.com/Derrick-MUGISHA/speech",
      featured: true,
    },
    {
      id: "project3",
      title: "Qur codes generator",
      description:
        "A collaborative Qur codes generator with any words application with real-time generation and fast way to generate Qur codes.",
      image: "https://i.pinimg.com/736x/0e/97/27/0e972709749e682fb5bf8d85dcb2e35d.jpg",
      technologies: ["React", "Firebase", "Redux", "Material UI"],
      demoLink: "https://qr-bix4.onrender.com",
      githubLink: "https://github.com/Derrick-MUGISHA/QR",
      featured: true,
    },
  ]

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

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
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">My Work</h1>
              <p className="text-xl text-white/70 mb-8">
                A showcase of my projects, contributions, and professional achievements.
                <span className="block mt-2 text-green-400 font-mono text-base">
                  // Code is like humor. When you have to explain it, it's bad.
                </span>
              </p>

              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
                  <TabsTrigger
                    value="projects"
                    className="data-[state=active]:bg-white/10 text-white data-[state=active]:text-white"
                  >
                    <Code className="mr-2 h-4 w-4" />
                    Projects
                  </TabsTrigger>
                  <TabsTrigger
                    value="github"
                    className="data-[state=active]:bg-white/10 text-white data-[state=active]:text-white"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </TabsTrigger>
                  <TabsTrigger
                    value="certificates"
                    className="data-[state=active]:bg-white/10 text-white data-[state=active]:text-white"
                  >
                    <Award className="mr-2 h-4 w-4" />
                    Certificates
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="projects" className="mt-6">
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-white">Featured Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {featuredProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card className="h-full bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-300">
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                              />
                            </div>
                            <CardHeader>
                              <CardTitle className="text-white">{project.title}</CardTitle>
                              <CardDescription className="text-white/70">{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies.map((tech) => (
                                  <Badge key={tech} variant="outline" className="text-white border-white/30 bg-white/5">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                              <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="gap-2 text-white border-white/20 hover:bg-white/10"
                              >
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-4 w-4" />
                                  Code
                                </a>
                              </Button>
                              <Button asChild size="sm" className="gap-2">
                                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                  Live Demo
                                </a>
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <div className="text-center mt-8">
                      <Button asChild variant="outline" className="text-white border-white hover:bg-white/10">
                        <Link href="/project/1" className="flex items-center">
                          View Project Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="github" className="mt-6">
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    </div>
                  ) : gitHubData ? (
                    <div className="space-y-8">
                      <h2 className="text-2xl font-bold text-white">GitHub Repositories</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {gitHubData.repositories.map((repo, index) => (
                          <motion.div
                            key={repo.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <Card className="h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                              <CardHeader>
                                <CardTitle className="text-white flex items-center">
                                  <Github className="mr-2 h-5 w-5" />
                                  <a
                                    href={repo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                  >
                                    {repo.name}
                                  </a>
                                </CardTitle>
                                <CardDescription className="text-white/70">
                                  {repo.description || "No description provided"}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {repo.topics.slice(0, 5).map((topic) => (
                                    <Badge
                                      key={topic}
                                      variant="outline"
                                      className="text-white border-white/30 bg-white/5"
                                    >
                                      {topic}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex items-center text-white/70 text-sm space-x-4">
                                  <div className="flex items-center">
                                    <Star className="mr-1 h-4 w-4" />
                                    {repo.stars}
                                  </div>
                                  <div className="flex items-center">
                                    <GitFork className="mr-1 h-4 w-4" />
                                    {repo.forks}
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="mr-1 h-4 w-4" />
                                    {new Date(repo.updatedAt).toLocaleDateString()}
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter>
                                <Button
                                  asChild
                                  variant="outline"
                                  size="sm"
                                  className="w-full text-white border-white/20 hover:bg-white/10"
                                >
                                  <a
                                    href={repo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center"
                                  >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    View Repository
                                  </a>
                                </Button>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        ))}
                      </div>

                      <div className="text-center mt-8">
                        <Button asChild variant="outline" className="text-white border-white hover:bg-white/10">
                          <a
                            href={`https://github.com/${gitHubData.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <Github className="mr-2 h-4 w-4" />
                            View GitHub Profile
                          </a>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-white/70 py-8">
                      No GitHub data available. Please check back later.
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="certificates" className="mt-6">
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-white">Certifications & Achievements</h2>
                    <div className="space-y-6">
                      {certificates.map((cert, index) => (
                        <motion.div
                          key={cert.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
                            <CardContent className="p-0">
                              <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="relative aspect-video md:aspect-auto">
                                  <img
                                    src={cert.image || "/placeholder.svg"}
                                    alt={cert.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute top-2 right-2">
                                    <Badge variant="secondary" className="bg-black/50 text-white">
                                      {cert.date}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="p-6 flex flex-col">
                                  <h3 className="text-xl font-bold text-white mb-1">{cert.title}</h3>
                                  <p className="text-white/70 mb-4">Issued by {cert.issuer}</p>

                                  <div className="mb-4">
                                    <h4 className="text-sm font-medium text-white/70 mb-2">Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {cert.skills.map((skill) => (
                                        <Badge key={skill} variant="outline" className="bg-white/10">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="mt-auto">
                                    <Button asChild variant="outline" size="sm" className="gap-2">
                                      <a href={cert.link} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-4 w-4" />
                                        View Certificate
                                      </a>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

