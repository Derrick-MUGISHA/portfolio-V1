"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Code,
  Star,
  GitFork,
  Calendar,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedBackground from "@/components/animated-background";
import { fetchGitHubData } from "@/lib/github";
import type { GitHubData } from "@/types/github";
import { DemoOne } from "@/components/Newbg";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  link: string;
  skills: string[];
}

export default function WorkPage() {
  const [gitHubData, setGitHubData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("projects");

  useEffect(() => {
    const getGitHubData = async () => {
      try {
        const data = await fetchGitHubData("Derrick-MUGISHA");
        setGitHubData(data);
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };

    getGitHubData();
  }, []);

  const certificates: Certificate[] = [
    {
      id: "cert1",
      title: "Web Development",
      issuer: "SheCanCode",
      date: "2022",
      image: "https://i.postimg.cc/gkVp9S67/Derrick-MUGISHA.png",
      link: "https://drive.google.com/file/d/1Fc9Cti9rRJ3ql_C4xCQYIfFjJG_SIswl/view?usp=drive_link",
      skills: [
        "JavaScript",
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "TypeScript",
        "Tailwind CSS",
        "Git",
        "GitHub",
        "HTML",
        "CSS",
      ],
    },
    {
      id: "cert2",
      title: "Digital Skill certificate",
      issuer: "Rwanda Eduction Board",
      date: "2021",
      image: "https://i.postimg.cc/sDhFYncX/0479290133-MD.png",
      link: "https://drive.google.com/file/d/1-qEq9EoG8sGKAx1MdpZrQi2Sz73hC26u/view?usp=drive_link",
      skills: ["React", "Redux", "React Hooks", "Context API"],
    },
    {
      id: "cert3",
      title: "freeCodeCamp frontend development",
      issuer: "freeCodeCamp",
      date: "2020",
      image:
        "https://i.postimg.cc/C56qwhtF/www-freecodecamp-org-certification-MUGISHA-Derrick-responsive-web-design.png",
      link: "https://www.freecodecamp.org/certification/MUGISHA__Derrick/responsive-web-design",
      skills: ["React", "Redux", "JavaScript", "HTML", "CSS"],
    },
    {
      id: "cert4",
      title: "javaScript Algorithms and Data Structures",
      issuer: "freeCodeCamp",
      date: "2021",
      image:
        "https://i.postimg.cc/XJsZgNnw/www-freecodecamp-org-certification-MUGISHA-Derrick-javascript-algorithms-and-data-structures-v8.png",
      link: "https://www.freecodecamp.org/certification/MUGISHA__Derrick/javascript-algorithms-and-data-structures-v8",
      skills: ["javascript", "Data Structures", "Algorithms"],
    },
    {
      id: "cert5",
      title: "Internship",
      issuer: "Codveda Technology",
      date: "2025",
      image: "https://i.postimg.cc/BncDhf9V/internship-offer-letter.png",
      link: "https://example.com/cert5",
      skills: ["Frontend", "Backend", "Node.js", "MongoDB", "Express.js", "React", "Redux"],
    },
  ];

  const featuredProjects = [
    {
      id: "project1",
      title: "A youtube clone",
      description:
        "A full-stack youtube clone platform with product real time search functionality, filter functionality, and more.",
      image:
        "https://www.citypng.com/public/uploads/preview/hd-aesthetic-youtube-yt-black-red-outline-logo-symbol-sign-icon-png-7017516951203758jnlahzimi.png",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      demoLink: "https://youtube-erv2.onrender.com/",
      githubLink: "https://github.com/Derrick-MUGISHA/youtube",
      featured: true,
    },
    {
      id: "project2",
      title: "Text to speech app",
      description:
        "A Text to speech website showcasing many languages it can spell in different ways.",
      image:
        "https://i.pinimg.com/736x/39/cb/c7/39cbc7d4698e49bf5699f683b9efbb02.jpg",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Three.js",
      ],
      demoLink: "https://speech-xgo8.onrender.com",
      githubLink: "https://github.com/Derrick-MUGISHA/speech",
      featured: true,
    },
    {
      id: "project3",
      title: "Qur codes generator",
      description:
        "A collaborative Qur codes generator with any words application with real-time generation and fast way to generate Qur codes.",
      image:
        "https://i.pinimg.com/736x/0e/97/27/0e972709749e682fb5bf8d85dcb2e35d.jpg",
      technologies: ["React", "Firebase", "Redux", "Material UI"],
      demoLink: "https://qr-bix4.onrender.com",
      githubLink: "https://github.com/Derrick-MUGISHA/QR",
      featured: true,
    },
    {
      id: "project4",
      title: "GBV: gender base violence",
      description:
        "A platform where an indiviadle can report any genderbase violnce and join the community",
      image:
        "https://www.dsw.org/wp-content/uploads/2023/12/END-gbv-1.jpg",
      technologies: ["React", "Firebase", "Redux", "Material UI","GoogleAouth", "Tailwind CSS", "shadcnUi"],
      demoLink: "https://gbv-5wdj.vercel.app/",
      githubLink: "https://github.com/Derrick-MUGISHA/GBV",
      featured: true,
    },
    {
      id: "project5",
      title: "Rwanda Hub connect",
      description:
        "A website where you can visit your favorite places in Rwanda and get more information about them, also you can join the community.",
      image:
        "",
      technologies: ["React", "Javascript", "Redux", "Material UI","Nextjs", "Tailwind CSS", "shadcnUi", "node.js", "Express.js"],
      demoLink: "https://rwanda-hub-connect.vercel.app/",
      githubLink: "https://github.com/Derrick-MUGISHA/GBV",
      featured: true,
    },
    {
      id: "project6",
      title: "M2You",
      description:
        "A chart platform where you can chat with your friends and also you can join the community with end to end encryption.",
      image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAaVBMVEX///8AAACIiIiDg4OUlJR5eXn8/PwEBAT5+fmbm5vw8PD19fWkpKTFxcVgYGAsLCza2tri4uIxMTGqqqpZWVnMzMxOTk5ra2vT09NycnLq6uonJyc9PT2ysrI2Nja/v79EREQREREbGxv5UK1zAAAE7klEQVR4nO2a6ZayMAyGi2jREcF93+//Ir+WJU2RpaXFzx95z5n5MQ7wmCZpUsIYiUQikUgkEolEIpFIJBKJROoW/98A9Zou4tHgihdTG6RZGnxF6cwMSyzdcv8dJKn90sxbVusgiL6DJB6zXpmY6m8r/vlbUOI52z8DqJnONAge3FQ+adbNNF9/a+1KvvW8E2qBr0hH4SAaXfFTFiarhzSxySTmirXF6F6/sW7dwx/j3hN85RljuwvEF0qNQtZcUzZNKuFjAhVVqI6eqQ7V8Da21CEM4Nqbzx16le9gkbj34WC5fBN+yg0lfzYeme5goP08tIVi7FZcLagm3anETIvC/OJnxNjEHkpSRfLyKAtCH3q8c4+VTLwfFFuuwSWvKw+ONSscIir8tBcUWz4hSJ7uQThTa3djfaFE1pQ5JVtEcaOHG9J8At5w2eV/6mcpQRUqd3cIQnGj02fm6wclbVxuhtI5+++E5yuk8ScETU8oSXUrk10QJH2ZVlvYKPZn+GtfKIm1TCEI91kQWsfhMoBUMEEX94eSVCoIL4aFvqbHBb5VyNHlDlDiLn8JUL3sg/BRrr4snTj3AyVUblNyCWyDEJWNN/0TNyiu1VkjGySuLowelZV3tJQMwldx6yA4me+E/ARMIj1VvNEJKr/X4g0VFgrrZhz563wApuuKVWPE0VKZlneVAI8GQcjZWYXttuZ7eIASz0gg37x2XVAiyo53YErmNf/vw1JCZWow2gmPb2AKa6tET1DZx1HnvbjMRo+XYqpfbF9QLH5BUTSZN7aEAmoDSFl6GhCKQ18vyZKm0l3Axqq527CGhtabpcSOr0IqXdZYQNRObF6mpywkmuQRSgZ6VARhWvdEVdEJXZqZfEKJ/flarGBDEJ73sHb7tuTv01JspA69qmcm0nnO6Mx023Yfn5ZSFUO2jCfs7qJg3l0CpKTFVB6hEFO+grhT5ZJJOzJtKaG9QWE7lYcNl2yvzePwFlTVbCtvUIpp8gR3vh/LijJWBuz2K1/JcwSPCnHgy05V9q5jOKl571RKb7KVJyhkJ+HSZacqIWKZRk9QcUW70mottvIChfwp+5yzjdpMQl62F4LrmVVPiKrWVl6gFFNY9srIrw8JHKrsizMaRZUMtSErf8qOP7JagB21F1652Q6QuZCtajZvD1A1dpISnWoU4BSvnfshW31SuUPhuNOUuVKkoPQOrI3KGUoxfZy9yE5V5aVYli5Im2YqV6gRGKLO28aqoag0wcL1VIdczVeOUC12yvSI8uO+2oqu0VZuUFrc1ZS2nC2y0iCtb7yabOUEpeKu+SxvtV3f6xpOVuTYkgrfwAVK2enUduW5pZdXttoiKgco5E/9j9Jrd+f+ULqdWrHaPkS2coZCe7DVsdSnlK1gd+4LheLO9TUIikHuAlWxkyPWh1/1g9JrOmchW037Qvnzp1IVW/WB0v3Jyytb3a/sofzbSc/tIgZtoULsTz4HE3C+soU6oTzuEYlpfmX7tv0NVZvnyRKO3tW9zKH0oaDQ/9hgrD3AYlgCmIaYwNGprKFkjzDAgGVsCaWiI3KqVdq1wa1G96jSAkG9hhnpEhrjFrZ7qEuNvw08LVg+xWT8rTooOKzkgwwGBX9zpPIXh0+/P6ZrOPP3cwPNBdbvjX5/UT86j08ikUgkEolEIpFIJBKJRCL9mP4B/Y44OlmfbdsAAAAASUVORK5CYII=",
      technologies: ["React", "Javascript", "Redux", "Material UI","Nextjs", "Tailwind CSS", "shadcnUi", "node.js", "Express.js", "MongoDB", "GoogleAuth"],
      demoLink: "https://m2-y.vercel.app/",
      githubLink: "https://github.com/Derrick-MUGISHA/M2Y",
      featured: true,
    }
  ];

  return (
    <div className="relative min-h-screen w-full">
      {/* Full Screen Background */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <DemoOne />
      </div>

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button
              asChild
              variant="ghost"
              className="text-white hover:text-white/80 -ml-4"
            >
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
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                My Work
              </h1>
              <p className="text-xl text-white/70 mb-8">
                A showcase of my projects, contributions, and professional
                achievements.
                <span className="block mt-2 text-green-400 font-mono text-base">
                  // Code is like humor. When you have to explain it, it's bad.
                </span>
              </p>

              <Tabs
                defaultValue={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
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
                    <h2 className="text-2xl font-bold text-white">
                      Featured Projects
                    </h2>
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
                              <CardTitle className="text-white">
                                {project.title}
                              </CardTitle>
                              <CardDescription className="text-white/70">
                                {project.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies?.map((tech) => (
                                  <Badge
                                    key={tech}
                                    variant="outline"
                                    className="text-white border-white/30 bg-white/5"
                                  >
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
                                <a
                                  href={project.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Github className="h-4 w-4" />
                                  Code
                                </a>
                              </Button>
                              <Button asChild size="sm" className="gap-2">
                                <a
                                  href={project.demoLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
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
                      <Button
                        asChild
                        variant="outline"
                        className="text-white border-white hover:bg-white/10"
                      >
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
                      <h2 className="text-2xl font-bold text-white">
                        GitHub Repositories
                      </h2>
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
                                  {repo.description ||
                                    "No description provided"}
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
                                    {new Date(
                                      repo.updatedAt
                                    ).toLocaleDateString()}
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
                        <Button
                          asChild
                          variant="outline"
                          className="text-white border-white hover:bg-white/10"
                        >
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
                    <h2 className="text-2xl font-bold text-white">
                      Certifications & Achievements
                    </h2>
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
                                    <Badge
                                      variant="secondary"
                                      className="bg-black/50 text-white"
                                    >
                                      {cert.date}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="p-6 flex flex-col">
                                  <h3 className="text-xl font-bold text-white mb-1">
                                    {cert.title}
                                  </h3>
                                  <p className="text-white/70 mb-4">
                                    Issued by {cert.issuer}
                                  </p>

                                  <div className="mb-4">
                                    <h4 className="text-sm font-medium text-white/70 mb-2">
                                      Skills
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {cert.skills.map((skill) => (
                                        <Badge
                                          key={skill}
                                          variant="outline"
                                          className="bg-white/10"
                                        >
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="mt-auto">
                                    <Button
                                      asChild
                                      variant="outline"
                                      size="sm"
                                      className="gap-2"
                                    >
                                      <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
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
  );
}
