// src/utils/helpers.ts

// Original (if it still exists, keep it or rename it if other parts of your app use it)
export const getRandomUniqueElements = <T>(arr: T[], num: number): T[] => {
  if (arr.length < num) return [...arr]; // If fewer elements than requested, return all unique ones
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

// NEW: Function to get 'num' elements, repeating from the source array if necessary
export const getRepeatingRandomElements = <T>(arr: T[], num: number): T[] => {
  if (num <= 0 || arr.length === 0) return [];

  const result: T[] = [];
  // Create a working copy to draw from
  let currentPool = [...arr];
  let currentPoolIndex = 0;

  for (let i = 0; i < num; i++) {
    // If we've exhausted the current pool of unique elements, reshuffle
    if (currentPoolIndex >= currentPool.length) {
      currentPool = [...arr].sort(() => 0.5 - Math.random()); // Reshuffle
      currentPoolIndex = 0;
    }
    result.push(currentPool[currentPoolIndex]);
    currentPoolIndex++;
  }
  return result;
};

// You might export getRepeatingRandomElements instead of getRandomUniqueElements if it's the primary one needed.
// For this change, ensure you update the import in MemeBackground.tsx accordingly.
