import React, { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import type { ProductCardProps, ProductVariant } from "./type";

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onWishlistToggle,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  const handleAddToCart = (): void => {
    if (selectedVariant.stock > 0) {
      if (onAddToCart) {
        onAddToCart(product, selectedVariant);
      } else {
        alert(`Added ${product.name} (${selectedVariant.name}) to cart!`);
      }
    }
  };

  const handleVariantChange = (variant: ProductVariant): void => {
    setSelectedVariant(variant);
  };

  const handleWishlistToggle = (): void => {
    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);

    if (onWishlistToggle) {
      onWishlistToggle(product, newWishlistState);
    }
  };

  const isOutOfStock: boolean = selectedVariant.stock === 0;
  const isLowStock: boolean =
    selectedVariant.stock > 0 && selectedVariant.stock <= 5;

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group max-w-sm flex flex-col h-full">
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
          aria-label={`${isWishlisted ? "Remove from" : "Add to"} wishlist`}>
          <Heart
            className={`w-5 h-5 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {product.onSale && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            SALE
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold">
              OUT OF STOCK
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(selectedVariant.price)}
            </span>
            {product.originalPrice &&
              product.originalPrice > selectedVariant.price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
          </div>

          {product.variants.length > 1 && (
            <div className="mb-4">
              <label
                htmlFor={`variant-select-${product.id}`}
                className="block text-sm font-medium text-gray-700 mb-2">
                {product.variantType}:
              </label>
              <select
                id={`variant-select-${product.id}`}
                value={selectedVariant.id}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const variant = product.variants.find(
                    (v) => v.id === e.target.value
                  );
                  if (variant) {
                    handleVariantChange(variant);
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                {product.variants.map((variant: ProductVariant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.name} - {formatPrice(variant.price)}
                    {variant.stock === 0 && " (Out of Stock)"}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-4">
            {isLowStock && (
              <p className="text-sm text-amber-600 font-medium">
                Only {selectedVariant.stock} left in stock!
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 mt-auto ${
            isOutOfStock
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg active:scale-98"
          }`}
          aria-label={
            isOutOfStock ? "Product out of stock" : "Add product to cart"
          }>
          {isOutOfStock ? (
            "Out of Stock"
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};
