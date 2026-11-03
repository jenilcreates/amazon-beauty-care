import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <header className="w-full bg-black text-white py-2.5 px-4 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
        <p className="text-xs sm:text-sm font-bold tracking-wider uppercase select-none flex items-center gap-2">
          <span>Save 40% + Free Shipping!</span>
        </p>
      </div>
    </header>
  );
};
