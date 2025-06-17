'use client';

import React, { useEffect, useRef } from 'react';

export const MobileCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const personalPhotos = [
    {
      id: "1",
      src: "https://clone-15su.onrender.com/images/IMG-20231225-WA0019-removebg-preview__1_-removebg-preview.png",
      alt: "Professional headshot",
      caption: "Professional",
      description: "My profile pic",
    },
    {
      id: "2",
      src: "https://i.postimg.cc/0Nkm9xBg/May-27-2025-04-26-19-PM.png",
      alt: "Casual portrait",
      caption: "New version of Me",
      description: "New trying version of my self",
    },
    {
      id: "3",
      src: "https://i.postimg.cc/J0DsChMb/Snapchat-2102374093.jpg",
      alt: "Pursuing my hobby",
      caption: "MY Locking Mood",
      description: "Capturing moments in the Office",
    },
    {
      id: "4",
      src: "https://i.postimg.cc/pXBZd2jD/Snapchat-1102779594.jpg",
      alt: "Travel photo",
      caption: "Meeting Time 🦾",
      description: "One of the most memorable moments with my team",
    },
  ];

  const duplicatedImages = [...personalPhotos, ...personalPhotos];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollSpeed = 0.5;
    let animationFrame: number;

    const scroll = () => {
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += scrollSpeed;
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background: transparent;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .scroll-track {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }

        .image-item {
          flex-shrink: 0;
          width: 30rem; /* Increased from 20rem */
          height: 30rem; /* Increased from 20rem */
          border-radius: 1rem;
          overflow: hidden;
          margin-right: 1.5rem;
          background: none;
        }

        .image-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border: none;
        }

        .carousel-wrapper {
          white-space: nowrap;
          width: 100%;
          background: transparent;
        }

        .carousel-container {
          max-width: 100vw;
          padding: 2rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .caption {
          text-align: center;
          margin-top: 0.5rem;
          font-size: 1rem;
          color: #333;
        }
      `}</style>

      <div className="carousel-wrapper">
        <div className="carousel-container" ref={scrollRef}>
          <div className="scroll-track">
            {duplicatedImages.map((photo, index) => (
              <div className="image-item" key={`${photo.id}-${index}`}>
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <div className="caption">{photo.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
