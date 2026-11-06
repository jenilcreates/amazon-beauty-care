import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { ListicleCard } from './components/ListicleCard';
import { LeadCaptureSection } from './components/LeadCaptureSection';
import { FooterSection } from './components/FooterSection';
import { ProductModal } from './components/ProductModal';
import { AdminLeadsModal } from './components/AdminLeadsModal';
import { LISTICLE_ITEMS } from './data/skincareData';
import { ListicleItem } from './types';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<ListicleItem | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret owner shortcut: Shift + Alt + L to open leads manager
      if (e.shiftKey && e.altKey && e.key.toLowerCase() === 'l') {
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleScrollToProducts = () => {
    const target = document.getElementById('listicle-content');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-black font-poppins flex flex-col selection:bg-black selection:text-white">
      {/* 1. Hero Section matching Figma Desktop - 1 */}
      <HeroSection onShopNowClick={handleScrollToProducts} />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* 2. The 7 Listicle Review Cards */}
        <section 
          id="listicle-content" 
          className="max-w-[980px] mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-2 scroll-mt-6"
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

        {/* 3. Lead Capture Form (Email Only) */}
        <LeadCaptureSection onOpenAdmin={() => setIsAdminOpen(true)} />
      </main>

      {/* 4. Footer with Luxury Watermark */}
      <FooterSection onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Interactive Amazon-style Enlarged Image Lightbox */}
      <ProductModal
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Owner Google Sheets & Leads Management Modal */}
      <AdminLeadsModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
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
