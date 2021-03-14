import { useState } from "react";
import { createImageRef, productsRef } from "../firebase";
import { AddProductData, UploadProduct } from "../types/index";
import { useAsyncCall } from "./useAsyncCall";
import { firebase } from "../firebase/config";

export const useManageProduct = () => {
  const [uploadProgression, setUploadProgression] = useState(0);
  const [addProductFinished, setAddProductFinished] = useState(false);

  const { loading, setLoading, error, setError } = useAsyncCall();
  const uploadImageToStorage = (
    image: File,
    callback: (imageUrl: string, imagePath: string) => void
  ) => {
    setLoading(true);
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
            callback(imageUrl, imageRef.fullPath);
          })
          .catch((err) => {
            const { message } = err as { message: string };

            setError(message);
            setLoading(false);
          });
      }
    );
  };

  const addNewProduct = (data: AddProductData, creator: string) => (
    imageUrl: string,
    imagePath: string
  ) => {
    const {
      title,
      description,
      imageFileName,
      price,
      category,
      inventory,
    } = data;
    setLoading(true);
    setAddProductFinished(false);

    // create a new document in the product's collection in the firestore which requires product data and the image url
    const newProduct: UploadProduct = {
      title,
      description,
      price: +price,
      category,
      inventory: +inventory,
      imageUrl,
      imageFileName: imageFileName,
      imageRef: imagePath,
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
  };
  return {
    uploadImageToStorage,
    addNewProduct,
    uploadProgression,
    setUploadProgression,
    addProductFinished,
    loading,
    error,
  };
};
