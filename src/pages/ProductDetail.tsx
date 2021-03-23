import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button/Button";
import Spinner from "../components/Spinner/Spinner";
import { formatAmount, isAdmin, isClient } from "../helpers";
import { useAuthContext } from "../state/authContext";
import { useModalContext } from "../state/modalContext";
import { useProductContext } from "../state/productContext";

import { Product } from "../types/index";
import PageNotFound from "./PageNotFound";

interface Props {}

const ProductDetail: React.FC<Props> = () => {
  const {
    productState: { products, loading },
  } = useProductContext();

  const {
    authState: { authUser, userRole },
  } = useAuthContext();
  const { setModalType } = useModalContext();

  const params = useParams() as { productId: string };

  const [product, setProduct] = useState<Product | undefined>();

  useEffect(() => {
    const prod = products.All.find((item) => item.id === params.productId);

    if (prod) setProduct(prod);
    else setProduct(undefined);
  }, [params, products.All]);

  if (loading) return <Spinner color="grey" width={50} height={50} />;

  if (!product) return <PageNotFound />;

  return (
    <div className="page--product-detail">
      <div className="product-detail__section">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="product-image"
        />
      </div>
      <div className="product-detail__section">
        <div className="product-detail__sub-section">
          <h3 className="header">{product.title}</h3>
          <p className="paragraph">{product.description}</p>
        </div>
        <div className="product-detail__sub-section">
          <p className="paragraph">
            Price:{" "}
            <span className="paragraph--orange">
              ${formatAmount(product.price)}
            </span>
          </p>
        </div>
        <div className="product-detail__sub-section product-detail__sub-section--stock">
          <p className="paragraph">
            Availability:{" "}
            <span
              className={`paragraph--success ${
                product.inventory === 0 ? "paragraph--error" : undefined
              }`}
            >
              {product.inventory === 0
                ? "Out of stock"
                : `${product.inventory}`}
            </span>
          </p>
        </div>
        <div className="product-detail__sub-section quantity-control">
          <div className="qty-action">
            <FontAwesomeIcon icon={["fas", "minus"]} size="xs" color="grey" />
          </div>
          <div className="qty-action qty-action--qty">
            <p className="paragraph">1</p>
          </div>
          <div className="qty-action">
            <FontAwesomeIcon icon={["fas", "plus"]} size="xs" color="grey" />
          </div>
        </div>

        <Button
          disabled={product.inventory === 0}
          onClick={() => {
            if (!authUser) {
              setModalType("signin");
              return;
            } else if (authUser && isAdmin(userRole)) {
              alert("You are an admit, you can't proceed");
              return;
            }
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
