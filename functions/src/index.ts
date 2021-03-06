//@ts-ignore
import * as functions from "firebase-functions";

import * as admin from "firebase-admin";

admin.initializeApp();

const env = functions.config();

const productsCollection = "products";
const productsCountsCollection = "product-counts";
const productCountsDocument = "counts";

// product-counts --> counts --> {All: 0, Clothing: 3, Shoes: 2, Watched: 2, Accessories: 3}

type ProductCategory = "Clothing" | "Shoes" | "Watches" | "Accessories";
type Counts = {
  [key in "All" | ProductCategory]: number;
};

type Product = {
  title: string;
  description: string;
  imageUrl: string;
  imageRef: string;
  imageFileName: string;
  price: number;
  category: ProductCategory;
  inventory: number;
  creator: string;
};

export const onSignup = functions.https.onCall(async (data, context) => {
  try {
    const { username } = data as { username: string };

    if (!context.auth?.uid) return;

    // 1. Create a role on the user in the firebase authentication

    await admin.auth().setCustomUserClaims(context.auth.uid, {
      role:
        context.auth.token.email === env.admin.super_admin
          ? "SUPER_ADMIN"
          : "CLIENT",
    });

    // 2. Create new user documentin the user collection in firestore
    const result = await admin
      .firestore()
      .collection("users")
      .doc(context.auth?.uid)
      .set({
        username,
        email: context.auth.token.email,
        role:
          context.auth.token.email === env.admin.super_admin
            ? "SUPER_ADMIN"
            : "CLIENT",
        createAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    if (!result) return;

    return {
      message: "User has been created on firestore.",
    };
  } catch (error) {
    throw error;
  }
});

export const onProductCreated = functions.firestore
  .document(`${productsCollection}/{productId}`)
  .onCreate(async (snapshot, context) => {
    const product = snapshot.data() as Product;

    let counts: Counts;

    // query the product-count collection
    const countData = await admin
      .firestore()
      .collection(productsCountsCollection)
      .doc(productCountsDocument)
      .get();

    if (!countData.exists) {
      // first product item
      // construct count object
      counts = {
        All: 1,
        Clothing: product.category === "Clothing" ? 1 : 0,
        Shoes: product.category === "Shoes" ? 1 : 0,
        Watches: product.category === "Watches" ? 1 : 0,
        Accessories: product.category === "Accessories" ? 1 : 0,
      };
    } else {
      const {
        All,
        Clothing,
        Shoes,
        Watches,
        Accessories,
      } = countData.data() as Counts;
      counts = {
        All: All + 1,
        Clothing: product.category === "Clothing" ? Clothing + 1 : Clothing,
        Shoes: product.category === "Shoes" ? Shoes + 1 : Shoes,
        Watches: product.category === "Watches" ? Watches + 1 : Watches,
        Accessories:
          product.category === "Accessories" ? Accessories + 1 : Accessories,
      };
    }

    // update the count document in the product-counts collection
    return admin
      .firestore()
      .collection(productsCountsCollection)
      .doc(productCountsDocument)
      .set(counts);
  });

export const onProductUpdated = functions.firestore
  .document(`${productsCollection}/{productId}`)
  .onUpdate(async (snapshot, context) => {
    const beforeUpdateProduct = snapshot.before.data() as Product;
    const afterUpdatedProduct = snapshot.after.data() as Product;

    // check if the category has been changed if not changed return
    if (beforeUpdateProduct.category === afterUpdatedProduct.category) return;

    // category has been changed

    const countsData = await admin
      .firestore()
      .collection(productsCountsCollection)
      .doc(productCountsDocument)
      .get();

    if (!countsData.exists) return;

    const counts = countsData.data() as Counts;

    // updated counts object by removing one
    counts[beforeUpdateProduct.category] =
      counts[beforeUpdateProduct.category] - 1;

    // finally updating by increasing by one
    counts[afterUpdatedProduct.category] =
      counts[afterUpdatedProduct.category] + 1;

    // return
    return admin
      .firestore()
      .collection(productsCountsCollection)
      .doc(productCountsDocument)
      .set(counts);
  });
export const onProductDeleted = functions.firestore
  .document(`${productsCollection}/{productId}`)
  .onDelete(async (snapshot, context) => {
    const product = snapshot.data() as Product;

    // query product counts/counts from firestore
    const countsData = await admin
      .firestore()
      .collection(productsCountsCollection)
      .doc(productCountsDocument)
      .get();

    if (!countsData.exists) return;

    const counts = countsData.data() as Counts;
    // finally updating by increasing by one
    counts.All = counts.All - 1;
    counts[product.category] = counts[product.category] - 1;

    // return
    return admin
      .firestore()
      .collection(productsCountsCollection)
      .doc(productCountsDocument)
      .set(counts);
  });
