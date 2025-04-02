import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Github, ExternalLink, Linkedin, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ProjectPage({ params }: { params: { id: string } }) {
  const projectId = params.id

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <span>Eric Hirwa</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/#about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="/#work" className="text-sm font-medium transition-colors hover:text-primary">
              Work
            </Link>
            <Link href="/#services" className="text-sm font-medium transition-colors hover:text-primary">
              Services
            </Link>
            <Link href="/#contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
          <Button asChild size="sm" className="hidden md:flex">
            <Link href="/#contact">
              Let's Talk
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" className="md:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col space-y-8">
              <Link
                href="/#work"
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Project Title {projectId}</h1>
                <p className="text-muted-foreground md:text-xl">
                  A comprehensive overview of Project {projectId}, showcasing the design and development process.
                </p>
              </div>
              <div className="overflow-hidden rounded-lg border">
                <Image
                  src={`/placeholder.svg?height=600&width=1200&text=Project+${projectId}+Hero`}
                  width={1200}
                  height={600}
                  alt={`Project ${projectId} hero image`}
                  className="w-full object-cover"
                />
              </div>
              <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Project Overview</h2>
                    <p className="text-muted-foreground">
                      This project was designed to solve specific challenges for the client. It involved a comprehensive
                      approach to design and development, focusing on user experience and performance.
                    </p>
                    <p className="text-muted-foreground">
                      The main goal was to create a platform that would allow the client to showcase their products and
                      services in an engaging and interactive way, while also providing a seamless user experience for
                      their customers.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">The Challenge</h2>
                    <p className="text-muted-foreground">
                      The client needed a modern, responsive website that would showcase their products and services in
                      an engaging way. They also needed a content management system that would allow them to easily
                      update their content.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">The Solution</h2>
                    <p className="text-muted-foreground">
                      I designed and developed a custom website using modern technologies that met all of the client's
                      requirements. The website is fully responsive, ensuring a great user experience on all devices.
                    </p>
                    <p className="text-muted-foreground">
                      The content management system allows the client to easily update their content without any
                      technical knowledge. The website also includes a custom e-commerce solution that allows the client
                      to sell their products online.
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="overflow-hidden rounded-lg border">
                      <Image
                        src={`/placeholder.svg?height=300&width=500&text=Project+${projectId}+Image+1`}
                        width={500}
                        height={300}
                        alt={`Project ${projectId} image 1`}
                        className="w-full object-cover"
                      />
                    </div>
                    <div className="overflow-hidden rounded-lg border">
                      <Image
                        src={`/placeholder.svg?height=300&width=500&text=Project+${projectId}+Image+2`}
                        width={500}
                        height={300}
                        alt={`Project ${projectId} image 2`}
                        className="w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Technologies Used</h2>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>React.js for the frontend</li>
                      <li>Next.js for server-side rendering and routing</li>
                      <li>Firebase for backend services and authentication</li>
                      <li>Tailwind CSS for styling</li>
                      <li>Framer Motion for animations</li>
                      <li>Vercel for deployment and hosting</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="rounded-lg border p-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold">Project Details</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Client</p>
                          <p className="text-muted-foreground">Client Name</p>
                        </div>
                        <div>
                          <p className="font-medium">Year</p>
                          <p className="text-muted-foreground">2023</p>
                        </div>
                        <div>
                          <p className="font-medium">Duration</p>
                          <p className="text-muted-foreground">3 months</p>
                        </div>
                        <div>
                          <p className="font-medium">Role</p>
                          <p className="text-muted-foreground">Lead Developer</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Services</h4>
                        <div className="flex flex-wrap gap-2">
                          <div className="rounded-full bg-muted px-3 py-1 text-xs">Web Development</div>
                          <div className="rounded-full bg-muted px-3 py-1 text-xs">UI/UX Design</div>
                          <div className="rounded-full bg-muted px-3 py-1 text-xs">E-commerce</div>
                          <div className="rounded-full bg-muted px-3 py-1 text-xs">CMS</div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button asChild variant="outline" size="sm" className="gap-2">
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                            Repository
                          </a>
                        </Button>
                        <Button asChild size="sm" className="gap-2">
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold">Other Projects</h3>
                      <div className="space-y-4">
                        {[1, 2, 3]
                          .filter((id) => id.toString() !== projectId)
                          .map((id) => (
                            <Link key={id} href={`/project/${id}`} className="flex items-center gap-4 group">
                              <div className="overflow-hidden rounded-lg border w-20 h-20">
                                <Image
                                  src={`/placeholder.svg?height=80&width=80&text=P${id}`}
                                  width={80}
                                  height={80}
                                  alt={`Project ${id} thumbnail`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium group-hover:text-primary transition-colors">
                                  Project Title {id}
                                </h4>
                                <p className="text-sm text-muted-foreground">Web Development</p>
                              </div>
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between pt-8">
                <Button asChild variant="outline">
                  <Link href={`/project/${Number(projectId) > 1 ? Number(projectId) - 1 : 6}`} className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Previous Project
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={`/project/${Number(projectId) < 6 ? Number(projectId) + 1 : 1}`} className="gap-2">
                    Next Project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Eric Hirwa. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/erichirwa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/erichirwa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://twitter.com/erichirwa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

