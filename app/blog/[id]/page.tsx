"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Tag, Share2, Bookmark, MessageSquare, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import AnimatedBackground from "@/components/animated-background"

interface BlogPost {
  id: string
  title: string
  content: string
  date: string
  readTime: string
  image: string
  category: string
  tags: string[]
  author: {
    name: string
    avatar: string
    bio: string
  }
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch the post data from an API
    // For this example, we'll use mock data
    const mockPost: BlogPost = {
      id: params.id,
      title: "Building Responsive Web Applications with React and Tailwind CSS",
      content: `
        <p>In today's digital landscape, creating responsive web applications is no longer optional—it's essential. Users access websites from a variety of devices with different screen sizes, from smartphones and tablets to desktop computers and even large displays. A responsive design ensures that your application looks and functions well across all these devices.</p>
        
        <h2>Why React and Tailwind CSS?</h2>
        
        <p>React has become one of the most popular JavaScript libraries for building user interfaces. Its component-based architecture makes it easy to create reusable UI elements, which is particularly useful for responsive design. You can create components that adapt to different screen sizes and reuse them throughout your application.</p>
        
        <p>Tailwind CSS, on the other hand, is a utility-first CSS framework that provides low-level utility classes to build custom designs without leaving your HTML. It's highly customizable and allows you to create responsive designs with ease using its responsive variants.</p>
        
        <h2>Setting Up Your Project</h2>
        
        <p>To get started with React and Tailwind CSS, you'll need to set up a new React project and install Tailwind CSS. Here's how:</p>
        
        <pre><code>
        # Create a new React project
        npx create-react-app my-responsive-app
        cd my-responsive-app
        
        # Install Tailwind CSS and its dependencies
        npm install -D tailwindcss postcss autoprefixer
        npx tailwindcss init -p
        </code></pre>
        
        <p>Next, you'll need to configure Tailwind CSS by updating the <code>tailwind.config.js</code> file:</p>
        
        <pre><code>
        module.exports = {
          content: [
            "./src/**/*.{js,jsx,ts,tsx}",
          ],
          theme: {
            extend: {},
          },
          plugins: [],
        }
        </code></pre>
        
        <p>Finally, add the Tailwind directives to your CSS file:</p>
        
        <pre><code>
        /* src/index.css */
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        </code></pre>
        
        <h2>Creating Responsive Components</h2>
        
        <p>With Tailwind CSS, you can create responsive designs using its responsive variants. These variants allow you to apply different styles at different breakpoints. Here's an example of a responsive card component:</p>
        
        <pre><code>
        function Card() {
          return (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img className="h-48 w-full object-cover md:w-48" src="image.jpg" alt="Card image" />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Category</div>
                  <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Card Title</a>
                  <p className="mt-2 text-gray-500">Card description goes here. It can be as long as you want.</p>
                </div>
              </div>
            </div>
          );
        }
        </code></pre>
        
        <p>In this example, the card has a stacked layout on small screens (the image is above the content) and a side-by-side layout on medium screens and above (the image is to the left of the content). This is achieved using the <code>md:</code> prefix, which applies the styles only on medium screens and above.</p>
        
        <h2>Responsive Typography</h2>
        
        <p>Typography is an important aspect of responsive design. You want your text to be readable on all devices. With Tailwind CSS, you can adjust the font size, line height, and other typography-related properties based on the screen size:</p>
        
        <pre><code>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Responsive Heading</h1>
        <p className="text-sm md:text-base lg:text-lg">Responsive paragraph text.</p>
        </code></pre>
        
        <p>In this example, the heading has a font size of 1.5rem (text-2xl) on small screens, 1.875rem (text-3xl) on medium screens, and 2.25rem (text-4xl) on large screens. Similarly, the paragraph text has a font size of 0.875rem (text-sm) on small screens, 1rem (text-base) on medium screens, and 1.125rem (text-lg) on large screens.</p>
        
        <h2>Responsive Layouts</h2>
        
        <p>Creating responsive layouts is straightforward with Tailwind CSS's grid and flexbox utilities. Here's an example of a responsive grid layout:</p>
        
        <pre><code>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-500 p-4 text-white">Item 1</div>
          <div className="bg-blue-500 p-4 text-white">Item 2</div>
          <div className="bg-blue-500 p-4 text-white">Item 3</div>
          <div className="bg-blue-500 p-4 text-white">Item 4</div>
          <div className="bg-blue-500 p-4 text-white">Item 5</div>
          <div className="bg-blue-500 p-4 text-white">Item 6</div>
        </div>
        </code></pre>
        
        <p>In this example, the grid has 1 column on small screens, 2 columns on medium screens, and 3 columns on large screens. This creates a responsive layout that adapts to the screen size.</p>
        
        <h2>Conclusion</h2>
        
        <p>Building responsive web applications with React and Tailwind CSS is a powerful combination. React's component-based architecture allows you to create reusable UI elements, while Tailwind CSS's utility-first approach and responsive variants make it easy to create designs that adapt to different screen sizes.</p>
        
        <p>By following the principles and techniques outlined in this article, you can create web applications that provide a great user experience across all devices.</p>
      `,
      date: "2023-05-15",
      readTime: "8 min read",
      image: "/placeholder.svg?height=600&width=1200&text=React+and+Tailwind",
      category: "Frontend",
      tags: ["React", "Tailwind CSS", "Responsive Design", "Web Development", "CSS"],
      author: {
        name: "Jean Eric Hirwa",
        avatar: "/placeholder.svg?height=64&width=64&text=Eric",
        bio: "Full Stack Developer specializing in React and Node.js. Passionate about creating beautiful, responsive web applications.",
      },
    }

    setPost(mockPost)
    setLoading(false)
  }, [params.id])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <div className="container mx-auto px-4 pt-24">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <div className="container mx-auto px-4 pt-24">
          <div className="text-center py-12 text-white/70">
            <h2 className="text-2xl font-bold text-white mb-4">Post Not Found</h2>
            <p>The blog post you're looking for doesn't exist or has been removed.</p>
            <Button asChild variant="outline" className="mt-4 text-white border-white/20 hover:bg-white/10">
              <Link href="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button asChild variant="ghost" className="text-white hover:text-white/80 -ml-4">
              <Link href="/blog" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <div className="mb-8">
                <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20">{post.category}</Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">{post.title}</h1>
                <div className="flex items-center space-x-4 text-white/70">
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              <div className="mb-8 rounded-lg overflow-hidden">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-auto object-cover" />
              </div>

              <div className="flex items-center space-x-4 mb-8">
                <Avatar>
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-white">{post.author.name}</div>
                  <div className="text-sm text-white/70">{post.author.bio}</div>
                </div>
              </div>

              <div className="prose prose-invert max-w-none mb-8">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-white/80 border-white/20">
                    <Tag className="mr-1 h-4 w-4" />
                    {tag}
                  </Badge>
                ))}
              </div>

              <Separator className="bg-white/10 my-8" />

              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-2 ${liked ? "text-blue-400" : "text-white/70"}`}
                    onClick={() => setLiked(!liked)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    {liked ? "Liked" : "Like"}
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 text-white/70">
                    <MessageSquare className="h-4 w-4" />
                    Comment
                  </Button>
                </div>
                <div className="flex space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-2 ${bookmarked ? "text-yellow-400" : "text-white/70"}`}
                    onClick={() => setBookmarked(!bookmarked)}
                  >
                    <Bookmark className="h-4 w-4" />
                    {bookmarked ? "Saved" : "Save"}
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 text-white/70">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>

              <Separator className="bg-white/10 my-8" />

              <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Related Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2].map((i) => (
                      <Link key={i} href={`/blog/post${i}`} className="group">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={`/placeholder.svg?height=64&width=64&text=Post${i}`}
                              alt={`Related Post ${i}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-white group-hover:text-primary transition-colors">
                              Another Interesting Article Title {i}
                            </h3>
                            <p className="text-sm text-white/70">{formatDate("2023-06-0" + i)}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

