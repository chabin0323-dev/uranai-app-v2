import React from 'react';

export const Logo: React.FC = () => (
  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-10" aria-label="mike1 brand logo">
    <svg width="95" height="30" viewBox="0 0 95 30" xmlns="http://www.w3.org/2000/svg">
      <style>
        {`.logo-text { font: bold 26px sans-serif; letter-spacing: 0.5px; }`}
      </style>
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="100%" stopColor="#A5B4FC" />
        </linearGradient>
      </defs>
      
      {/* Text "m" */}
      <text x="0" y="24" className="logo-text" fill="url(#logoGradient)">m</text>
      
      {/* Stem of "i" */}
      <rect x="23" y="11" width="3" height="13" rx="1.5" fill="url(#logoGradient)" />
      
      {/* Star to replace the dot of "i" */}
      <path
        d="M24.5,0 L26.1,3.9 L30.2,4.5 L27.3,7.3 L28,11.3 L24.5,9.3 L21,11.3 L21.7,7.3 L18.8,4.5 L22.9,3.9 Z"
        fill="#FBBF24"
        transform="scale(0.85) translate(3, 0)"
      />

      {/* Text "ke1" */}
      <text x="32" y="24" className="logo-text" fill="url(#logoGradient)">ke1</text>
    </svg>
  </div>
);
