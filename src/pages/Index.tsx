import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ProductItem from "../components/Products/ProductItem";
import Spinner from "../components/Spinner/Spinner";

import { useAuthContext } from "../state/authContext";
import { useModalContext } from "../state/modalContext";
import { useProductContext } from "../state/productContext";

interface Props {}

const Index: React.FC<Props> = () => {
  const history = useHistory<{ from: string }>();

  const { state } = history.location;

  const {
    authState: { authUser, signoutRedirect },
  } = useAuthContext();

  const {
    productState: { products, loading },
  } = useProductContext();

  const { setModalType } = useModalContext();

  useEffect(() => {
    // OPEN THE SIGN IN MODAL AFTER THE USER HAS BEEN REDIRECTED FROM SOME PRIVATE ROUTE
    if (!signoutRedirect) {
      if (state?.from) {
        if (!authUser) setModalType("signin");
        else history.push(state.from);
      }
    } else {
      //deleteing state object
      history.replace("/", undefined);
    }
  }, [setModalType, authUser, state, history, signoutRedirect]);

  if (loading) return <Spinner color="grey" width={50} height={50} />;

  if (!loading && products.All.length === 0)
    return <h2 className="header--center">No products registered</h2>;

  return (
    <div className="page--products">
      <div className="products">
        {products.All.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Index;
