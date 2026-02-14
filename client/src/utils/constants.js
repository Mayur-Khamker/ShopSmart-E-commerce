export const APP_NAME = "ShopSmart";

export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAILS: (id = ":id") => `/products/${id}`,
  CART: "/cart",
  WISHLIST: "/wishlist",
  LOGIN: "/login",
};
