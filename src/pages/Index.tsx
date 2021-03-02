import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ProductItem from "../components/Products/ProductItem";
import { products } from "../data/products";
import { useAuthContext } from "../state/authContext";
import { useModalContext } from "../state/modalContext";

interface Props {}

const Index: React.FC<Props> = () => {
  const history = useHistory<{ from: string }>();

  const { state } = history.location;

  const {
    authState: { authUser, signoutRedirect },
  } = useAuthContext();

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

  return (
    <div className="page--products">
      <div className="products">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Index;
