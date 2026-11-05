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
    <article className="w-full mb-10 sm:mb-14">
      {/* 1. Wirecutter Black Top Divider */}
      <div className="w-full h-[3px] bg-black mb-3" />

      {/* 2. Category / Angle Header */}
      <h2 className="text-xl sm:text-2xl md:text-[24px] font-bold text-black tracking-tight leading-snug mb-4 sm:mb-5">
        {item.categoryHeader}
      </h2>

      {/* 3. Product Content Grid with balanced spacing */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
        
        {/* Left Column: Product Cutout Visual */}
        <div className="md:col-span-5 flex items-center justify-center">
          <div 
            onClick={() => onSelectProduct ? onSelectProduct(item) : window.open(item.amazonUrl, '_blank', 'noopener,noreferrer')}
            className="w-full max-w-[280px] sm:max-w-[300px] aspect-square flex items-center justify-center p-2 cursor-pointer group"
            title={`View ${item.title} on Amazon`}
          >
            <img
              src={item.imageSrc}
              alt={item.imageAlt}
              className="max-h-full max-w-full object-contain select-none transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Column: Editorial Copy, Buy It If, and CTA */}
        <div className="md:col-span-7 flex flex-col justify-center text-left">
          {/* Product Title */}
          <h3 className="text-lg sm:text-xl md:text-[21px] font-bold text-black leading-snug tracking-tight">
            <a
              href={item.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-black/40 hover:decoration-black underline-offset-4 transition-colors"
            >
              {item.title}
            </a>
          </h3>

          {/* Editorial Verdict / Description */}
          <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15px] text-neutral-800 leading-relaxed font-normal">
            {item.description}
          </p>

          {/* Buy It If Callout */}
          <div className="mt-2.5 sm:mt-3 text-[13px] sm:text-[14px] text-neutral-800 leading-relaxed">
            <p>
              <span className="font-semibold text-black">• Buy It If: </span>
              {item.buyItIf.replace(/^•?\s*Buy It If:\s*/i, '')}
            </p>
          </div>

          {/* Amazon CTA Button */}
          <div className="mt-4 sm:mt-5">
            <a
              href={item.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-[260px] block bg-black text-white hover:bg-neutral-800 active:scale-[0.99] transition-all py-2.5 sm:py-3 px-6 text-center text-xs sm:text-sm font-semibold tracking-wide cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 no-underline"
            >
              {item.ctaText || 'View on Amazon'}
            </a>
          </div>
        </div>

      </div>
    </article>
  );
};
