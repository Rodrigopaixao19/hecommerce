import { useState } from "react";
import { createImageRef, productsRef } from "../firebase";
import { AddProductData, UploadProduct } from "./../types/index";
import { useAsyncCall } from "./useAsyncCall";
import { firebase } from "../firebase/config";

export const useAddProduct = () => {
  const [uploadProgression, setUploadProgression] = useState(0);
  const [addProductFinished, setAddProductFinished] = useState(false);

  const { loading, setLoading, error, setError } = useAsyncCall();
  const addNewProduct = (
    image: File,
    data: AddProductData,
    creator: string
  ) => {
    const { title, description, price, category, inventory } = data;
    setLoading(true);
    setAddProductFinished(false);

    // upload image to firebase storage and get back image url
    const imageRef = createImageRef(image.name);

    const uploadTask = imageRef.put(image);

    uploadTask.on(
      "state_change",
      (snapshot) => {
        // calculate upload progression
        const progression =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgression(progression);
      },

      (err) => {
        // error case
        setError(err.message);
        setLoading(false);
      },
      () => {
        // success

        // get the image url
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((imageUrl) => {
            // create a new document in the product's collection in the firestore which requires product data and the image url
            const newProduct: UploadProduct = {
              title,
              description,
              price: +price,
              category,
              inventory: +inventory,
              imageUrl,
              imageFileName: image.name,
              imageRef: imageRef.fullPath,
              creator,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            };

            productsRef
              .add(newProduct)
              .then(() => {
                setAddProductFinished(true);
                setLoading(false);
              })
              .catch((err) => {
                const { message } = err as { message: string };

                setError(message);
                setLoading(false);
              });
          })
          .catch((err) => {
            const { message } = err as { message: string };

            setError(message);
            setLoading(false);
          });
      }
    );
  };
  return {
    addNewProduct,
    uploadProgression,
    setUploadProgression,
    addProductFinished,
    loading,
    error,
  };
};
