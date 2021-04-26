import { firebase } from "../firebase/config";

export type AuthUser = firebase.User;

export type SignUpData = {
  username: string;
  email: string;
  password: string;
};

export type Provider = "facebook" | "google";

export type Role = "SUPER_ADMIN" | "CLIENT" | "ADMIN";

export type Address = {
  index?: number;
  fullname: string;
  address1: string;
  address2?: string;
  city: string;
  zipCode: string;
  phone: string;
};

export type UserInfo = {
  id: string;
  username: string;
  email: string;
  role: Role;
  createdAt: firebase.firestore.Timestamp;
  shippingAddresses?: Address[];
  stripeCustomerId?: string;
  updatedAt?: firebase.firestore.Timestamp;
};

export type ProductCategory = "Clothing" | "Shoes" | "Watches" | "Accessories";
export type ProductTab = "All" | ProductCategory;

export type Product = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageRef: string;
  imageFileName: string;
  price: number;
  category: ProductCategory;
  inventory: number;
  creator: string;
  createdAt: firebase.firestore.Timestamp;
  updated?: firebase.firestore.Timestamp;
};

// product type use to upload a document in firestore
export type UploadProduct = Omit<Product, "id" | "createdAt" | "updatedAt"> & {
  createdAt?: firebase.firestore.FieldValue;
  updatedAt?: firebase.firestore.FieldValue;
};

export type AddProductData = Pick<
  Product,
  "title" | "description" | "imageFileName" | "price" | "category" | "inventory"
>;

/**
 * CART ITEM
 **/

export type cartItem = {
  id: string;
  product: string;
  quantity: number;
  user: string;
  item: Product;
  createdAt: firebase.firestore.Timestamp;
  updatedAt?: firebase.firestore.Timestamp;
};

export type UploadCartItem = Omit<
  cartItem,
  "id" | "createdAt" | "updatedAt" | "item"
> & {
  createdAt: firebase.firestore.FieldValue;
  updatedAt?: firebase.firestore.FieldValue;
};
