import { useMemo } from "react";
import { Link } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import { getProducts } from "../services/api";

import ProductCard from "../components/ui/ProductCard";
import Button from "../components/ui/Button";

function Section({ title, subtitle, children }) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-sm text-white/60">{subtitle}</p>
          ) : null}
        </div>

        <Link
          to="/products"
          className="text-sm font-semibold text-white/70 hover:text-white"
        >
          View all →
        </Link>
      </div>

      {children}
    </section>
  );
}

function CategoryPill({ label }) {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(label)}`}
      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 backdrop-blur-xl hover:bg-white/10"
    >
      {label}
    </Link>
  );
}

export default function Home() {
  const { data: products, loading, error } = useFetch(getProducts);

  const { deals, trending, featured, newArrivals } = useMemo(() => {
    const list = products || [];

    return {
      deals: list.filter((p) => p.isDeal).slice(0, 8),
      trending: list.filter((p) => p.isTrending).slice(0, 8),
      featured: list.filter((p) => p.isFeatured).slice(0, 8),
      newArrivals: list.filter((p) => p.isNew).slice(0, 8),
    };
  }, [products]);

  return (
    <div className="space-y-12">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 backdrop-blur-xl">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
              Cheak The Website For Cool Stuff
            </p>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              ShopSmart — Deals, Trending & Best Sellers
            </h1>

            <p className="mt-4 max-w-xl text-base text-white/70">
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/products">
                <Button>Browse Products</Button>
              </Link>
            </div>
          </div>

          {/* Right card */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Deals</p>
              <p className="mt-2 text-3xl font-extrabold text-white">
                Up to 40% off
              </p>
              <p className="mt-1 text-sm text-white/60">
                Discounted products today
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Trending</p>
              <p className="mt-2 text-3xl font-extrabold text-white">Top picks</p>
              <p className="mt-1 text-sm text-white/60">
                Popular items right now
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:col-span-2">
              <p className="text-sm font-semibold text-white">
              </p>
              <p className="mt-2 text-sm text-white/60">
               What are ou doung just go and start shoping
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES ROW */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold tracking-tight text-white">
          Shop by Category
        </h2>

        <div className="flex flex-wrap gap-3">
          <CategoryPill label="electronics" />
          <CategoryPill label="jewelery" />
          <CategoryPill label="men's clothing" />
          <CategoryPill label="women's clothing" />
        </div>
      </section>

      {/* LOADING / ERROR */}
      {loading && (
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-white/70">
          Loading products...
        </div>
      )}

      {error && (
        <div className="rounded-[28px] border border-red-500/20 bg-red-500/10 p-6 text-red-200">
          {error}
        </div>
      )}

      {/* DEALS */}
      {!loading && !error && (
        <>
          <Section
            title="Deals of the Day"
            subtitle="Discounted items — limited time offers."
          >
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {deals.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Section>

          <Section title="Trending Now" subtitle="Popular items customers love.">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {trending.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Section>

          <Section title="Featured Picks" subtitle="Hand-picked for you.">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Section>

          <Section title="New Arrivals" subtitle="Fresh products just dropped.">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {newArrivals.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Section>

          {/* BOTTOM CTA */}
          <section className="rounded-[36px] border border-white/10 bg-gradient-to-br from-indigo-500/15 via-white/5 to-transparent p-8 backdrop-blur-xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-white">
                  Ready to explore?
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Browse all products with search, filters and sorting.
                </p>
              </div>

              <Link to="/products">
                <Button>Go to Products</Button>
              </Link>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
