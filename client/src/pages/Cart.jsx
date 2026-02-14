import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Button from "../components/ui/Button";

export default function Cart() {
  const { cartItems, updateQty, removeFromCart, clearCart, cartTotal } =
    useCart();

  // ✅ Empty State
  if (!cartItems?.length) {
    return (
      <div className="space-y-6">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Cart
          </h1>
          <p className="mt-2 text-white/70">
            Your cart is empty. Add something cool.
          </p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-semibold text-white">
                  🛒 No items in your cart
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Browse products and start adding your order.
                </p>
              </div>

              <Link to="/products">
                <Button>Browse Products</Button>
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Add Item</p>
              <p className="mt-1 text-sm text-white/60">
                
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Add 2 items and get 50% discount</p>
              <p className="mt-1 text-sm text-white/60">
                
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Add 3 items and get 70% discount</p>
              <p className="mt-1 text-sm text-white/60">
                
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Cart With Items
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Cart
          </h1>
          <p className="mt-2 text-white/60">
            {cartItems.length} item(s) in your cart
          </p>
        </div>

        <button
          onClick={clearCart}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Items */}
        <div className="space-y-4 lg:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:flex-row md:items-center"
            >
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-2xl bg-white">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-contain p-2"
                    loading="lazy"
                  />
                </div>

                <div>
                  <p className="text-base font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-white/60">
                    ₹ {item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-between gap-4 md:justify-end">
                {/* Qty */}
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="h-9 w-9 rounded-xl text-white/80 hover:bg-white/10"
                    disabled={item.qty <= 1}
                  >
                    −
                  </button>

                  <span className="min-w-10 text-center text-sm font-semibold text-white">
                    {item.qty}
                  </span>

                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="h-9 w-9 rounded-xl text-white/80 hover:bg-white/10"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="text-lg font-bold text-white">Order Summary</h2>

          <div className="mt-4 space-y-3 text-sm text-white/70">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-white">
                ₹ {cartTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Delivery</span>
              <span className="font-semibold text-white">Free</span>
            </div>

            <div className="h-px bg-white/10" />

            <div className="flex items-center justify-between text-base">
              <span className="font-semibold text-white">Total</span>
              <span className="font-extrabold text-white">
                ₹ {cartTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Button className="w-full">Checkout</Button>
          </div>

          <p className="mt-3 text-center text-xs text-white/50">
            Checkout is demo-only (frontend project).
          </p>
        </div>
      </div>
    </div>
  );
}
