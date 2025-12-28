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
    className="threadrot-logo-svg" // Add a class for potential CSS animation/styling
  >
    {/* Define the SVG filter for the rotting effect */}
    <defs>
      <filter id="rotFilter" x="-50%" y="-50%" width="200%" height="200%">
        {/* feTurbulence generates Perlin noise for the distortion */}
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.005 0.05" /* Lower X-frequency for horizontal melt, higher Y-frequency for vertical noise */
          numOctaves="1"
          result="noise"
          // Animate the baseFrequency to make the rot effect subtle and dynamic
          // This creates a slow, organic movement of the distortion
        >
          <animate
            attributeName="baseFrequency"
            from="0.005 0.05"
            to="0.008 0.06"
            dur="15s" // Slow duration
            repeatCount="indefinite"
            keyTimes="0;0.5;1" // Control timing for a smoother loop
            values="0.005 0.05;0.008 0.06;0.005 0.05"
            calcMode="linear"
          />
        </feTurbulence>
        {/* feDisplacementMap uses the noise to distort the SourceGraphic (the text) */}
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="8" /* Adjust scale for intensity of distortion */
          xChannelSelector="R" /* Use red channel of noise for X-displacement */
          yChannelSelector="G" /* Use green channel of noise for Y-displacement */
        />
      </filter>
    </defs>

    <text
      x="0"
      y="45"
      fontFamily="'Inter', sans-serif"
      fontWeight="900"
      fontSize="40"
      fill="white"
      letterSpacing="-2"
      filter="url(#rotFilter)" /* Apply the defined filter to the text */
      className="threadrot-text" /* Add class for specific text styling if needed */
    >
      THREADROT
    </text>
    <rect x="235" y="15" width="10" height="30" fill="#00ff41" />
    <text
      x="255"
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
