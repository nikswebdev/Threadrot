// src/components/Background/MemeBackground.tsx
import React, { useMemo, useRef, useEffect } from "react";
// Import the new helper function
import { getRepeatingRandomElements } from "../../utils/helpers";
import "./MemeBackground.css";

interface MemeBackgroundProps {
  screenWidth: number;
}

interface MemeSource {
  src: string;
  alt: string;
}

type MemeWithOpacity = MemeSource & { opacity: number };

const MemeBackground: React.FC<MemeBackgroundProps> = ({ screenWidth }) => {
  const memeSources = useMemo<MemeSource[]>(
    () => [
      // ===> IMPORTANT: PLEASE ENSURE THESE PATHS ARE CORRECTED AS DISCUSSED <===
      // They should start with just `/` if your images are directly in the 'public' folder.
      { src: "/doge.png", alt: "Doge" }, // Corrected path example
      { src: "/pepe.png", alt: "Pepe" },
      { src: "/wojak.png", alt: "Wojak" },
      { src: "/trollface.png", alt: "Trollface" },
      { src: "/whiskers.png", alt: "Grumpy Cat" },
      { src: "/saltbae.png", alt: "Salt Bae" },
      // All other memes removed, only these 6 remain as per request
      // Make sure these actual image files exist in your public folder!
      // ===>  ************************************************************* <===
    ],
    []
  );

  const randomMemesRef = useRef<MemeWithOpacity[]>([]);

  useEffect(() => {
    let numMemesToShow: number;
    let baseOpacity: number;

    if (screenWidth < 600) {
      numMemesToShow = 2;
      baseOpacity = 0.15; // Increased for higher visibility on small screens
    } else if (screenWidth < 701) {
      numMemesToShow = 3;
      baseOpacity = 0.12; // Increased
    } else if (screenWidth < 1200) {
      numMemesToShow = 6;
      baseOpacity = 0.1; // Increased
    } else {
      numMemesToShow = 15; // Will repeat from the 6 sources
      baseOpacity = 0.08; // Slightly less opaque for many large memes
    }

    // Use the new helper function
    randomMemesRef.current = getRepeatingRandomElements(
      memeSources,
      numMemesToShow
    ).map((meme) => ({
      ...meme,
      opacity: baseOpacity,
    }));
  }, [screenWidth, memeSources]);

  return (
    <div className="background-meme-wrapper">
      {randomMemesRef.current.map((meme: MemeWithOpacity, i: number) => (
        <img
          key={`bg-meme-${i}`}
          src={process.env.PUBLIC_URL + meme.src}
          alt={meme.alt}
          id={`bg-meme-${i}`} // IDs used for CSS positioning
          className="background-meme-image"
          style={{ opacity: meme.opacity }}
        />
      ))}
    </div>
  );
};

export default MemeBackground;
