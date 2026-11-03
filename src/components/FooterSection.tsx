import React from 'react';

export const FooterSection: React.FC = () => {
  return (
    <footer className="relative w-full bg-white overflow-hidden pt-12 pb-10 sm:pb-12 border-t border-neutral-100">
      {/* Subtle giant watermark typography from the Figma design */}
      <div 
        className="w-full flex justify-center items-center pointer-events-none select-none opacity-40 overflow-hidden leading-none mb-[-2vw] sm:mb-[-1.5vw]"
        aria-hidden="true"
      >
        <span className="font-serif-luxury text-[13vw] sm:text-[11vw] tracking-wider text-neutral-200 whitespace-nowrap font-normal uppercase">
          LUXURY BEAUTY
        </span>
      </div>

      {/* Centered crisp brand typography */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center">
        <h3 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.25em] text-black">
          LUXURY BEAUTY
        </h3>

        {/* Subtle subtext matching Figma "@HIDDENCLICKEEMS, 2026" */}
        <p className="mt-4 text-[10px] sm:text-xs text-neutral-400 font-mono tracking-widest uppercase">
          @HIDDENCLICKEEMS, 2026
        </p>
      </div>
    </footer>
  );
};
