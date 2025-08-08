export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  originalPrice?: number;
  onSale: boolean;
  variantType: string;
  variants: ProductVariant[];
}

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, variant: ProductVariant) => void;
  onWishlistToggle?: (product: Product, isWishlisted: boolean) => void;
}

export interface AppState {
  products: Product[];
}
