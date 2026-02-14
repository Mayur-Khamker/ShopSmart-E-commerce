const BASE_URL = "https://fakestoreapi.com";

function enrichProduct(p) {
  // fake rating + discount
  const rating = p?.rating?.rate ?? Number((3.5 + Math.random() * 1.4).toFixed(1));

  const discountPercent =
    p.id % 5 === 0 ? 40 :
    p.id % 4 === 0 ? 30 :
    p.id % 3 === 0 ? 20 :
    p.id % 2 === 0 ? 10 : 0;

  const originalPrice =
    discountPercent > 0
      ? Number((p.price / (1 - discountPercent / 100)).toFixed(2))
      : p.price;

  return {
    ...p,
    rating,
    discountPercent,
    originalPrice,
    isDeal: discountPercent >= 20,
    isFeatured: p.id % 2 === 0,
    isTrending: p.id % 3 === 0,
    isNew: p.id % 4 === 0,
  };
}

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.map(enrichProduct);
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  const data = await res.json();
  return enrichProduct(data);
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return await res.json();
}
