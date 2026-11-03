import React, { useState, useEffect } from 'react';
import { SPOTLIGHT_GALLERY } from '../data/skincareData';
import { Check, Star, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface SpotlightSectionProps {
  onClaimDiscount: () => void;
}

export const SpotlightSection: React.FC<SpotlightSectionProps> = ({ onClaimDiscount }) => {
  const [selectedThumbIndex, setSelectedThumbIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const features = [
    'Intensely nourishes dry skin for a soft, plump complexion.',
    'Helps reduce the appearance of fine lines and wrinkles.',
    'Helps improve dullness and uneven skin tone.',
    'Features amino acids, vitamins, and peptides to support skin renewal.'
  ];

  const currentItem = SPOTLIGHT_GALLERY[selectedThumbIndex] || SPOTLIGHT_GALLERY[0];

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        setSelectedThumbIndex((prev) => (prev + 1) % SPOTLIGHT_GALLERY.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedThumbIndex((prev) => (prev - 1 + SPOTLIGHT_GALLERY.length) % SPOTLIGHT_GALLERY.length);
      }
    };
    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isLightboxOpen]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedThumbIndex((prev) => (prev + 1) % SPOTLIGHT_GALLERY.length);
    setIsZoomed(false);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedThumbIndex((prev) => (prev - 1 + SPOTLIGHT_GALLERY.length) % SPOTLIGHT_GALLERY.length);
    setIsZoomed(false);
  };

  return (
    <section className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* Left Column: Product Photography & Interactive Thumbnails */}
        <div className="lg:col-span-6 flex flex-col items-center">
          
          {/* Main Product Image Container with Amazon-style click-to-zoom */}
          <div 
            onClick={() => setIsLightboxOpen(true)}
            className="group relative w-full max-w-[440px] aspect-square flex items-center justify-center p-2 bg-white cursor-zoom-in"
            title="Click to view large like Amazon"
          >
            <img
              src={currentItem.largeSrc}
              alt={currentItem.alt}
              className="w-full h-full object-contain select-none transition-transform duration-300 group-hover:scale-[1.03]"
              loading="eager"
            />

            {/* Subtle Amazon-style "Click to expand" badge */}
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs border border-neutral-300 text-neutral-800 text-[11px] font-medium px-2.5 py-1 rounded shadow-xs flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none">
              <ZoomIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Click to enlarge</span>
            </div>
          </div>

          {/* 6 Thumbnails Row: Clicking updates main view and highlights active */}
          <div className="mt-4 sm:mt-6 w-full max-w-[380px] sm:max-w-[440px]">
            <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
              {SPOTLIGHT_GALLERY.map((thumb, idx) => (
                <button
                  key={thumb.id}
                  type="button"
                  onClick={() => setSelectedThumbIndex(idx)}
                  className={`relative aspect-square border overflow-hidden transition-all cursor-pointer ${
                    selectedThumbIndex === idx
                      ? 'border-black ring-2 ring-black scale-105 shadow-sm'
                      : 'border-neutral-200 hover:border-black opacity-80 hover:opacity-100'
                  }`}
                  aria-label={thumb.alt}
                >
                  <img
                    src={thumb.src}
                    alt={thumb.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Title, Ratings (4 Stars), Feature Bullets & CTA */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          {/* Long Product Headline */}
          <h2 className="text-base sm:text-lg md:text-[19px] font-bold text-black leading-snug tracking-tight">
            Augustinus Bader The Rich Cream Luxury Face Cream – Hydrating and Nourishing Face Moisturizer – Facial Moisturizer for Wrinkle Reduction and Cellular Renewal – For Men and Women
          </h2>

          {/* Rating: 4 full stars for 4.2 rating (5th SVG removed as requested) */}
          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
            <div className="flex text-amber-500 gap-0.5" aria-hidden="true">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-amber-500 text-amber-500"
                />
              ))}
            </div>
            <span className="text-xs text-neutral-600 font-medium tracking-tight">
              Over 100 4.2 - Star Reviews
            </span>
          </div>

          {/* Feature List with Solid Black Circle Checkmarks */}
          <ul className="mt-5 sm:mt-6 space-y-3 sm:space-y-3.5">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 sm:gap-3">
                <span className="shrink-0 w-4 h-4 rounded-full bg-black text-white flex items-center justify-center mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span className="text-xs sm:text-sm font-medium text-black leading-snug">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* Get $50 off CTA Button */}
          <div className="mt-8 pt-2">
            <button
              type="button"
              onClick={onClaimDiscount}
              className="w-full bg-black text-white hover:bg-neutral-800 active:scale-[0.99] transition-all py-3.5 sm:py-4 px-6 text-center text-sm sm:text-base font-bold tracking-normal shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              Get $50 off – instantly
            </button>
          </div>
        </div>

      </div>

      {/* Amazon-style Big Fullscreen Image Modal / Lightbox */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => {
            setIsLightboxOpen(false);
            setIsZoomed(false);
          }}
        >
          <div 
            className="relative w-full max-w-4xl bg-white border border-neutral-300 shadow-2xl p-4 sm:p-6 flex flex-col items-center max-h-[92vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Title and Close Button */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-neutral-200">
              <span className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">
                Augustinus Bader — Image {selectedThumbIndex + 1} of {SPOTLIGHT_GALLERY.length}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsLightboxOpen(false);
                  setIsZoomed(false);
                }}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-600 hover:text-black transition-colors cursor-pointer"
                aria-label="Close enlarged viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Big Image View */}
            <div className="relative w-full flex-1 flex items-center justify-center my-4 overflow-hidden min-h-[300px] sm:min-h-[460px]">
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 z-10 p-2 sm:p-2.5 rounded-full bg-white/80 hover:bg-white text-black shadow-md border border-neutral-300 transition-all cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Big High-Res Image with Amazon click-to-zoom toggle */}
              <div 
                onClick={() => setIsZoomed(!isZoomed)}
                className={`w-full h-full flex items-center justify-center cursor-${isZoomed ? 'zoom-out' : 'zoom-in'} transition-transform duration-200 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
              >
                <img
                  src={currentItem.largeSrc}
                  alt={currentItem.alt}
                  className="max-h-[62vh] max-w-full object-contain select-none"
                />
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 z-10 p-2 sm:p-2.5 rounded-full bg-white/80 hover:bg-white text-black shadow-md border border-neutral-300 transition-all cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Thumbnail Strip inside Lightbox */}
            <div className="w-full pt-3 border-t border-neutral-200 flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-1">
              {SPOTLIGHT_GALLERY.map((thumb, idx) => (
                <button
                  key={`lightbox-${thumb.id}`}
                  type="button"
                  onClick={() => {
                    setSelectedThumbIndex(idx);
                    setIsZoomed(false);
                  }}
                  className={`relative w-12 sm:w-16 aspect-square border overflow-hidden transition-all cursor-pointer shrink-0 ${
                    selectedThumbIndex === idx
                      ? 'border-black ring-2 ring-black scale-105'
                      : 'border-neutral-300 hover:border-black opacity-70 hover:opacity-100'
                  }`}
                  aria-label={thumb.alt}
                >
                  <img
                    src={thumb.src}
                    alt={thumb.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
