import React from 'react';

/**
 * Floating decorative basil leaf inspired by the reference design.
 * Features realistic leaf contour, depth-of-field blur, and gentle swaying animation.
 */
export default function FloatingLeaf({
  className = '',
  size = 64,
  rotate = 25,
  blur = 'blur-[1px]',
  opacity = 'opacity-85',
  animation = 'animate-float-slow'
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute z-10 ${animation} ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        filter: 'drop-shadow(0 15px 15px rgba(34, 40, 20, 0.15))'
      }}
    >
      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 100 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${blur} ${opacity} transition-all duration-700`}
      >
        <defs>
          <linearGradient id="leafGrad" x1="20" y1="0" x2="80" y2="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#78B13F" />
            <stop offset="35%" stopColor="#4E8D25" />
            <stop offset="70%" stopColor="#2E6715" />
            <stop offset="100%" stopColor="#1E470E" />
          </linearGradient>
          <linearGradient id="veinGrad" x1="50" y1="10" x2="50" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A4DF6A" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#538D29" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Leaf blade shape */}
        <path
          d="M50 5 C75 35 95 70 85 105 C75 130 55 125 50 120 C45 125 25 130 15 105 C5 70 25 35 50 5 Z"
          fill="url(#leafGrad)"
        />

        {/* Highlight reflection */}
        <path
          d="M48 15 C65 40 75 70 65 95 C60 105 52 100 50 95 C52 75 45 40 48 15 Z"
          fill="#A4DF6A"
          fillOpacity="0.25"
        />

        {/* Central stem / vein */}
        <path
          d="M50 10 Q50 65 50 125"
          stroke="url(#veinGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Side lateral veins */}
        <path d="M50 35 Q65 40 75 48" stroke="#A4DF6A" strokeWidth="1.2" strokeOpacity="0.4" strokeLinecap="round" />
        <path d="M50 55 Q70 62 78 72" stroke="#A4DF6A" strokeWidth="1.2" strokeOpacity="0.4" strokeLinecap="round" />
        <path d="M50 78 Q68 85 73 95" stroke="#A4DF6A" strokeWidth="1.2" strokeOpacity="0.4" strokeLinecap="round" />

        <path d="M50 35 Q35 40 25 48" stroke="#A4DF6A" strokeWidth="1.2" strokeOpacity="0.4" strokeLinecap="round" />
        <path d="M50 55 Q30 62 22 72" stroke="#A4DF6A" strokeWidth="1.2" strokeOpacity="0.4" strokeLinecap="round" />
        <path d="M50 78 Q32 85 27 95" stroke="#A4DF6A" strokeWidth="1.2" strokeOpacity="0.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}
