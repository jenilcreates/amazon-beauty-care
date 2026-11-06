import React from 'react';

interface FooterSectionProps {
  onOpenAdmin?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="relative w-full bg-white overflow-hidden pt-6 sm:pt-8 pb-6 sm:pb-8 border-t border-neutral-200">
      {/* Subtle giant watermark typography */}
      <div 
        className="w-full flex justify-center items-center pointer-events-none select-none opacity-30 overflow-hidden leading-none mb-[-1.5vw]"
        aria-hidden="true"
      >
        <span className="font-serif text-[8vw] sm:text-[6vw] tracking-widest text-neutral-200 whitespace-nowrap font-normal uppercase">
          LUXURY BEAUTY
        </span>
      </div>

      {/* Centered crisp brand typography */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center justify-center">
        <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.25em] text-black">
          LUXURY BEAUTY
        </h3>

        {/* Subtle subtext matching Figma "@HIDDENCLICKEEMS, 2026" */}
        <p 
          onClick={onOpenAdmin}
          className={`mt-2 text-[10px] sm:text-xs text-neutral-400 font-mono tracking-widest uppercase ${
            onOpenAdmin ? 'hover:text-neutral-700 cursor-pointer transition-colors' : ''
          }`}
          title={onOpenAdmin ? 'Open Lead Collection & Google Sheets' : undefined}
        >
          @HIDDENCLICKEEMS, 2026
        </p>
      </div>
    </footer>
  );
};
