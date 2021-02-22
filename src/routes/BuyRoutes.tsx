import React from "react";
import { Route, Switch } from "react-router-dom";

import Checkout from "../pages/Checkout";
import MyCart from "../pages/MyCart";
import PageNotFound from "../pages/PageNotFound";
import SelectAddress from "../pages/SelectAddress";

interface Props {}

const BuyRoutes: React.FC = (props: Props) => {
  const {} = props;

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
