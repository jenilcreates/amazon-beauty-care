import React from 'react';
import { ListicleItem } from '../types';

interface ListicleCardProps {
  item: ListicleItem;
  itemNumber: number;
  onSelectProduct?: (item: ListicleItem) => void;
}

export const ListicleCard: React.FC<ListicleCardProps> = ({
  item,
  onSelectProduct,
}) => {
  return (
    <div className="w-full mb-14 sm:mb-20">
      {/* Top Divider & Category Header */}
      <div className="w-full mb-3 sm:mb-4">
        {/* Solid Black Horizontal Bar */}
        <div className="w-full h-[2.5px] bg-black mb-3" />
        
        {/* Angle / Category Title */}
        <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-black tracking-tight leading-tight">
          {item.categoryHeader}
        </h2>
      </div>

      {/* Bordered Card Container */}
      <article className="w-full border border-black bg-white overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Product Visual */}
          <div 
            onClick={() => onSelectProduct?.(item)}
            className="relative w-full bg-neutral-50 flex items-center justify-center p-2 sm:p-4 md:p-6 border-b md:border-b-0 md:border-r border-black/10 md:border-transparent cursor-pointer"
          >
            <div className="relative w-full aspect-square max-w-[380px] md:max-w-none flex items-center justify-center overflow-hidden">
              <img
                src={item.imageSrc}
                alt={item.imageAlt}
                className="w-full h-full object-contain select-none transition-transform duration-300 hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Editorial Copy & CTA Button */}
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* Product Title */}
              <h3 className="text-lg sm:text-xl md:text-[22px] lg:text-[24px] font-bold text-black leading-snug tracking-tight">
                {item.title}
              </h3>

              {/* Product Editorial Description */}
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-neutral-900 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>

            {/* Amazon CTA Button */}
            <div className="mt-6 sm:mt-8 pt-2">
              <a
                href={item.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-4/5 mx-auto block bg-black text-white hover:bg-neutral-800 active:scale-[0.99] transition-all py-3 sm:py-3.5 px-6 text-center text-sm sm:text-base font-bold shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 no-underline"
              >
                {item.ctaText}
              </a>
            </div>
          </div>

        </div>
      </article>
    </div>
  );
};
