import React, { useState } from "react";
import Button from "../components/Button/Button";
import AdminProductItem from "../components/EditProduct/AdminProductItem";
import EditProduct from "../components/EditProduct/EditProduct";
import Spinner from "../components/Spinner/Spinner";
import { useProductContext } from "../state/productContext";

interface IManageProps {}

const ManageProducts: React.FC<IManageProps> = () => {
  const [openProductForm, setOpenProductForm] = useState(false);
  const {
    productDisptach,
    productState: { products, loading },
  } = useProductContext();

  if (loading) return <Spinner color="grey" width={50} height={50} />;

  if (!loading && products.All.length === 0)
    return <h2 className="header--center">No products registered</h2>;

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
          <EditProduct setOpenProductForm={setOpenProductForm} />
        )}
      </div>

      <div className="manage-products__section">
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
              <AdminProductItem key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
