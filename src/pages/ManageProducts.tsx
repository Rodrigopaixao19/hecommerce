import React, { useState } from "react";
import Button from "../components/Button/Button";
import AlertDialog from "../components/Dialogs/AlertdDialog";

import AdminProductItem from "../components/EditProduct/AdminProductItem";
import EditProduct from "../components/EditProduct/EditProduct";
import Spinner from "../components/Spinner/Spinner";
import { useDialog } from "../hooks/useDialog";
import { useManageProduct } from "../hooks/useManageProduct";

import { useProductContext } from "../state/productContext";
import { Product } from "../types";

interface IManageProps {}

const ManageProducts: React.FC<IManageProps> = () => {
  const [openProductForm, setOpenProductForm] = useState(false);

  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const {
    productDisptach,
    productState: { products, loading, error },
  } = useProductContext();

  const {
    deleteProduct,
    loading: deleteProductLoading,
    error: deleteProductError,
  } = useManageProduct();

  const { openDialog, setOpenDialog } = useDialog();

  if (loading) return <Spinner color="grey" width={50} height={50} />;

  return (
    <div className="page--manage-products">
      <div className="manage-products__section">
        <Button
          className="btn--orange"
          width="12rem"
          onClick={() => setOpenProductForm(true)}
        >
          Add new product
        </Button>

        {openProductForm && (
          <EditProduct
            setOpenProductForm={setOpenProductForm}
            productToEdit={productToEdit}
            setProductToEdit={setProductToEdit}
          />
        )}
      </div>

      <div className="manage-products__section">
        {!loading && products.All.length === 0 ? (
          <h2 className="header--center">
            No products registered, let's add one!{" "}
          </h2>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th className="table-cell">Title</th>
                <th className="table-cell">Image</th>
                <th className="table-cell">Price ($)</th>
                <th className="table-cell table-cell--hide">Created At</th>
                <th className="table-cell table-cell--hide">Updated At</th>
                <th className="table-cell">Inventory</th>
              </tr>
            </thead>

            <tbody>
              {products.All.map((product) => (
                <AdminProductItem
                  key={product.id}
                  product={product}
                  setOpenProductForm={setOpenProductForm}
                  setProductToEdit={setProductToEdit}
                  setOpenDialog={setOpenDialog}
                  setProductToDelete={setProductToDelete}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {error && <p className="paragraph paragraph-error">{error}</p>}

      {openDialog && (
        <AlertDialog
          header="Please confirm"
          message={`Are you sure you want to delete ${
            productToDelete ? productToDelete?.title : "item"
          }?`}
          onCancel={() => {
            setProductToDelete(null);
            setOpenDialog(false);
          }}
          onConfirm={async () => {
            // Delete product
            if (productToDelete) {
              const finished = await deleteProduct(productToDelete);
              if (finished) setOpenDialog(false);
            }
          }}
          loading={deleteProductLoading}
          error={deleteProductError}
        />
      )}
    </div>
  );
};

export default ManageProducts;
