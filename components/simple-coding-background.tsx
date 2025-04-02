"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

export default function SimpleCodingBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#050505")

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 15

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Create coding language icons
    const iconSize = 1.2
    const iconGeometry = new THREE.BoxGeometry(iconSize, iconSize, iconSize)

    // Define coding languages with colors
    const languages = [
      { name: "JavaScript", color: 0xf7df1e, position: [-5, 3, 0] },
      { name: "Python", color: 0x3776ab, position: [5, 3, 0] },
      { name: "React", color: 0x61dafb, position: [-5, 0, 0] },
      { name: "Node.js", color: 0x68a063, position: [5, 0, 0] },
      { name: "HTML", color: 0xe34c26, position: [-5, -3, 0] },
      { name: "CSS", color: 0x264de4, position: [5, -3, 0] },
      { name: "TypeScript", color: 0x007acc, position: [0, 4, 0] },
      { name: "PHP", color: 0x777bb4, position: [0, -4, 0] },
    ]

    // Create icons for each language
    const icons: THREE.Mesh[] = []
    languages.forEach((lang) => {
      const material = new THREE.MeshBasicMaterial({
        color: lang.color,
        transparent: true,
        opacity: 0.8,
      })
      const icon = new THREE.Mesh(iconGeometry, material)
      icon.position.set(lang.position[0], lang.position[1], lang.position[2])
      scene.add(icon)
      icons.push(icon)
    })

    // Add connecting lines between icons
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x444444,
      transparent: true,
      opacity: 0.5,
    })

    for (let i = 0; i < languages.length; i++) {
      for (let j = i + 1; j < languages.length; j++) {
        const points = []
        points.push(new THREE.Vector3(languages[i].position[0], languages[i].position[1], languages[i].position[2]))
        points.push(new THREE.Vector3(languages[j].position[0], languages[j].position[1], languages[j].position[2]))

        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
        const line = new THREE.Line(lineGeometry, lineMaterial)
        scene.add(line)
      }
    }

    // Add particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 500

    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 30
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Simple rotation for camera
    let angle = 0
    const radius = 20

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate icons
      icons.forEach((icon) => {
        icon.rotation.x += 0.01
        icon.rotation.y += 0.01
      })

      // Rotate camera around the scene
      angle += 0.001
      camera.position.x = Math.sin(angle) * radius
      camera.position.z = Math.cos(angle) * radius
      camera.lookAt(0, 0, 0)

      particlesMesh.rotation.x += 0.0005
      particlesMesh.rotation.y += 0.0005

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)

      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      scene.clear()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}

