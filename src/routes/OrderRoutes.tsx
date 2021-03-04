import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { isClient } from "../helpers";

import OrderDetail from "../pages/OrderDetail";
import Orders from "../pages/Orders";
import PageNotFound from "../pages/PageNotFound";
import { Role } from "../types";

const OrderRoutes: React.FC = (props) => {
  const { userRole } = props as { userRole: Role | null };

  if (!isClient(userRole)) return <Redirect to="/" />;

  return (
    <Switch>
      <Route path="/orders/my-orders/:id" component={OrderDetail} />
      <Route path="/orders/my-orders" component={Orders} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
};

export default OrderRoutes;
