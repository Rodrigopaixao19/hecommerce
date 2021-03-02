import React from "react";
import { Route, Switch } from "react-router-dom";

import OrderDetail from "../pages/OrderDetail";
import Orders from "../pages/Orders";
import PageNotFound from "../pages/PageNotFound";
import PrivateRoutes from "./PrivateRoutes";

interface Props {}

const OrderRoutes: React.FC = (props: Props) => {
  const {} = props;

  return (
    <PrivateRoutes>
      <Switch>
        <Route path="/orders/my-orders/:id" component={OrderDetail} />
        <Route path="/orders/my-orders" component={Orders} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </PrivateRoutes>
  );
};

export default OrderRoutes;
