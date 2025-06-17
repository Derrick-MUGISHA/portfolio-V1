"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Code,
  Server,
  Palette,
  Database,
  Globe,
  Smartphone,
  Cpu,
  Cloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AnimatedBackground from "@/components/animated-background";
import { DemoOne } from "@/components/Newbg";

export default function ServicesPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

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
          subject: `Service Inquiry: ${formData.service}`,
          message: formData.message,
          to: "derrickmugisha169@gmail.com", // The recipient email
          type: "service-inquiry" // Helps identify the form type
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Set success message with green notification
        setSuccessMessage("Email successfully sent to Derrick!");
        
        toast({
          title: "Inquiry sent!",
          description: "Thank you for your interest. I'll get back to you soon about your project.",
          variant: "default", // Using default variant
        });
        
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          service: "",
          message: "",
        });
      } else {
        toast({
          title: "Error sending inquiry",
          description: data.error || "Something went wrong. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error sending inquiry",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
      console.error("Error sending email:", error);
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      title: "Frontend Development",
      description:
        "Creating responsive, modern, and interactive user interfaces with React, Next.js, and Three.js.",
      icon: <Code className="h-10 w-10 text-blue-400" />,
      features: [
        "Responsive web design",
        "Interactive 3D experiences",
        "Single page applications",
        "Progressive web apps",
        "Animations and transitions",
      ],
      color: "from-blue-500/20 to-purple-500/20",
    },
    {
      title: "Backend Development",
      description:
        "Building robust, scalable, and secure server-side applications with Node.js and various databases.",
      icon: <Server className="h-10 w-10 text-green-400" />,
      features: [
        "RESTful API development",
        "GraphQL implementation",
        "Authentication & authorization",
        "Database design",
        "Performance optimization",
      ],
      color: "from-green-500/20 to-teal-500/20",
    },
    {
      title: "UI/UX Design",
      description:
        "Designing intuitive and engaging user interfaces and experiences that delight users and achieve business goals.",
      icon: <Palette className="h-10 w-10 text-pink-400" />,
      features: [
        "User research",
        "Wireframing & prototyping",
        "Visual design",
        "Usability testing",
        "Design systems",
      ],
      color: "from-pink-500/20 to-red-500/20",
    },
    {
      title: "Database Design",
      description:
        "Creating efficient and secure database structures for optimal data management and retrieval.",
      icon: <Database className="h-10 w-10 text-yellow-400" />,
      features: [
        "Schema design",
        "Data modeling",
        "Query optimization",
        "Migration strategies",
        "NoSQL & SQL databases",
      ],
      color: "from-yellow-500/20 to-orange-500/20",
    },
    {
      title: "Web Performance",
      description:
        "Optimizing websites and applications for speed, efficiency, and better user experience.",
      icon: <Globe className="h-10 w-10 text-cyan-400" />,
      features: [
        "Performance auditing",
        "Load time optimization",
        "Code splitting",
        "Asset optimization",
        "Caching strategies",
      ],
      color: "from-cyan-500/20 to-blue-500/20",
    },
    {
      title: "Mobile Development",
      description:
        "Building native and cross-platform mobile applications for iOS and Android.",
      icon: <Smartphone className="h-10 w-10 text-violet-400" />,
      features: [
        "React Native development",
        "Progressive web apps",
        "Mobile-first design",
        "App store deployment",
        "Push notifications",
      ],
      color: "from-violet-500/20 to-purple-500/20",
    },
    {
      title: "System Architecture",
      description:
        "Designing scalable and maintainable system architectures for complex applications.",
      icon: <Cpu className="h-10 w-10 text-red-400" />,
      features: [
        "Microservices design",
        "Serverless architecture",
        "Distributed systems",
        "High availability systems",
        "Scalability planning",
      ],
      color: "from-red-500/20 to-orange-500/20",
    },
    {
      title: "Cloud Services",
      description:
        "Deploying and managing applications on cloud platforms like AWS, Azure, and Google Cloud.",
      icon: <Cloud className="h-10 w-10 text-indigo-400" />,
      features: [
        "Cloud migration",
        "Infrastructure as code",
        "Serverless deployment",
        "CI/CD pipelines",
        "Cost optimization",
      ],
      color: "from-indigo-500/20 to-blue-500/20",
    },
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              My Services
            </h1>
            <p className="text-xl text-white/70 mb-8">
              I offer a comprehensive range of development and design services
              to help bring your digital vision to life.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden group hover:border-white/30 transition-all duration-300">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                    ></div>
                    <CardHeader className="relative">
                      <div className="mb-4">{service.icon}</div>
                      <CardTitle className="text-white text-xl">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-white/70">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative">
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-center text-white/80"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 text-white"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="relative">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full text-white border-white/20 hover:bg-white/10"
                      >
                        <Link
                          href="#contact-form"
                          className="flex items-center justify-center"
                          onClick={() => {
                            // Pre-select the service in the form when clicking this button
                            setFormData(prev => ({...prev, service: service.title}));
                          }}
                        >
                          Inquire About This Service
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div
            id="contact-form"
            className="max-w-3xl mx-auto mb-16 scroll-mt-24"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Request a Service
            </h2>
            <p className="text-white/70 mb-8">
              Interested in working together? Fill out the form below with some
              information about your project, and I'll get back to you as soon
              as possible.
            </p>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardContent className="p-6">
                {/* Success message notification */}
                {successMessage && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-md flex items-center">
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
                      className="text-green-400 mr-2"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="text-green-400">{successMessage}</span>
                  </div>
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
                    <label htmlFor="service" className="text-white font-medium">
                      Service You're Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white"
                    >
                      <option value="" disabled className="bg-gray-900">
                        Select a service
                      </option>
                      {services.map((service, index) => (
                        <option
                          key={index}
                          value={service.title}
                          className="bg-gray-900"
                        >
                          {service.title}
                        </option>
                      ))}
                      <option value="Other" className="bg-gray-900">
                        Other (please specify)
                      </option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-white font-medium">
                      Project Details
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="min-h-[150px] bg-white/5 border-white/10 text-white"
                      placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black hover:bg-white/90"
                  >
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
                        Send Inquiry
                      </span>
                    )}
                  </Button>

                  <div className="text-center text-white/60 text-sm">
                    <p>Or reach out directly via WhatsApp:</p>
                    <a
                      href="https://wa.me/250793094202"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-2 text-white hover:text-white/80 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="#25D366"
                        stroke="none"
                        strokeWidth="0"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path
                          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.954 9.954 0 0012 22z"
                          fill="none"
                          stroke="#25D366"
                          strokeWidth="2"
                        />
                      </svg>
                      +250 793 094 202
                    </a>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">My Process</h2>
            <p className="text-white/70 mb-12">
              I follow a structured approach to ensure your project is delivered
              successfully.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description:
                    "Understanding your requirements, goals, and vision for the project.",
                  icon: "🔍",
                },
                {
                  step: "02",
                  title: "Planning",
                  description:
                    "Creating a detailed roadmap and technical specifications for implementation.",
                  icon: "📝",
                },
                {
                  step: "03",
                  title: "Development",
                  description:
                    "Building the solution with regular updates and feedback integration.",
                  icon: "💻",
                },
                {
                  step: "04",
                  title: "Delivery",
                  description:
                    "Final testing, deployment, and knowledge transfer to ensure success.",
                  icon: "🚀",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 relative"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="absolute top-4 right-4 text-white/30 font-bold text-xl">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/70">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16">
              <p className="text-white/70 mb-6">
                Ready to start your project? Let's create something amazing
                together!
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-white/90"
              >
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}