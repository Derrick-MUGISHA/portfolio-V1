"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#050505")

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Post-processing
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.5, // strength
      0.4, // radius
      0.85, // threshold
    )
    composer.addPass(bloomPass)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000

    const posArray = new Float32Array(particlesCount * 3)
    const scaleArray = new Float32Array(particlesCount)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 10
      posArray[i + 1] = (Math.random() - 0.5) * 10
      posArray[i + 2] = (Math.random() - 0.5) * 10

      // Scale
      scaleArray[i / 3] = Math.random()
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("scale", new THREE.BufferAttribute(scaleArray, 1))

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      sizeAttenuation: true,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })

    // Points
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Lines between particles
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x303030,
      transparent: true,
      opacity: 0.2,
    })

    const linesGeometry = new THREE.BufferGeometry()
    const linesPositions = new Float32Array(particlesCount * 6) // 2 points per line, 3 values per point
    linesGeometry.setAttribute("position", new THREE.BufferAttribute(linesPositions, 3))

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial)
    scene.add(lines)

    // Update lines between nearby particles
    const updateLines = () => {
      const positions = particlesGeometry.attributes.position.array
      const linePositions = linesGeometry.attributes.position.array
      let lineIndex = 0

      for (let i = 0; i < particlesCount; i++) {
        const ix = i * 3
        const x1 = positions[ix]
        const y1 = positions[ix + 1]
        const z1 = positions[ix + 2]

        for (let j = i + 1; j < particlesCount; j++) {
          const jx = j * 3
          const x2 = positions[jx]
          const y2 = positions[jx + 1]
          const z2 = positions[jx + 2]

          const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2))

          if (distance < 1.5 && lineIndex < linesPositions.length - 6) {
            linePositions[lineIndex++] = x1
            linePositions[lineIndex++] = y1
            linePositions[lineIndex++] = z1

            linePositions[lineIndex++] = x2
            linePositions[lineIndex++] = y2
            linePositions[lineIndex++] = z2
          }
        }
      }

      // Fill the rest with invisible lines
      while (lineIndex < linesPositions.length) {
        linePositions[lineIndex++] = 0
        linePositions[lineIndex++] = 0
        linePositions[lineIndex++] = 0
      }

      linesGeometry.attributes.position.needsUpdate = true
    }

    // Mouse interaction
    const mouse = new THREE.Vector2()

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      // Move particles slightly based on mouse position
      const positions = particlesGeometry.attributes.position.array
      for (let i = 0; i < particlesCount; i++) {
        const ix = i * 3
        const x = positions[ix]
        const y = positions[ix + 1]
        const z = positions[ix + 2]

        // Calculate distance from mouse (in 2D)
        const distance = Math.sqrt(Math.pow(x - mouse.x * 5, 2) + Math.pow(y - mouse.y * 5, 2))

        if (distance < 1) {
          positions[ix] += mouse.x * 0.01
          positions[ix + 1] += mouse.y * 0.01
        }
      }

      particlesGeometry.attributes.position.needsUpdate = true
    }

    window.addEventListener("mousemove", onMouseMove)

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      composer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      particlesMesh.rotation.x += 0.0005
      particlesMesh.rotation.y += 0.0005

      updateLines()

      controls.update()
      composer.render()
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", onMouseMove)

      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      scene.clear()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      linesGeometry.dispose()
      linesMaterial.dispose()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}

