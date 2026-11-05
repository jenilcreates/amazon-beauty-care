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
          7 Mini Versions of Beauty Products to Try Right Now
        </h1>

        {/* Hero Banner Image */}
        <div 
          onClick={onShopNowClick}
          className="mt-4 sm:mt-6 w-full overflow-hidden bg-neutral-100 cursor-pointer group"
          title="Click to jump to recommended beauty minis"
        >
          <img
            src="/assets/wirecutter/hero_banner.png"
            alt="7 Mini Versions of Beauty Products to Try Right Now - Handheld luxury skincare miniatures"
            className="w-full h-auto object-cover select-none transition-transform duration-500 group-hover:scale-[1.01]"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
    </header>
  );
};
