import React, { useState } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { HeroSection } from './components/HeroSection';
import { ListicleCard } from './components/ListicleCard';
import { CalloutBanner } from './components/CalloutBanner';
import { SpotlightSection } from './components/SpotlightSection';
import { FaqSection } from './components/FaqSection';
import { FooterSection } from './components/FooterSection';
import { ProductModal } from './components/ProductModal';
import { DiscountModal } from './components/DiscountModal';
import { LISTICLE_ITEMS } from './data/skincareData';
import { ListicleItem } from './types';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<ListicleItem | null>(null);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShopNow = () => {
    const target = document.getElementById('listicle-content');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans-modern flex flex-col selection:bg-black selection:text-white">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Hero Section */}
      <HeroSection onShopNowClick={handleShopNow} />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* 3. The 5 Listicle Cards Container */}
        <section 
          id="listicle-content" 
          className="max-w-[900px] mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-6"
        >
          {LISTICLE_ITEMS.map((item, index) => (
            <ListicleCard
              key={item.id}
              item={item}
              itemNumber={index + 1}
              onSelectProduct={setSelectedProduct}
            />
          ))}
        </section>

        {/* 4. "Are you ready to transform your skin?" Banner */}
        <CalloutBanner />

        {/* 5. Spotlight Section: Augustinus Bader Rich Cream */}
        <SpotlightSection
          onClaimDiscount={() => setIsDiscountModalOpen(true)}
        />

        {/* 6. FAQs Section */}
        <FaqSection />
      </main>

      {/* 7. Footer with Luxury Watermark */}
      <FooterSection />

      {/* Interactive Modals */}
      <ProductModal
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <DiscountModal
        isOpen={isDiscountModalOpen}
        onClose={() => setIsDiscountModalOpen(false)}
      />

      {/* Quick Scroll To Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 p-3 bg-black text-white rounded-full shadow-lg hover:bg-neutral-800 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
