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

        {/* Desktop Interactive "SHOP NOW" Button Overlay */}
        <button
          type="button"
          onClick={onShopNowClick}
          aria-label="Shop now - scroll to curated skincare essentials"
          className="absolute z-10 cursor-pointer transition-all duration-200 hover:bg-white/15 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          style={{
            left: '15.1%',
            top: '74.2%',
            width: '14.4%',
            height: '9.0%',
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

        {/* Mobile Interactive "SHOP NOW" Button Overlay mapped to mobile graphic */}
        <button
          type="button"
          onClick={onShopNowClick}
          aria-label="Shop now - scroll to curated skincare essentials"
          className="absolute z-10 cursor-pointer transition-all duration-200 active:bg-white/20 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          style={{
            left: '33.5%',
            top: '36.8%',
            width: '33.0%',
            height: '5.8%',
          }}
        />
      </div>
    </section>
  );
};
