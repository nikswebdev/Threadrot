// src/components/UI/ArchiveLogo.tsx
import React from "react";

interface ArchiveLogoProps {
  width?: number;
}

const ArchiveLogo: React.FC<ArchiveLogoProps> = ({ width = 200 }) => (
  <svg
    viewBox="0 0 300 60"
    width={width}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="threadrot-logo-svg"
    aria-label="Threadrot Archive Logo"
    role="img"
  >
    <title>Threadrot Archive</title>
    <defs>
      <filter id="rotFilter" x="-50%" y="-50%" width="200%" height="200%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.005 0.05"
          numOctaves="1"
          result="noise"
        >
          <animate
            attributeName="baseFrequency"
            from="0.005 0.05"
            to="0.008 0.06"
            dur="15s"
            repeatCount="indefinite"
            keyTimes="0;0.5;1"
            values="0.005 0.05;0.008 0.06;0.005 0.05"
            calcMode="linear"
          />
        </feTurbulence>
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="8"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>

    {/* CENTERED: Adjusted x position to center the text */}
    <text
      x="5"
      y="45"
      fontFamily="'Inter', sans-serif"
      fontWeight="900"
      fontSize="40"
      fill="white"
      letterSpacing="-2"
      filter="url(#rotFilter)"
      className="threadrot-text"
    >
      THREADROT
    </text>
    <rect x="240" y="15" width="10" height="30" fill="#00ff41" />
    <text
      x="258"
      y="45"
      fontFamily="'Space Mono', monospace"
      fontSize="12"
      fill="#888"
    >
      ARCHIVE
    </text>
  </svg>
);

export default ArchiveLogo;
