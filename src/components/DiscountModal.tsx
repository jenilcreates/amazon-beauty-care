import React from 'react';
import { X, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiscountModal: React.FC<DiscountModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const amazonGiftCardUrl =
    'https://www.amazon.com/dp/product/B007URFTYI?pr=con321&inc=50gc&ts=9g743sit5xznhj3zbxugf52m1b6f271&place=pp&plattr=CBCC_PP_Desk_CORE_LVP_50GC_T3&imp=65daa200-e5d6-484c-a0b0-270bb8747eac&mru=%2Fcart&linkCode=ll2&tag=jkaff2026-20&linkId=e493ec171f2aa3ea8e1798bec4e10535&language=en_US&ref_=as_li_ss_tl';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white border border-black shadow-2xl p-6 sm:p-8 overflow-hidden text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-6 h-6" />
        </div>

        <span className="text-xs uppercase font-bold tracking-widest text-neutral-500 block mb-1">
          Special Reader Offer
        </span>

        {/* H3 Headline */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
          $50 Amazon Gift Card instantly on approval
        </h3>

        {/* P Subtitle */}
        <p className="mt-2 text-sm text-neutral-700 max-w-sm mx-auto">
          Instant decision within 15 seconds*
        </p>

        {/* Trust Badges */}
        <div className="my-6 flex items-center justify-center gap-2 text-xs text-neutral-500">
          <ShieldCheck className="w-4 h-4 text-black" />
          <span>Valid at Amazon & authorized luxury retailers</span>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          <a
            href={amazonGiftCardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-black text-white hover:bg-neutral-800 py-3.5 px-6 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Get a $50 Amazon Gift Card</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
