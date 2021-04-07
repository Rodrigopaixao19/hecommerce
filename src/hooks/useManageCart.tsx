import { useAsyncCall } from "./useAsyncCall";

import { cartRef } from "../firebase/index";

import { firebase } from "../firebase/config";

// types
import { UploadCartItem, cartItem } from "../types/index";

export const useManageCart = () => {
  const { loading, setLoading, error, setError } = useAsyncCall();

  const addToCart = async (
    productId: string,
    quantity: number,
    userId: string,
    inventory: number
  ) => {
    try {
      setLoading(true);
      // query the cart item from firestore

      const cartItemRef = cartRef.doc(`${userId}-${productId}-`);
      const snapshot = await cartItemRef.get();
      let cartItem: UploadCartItem;
      if (!snapshot.exists) {
        // the select product is not item the cart yet, create new cart item

        //construct cart item
        cartItem = {
          product: productId,
          quantity,
          user: userId,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
      } else {
        // the selected product is already in the cart, do not create new cart item, UPDATE THE QUANTITY
        const currentCartItem = snapshot.data() as UploadCartItem;

        cartItem = {
          ...currentCartItem,
          quantity:
            currentCartItem.quantity + quantity > inventory
              ? inventory
              : currentCartItem.quantity + quantity,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
      }

      // cartitem will be one of the above depending which condition is MET
      await cartItemRef.set(cartItem);
      setLoading(false);
      return true;
    } catch (err) {
      const { message } = err as { message: string };

      setError(message);

      setLoading(false);

      return false;
    }
  };
  return {
    addToCart,
    loading,
    error,
  };
};
