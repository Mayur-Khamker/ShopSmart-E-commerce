import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getProductById } from "../services/api";

import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const { data: product, loading, error } = useFetch(
    () => getProductById(id),
    [id]
  );

  if (loading) return <Loader text="Loading product..." />;
  if (error) return <p className="text-red-300">{error}</p>;
  if (!product) return <p className="text-white/65">Product not found.</p>;

  const wished = isInWishlist(product.id);

  return (
    <div className="space-y-6">
      <Link to="/products" className="text-sm text-white/65 hover:underline">
        ← Back to products
      </Link>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <img
            src={product.image}
            alt={product.title}
            className="mx-auto h-80 object-contain"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold text-white">
            {product.title}
          </h1>

          <p className="text-white/65">{product.description}</p>

          <div className="text-2xl font-extrabold text-white">
            ₹ {product.price}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => addToCart(product)}>Add to Cart</Button>

            <Button
              variant={wished ? "ghost" : "outline"}
              onClick={() => toggleWishlist(product)}
            >
              {wished ? "♥ Saved" : "♡ Wishlist"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
