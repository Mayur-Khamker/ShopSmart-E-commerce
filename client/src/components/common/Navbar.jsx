import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function navClass({ isActive }) {
  return isActive
    ? "rounded-2xl bg-white/15 px-4 py-2 text-white shadow-sm"
    : "rounded-2xl px-4 py-2 text-white/75 hover:bg-white/10 hover:text-white";
}

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1220]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/20">
            🛍️
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            ShopSmart
          </span>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navClass}>
            Products
          </NavLink>

          <NavLink to="/wishlist" className={navClass}>
            Wishlist
            {wishlistItems.length > 0 && (
              <span className="ml-2 rounded-full bg-pink-500/20 px-2 py-0.5 text-xs text-pink-200">
                {wishlistItems.length}
              </span>
            )}
          </NavLink>

          <NavLink to="/cart" className={navClass}>
            Cart
            {cartCount > 0 && (
              <span className="ml-2 rounded-full bg-indigo-500/20 px-2 py-0.5 text-xs text-indigo-200">
                {cartCount}
              </span>
            )}
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          {!isLoggedIn ? (
            <NavLink
              to="/login"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={logout}
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      <div className="mx-auto flex max-w-6xl gap-2 px-4 pb-4 md:hidden">
        <NavLink to="/" className={navClass}>
          Home
        </NavLink>
        <NavLink to="/products" className={navClass}>
          Products
        </NavLink>
        <NavLink to="/wishlist" className={navClass}>
          Wishlist
        </NavLink>
        <NavLink to="/cart" className={navClass}>
          Cart
        </NavLink>
      </div>
    </header>
  );
}
