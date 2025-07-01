'use client';

import React from 'react';

export const MobileCarousel = () => {
  const personalPhotos = [
    {
      id: "1",
      src: "https://clone-15su.onrender.com/images/IMG-20231225-WA0019-removebg-preview__1_-removebg-preview.png",
      alt: "Professional headshot",
      caption: "Professional",
    },
    {
      id: "2",
      src: "https://i.postimg.cc/0Nkm9xBg/May-27-2025-04-26-19-PM.png",
      alt: "Casual portrait",
      caption: "New version of Me",
    },
    {
      id: "3",
      src: "https://i.postimg.cc/J0DsChMb/Snapchat-2102374093.jpg",
      alt: "Pursuing my hobby",
      caption: "MY Locking Mood",
    },
    {
      id: "4",
      src: "https://i.postimg.cc/pXBZd2jD/Snapchat-1102779594.jpg",
      alt: "Travel photo",
      caption: "Meeting Time 🦾",
    },
    {
      id: "5",
      src: "https://res.cloudinary.com/dvl1iht4u/image/upload/v1750875742/IMG_20250622_160124_375_vgbjus.jpg",
      alt: "Family gathering",
      caption: "Vidaripay Team member",
    },
    {
      id: "6",
      src: "https://res.cloudinary.com/dvl1iht4u/image/upload/v1750875741/Snapchat-1742999027_kri1xv.jpg",
      alt: "Celebration moment",
      caption: "My Working Space",
    },
    {
      id: "7",
      src: "https://res.cloudinary.com/dvl1iht4u/image/upload/v1750876131/Snapchat-272213231_i0ghvp.jpg",
      alt: "Outdoor adventure",
      caption: "Kigali corner",
    },
    {
      id: "8",
      src: "https://res.cloudinary.com/dvl1iht4u/image/upload/v1751402101/IMG_2194.JPEG_fouw7g.jpg",
      alt: "Vidaripay",
      caption: "Conference",
    },
  ];

  const duplicatedImages = [...personalPhotos, ...personalPhotos];

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: auto; /* Restored original overflow */
          background: transparent;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .carousel-wrapper {
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

        .scroll-track {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
          will-change: transform;
        }

        .image-item {
          flex-shrink: 0;
          width: 15rem;
          height: auto;
          margin-right: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: none;
        }

        .image-item img {
          width: 100%;
          height: 15rem;
          object-fit: cover;
          border-radius: 1rem;
        }

        .caption {
          text-align: center;
          margin-top: 0.5rem;
          font-size: 1rem;
          color: #ffff;
        }
      `}</style>

      <div className="carousel-wrapper">
        <div className="carousel-container">
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
