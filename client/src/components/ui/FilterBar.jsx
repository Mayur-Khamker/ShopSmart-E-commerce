export default function FilterBar({
  search,
  setSearch,
  categories,
  categoriesLoading,
  categoriesError,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="grid gap-3 rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:grid-cols-3">
      {/* Search */}
      <div className="space-y-1">
        <label className="text-sm font-semibold text-white/80">Search</label>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-indigo-500/50"
        />
      </div>

      {/* Category */}
      <div className="space-y-1">
        <label className="text-sm font-semibold text-white/80">Category</label>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:cursor-not-allowed disabled:opacity-60"
          style={{ colorScheme: "dark" }}
          disabled={categoriesLoading || Boolean(categoriesError)}
        >
          <option value="all">All</option>

          {categories?.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {categoriesError && (
          <p className="text-xs text-red-300">{categoriesError}</p>
        )}
      </div>

      {/* Sort */}
      <div className="space-y-1">
        <label className="text-sm font-semibold text-white/80">Sort</label>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500/50"
          style={{ colorScheme: "dark" }}
        >
          <option value="default">Default</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>
      </div>
    </div>
  );
}
