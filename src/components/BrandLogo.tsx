import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon-only' | 'light';
  className?: string;
  onClick?: () => void;
}

export const BrandLogoIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
    >
      <defs>
        <linearGradient id="siri-vibrant-pink" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF2A6D" />
          <stop offset="50%" stopColor="#E0205E" />
          <stop offset="100%" stopColor="#B80048" />
        </linearGradient>
        <filter id="logo-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#B80048" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Radiant Pink Rounded Square Emblem */}
      <rect
        width="100"
        height="100"
        rx="26"
        fill="url(#siri-vibrant-pink)"
        filter="url(#logo-shadow)"
      />

      {/* Stylized White 'S' Monogram (matching Image 9 & 10) */}
      <path
        d="M 64 36 
           C 64 26, 52 20, 39 24 
           C 27 28, 23 37, 28 44 
           C 33 50, 48 53, 56 57 
           C 67 62, 72 71, 65 81 
           C 58 90, 40 92, 28 85 
           C 22 81, 23 74, 30 74 
           C 35 74, 39 78, 47 79 
           C 54 80, 58 76, 57 71 
           C 55 64, 42 61, 33 56 
           C 22 51, 18 41, 24 31 
           C 31 20, 52 14, 67 23 
           C 73 27, 72 36, 64 36 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
  onClick,
}) => {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;
  const isLight = variant === 'light';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none group ${className}`}
    >
      <BrandLogoIcon size={iconSize} className="group-hover:scale-105 transition-transform" />

      {variant !== 'icon-only' && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-headline-sm font-extrabold uppercase tracking-tight transition-colors ${
              size === 'sm'
                ? 'text-base'
                : size === 'lg'
                ? 'text-2xl'
                : 'text-lg lg:text-xl'
            } ${isLight ? 'text-pink-400' : 'text-[#B80048] group-hover:text-[#E0205E]'}`}
          >
            SIRI
          </span>
          <span
            className={`font-headline-sm font-bold uppercase tracking-[0.22em] text-[9px] sm:text-[10px] ${
              isLight ? 'text-pink-300' : 'text-[#E0205E] group-hover:text-[#B80048]'
            }`}
          >
            CLOTHING
          </span>
        </div>
      )}
    </div>
  );
};

// SVG Data URI fallback
export const BRAND_LOGO_SVG_URI = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="26" fill="%23E0205E"/><path d="M64 36C64 26 52 20 39 24C27 28 23 37 28 44C33 50 48 53 56 57C67 62 72 71 65 81C58 90 40 92 28 85C22 81 23 74 30 74C35 74 39 78 47 79C54 80 58 76 57 71C55 64 42 61 33 56C22 51 18 41 24 31C31 20 52 14 67 23C73 27 72 36 64 36Z" fill="%23FFFFFF"/></svg>`;
