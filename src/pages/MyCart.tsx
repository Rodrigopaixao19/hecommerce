import React from "react";
import { useHistory } from "react-router";
import Button from "../components/Button/Button";
import Spinner from "../components/Spinner/Spinner";
import {
  calculateCartAmount,
  calculateCartQuantity,
  formatAmount,
} from "../helpers";
import { useCartContext } from "../state/cartContext";

const MyCart: React.FC = () => {
  const { cart } = useCartContext();
  const history = useHistory();

  if (!cart) return <Spinner color="grey" height={25} width={25} />;

  if (cart && cart.length === 0) {
    return (
      <h2 className="header--center">
        Your cart is empty, start{" "}
        <span
          className="header--orange header--link"
          onClick={() => history.push("/")}
        >
          shopping?
        </span>
      </h2>
    );
  }

  return (
    <div className="page--my-cart">
      <div className="cart">
        <h2 className="header">Shopping Cart</h2>
        <div className="cart-detail">
          {cart.map((item) => (
            <p key={item.id}>{item.quantity}</p>
          ))}
        </div>
      </div>
      <div className="cart-summary">
        <h3 className="header">Cart Summary: </h3>

        <div>
          <p className="paragraph">
            Quantity:{" "}
            <span className="paragraph paragraph--orange paragraph--focus">
              {calculateCartQuantity(cart)}
            </span>
          </p>

          <p className="paragraph">
            Amount:{" "}
            <span className="paragraph paragraph--orange paragraph--focus">
              ${formatAmount(calculateCartAmount(cart))}
            </span>
          </p>
        </div>
        <Button
          className="btn--orange"
          width="100%"
          style={{ margin: "1rem 0" }}
          onClick={() => history.push("/buy/select-address")}
        >
          Proceed to checkout
        </Button>
      </div>
    </div>
  );
};

export default MyCart;
