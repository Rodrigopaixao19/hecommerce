import React, { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "../Button/Button";
import Input from "../Input/Input";
import { Product } from "../../types/index";
import { categories } from "../../helpers/index";

const fileType = ["image/png", "image/jpeg", "image/jpg"];

interface IEditProductProps {
  setOpenProductForm: (open: boolean) => void;
}

const EditProduct: React.FC<IEditProductProps> = ({ setOpenProductForm }) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const { register, handleSubmit, errors } = useForm<
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
    console.log(data);
  });

  console.log(selectedFile);

  return (
    <>
      <div className="backdrop" onClick={() => setOpenProductForm(false)}></div>
      <div className="modal modal--add-product">
        <div className="modal-close" onClick={() => setOpenProductForm(false)}>
          &times;
        </div>

        <h2 className="header--center">Add a new product</h2>
        <form className="form" onSubmit={handleAddProdut}>
          <Input
            label="Title"
            name="title"
            placeholder="Product Title"
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
              <input
                type="text"
                className="input"
                name="imageFileName"
                readOnly
                style={{ width: "70%", cursor: "pointer" }}
                onClick={handleOpenUploadBox}
                value={selectedFile ? selectedFile.name : ""}
                ref={register({
                  required: "Product image is required to register a product",
                })}
              />

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
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
