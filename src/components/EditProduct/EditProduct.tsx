import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { useAuthContext } from "../../state/authContext";
import { useManageProduct } from "../../hooks/useManageProduct";
import Button from "../Button/Button";

import Input from "../Input/Input";
import { Product } from "../../types/index";
import { categories } from "../../helpers/index";
import { storageRef } from "../../firebase/config";

const fileType = ["image/png", "image/jpeg", "image/jpg"];

interface IEditProductProps {
  setOpenProductForm: (open: boolean) => void;
  productToEdit: Product | null;
  setProductToEdit: (product: Product | null) => void;
}

const EditProduct: React.FC<IEditProductProps> = ({
  setOpenProductForm,
  productToEdit,
  setProductToEdit,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    authState: { authUser },
  } = useAuthContext();
  const {
    addNewProduct,
    editProduct,
    editProductFinished,
    error,
    loading,
    addProductFinished,
    setUploadProgression,
    uploadProgression,
    uploadImageToStorage,
  } = useManageProduct();
  const { register, handleSubmit, errors, reset } = useForm<
    Pick<
      Product,
      | "title"
      | "description"
      | "imageFileName"
      | "price"
      | "category"
      | "inventory"
    >
  >();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (addProductFinished) {
      reset();
      setSelectedFile(null);
      setUploadProgression(0);
    }
  }, [addProductFinished, reset, setUploadProgression, setSelectedFile]);

  useEffect(() => {
    if (editProductFinished) {
      reset();
      setSelectedFile(null);
      setUploadProgression(0);
      setProductToEdit(null);
      setOpenProductForm(false);
    }
  }, [
    editProduct,
    editProductFinished,
    reset,
    setUploadProgression,
    setSelectedFile,
    setProductToEdit,
    setOpenProductForm,
  ]);

  const handleOpenUploadBox = () => {
    if (inputRef?.current) inputRef.current.click();
  };

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || !files[0]) return;

    const file = files[0];

    if (!fileType.includes(file.type)) {
      alert("Wrong file format!");
      return;
    }

    setSelectedFile(file);
  };

  const handleAddProdut = handleSubmit((data) => {
    if (!selectedFile || !authUser) return;

    return uploadImageToStorage(
      selectedFile,
      addNewProduct(data, authUser?.uid)
    );
  });

  const handleEditProduct = handleSubmit(async (data) => {
    if (!productToEdit || !authUser) return;

    const {
      title,
      description,
      price,
      imageFileName,
      category,
      imageRef,
      imageUrl,
      inventory,
    } = productToEdit;

    // check if product data has been changed
    const isNotEdited =
      title === data.title &&
      description === data.description &&
      +price === data.price &&
      imageFileName === data.imageFileName &&
      category === data.category &&
      +inventory === data.inventory;

    if (isNotEdited) return;

    //something has been edited
    if (imageFileName !== data.imageFileName) {
      // if the image has changed
      if (!selectedFile) return;

      // delete old image
      const oldImageRef = storageRef.child(imageRef);
      await oldImageRef.delete();

      return uploadImageToStorage(
        selectedFile,
        editProduct(productToEdit.id, data, authUser.uid)
      );
    } else {
      // img not been changed
      return editProduct(
        productToEdit.id,
        data,
        authUser.uid
      )(imageUrl, imageRef);
    }
  });

  return (
    <>
      <div
        className="backdrop"
        onClick={() => {
          setProductToEdit(null);
          setOpenProductForm(false);
        }}
      ></div>
      <div className="modal modal--add-product">
        <div
          className="modal-close"
          onClick={() => {
            setOpenProductForm(false);
            setProductToEdit(null);
          }}
        >
          &times;
        </div>

        <h2 className="header--center">
          {productToEdit ? "Edit your product" : "Add a new product"}
        </h2>
        <form
          className="form"
          onSubmit={productToEdit ? handleEditProduct : handleAddProdut}
        >
          <Input
            label="Title"
            name="title"
            placeholder="Product Title"
            defaultValue={productToEdit ? productToEdit.title : ""}
            ref={register({
              required: "Title is required.",
              minLength: {
                value: 3,
                message: "Product title must be at list 3 characters",
              },
            })}
            error={errors.title?.message}
          />

          <Input
            label="Description"
            name="description"
            placeholder="Product Description"
            defaultValue={productToEdit ? productToEdit.description : ""}
            ref={register({
              required: "Description is required.",
              minLength: {
                value: 6,
                message: "Product description must be at list 3 characters",
              },
              maxLength: {
                value: 200,
                message: "Product description cannot exceed 200 characters",
              },
            })}
            error={errors.description?.message}
          />
          <Input
            label="Price"
            type="number"
            name="price"
            placeholder="Product Price"
            defaultValue={productToEdit ? productToEdit.price : ""}
            ref={register({
              required: "Price is required.",
              min: {
                value: 1,
                message: "Product must cost least $1 dolar",
              },
            })}
            error={errors.price?.message}
          />

          <div className="form__input-container">
            <label htmlFor="Image" className="form__input-label">
              Image
            </label>
            <div className="form__input-file-upload">
              {uploadProgression ? (
                <div style={{ width: "70%" }}>
                  <input
                    type="text"
                    className="upload-progression"
                    style={{
                      width: `${uploadProgression}%`,
                      color: "white",
                      textAlign: "center",
                    }}
                    value={`${uploadProgression}%`}
                  />
                </div>
              ) : (
                <input
                  type="text"
                  className="input"
                  name="imageFileName"
                  readOnly
                  style={{ width: "70%", cursor: "pointer" }}
                  onClick={handleOpenUploadBox}
                  value={
                    selectedFile
                      ? selectedFile.name
                      : productToEdit
                      ? productToEdit.imageFileName
                      : ""
                  }
                  ref={register({
                    required: "Product image is required to register a product",
                  })}
                />
              )}

              <Button
                width="30%"
                height="100%"
                type="button"
                style={{ borderRadius: "0", border: "1px solid #282c3499" }}
                onClick={handleOpenUploadBox}
              >
                <span className="paragraph--small">Select image</span>
              </Button>

              <input
                ref={inputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleSelectFile}
              />
            </div>

            {errors?.imageFileName && !selectedFile && (
              <p className="paragraph--error-small">
                {errors.imageFileName.message}
              </p>
            )}
          </div>

          <div className="form__input-container">
            <label htmlFor="category" className="form__input-label">
              Category
            </label>

            <select
              name="category"
              className="input"
              defaultValue={productToEdit ? productToEdit.category : undefined}
              ref={register({ required: "Product category is required" })}
              id=""
            >
              <option style={{ display: "none" }}></option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {errors?.category && (
              <p className="paragraph--error-small">
                {errors.category.message}
              </p>
            )}
          </div>

          <Input
            label="Inventory"
            name="inventory"
            type="number"
            placeholder="Product Inventory"
            defaultValue={productToEdit ? productToEdit.inventory : ""}
            ref={register({
              required: "Inventory is required.",
              min: 0,
              pattern: {
                value: /^[1-9]\d*$/,
                message: "Inventory must be a positive whole nubmer",
              },
            })}
            error={errors.inventory?.message}
          />

          <Button
            className="btn--orange"
            width="100%"
            style={{ marginTop: "1rem" }}
            loading={loading}
            disabled={loading}
          >
            Submit
          </Button>
        </form>
        {error && <p className="paragraph paragraph--error">{error}</p>}
      </div>
    </>
  );
};

export default EditProduct;
