import React from 'react';

interface HeroSectionProps {
  onShopNowClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopNowClick }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#a190f6]">
      {/* Desktop & Tablet Banner (sm screens and larger) */}
      <div className="hidden sm:block relative w-full">
        <img
          src="/assets/aistudio/Desktop_-_2_cb6fc05d.png"
          alt="Effective Skincare Essentials for better you - Curated luxury collection"
          className="w-full h-auto block select-none"
          loading="eager"
          fetchPriority="high"
        />

        {/* Desktop Interactive "SHOP NOW" Button Overlay - exactly positioned over button */}
        <a
          href="#listicle-content"
          onClick={(e) => {
            e.preventDefault();
            onShopNowClick();
          }}
          aria-label="Shop now - scroll to curated skincare essentials"
          title="Shop now"
          className="absolute z-10 cursor-pointer rounded-xs transition-all duration-200 hover:ring-2 hover:ring-white/60 hover:bg-white/15 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          style={{
            left: '15.2%',
            top: '78.9%',
            width: '14.3%',
            height: '8.6%',
          }}
        />
      </div>

      {/* Mobile-Only Banner (screens smaller than sm) */}
      <div className="block sm:hidden relative w-full">
        <img
          src="/assets/aistudio/iPhone_14___15_Pro_Max_-_1_b9b1855a.png"
          alt="Effective Skincare Essentials for better you - Mobile luxury collection"
          className="w-full h-auto block select-none"
          loading="eager"
          fetchPriority="high"
        />

        {/* Mobile Interactive "SHOP NOW" Button Overlay - exactly positioned over button */}
        <a
          href="#listicle-content"
          onClick={(e) => {
            e.preventDefault();
            onShopNowClick();
          }}
          aria-label="Shop now - scroll to curated skincare essentials"
          title="Shop now"
          className="absolute z-10 cursor-pointer transition-all duration-200 active:bg-white/20 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          style={{
            left: '34.2%',
            top: '37.1%',
            width: '31.6%',
            height: '5.2%',
          }}
        />
      </div>
    </section>
  );
};
