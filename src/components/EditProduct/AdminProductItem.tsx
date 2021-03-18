import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { formatAmount } from "../../helpers";
import { Product } from "../../types";
import { useManageProduct } from "../../hooks/useManageProduct";
import Spinner from "../Spinner/Spinner";

interface IProductItemProps {
  product: Product;
  setOpenProductForm: (open: boolean) => void;
  setProductToEdit: (product: Product | null) => void;
}

const AdminProductItem: React.FC<IProductItemProps> = ({
  product,
  setOpenProductForm,
  setProductToEdit,
}) => {
  const { deleteProduct, loading } = useManageProduct();

  return (
    <tr>
      <td className="table-cell">{product.title}</td>
      <td className="table-cell">
        <img src={product.imageUrl} alt={product.title} width="30px" />
      </td>
      <td className="table-cell">{formatAmount(product.price)}</td>
      <td className="table-cell table-cell--hide">
        {product.createdAt && product.createdAt.toDate().toDateString()}
      </td>
      <td className="table-cell table-cell--hide">
        {product.updated && product.updated.toDate().toDateString()}
      </td>
      <td className="table-cell">{product.inventory}</td>
      <td
        className="table-cell table-cell--icon"
        onClick={() => {
          setOpenProductForm(true);
          setProductToEdit(product);
        }}
      >
        <FontAwesomeIcon icon={["fas", "edit"]} size="1x" />
      </td>
      <td className="table-cell table-cell--icon">
        {loading ? (
          <Spinner color="grey" />
        ) : (
          <FontAwesomeIcon
            icon={["fas", "trash-alt"]}
            size="1x"
            color="red"
            onClick={() => deleteProduct(product)}
          />
        )}
      </td>
    </tr>
  );
};

export default AdminProductItem;
