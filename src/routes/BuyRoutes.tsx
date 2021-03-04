import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { isClient } from "../helpers";

import Checkout from "../pages/Checkout";
import MyCart from "../pages/MyCart";
import PageNotFound from "../pages/PageNotFound";
import SelectAddress from "../pages/SelectAddress";
import { Role } from "../types";

const BuyRoutes: React.FC = (props) => {
  const { userRole } = props as { userRole: Role | null };

  if (!isClient(userRole)) return <Redirect to="buy/my-cart" />;

  return (
    <Switch>
      <Route path="/buy/my-cart" component={MyCart} />
      <Route path="/buy/select-address" component={SelectAddress} />
      <Route path="/buy/checkout" component={Checkout} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
};

export default BuyRoutes;
