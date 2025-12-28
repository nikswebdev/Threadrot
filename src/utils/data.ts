// src/utils/data.ts
import { Product, Category, FilterOption } from "../types";

export const categories: Category[] = [
  { id: "ALL", label: "VIEW ALL" },
  { id: "CLASSIC", label: "ERA: CLASSIC", year: "2008-2012" },
  { id: "MLG", label: "ERA: MLG", year: "2013-2015" },
  { id: "SURREAL", label: "ERA: SURREAL", year: "2016-2020" },
  { id: "DEEPFRIED", label: "STATUS: DECAYED", year: "UNKNOWN" },
];

// NEW: Filter data
export const filterOptions: {
  styles: FilterOption[];
  colors: FilterOption[];
  brands: FilterOption[];
  sizes: FilterOption[];
} = {
  styles: [
    { id: "VINTAGE", label: "Vintage" },
    { id: "MODERN", label: "Modern" },
    { id: "STREETWEAR", label: "Streetwear" },
  ],
  colors: [
    { id: "BLACK", label: "Black" },
    { id: "WHITE", label: "White" },
    { id: "GREEN", label: "Green" },
    { id: "GREY", label: "Grey" },
    { id: "NEON", label: "Neon" },
  ],
  brands: [
    { id: "THREADROT", label: "Threadrot" },
    { id: "UNKNOWN_BRAND", label: "Unknown Brand" },
  ],
  sizes: [
    { id: "XS", label: "XS" },
    { id: "S", label: "S" },
    { id: "M", label: "M" },
    { id: "L", label: "L" },
    { id: "XL", label: "XL" },
  ],
};

export const productsData: Product[] = [
  {
    id: 1,
    name: "TROLLFACE.OBJ",
    price: "$30.00",
    era: "2010",
    category: "CLASSIC",
    rot: "5%",
    description:
      "The original troll face object file. Perfect for 3D printing your memes.",
    images: ["/trollface-1.jpg", "/trollface-2.jpg"],
  },
  // ... more products with full typing
];

export {};
