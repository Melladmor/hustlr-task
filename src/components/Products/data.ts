import type { Product } from "./type";

export const productsData: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones with Noise Cancellation",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    originalPrice: 299.99,
    onSale: true,
    variantType: "Color",
    variants: [
      { id: "black", name: "Midnight Black", price: 249.99, stock: 3 },
      { id: "white", name: "Pearl White", price: 249.99, stock: 0 },
      { id: "blue", name: "Ocean Blue", price: 259.99, stock: 8 },
    ],
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    image:
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop",
    onSale: false,
    variantType: "Size",
    variants: [
      { id: "42mm", name: "42mm", price: 199.99, stock: 12 },
      { id: "46mm", name: "46mm", price: 229.99, stock: 5 },
    ],
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    originalPrice: 45.0,
    onSale: true,
    variantType: "Size",
    variants: [
      { id: "s", name: "Small", price: 29.99, stock: 0 },
      { id: "m", name: "Medium", price: 29.99, stock: 0 },
      { id: "l", name: "Large", price: 29.99, stock: 0 },
      { id: "xl", name: "X-Large", price: 29.99, stock: 0 },
    ],
  },
];
