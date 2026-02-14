import { useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";

import { getCategories, getProducts } from "../services/api";

import Loader from "../components/ui/Loader";
import ProductCard from "../components/ui/ProductCard";
import FilterBar from "../components/ui/FilterBar";

export default function Products() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const {
    data: products,
    loading: productsLoading,
    error: productsError,
  } = useFetch(() => getProducts(), []);

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch(() => getCategories(), []);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let list = [...products];

    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (sortBy === "price_asc") {
      list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price_desc") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, selectedCategory, debouncedSearch, sortBy]);

  if (productsLoading) return <Loader text="Loading products..." />;
  if (productsError) return <p className="text-red-300">{productsError}</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Products
        </h1>
        <p className="mt-1 text-white/65">
         
        </p>
      </div>

      <FilterBar
        search={search}
        setSearch={setSearch}
        categories={categories || []}
        categoriesLoading={categoriesLoading}
        categoriesError={categoriesError}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {filteredProducts.length === 0 ? (
        <p className="text-white/65">No products found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
