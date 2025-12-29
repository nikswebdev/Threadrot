// src/utils/data.ts - FIXED DATA FILE

import { Product, Category, FilterOptions } from "../types";

// Export as "products" (matches new ProductGrid import)
export const products: Product[] = [
  {
    id: "1",
    name: "Classic Pepe Vintage Tee",
    price: 35.0,
    image: "/images/products/pepe-front.jpg",
    hoverImage: "/images/products/pepe-back.jpg",
    category: "Classic Memes",
    description:
      "The OG meme that started it all. Premium cotton, vintage wash.",
    dateAdded: "2024-12-15",
    isNew: true,
    inStock: true,
  },
  {
    id: "2",
    name: "MLG Mountain Dew Hoodie",
    price: 65.0,
    image: "/images/products/mlg-front.jpg",
    hoverImage: "/images/products/mlg-back.jpg",
    category: "MLG Era",
    description: "360 no-scope your wardrobe. Limited edition MLG nostalgia.",
    dateAdded: "2024-12-10",
    isTrending: true,
    inStock: true,
  },
  {
    id: "3",
    name: "Doge Wow Very Shirt",
    price: 32.0,
    image: "/images/products/doge-front.jpg",
    category: "Classic Memes",
    description: "Such comfort. Very style. Wow.",
    dateAdded: "2024-11-20",
    isLowStock: true,
    stockCount: 3,
    inStock: true,
  },
  {
    id: "4",
    name: "Harambe Memorial Tee",
    price: 35.0,
    image: "/images/products/harambe-front.jpg",
    category: "Vintage",
    description: "Never forget. RIP 2016.",
    dateAdded: "2024-10-05",
    inStock: false,
  },
  {
    id: "5",
    name: "Trollface Embroidered Cap",
    price: 28.0,
    image: "/images/products/troll-cap.jpg",
    hoverImage: "/images/products/troll-cap-side.jpg",
    category: "Classic Memes",
    description: "Problem? Premium embroidered dad cap.",
    dateAdded: "2024-12-20",
    isNew: true,
    isTrending: true,
    inStock: true,
  },
  {
    id: "6",
    name: "Rage Comic Longsleeve",
    price: 42.0,
    image: "/images/products/rage-front.jpg",
    category: "Classic Memes",
    description: "FFFFFFFUUUUUUUUUUUU- Premium heavyweight cotton.",
    dateAdded: "2024-11-15",
    isLowStock: true,
    stockCount: 2,
    inStock: true,
  },
  {
    id: "7",
    name: "All Your Base Hoodie",
    price: 68.0,
    image: "/images/products/base-front.jpg",
    hoverImage: "/images/products/base-back.jpg",
    category: "Vintage",
    description: "All your base are belong to us. OG internet culture.",
    dateAdded: "2024-09-30",
    inStock: true,
  },
  {
    id: "8",
    name: "Nyan Cat Rainbow Tee",
    price: 34.0,
    image: "/images/products/nyan-front.jpg",
    category: "Classic Memes",
    description: "Nyan nyan nyan nyan. Full spectrum print.",
    dateAdded: "2024-12-18",
    isNew: true,
    inStock: true,
  },
];

// Also export as productsData for backward compatibility
export const productsData = products;

// Categories
export const categories: Category[] = [
  { id: "all", label: "All" },
  { id: "classic-memes", label: "Classic Memes" },
  { id: "mlg-era", label: "MLG Era", year: "(2010-2016)" },
  { id: "vintage", label: "Vintage" },
  { id: "surreal", label: "Surreal" },
];

// Filter options
export const filterOptions: FilterOptions = {
  styles: [
    { id: "vintage", label: "Vintage" },
    { id: "modern", label: "Modern" },
    { id: "minimal", label: "Minimal" },
  ],
  colors: [
    { id: "black", label: "Black" },
    { id: "white", label: "White" },
    { id: "gray", label: "Gray" },
  ],
  brands: [
    { id: "threadrot", label: "Threadrot" },
    { id: "archive", label: "Archive" },
  ],
  sizes: [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
    { id: "xxl", label: "XXL" },
  ],
};
