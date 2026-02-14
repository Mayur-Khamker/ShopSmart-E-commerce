import { Link } from "react-router-dom";
import Button from "./Button";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function formatMoney(value) {
  return `₹ ${Number(value).toFixed(0)}`;
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const wished = isInWishlist(product.id);

  const hasDiscount = Number(product.discountPercent) > 0;
  const discountText = hasDiscount ? `-${product.discountPercent}%` : null;

  const rating = product.rating ?? 4.2;

  return (
    <div className="group flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10">
      {/* Image + Badges */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
        {/* Discount badge */}
        {hasDiscount && (
          <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
            {discountText}
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur hover:bg-black/40"
        >
          {wished ? "♥" : "♡"}
        </button>

        <Link to={`/products/${product.id}`} className="block">
          <img
            src={product.image}
            alt={product.title}
            className="mx-auto h-44 w-full object-contain transition group-hover:scale-105"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-1 flex-col">
        <Link to={`/products/${product.id}`}>
          <h2 className="text-base font-bold text-white">
            {product.title.length > 55
              ? product.title.slice(0, 55) + "..."
              : product.title}
          </h2>
        </Link>

        <p className="mt-1 text-sm text-white/60">{product.category}</p>

        {/* Rating + Price */}
        <div className="mt-3 flex items-center justify-between gap-3">
          {/* Rating */}
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
            <span>⭐</span>
            <span>{rating}</span>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-sm font-extrabold text-white">
              {formatMoney(product.price)}
            </p>

            {hasDiscount && (
              <p className="text-xs text-white/50 line-through">
                {formatMoney(product.originalPrice)}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button onClick={() => addToCart(product)}>Add</Button>

          <Button
            variant="outline"
            onClick={() => toggleWishlist(product)}
          >
            {wished ? "Saved" : "Wishlist"}
          </Button>
        </div>
      </div>
    </div>
  );
}
