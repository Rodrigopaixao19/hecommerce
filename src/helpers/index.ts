import { Role, ProductCategory, cartItem } from "../types";

export const isAdmin = (role: Role | null) =>
  role === "ADMIN" || role === "SUPER_ADMIN";

export const isClient = (role: Role | null) => role === "CLIENT";

export const categories: ProductCategory[] = [
  "Clothing",
  "Shoes",
  "Watches",
  "Accessories",
];

export const formatAmount = (amout: number) =>
  amout.toLocaleString("en", {
    minimumFractionDigits: 2,
  });

export const calculateCartQuantity = (cart: cartItem[]) =>
  cart.reduce((qty, item) => qty + item.quantity, 0);

export const calculateCartAmount = (cart: cartItem[]) =>
  cart.reduce(
    (amount, cartItem) => amount + cartItem.quantity * cartItem.item.price,
    0
  );
