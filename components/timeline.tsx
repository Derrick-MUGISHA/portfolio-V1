"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const timelineEvents = [
  {
    year: "2023",
    title: "Study the junior developer",
    description: "Completed a comprehensive BootCamp focused on frontend development.",
    technologies: ["React", "Node.js", "Express","TypeScript", "MongoDB"],
    highlight: true,
  },
  {
    year: "2023",
    title: "Ui/UX Designer",
    description: "Created visually appealing and user-friendly interfaces for web applications.",
    technologies: ["figma", "Adobe XD", "Sketch", "InVision"],
    highlight: true,
  },
  {
    year: "2024",
    title: "Frontend Developer",
    description: "Completed a BootCamp focused on frontend development.",
    technologies: ["React", "Redux", "SASS", "Webpack"],
    highlight: false,
  },
  {
    year: "2025",
    title: "Backend Developer",
    description: "Completed a BootCamp focused on backend development.",
    technologies: ["Node.js", "Express", "MongoDB", "TypeScript", "PostgreSQL", "GraphQL", "REST API"],
    highlight: false,
  },
  // {
  //   year: "2019",
  //   title: "Computer Science Degree",
  //   description: "Graduated with a degree in Computer Science with focus on software development.",
  //   technologies: [],
  //   highlight: true,
  // },
]

export default function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/50 via-white/30 to-white/5 transform md:translate-x-[-0.5px]"></div>

      <div className="space-y-12">
        {timelineEvents.map((event, index) => (
          <div key={index} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              {/* Year bubble */}
              <div className="absolute left-[-12px] md:left-1/2 md:transform md:translate-x-[-12px] z-10">
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full ${
                    event.highlight ? "bg-white" : "bg-white/30"
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${event.highlight ? "bg-black" : "bg-white/50"}`}></div>
                </div>
              </div>

              {/* Year label (mobile) */}
              <div className="md:hidden text-white font-bold text-lg mb-2 ml-6">{event.year}</div>

              {/* Content */}
              <div className={`w-full md:w-[calc(50%-20px)] ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <Card
                  className={`bg-white/5 backdrop-blur-sm border ${
                    event.highlight ? "border-white/30 shadow-lg shadow-white/5" : "border-white/10"
                  }`}
                >
                  <CardContent className="p-6">
                    {/* Year label (desktop) */}
                    <div className="hidden md:block text-white/70 font-bold mb-2">{event.year}</div>

                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-white/70 mb-4">{event.description}</p>

                    {event.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {event.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="inline-block px-2 py-1 text-xs rounded-full bg-white/10 text-white/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Empty div for layout */}
              <div className="hidden md:block w-[calc(50%-20px)]"></div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

