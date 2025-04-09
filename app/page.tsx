"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Github, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import GitHubActivity from "@/components/github-activity";
import Timeline from "@/components/timeline";
import TestimonialCarousel from "@/components/testimonial-carousel";
import { fetchGitHubData } from "@/lib/github";
import type { GitHubData } from "@/types/github";
import SimpleCodingBackground from "@/components/simple-coding-background";
import AnimatedBackground from "@/components/animated-background";
import ThreeBackground from "@/components/three-background";
import PersonalGallery from "@/components/ui/PortfolioGallery";

export default function Home() {
  const [gitHubData, setGitHubData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const scrollToContent = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const personalPhotos = [
    {
      id: '1',
      src: '/placeholder.svg?height=600&width=800&text=Coding+Session',
      alt: 'Professional headshot',
      caption: 'Professional',
      description: 'At the annual tech conference in 2024'
    },
    {
      id: '2',
      src: '/placeholder.svg?height=600&width=800&text=Coding+Session',
      alt: 'Casual portrait',
      caption: 'Everyday Me',
      description: 'Weekend vibes at the local park'
    },
    {
      id: '3',
      src: '/placeholder.svg?height=600&width=800&text=Coding+Session',
      alt: 'Pursuing my hobby',
      caption: 'Photography Enthusiast',
      description: 'Capturing moments is my passion'
    },
    {
      id: '4',
      src: '/placeholder.svg?height=600&width=800&text=Coding+Session',
      alt: 'Travel photo',
      caption: 'Explorer',
      description: 'Visiting the mountains last summer'
    },
    {
      id: '5',
      src: "/placeholder.svg?height=600&width=800&text=Coding+Session",
      alt: 'Speaking at an event',
      caption: 'Public Speaker',
      description: 'Sharing insights at the design summit'
    }
  ];
  return (
    <div className="relative min-h-screen">
      {/* Three.js Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* <SimpleCodingBackground /> */}
        <AnimatedBackground />
        {/* <ThreeBackground /> */}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center text-white px-5 py-16 mt-16">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-2xl md:text-3xl font-light mb-2 sm:mb-4"
          >
            Hello, I'm
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6"
          >
            Derrick MUGISHA
          </motion.h1>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl sm:text-3xl md:text-5xl font-semibold mb-4 sm:mb-6"
          >
            A Software Developer and a UI/UX Designer
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8 sm:mb-12 max-w-2xl mx-auto"
          >
            I design and build software and systems that respond to user needs
            and vision.
            <span className="block mt-2 text-green-400 font-mono text-sm sm:text-base">
              // Yes, I speak fluent JavaScript, Python, and Java even more!
            </span>
          </motion.p>
          <main className="min-h-screen" ref={scrollRef}>
        <PersonalGallery photos={personalPhotos} />

        {/* Additional content about yourself */}
        <section className="max-w-4xl mx-auto px-4 py-8 sm:py-16"> {/* Responsive padding */}
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">My Story</h2> {/* Responsive text and spacing */}
          <p className="text-base sm:text-lg mb-4"> {/* Responsive text */}
            I'm a passionate designer and developer with over 1+ years of
            experience in creating digital experiences that delight users.
            My approach combines creativity with technical expertise to
            deliver solutions that not only look good but perform well.
          </p>
          {/* More content about yourself */}
        </section>
      </main>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-8"
          >
            <Button
              onClick={scrollToContent}
              variant="outline"
              size="lg"
              className="rounded-full border-white text-white hover:bg-white hover:text-black transition-colors px-6 py-2"
            >
              <ArrowDown className="mr-2 h-4 w-4" /> MY SERVICES
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={scrollRef} className="py-24 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              My Services
            </h2>
            <p className="text-xl text-white/70">
              I offer a wide range of services to help businesses and
              individuals achieve their digital goals.
              <span className="block mt-2 text-blue-400 font-mono text-base">
                function solveYourProblems() {"{"} return "Amazing Solutions";{" "}
                {"}"}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Web Development",
                description:
                  "Creating responsive, modern websites and web applications using the latest technologies.",
                icon: "🌐",
              },
              {
                title: "Mobile Development",
                description:
                  "Building native and cross-platform mobile applications for iOS and Android.",
                icon: "📱",
              },
              {
                title: "UI/UX Design",
                description:
                  "Designing intuitive and engaging user interfaces and experiences that delight users.",
                icon: "🎨",
              },
              {
                title: "Backend Development",
                description:
                  "Developing robust and scalable server-side applications and APIs.",
                icon: "⚙️",
              },
              {
                title: "Database Design",
                description:
                  "Creating efficient and secure database structures for optimal data management.",
                icon: "🗄️",
              },
              {
                title: "DevOps & Deployment",
                description:
                  "Setting up CI/CD pipelines and managing cloud infrastructure for seamless deployment.",
                icon: "🚀",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-white/70">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-white/90"
            >
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* GitHub Activity Section */}
      <section className="py-24 bg-gradient-to-b from-black/80 to-black/90 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              GitHub Activity
            </h2>
            <p className="text-xl text-white/70">
              Stay updated with my latest code contributions and projects.
              <span className="block mt-2 text-yellow-400 font-mono text-base">
                git commit -m "Fixed bugs that shouldn't exist in parallel
                universes"
              </span>
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              <GitHubActivity data={gitHubData} />
            )}

            <div className="mt-8 text-center">
              <Button
                asChild
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black"
              >
                <a
                  href="https://github.com/Derrick-MUGISHA"
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
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              My Journey
            </h2>
            <p className="text-xl text-white/70">
              A timeline of my professional experience and key milestones.
              <span className="block mt-2 text-purple-400 font-mono text-base">
                {
                  "for (let year = startYear; year <= currentYear; year++) { levelUp(); }"
                }
              </span>
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Timeline />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-black/80 to-black/90 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Client Testimonials and collaborations
            </h2>
            <p className="text-xl text-white/70">
              What people say about working with me.
              <span className="block mt-2 text-red-400 font-mono text-base">
                if (client.isHappy) {"{"} return client.refer(friends); {"}"}
              </span>
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-24 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/70 mb-10">
              Let's discuss how I can help bring your ideas to life.
              <span className="block mt-2 text-cyan-400 font-mono text-base">
                await project.start(yourIdea);
              </span>
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-white/90"
            >
              <Link href="/contact">LET'S TALK</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black/90 backdrop-blur-md border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                DERRICK MUGISHA
              </h3>
              <p className="text-white/70 mb-4">
                Full Stack Software Developer specializing in creating
                exceptional digital experiences.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="https://github.com/Derrick-MUGISHA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/mugisha-derrick-479788332?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BbUHkFxGrSWuaEOR0NjzD%2Fg%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white"
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
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
                <Link
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white"
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
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/services"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Work
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Services
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/services#web-development"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#mobile-development"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Mobile Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#ui-ux-design"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    UI/UX Design
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#backend-development"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Backend Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#database-design"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Database Design
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-white/70">
                  Email:{" "}
                  <a
                    href="mailto:hello@erichirwa.com"
                    className="hover:text-white transition-colors"
                  >
                    derrickmugisha169@gmail.com
                  </a>
                </li>
                <li className="text-white/70">Location: Kigali, Rwanda</li>
              </ul>
              <a
                href="https://wa.me/250793094202"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center mt-4 text-white/70 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  <path d="M14.05 2a9 9 0 0 1 8 7.94"></path>
                  <path d="M14.05 6A5 5 0 0 1 18 10"></path>
                </svg>
                WhatsApp Me
              </a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-white/70">
              © {new Date().getFullYear()} DERRICK MUGISHA. All rights reserved.
            </p>
            <p className="text-white/50 text-sm mt-2 font-mono">
              // This portfolio runs on caffeine and good vibes
            </p>
          </div>
        </div>

        {/* WhatsApp floating button */}
        {/* <a 
          href="https://wa.me/qr/WY2YBR4QK24MO1" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
          aria-label="Contact on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 7.6-4.7 8.38 8.38 0 0 1 3.8.9L21 11.5z"></path>
          </svg>
        </a> */}
      </footer>
    </div>
  );
}
