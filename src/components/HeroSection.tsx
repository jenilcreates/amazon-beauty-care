import React from 'react';

interface HeroSectionProps {
  onShopNowClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopNowClick }) => {
  return (
    <header className="w-full bg-white pt-6 sm:pt-10 pb-3">
      <div className="max-w-[980px] mx-auto px-4 sm:px-6">
        {/* Main Headline with letter spacing */}
        <h1 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-extrabold text-black tracking-[0.03em] leading-[1.18] text-left">
          7 Best Skincare Moisturizer for Oily Skin (Non-Comedogenic)
        </h1>

        {/* Hero Banner Image */}
        <div 
          onClick={onShopNowClick}
          className="mt-4 sm:mt-6 w-full overflow-hidden bg-neutral-100 cursor-pointer group"
          title="Click to jump to recommended beauty minis"
        >
          <img
            src="/assets/wirecutter/hero_banner.png"
            alt="7 Best Skincare Moisturizer for Oily Skin (Non-Comedogenic) - Handheld luxury miniatures"
            className="w-full h-auto object-cover select-none transition-transform duration-500 group-hover:scale-[1.01]"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Editorial Story Introduction */}
        <div className="mt-6 sm:mt-8 space-y-3.5 sm:space-y-4 text-neutral-800 text-[15px] sm:text-base leading-relaxed font-normal">
          <p>
            Pocket-size lotions! A moisturizer small enough to hang on your keys! There is something undeniably fun about tiny things.
          </p>
          <p>
            The trick is finding miniatures that are as good as their full-size counterparts, items that your loved ones will be excited to use (and won’t feel like a sack of free samples).
          </p>
          <p>
            That’s where our testing and expertise comes in. internet’s vast number of beauty and skin-care products to find the best of the best. And everything we recommend here is a pick — just available in a delightfully miniature size.
          </p>
          <p>
            So whether you’re looking to try a new product for the first time, grabbing something travel-sized before a trip, or rounding out a bigger gift for a loved one, these teensy beauty picks are sure to surprise and delight.
          </p>
        </div>
      </div>
    </header>
  );
};
