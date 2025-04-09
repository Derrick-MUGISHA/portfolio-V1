// components/PersonalGallery.jsx
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PhotoType {
  id?: string;
  src: string;
  alt?: string;
  caption: string;
  description?: string;
}

export default function PersonalGallery({ photos = [] }: { photos: PhotoType[] }) {
  const [isClient, setIsClient] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    
    // Auto-rotate photos every 4 seconds
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => 
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    
    return () => clearInterval(interval);
  }, [photos.length]);

  if (!isClient) return null;

  return (
    <div className="relative w-full pt-20 pb-16 overflow-hidden mt-8 sm:mt-12 md:mt-16"> {/* Added top padding and margin */}
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white mb-8 sm:mb-12">Know Me</h2>
        
        <div className="relative h-72 sm:h-80 md:h-96 lg:h-112"> {/* Responsive heights */}
          {photos.map((photo, index) => {
            // Calculate position based on active index
            const position = (index - activeIndex) % photos.length;
            const normalizedPosition = position < 0 ? position + photos.length : position;
            
            // Different transformations based on position
            let zIndex = 20 - normalizedPosition;
            let scale = 1 - (normalizedPosition * 0.1);
            
            // Responsive positioning
            let translateX;
            if (normalizedPosition === 0) {
              translateX = 0;
            } else if (normalizedPosition === 1) {
              translateX = '45%'; // Reduced from 55% for smaller screens
            } else if (normalizedPosition === photos.length - 1) {
              translateX = '-45%'; // Reduced from 55% for smaller screens
            } else if (normalizedPosition < photos.length / 2) {
              translateX = `${normalizedPosition * 30}%`; // Reduced from 35% for smaller screens
            } else {
              translateX = `-${(photos.length - normalizedPosition) * 30}%`; // Reduced from 35% for smaller screens
            }
            
            let opacity = 1 - (normalizedPosition * 0.25);
            let rotate = normalizedPosition === 0 ? 0 : 
                        normalizedPosition % 2 === 0 ? -3 : 3;
            
            return (
              <div
                key={photo.id || index}
                className="absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out cursor-pointer transform-gpu"
                style={{
                  transform: `translateX(${translateX}) scale(${scale}) rotate(${rotate}deg)`,
                  zIndex,
                  opacity: opacity > 0 ? opacity : 0
                }}
                onClick={() => setActiveIndex(index)}
              >
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg mx-auto h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border-2 sm:border-4 border-white dark:border-gray-800"> {/* Responsive width and border */}
                  <Image
                    src={photo.src}
                    alt={photo.alt || `Photo of me ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === activeIndex}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-black/70 to-transparent"> {/* Responsive padding */}
                    <h3 className="text-base sm:text-xl font-bold text-white">{photo.caption}</h3> {/* Responsive text */}
                    {photo.description && (
                      <p className="text-xs sm:text-sm text-gray-200 mt-1">{photo.description}</p> /* Responsive text */
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Navigation dots */}
        <div className="flex justify-center mt-4 sm:mt-8 space-x-1 sm:space-x-2"> {/* Responsive margin and spacing */}
          {photos.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-indigo-600 scale-125' : 'bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500'
              }`} /* Responsive size */
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to photo ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}