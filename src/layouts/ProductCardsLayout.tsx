import { useState } from "react";
import type { Product, ProductVariant } from "../components/Products/type";
import { ProductCard } from "../components/Products/ProductCard";
import { productsData } from "../components/Products/data";

const ProductCardsLayout = () => {
  const [products, setProducts] = useState<Product[]>(productsData);

  const [cartItems, setCartItems] = useState<
    Array<{ product: Product; variant: ProductVariant; quantity: number }>
  >([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  const handleAddToCart = (product: Product, variant: ProductVariant): void => {
    setProducts((prevProducts) => {
      const pIdx = prevProducts.findIndex((p) => p.id === product.id);
      if (pIdx === -1) return prevProducts;

      const productFromState = prevProducts[pIdx];
      const vIdx = productFromState.variants.findIndex(
        (v) => v.id === variant.id
      );
      if (vIdx === -1) return prevProducts;

      const currentStock = productFromState.variants[vIdx].stock;

      if (currentStock <= 0) {
        alert("This item is out of stock!");
        return prevProducts;
      }

      const updatedVariant: ProductVariant = {
        ...productFromState.variants[vIdx],
        stock: currentStock - 1,
      };

      const updatedProduct: Product = {
        ...productFromState,
        variants: productFromState.variants.map((v, i) =>
          i === vIdx ? updatedVariant : v
        ),
      };

      const nextProducts = prevProducts.map((p, i) =>
        i === pIdx ? updatedProduct : p
      );

      setCartItems((prevItems) => {
        const idx = prevItems.findIndex(
          (i) => i.product.id === product.id && i.variant.id === variant.id
        );
        if (idx !== -1) {
          return prevItems.map((i, j) =>
            j === idx ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [
          ...prevItems,
          { product: updatedProduct, variant: updatedVariant, quantity: 1 },
        ];
      });

      console.log(
        `Added to cart: ${updatedProduct.name} (${updatedVariant.name})`
      );
      console.log(`Remaining stock: ${updatedVariant.stock}`);

      return nextProducts;
    });
  };

  const handleWishlistToggle = (
    product: Product,
    isWishlisted: boolean
  ): void => {
    if (isWishlisted) {
      setWishlistItems((prevItems) => [...prevItems, product]);
    } else {
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.id !== product.id)
      );
    }
    console.log(
      `${isWishlisted ? "Added to" : "Removed from"} wishlist: ${product.name}`
    );
  };

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Product Card Component Demo (React + TypeScript)
          </h1>

          <div className="flex justify-center gap-6 text-sm text-gray-600">
            <span>Cart Items: {totalCartItems}</span>
            <span>Wishlist Items: {wishlistItems.length}</span>
          </div>
        </header>
        {cartItems.length > 0 && (
          <div className="my-8 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-base sm:text-lg font-bold mb-4">
              Cart Contents:
            </h3>

            <div
              className="
      space-y-2 sm:space-y-0
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
      gap-2
    ">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span
                    className="font-medium text-sm sm:text-base flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
                    title={`${item.product.name} (${item.variant.name})`}>
                    {item.product.name} ({item.variant.name})
                  </span>

                  <span className="text-xs sm:text-sm md:text-base text-gray-700 sm:ml-3 shrink-0">
                    Qty: {item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {products?.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onWishlistToggle={handleWishlistToggle}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductCardsLayout;
