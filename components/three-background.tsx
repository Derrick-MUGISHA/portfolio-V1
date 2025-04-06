"use client"

import { useRef, useEffect, useState } from "react"

export default function ImageBackground() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // You can replace this URL with your own image
  const backgroundImageUrl = "https://i.postimg.cc/pLV1Tw7K/IMG-20250331-142931-186-removebg-preview.png"
  
  // Preload the image to check if it exists
  useEffect(() => {
    const img = new Image()
    img.src = backgroundImageUrl
    
    img.onload = () => {
      setImageLoaded(true)
      setImageError(false)
    }
    
    img.onerror = () => {
      setImageError(true)
      setImageLoaded(false)
      console.warn(`Failed to load background image: ${backgroundImageUrl}`)
    }
    
    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [backgroundImageUrl])
  
  // Add parallax effect on mouse move
  useEffect(() => {
    if (!containerRef.current) return
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      
      // Subtle parallax effect - move the background slightly with mouse
      if (imageLoaded) {
        containerRef.current.style.backgroundPosition = `${50 + x * 2}% ${50 + y * 2}%`
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [imageLoaded])
  
  // Generate a gradient placeholder
  const placeholderBackground = `
    linear-gradient(
      135deg, 
      #0f172a 0%, 
      #1e293b 40%, 
      #334155 70%, 
      #1e293b 100%
    )
  `
  
  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: imageLoaded ? `url(${backgroundImageUrl})` : placeholderBackground,
        // If image loaded, add a slight dark overlay for better text contrast
        // If using placeholder, add subtle animation
        ...(!imageLoaded ? {
          backgroundSize: '100% 100%',
          animation: 'gradient-shift 15s ease infinite'
        } : {
          boxShadow: 'inset 0 0 0 2000px rgba(5, 5, 5, 0.5)'
        })
      }}
    >
      {/* Add animation for placeholder gradient */}
      {!imageLoaded && (
        <style jsx>{`
          @keyframes gradient-shift {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }
        `}</style>
      )}
    </div>
  )
}