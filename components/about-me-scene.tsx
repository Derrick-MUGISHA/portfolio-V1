"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default function AboutMeScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#050505")

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 15

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Tech stack logos as 3D text
    const fontLoader = new THREE.FontLoader()
    const techStack = [
      { text: "React", color: 0x61dafb, position: [-5, 3, 0] },
      { text: "Node.js", color: 0x68a063, position: [5, 3, 0] },
      { text: "TypeScript", color: 0x007acc, position: [-5, 0, 0] },
      { text: "Three.js", color: 0xffffff, position: [5, 0, 0] },
      { text: "MongoDB", color: 0x4db33d, position: [-5, -3, 0] },
      { text: "Next.js", color: 0x000000, position: [5, -3, 0] },
    ]

    // Create floating spheres while waiting for font to load
    techStack.forEach((tech) => {
      const geometry = new THREE.SphereGeometry(1, 32, 32)
      const material = new THREE.MeshBasicMaterial({
        color: tech.color,
        transparent: true,
        opacity: 0.7,
      })
      const sphere = new THREE.Mesh(geometry, material)
      sphere.position.set(tech.position[0], tech.position[1], tech.position[2])
      scene.add(sphere)

      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(1.2, 32, 32)
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: tech.color,
        transparent: true,
        opacity: 0.2,
      })
      const glow = new THREE.Mesh(glowGeometry, glowMaterial)
      glow.position.set(tech.position[0], tech.position[1], tech.position[2])
      scene.add(glow)
    })

    // Add connecting lines between technologies
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x444444,
      transparent: true,
      opacity: 0.5,
    })

    for (let i = 0; i < techStack.length; i++) {
      for (let j = i + 1; j < techStack.length; j++) {
        const points = []
        points.push(new THREE.Vector3(...techStack[i].position))
        points.push(new THREE.Vector3(...techStack[j].position))

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
      if (!containerRef.current) return

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      particlesMesh.rotation.x += 0.0005
      particlesMesh.rotation.y += 0.0005

      controls.update()
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

