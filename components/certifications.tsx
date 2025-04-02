"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Award, ExternalLink } from "lucide-react"

interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  image: string
  link: string
  skills: string[]
}

const certifications: Certification[] = [
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

export default function Certifications() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextCertificate = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % certifications.length)
  }

  const prevCertificate = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + certifications.length) % certifications.length)
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Award className="mr-2 h-5 w-5" />
          Certifications & Skills
        </h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevCertificate}
            className="rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextCertificate}
            className="rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {certifications.map((cert) => (
            <div key={cert.id} className="w-full flex-shrink-0">
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
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {certifications.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${currentIndex === index ? "bg-white w-6" : "bg-white/30"}`}
            aria-label={`Go to certificate ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

