import { v4 as uuidv4 } from "uuid";

import { db, firebase, storageRef } from "./config";

import { UserInfo, Product, cartItem } from "../types";

export const usersRef = db.collection("users");
export const productsRef = db.collection("products");
export const productsCountsRef = db.collection("product-counts");
export const cartRef = db.collection("cart");

export const productImagesFolder = "products";

export const snapshotToDoc = <T extends UserInfo | Product | cartItem>(
  doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
) => {
  const docData = doc.data() as T;
  const docObject: T = {
    ...docData,
    id: doc.id,
  };

  return docObject;
};

export const createImageRef = (imageName: string) => {
  const uuid = uuidv4();
  return storageRef.child(`${productImagesFolder}/${imageName}-${uuid}`);
};
