import React from 'react';

export const CalloutBanner: React.FC = () => {
  return (
    <section className="w-full bg-[#f0f0f0] py-12 sm:py-16 md:py-20 my-12 sm:my-16 border-y border-neutral-200">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black tracking-tight leading-tight">
          Are you ready to transform your skin?
        </h2>
      </div>
    </section>
  );
};
