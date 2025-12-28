// src/components/Background/MemeBackground.tsx
import React, { useMemo, useRef, useEffect, useState } from "react";
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
      { src: "/doge.png", alt: "Doge" },
      { src: "/pepe.png", alt: "Pepe" },
      { src: "/wojak.png", alt: "Wojak" },
      { src: "/trollface.png", alt: "Trollface" },
      { src: "/whiskers.png", alt: "Grumpy Cat" },
      { src: "/saltbae.png", alt: "Salt Bae" },
    ],
    []
  );

  const randomMemesRef = useRef<MemeWithOpacity[]>([]);

  // NEW: Flag to indicate if memes have been initialized
  const [memesInitialized, setMemesInitialized] = useState(false); // Add useState import

  useEffect(() => {
    let numMemesToShow: number;
    let baseOpacity: number;

    if (screenWidth < 600) {
      numMemesToShow = 2;
      baseOpacity = 0.15;
    } else if (screenWidth < 701) {
      numMemesToShow = 3;
      baseOpacity = 0.12;
    } else if (screenWidth < 1200) {
      numMemesToShow = 6;
      baseOpacity = 0.1;
    } else {
      numMemesToShow = 15;
      baseOpacity = 0.08;
    }

    randomMemesRef.current = getRepeatingRandomElements(
      memeSources,
      numMemesToShow
    ).map((meme) => ({
      ...meme,
      opacity: baseOpacity,
    }));

    // NEW: Set initialized flag after first run
    setMemesInitialized(true);
  }, [screenWidth, memeSources]);

  // NEW: Render only after memes have been initialized once
  if (!memesInitialized) {
    return null; // Or a loading spinner if preferred
  }

  return (
    <div className="background-meme-wrapper">
      {randomMemesRef.current.map((meme: MemeWithOpacity, i: number) => (
        <img
          key={`bg-meme-${i}`}
          src={process.env.PUBLIC_URL + meme.src}
          alt={meme.alt}
          id={`bg-meme-${i}`}
          className="background-meme-image"
          style={{ opacity: meme.opacity }}
        />
      ))}
    </div>
  );
};

export default MemeBackground;
