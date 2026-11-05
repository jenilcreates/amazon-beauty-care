import React from 'react';
import { ListicleItem } from '../types';
import { X, ExternalLink, ZoomIn } from 'lucide-react';

interface ProductModalProps {
  item: ListicleItem | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ item, onClose }) => {
  const [isZoomed, setIsZoomed] = React.useState(false);

  React.useEffect(() => {
    setIsZoomed(false);
  }, [item]);

  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-full transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Category Header */}
        <div className="w-full mb-3 pr-8">
          <div className="h-[2px] bg-black w-10 mb-2" />
          <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
            {item.categoryHeader}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-black leading-snug">
          {item.title}
        </h3>

        {/* Large Amazon-style Image Viewer with Zoom */}
        <div className="my-6 relative bg-white border border-neutral-200 p-6 sm:p-8 flex items-center justify-center min-h-[320px] sm:min-h-[380px] overflow-hidden rounded-xs">
          <img
            src={item.imageSrc}
            alt={item.imageAlt}
            onClick={() => setIsZoomed(!isZoomed)}
            className={`max-h-[340px] sm:max-h-[400px] w-auto object-contain transition-transform duration-300 cursor-zoom-in select-none ${
              isZoomed ? 'scale-150 cursor-zoom-out' : 'hover:scale-105'
            }`}
          />
          <button
            type="button"
            onClick={() => setIsZoomed(!isZoomed)}
            className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-neutral-700 px-2.5 py-1 text-xs rounded border border-neutral-300 shadow-xs flex items-center gap-1 cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>{isZoomed ? 'Reset' : 'Click to zoom'}</span>
          </button>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
          {item.description}
        </p>

        {/* Buy It If Callout */}
        <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
          <span className="font-semibold text-black">• Buy It If: </span>
          {item.buyItIf.replace(/^•?\s*Buy It If:\s*/i, '')}
        </p>

        {/* Action Buttons */}
        <div className="mt-7 pt-4 border-t border-neutral-200 flex flex-col sm:flex-row gap-3">
          <a
            href={item.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-black text-white hover:bg-neutral-800 text-center py-3.5 px-6 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer no-underline"
          >
            <span>view on amazon</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3.5 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-sm font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
