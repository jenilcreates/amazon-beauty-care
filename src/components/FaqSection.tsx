import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/skincareData';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section className="w-full max-w-[840px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Centered Heading */}
      <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-center text-black mb-8 sm:mb-10">
        FAQS
      </h2>

      {/* Accordion Rows replicating the 5 bars in Figma */}
      <div className="space-y-3 sm:space-y-3.5">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="border border-neutral-200 bg-[#e5e5e5]/80 hover:bg-[#dedede] transition-colors overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                aria-expanded={isOpen}
              >
                <span className="text-xs sm:text-sm md:text-base font-semibold text-neutral-900 pr-4">
                  {item.question}
                </span>
                <span
                  className={`shrink-0 w-6 h-6 rounded-full bg-white/70 flex items-center justify-center transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-white' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4 text-neutral-800" />
                </span>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-800 leading-relaxed bg-[#f0f0f0] border-t border-neutral-300">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
