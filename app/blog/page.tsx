"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Search, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import AnimatedBackground from "@/components/animated-background"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  image: string
  category: string
  tags: string[]
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const blogPosts: BlogPost[] = [
    {
      id: "post1",
      title: "Building Responsive Web Applications with React and Tailwind CSS",
      excerpt:
        "Learn how to create beautiful, responsive web applications using React and Tailwind CSS. This guide covers everything from setup to advanced techniques.",
      date: "2023-05-15",
      readTime: "8 min read",
      image: "/placeholder.svg?height=400&width=600&text=React+and+Tailwind",
      category: "Frontend",
      tags: ["React", "Tailwind CSS", "Responsive Design"],
    },
    {
      id: "post2",
      title: "The Power of Server Components in Next.js 13",
      excerpt:
        "Explore the new Server Components feature in Next.js 13 and how it can improve your application's performance and developer experience.",
      date: "2023-06-22",
      readTime: "10 min read",
      image: "/placeholder.svg?height=400&width=600&text=Next.js+Server+Components",
      category: "Full Stack",
      tags: ["Next.js", "Server Components", "Performance"],
    },
    {
      id: "post3",
      title: "Creating Stunning Animations with Framer Motion",
      excerpt:
        "Discover how to add beautiful, physics-based animations to your React applications using Framer Motion. From basic transitions to complex gesture-based interactions.",
      date: "2023-07-10",
      readTime: "12 min read",
      image: "/placeholder.svg?height=400&width=600&text=Framer+Motion+Animations",
      category: "UI/UX",
      tags: ["Framer Motion", "Animations", "React"],
    },
    {
      id: "post4",
      title: "Building a Scalable Backend with Node.js and Express",
      excerpt:
        "Learn how to design and implement a scalable backend architecture using Node.js and Express. Includes best practices for error handling, authentication, and more.",
      date: "2023-08-05",
      readTime: "15 min read",
      image: "/placeholder.svg?height=400&width=600&text=Node.js+and+Express",
      category: "Backend",
      tags: ["Node.js", "Express", "API Design"],
    },
    {
      id: "post5",
      title: "Mastering TypeScript: Advanced Types and Patterns",
      excerpt:
        "Take your TypeScript skills to the next level with advanced types, utility types, and design patterns that will make your code more robust and maintainable.",
      date: "2023-09-18",
      readTime: "11 min read",
      image: "/placeholder.svg?height=400&width=600&text=Advanced+TypeScript",
      category: "Programming",
      tags: ["TypeScript", "Advanced Types", "Design Patterns"],
    },
    {
      id: "post6",
      title: "Implementing Authentication with NextAuth.js",
      excerpt:
        "A comprehensive guide to implementing authentication in your Next.js applications using NextAuth.js, including social logins, JWT, and database sessions.",
      date: "2023-10-07",
      readTime: "9 min read",
      image: "/placeholder.svg?height=400&width=600&text=NextAuth.js",
      category: "Security",
      tags: ["Next.js", "Authentication", "NextAuth.js"],
    },
  ]

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const categories = Array.from(new Set(blogPosts.map((post) => post.category)))
  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)))

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

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
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Blog</h1>
              <p className="text-xl text-white/70 mb-8">
                Thoughts, insights, and tutorials on web development, design, and technology.
                <span className="block mt-2 text-green-400 font-mono text-base">
                  // console.log("Welcome to my digital garden");
                </span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="relative mb-8">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                    <Input
                      type="text"
                      placeholder="Search articles by title, tag, or category..."
                      className="pl-10 bg-white/5 border-white/10 text-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="space-y-8">
                    {filteredPosts.length > 0 ? (
                      filteredPosts.map((post, index) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="md:col-span-1">
                                <div className="h-full relative">
                                  <img
                                    src={post.image || "/placeholder.svg"}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute top-2 left-2">
                                    <Badge className="bg-black/50 text-white border-none">{post.category}</Badge>
                                  </div>
                                </div>
                              </div>
                              <div className="md:col-span-2 p-6">
                                <CardHeader className="p-0 pb-4">
                                  <CardTitle className="text-white text-xl">
                                    <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                                      {post.title}
                                    </Link>
                                  </CardTitle>
                                  <CardDescription className="text-white/70 mt-2 flex items-center space-x-4">
                                    <span className="flex items-center">
                                      <Calendar className="mr-1 h-4 w-4" />
                                      {formatDate(post.date)}
                                    </span>
                                    <span className="flex items-center">
                                      <Clock className="mr-1 h-4 w-4" />
                                      {post.readTime}
                                    </span>
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className="p-0 pb-4">
                                  <p className="text-white/80">{post.excerpt}</p>
                                  <div className="flex flex-wrap gap-2 mt-4">
                                    {post.tags.map((tag) => (
                                      <Badge key={tag} variant="outline" className="text-white/80 border-white/20">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </CardContent>
                                <CardFooter className="p-0">
                                  <Button asChild variant="ghost" className="text-white hover:text-primary p-0">
                                    <Link href={`/blog/${post.id}`} className="flex items-center">
                                      Read More
                                      <ChevronRight className="ml-1 h-4 w-4" />
                                    </Link>
                                  </Button>
                                </CardFooter>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-12 text-white/70">
                        <p>No articles found matching your search criteria.</p>
                        <Button
                          variant="outline"
                          className="mt-4 text-white border-white/20 hover:bg-white/10"
                          onClick={() => setSearchQuery("")}
                        >
                          Clear Search
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-8">
                  <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <Button
                            key={category}
                            variant="ghost"
                            className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                            onClick={() => setSearchQuery(category)}
                          >
                            {category}
                            <Badge className="ml-auto bg-white/10 hover:bg-white/20">
                              {blogPosts.filter((post) => post.category === category).length}
                            </Badge>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Popular Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-white/80 border-white/20 cursor-pointer hover:bg-white/10"
                            onClick={() => setSearchQuery(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">About the Author</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <img
                            src="/placeholder.svg?height=64&width=64&text=Eric"
                            alt="Jean Eric Hirwa"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">Jean Eric Hirwa</h3>
                          <p className="text-white/70 text-sm">Full Stack Developer</p>
                        </div>
                      </div>
                      <p className="text-white/80">
                        I write about web development, design patterns, and the latest in tech. Follow along for
                        insights and tutorials.
                      </p>
                      <Button asChild variant="outline" className="w-full text-white border-white/20 hover:bg-white/10">
                        <Link href="/about">More About Me</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

