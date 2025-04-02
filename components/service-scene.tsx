"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default function ServiceScene() {
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

    // Create a central sphere
    const centralGeometry = new THREE.IcosahedronGeometry(2, 1)
    const centralMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    })
    const centralSphere = new THREE.Mesh(centralGeometry, centralMaterial)
    scene.add(centralSphere)

    // Create orbiting service nodes
    const serviceColors = [
      0x61dafb, // React blue
      0x68a063, // Node green
      0xff3e00, // Svelte orange
      0x007acc, // TypeScript blue
      0x663399, // Gatsby purple
      0xf7df1e, // JavaScript yellow
      0xe34c26, // HTML red
      0x563d7c, // Bootstrap purple
    ]

    const orbitingNodes = []

    for (let i = 0; i < 8; i++) {
      // Create orbit
      const orbitGeometry = new THREE.RingGeometry(4 + i * 0.5, 4.1 + i * 0.5, 64)
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: serviceColors[i],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.2,
      })
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial)
      orbit.rotation.x = Math.PI / 2
      orbit.rotation.y = Math.random() * Math.PI
      scene.add(orbit)

      // Create node
      const nodeGeometry = new THREE.SphereGeometry(0.3, 16, 16)
      const nodeMaterial = new THREE.MeshBasicMaterial({
        color: serviceColors[i],
      })
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial)

      // Position on orbit
      const angle = Math.random() * Math.PI * 2
      const radius = 4 + i * 0.5
      node.position.x = Math.cos(angle) * radius
      node.position.z = Math.sin(angle) * radius

      scene.add(node)
      orbitingNodes.push({
        node,
        angle,
        radius,
        speed: 0.005 + Math.random() * 0.01,
        orbitY: orbit.rotation.y,
      })
    }

    // Add connecting lines from central sphere to nodes
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
    })

    const lines = []

    for (const nodeInfo of orbitingNodes) {
      const lineGeometry = new THREE.BufferGeometry()
      const linePositions = new Float32Array(6) // 2 points, 3 values per point
      lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3))

      const line = new THREE.Line(lineGeometry, lineMaterial)
      scene.add(line)
      lines.push({ line, nodeInfo })
    }

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

      // Rotate central sphere
      centralSphere.rotation.x += 0.005
      centralSphere.rotation.y += 0.005

      // Update orbiting nodes
      for (const nodeInfo of orbitingNodes) {
        nodeInfo.angle += nodeInfo.speed
        nodeInfo.node.position.x = Math.cos(nodeInfo.angle) * nodeInfo.radius
        nodeInfo.node.position.z = Math.sin(nodeInfo.angle) * nodeInfo.radius
      }

      // Update connecting lines
      for (const { line, nodeInfo } of lines) {
        const positions = line.geometry.attributes.position.array

        // Start point (central sphere)
        positions[0] = centralSphere.position.x
        positions[1] = centralSphere.position.y
        positions[2] = centralSphere.position.z

        // End point (node)
        positions[3] = nodeInfo.node.position.x
        positions[4] = nodeInfo.node.position.y
        positions[5] = nodeInfo.node.position.z

        line.geometry.attributes.position.needsUpdate = true
      }

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

