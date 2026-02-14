import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ui/ProductCard";
import Button from "../components/ui/Button";

export default function Wishlist() {
  const { wishlistItems } = useWishlist();
  const { addToCart } = useCart();

  // ✅ Empty State
  if (!wishlistItems?.length) {
    return (
      <div className="space-y-6">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Wishlist
          </h1>
          <p className="mt-2 text-white/70">
            Save items here and buy later.
          </p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-semibold text-white">
                  💜 No items in wishlist
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Add products to wishlist so you can find them quickly.
                </p>
              </div>

              <Link to="/products">
                <Button>Browse Products</Button>
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Quick save</p>
              <p className="mt-1 text-sm text-white/60">
                
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Easy checkout</p>
              <p className="mt-1 text-sm text-white/60">
                
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Cool stufs</p>
              <p className="mt-1 text-sm text-white/60">
               
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Wishlist With Items
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white">
          Wishlist
        </h1>
        <p className="mt-2 text-white/60">
          {wishlistItems.length} item(s) saved
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {wishlistItems.map((p) => (
          <div key={p.id} className="space-y-3">
            <ProductCard product={p} />

            <Button className="w-full" onClick={() => addToCart(p)}>
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
