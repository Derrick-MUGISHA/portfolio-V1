"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default function CodingIconsScene() {
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
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Create coding language icons
    const iconSize = 1.2

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
      // Create hexagon geometry for the icons
      const hexagonShape = new THREE.Shape()
      const hexRadius = iconSize / 2
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const x = hexRadius * Math.cos(angle)
        const y = hexRadius * Math.sin(angle)
        if (i === 0) {
          hexagonShape.moveTo(x, y)
        } else {
          hexagonShape.lineTo(x, y)
        }
      }
      hexagonShape.closePath()

      const hexGeometry = new THREE.ShapeGeometry(hexagonShape)

      // Create material with the language color
      const material = new THREE.MeshBasicMaterial({
        color: lang.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      })

      // Create the icon mesh
      const icon = new THREE.Mesh(hexGeometry, material)
      icon.position.set(lang.position[0], lang.position[1], lang.position[2])
      scene.add(icon)
      icons.push(icon)

      // Add glow effect
      const glowGeometry = new THREE.ShapeGeometry(hexagonShape)
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: lang.color,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      })
      const glow = new THREE.Mesh(glowGeometry, glowMaterial)
      glow.position.set(lang.position[0], lang.position[1], lang.position[2] - 0.1)
      glow.scale.set(1.3, 1.3, 1.3)
      scene.add(glow)

      // Create a smaller inner hexagon with a darker color
      const innerHexagonShape = new THREE.Shape()
      const innerHexRadius = hexRadius * 0.7
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const x = innerHexRadius * Math.cos(angle)
        const y = innerHexRadius * Math.sin(angle)
        if (i === 0) {
          innerHexagonShape.moveTo(x, y)
        } else {
          innerHexagonShape.lineTo(x, y)
        }
      }
      innerHexagonShape.closePath()

      const innerHexGeometry = new THREE.ShapeGeometry(innerHexagonShape)
      const innerMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(lang.color).multiplyScalar(0.7),
        side: THREE.DoubleSide,
      })

      const innerIcon = new THREE.Mesh(innerHexGeometry, innerMaterial)
      innerIcon.position.set(lang.position[0], lang.position[1], lang.position[2] + 0.01)
      scene.add(innerIcon)
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
        points.push(new THREE.Vector3(...languages[i].position))
        points.push(new THREE.Vector3(...languages[j].position))

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

    // Add HTML labels for each language
    languages.forEach((lang) => {
      const labelDiv = document.createElement("div")
      labelDiv.className =
        "absolute pointer-events-none text-white text-xs font-bold bg-black bg-opacity-50 px-2 py-1 rounded-md"
      labelDiv.textContent = lang.name
      labelDiv.style.transform = "translate(-50%, -50%)"
      containerRef.current?.appendChild(labelDiv)

      // Update label position in animation loop
      const updateLabelPosition = () => {
        if (!labelDiv) return

        const vector = new THREE.Vector3(lang.position[0], lang.position[1], lang.position[2])
        vector.project(camera)

        const x = (vector.x * 0.5 + 0.5) * window.innerWidth
        const y = (-(vector.y * 0.5) + 0.5) * window.innerHeight

        labelDiv.style.left = `${x}px`
        labelDiv.style.top = `${y}px`
      }

      // Store the update function for use in the animation loop
      lang.updateLabel = updateLabelPosition
    })

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate icons slightly
      icons.forEach((icon) => {
        icon.rotation.z += 0.005
      })

      particlesMesh.rotation.x += 0.0005
      particlesMesh.rotation.y += 0.0005

      // Update all label positions
      languages.forEach((lang) => {
        if (lang.updateLabel) lang.updateLabel()
      })

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)

      // Remove all HTML labels
      languages.forEach(() => {
        const labels = containerRef.current?.querySelectorAll("div")
        labels?.forEach((label) => {
          containerRef.current?.removeChild(label)
        })
      })

      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      scene.clear()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full relative" />
}

