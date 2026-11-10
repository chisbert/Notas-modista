import React from 'react';

interface CurtainLogoProps {
  className?: string;
  brandName?: string;
  slogan?: string;
}

export const CurtainLogo: React.FC<CurtainLogoProps> = ({
  className = 'w-36 h-28',
  brandName = 'MATURANA',
  slogan = 'VESTIMOS SU HOGAR',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none text-slate-900 ${className}`}>
      {/* SVG Drapery reproduction of the authentic Maturana Decorhogar seal */}
      <svg
        viewBox="0 0 240 180"
        className="w-full h-auto drop-shadow-sm"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
      >
        {/* Pelmet rail / cornice bar */}
        <path
          d="M 15 28 L 225 28"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M 12 23 L 228 23"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* Curving pelmet drapery top valence */}
        <path
          d="M 20 28 Q 65 52 110 32 Q 130 30 150 32 Q 195 52 220 28"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M 22 34 Q 65 58 110 38 Q 130 36 150 38 Q 195 58 218 34"
          strokeWidth="1.2"
          strokeDasharray="3 2"
          fill="none"
        />

        {/* Pelmet swag folds and pleats */}
        <path d="M 40 32 C 45 44 55 48 65 50" strokeWidth="1.2" />
        <path d="M 55 31 C 60 44 70 47 80 49" strokeWidth="1.2" />
        <path d="M 75 30 C 82 43 92 45 100 44" strokeWidth="1.2" />
        <path d="M 140 44 C 148 45 158 43 165 30" strokeWidth="1.2" />
        <path d="M 160 49 C 170 47 180 44 185 31" strokeWidth="1.2" />
        <path d="M 175 50 C 185 48 195 44 200 32" strokeWidth="1.2" />

        {/* Center decorative knot / rosettes */}
        <circle cx="65" cy="30" r="5" strokeWidth="2" fill="white" />
        <circle cx="175" cy="30" r="5" strokeWidth="2" fill="white" />
        <path d="M 65 35 L 65 45 M 63 45 L 67 45" strokeWidth="1.5" />
        <path d="M 175 35 L 175 45 M 173 45 L 177 45" strokeWidth="1.5" />

        {/* Left side curtain swag gathered back */}
        <path
          d="M 20 30 C 18 70 25 110 18 160 C 26 158 35 155 42 150 C 38 115 48 85 52 46"
          strokeWidth="2"
          fill="none"
        />
        <path d="M 25 60 C 27 90 32 120 30 152" strokeWidth="1" />
        <path d="M 32 55 C 34 85 40 115 36 148" strokeWidth="1" />

        {/* Right side curtain swag gathered back */}
        <path
          d="M 220 30 C 222 70 215 110 222 160 C 214 158 205 155 198 150 C 202 115 192 85 188 46"
          strokeWidth="2"
          fill="none"
        />
        <path d="M 215 60 C 213 90 208 120 210 152" strokeWidth="1" />
        <path d="M 208 55 C 206 85 200 115 204 148" strokeWidth="1" />

        {/* Center brand arch with typography */}
        <g id="brand-text">
          <text
            x="120"
            y="92"
            textAnchor="middle"
            fontSize="26"
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontWeight="900"
            letterSpacing="2"
            fill="#0f172a"
            stroke="none"
          >
            {brandName}
          </text>
          <text
            x="120"
            y="114"
            textAnchor="middle"
            fontSize="14"
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontWeight="800"
            letterSpacing="3"
            fill="#0f172a"
            stroke="none"
          >
            DECORHOGAR
          </text>
          <line
            x1="55"
            y1="124"
            x2="185"
            y2="124"
            stroke="#0f172a"
            strokeWidth="1.5"
          />
          <text
            x="120"
            y="140"
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontWeight="700"
            letterSpacing="2"
            fill="#334155"
            stroke="none"
          >
            {slogan}
          </text>
        </g>
      </svg>
    </div>
  );
};
