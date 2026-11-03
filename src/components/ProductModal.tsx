import React, { useState } from 'react';
import { ListicleItem } from '../types';
import { X, Check, Copy, ExternalLink, ShieldCheck, Truck, Star } from 'lucide-react';

interface ProductModalProps {
  item: ListicleItem | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ item, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const handleCopyCode = () => {
    if (item.couponCode) {
      navigator.clipboard.writeText(item.couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white border border-black shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category Header */}
        <div className="w-full mb-3">
          <div className="h-[2px] bg-black w-12 mb-2" />
          <span className="text-xs uppercase font-bold tracking-widest text-neutral-500">
            {item.categoryHeader}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-black leading-snug">
          {item.title}
        </h3>

        {/* Brand & Size */}
        <div className="mt-2 flex items-center gap-3 text-xs text-neutral-600 font-medium">
          <span>{item.brand}</span>
          <span>·</span>
          <span>{item.size}</span>
          <span>·</span>
          <span className="flex items-center gap-1 text-amber-600">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            {item.rating} ({item.reviewsCount.toLocaleString()} reviews)
          </span>
        </div>

        {/* Visual Preview */}
        <div className="my-5 bg-neutral-50 border border-neutral-200 p-4 flex items-center justify-center aspect-[16/9] max-h-56">
          <img
            src={item.imageSrc}
            alt={item.imageAlt}
            className="h-full object-contain"
          />
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-800 leading-relaxed">
          {item.description}
        </p>

        {/* Key Benefits */}
        <div className="mt-4 pt-4 border-t border-neutral-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-2.5">
            Dermatologist & Editor Notes:
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
            {item.keyBenefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Coupon Code Claim */}
        {item.couponCode && (
          <div className="mt-5 p-3.5 bg-neutral-100 border border-dashed border-neutral-400 flex items-center justify-between gap-3">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
                Exclusive Promotion Code
              </span>
              <span className="text-sm font-mono font-bold text-black">
                {item.couponCode}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopyCode}
              className="px-3 py-1.5 bg-black text-white text-xs font-medium hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Trust Badges */}
        <div className="mt-4 flex items-center justify-around text-[11px] text-neutral-500 py-2 border-y border-neutral-100">
          <div className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-black" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-black" />
            <span>100% Authentic Guaranteed</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={item.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-black text-white hover:bg-neutral-800 text-center py-3 px-6 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Proceed to Amazon ({item.price})</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
