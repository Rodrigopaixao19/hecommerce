import React, { useState } from "react";
import Button from "../components/Button/Button";
import EditProduct from "../components/EditProduct/EditProduct";

const ManageProducts: React.FC = () => {
  const [openProductForm, setOpenProductForm] = useState(false);
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

      <div className="manage-products__section"></div>
    </div>
  );
};

export default ManageProducts;
