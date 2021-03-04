import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";

import Index from "../pages/Index";

import PageNotFound from "../pages/PageNotFound";
import ProductDetail from "../pages/ProductDetail";
import Products from "../pages/Products";

import AdminRoutes from "./AdminRoutes";
import BuyRoutes from "./BuyRoutes";
import OrderRoutes from "./OrderRoutes";
import PrivateRoutes from "./PrivateRoutes";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/buy">
        <PrivateRoutes>
          <BuyRoutes />
        </PrivateRoutes>
      </Route>
      <Route path="/orders">
        <PrivateRoutes>
          <OrderRoutes />
        </PrivateRoutes>
      </Route>
      <Route path="/admin">
        <PrivateRoutes>
          <AdminRoutes />
        </PrivateRoutes>
      </Route>
      <Route path="/products/:productId" component={ProductDetail} />
      <Route path="/products" component={Products} />
      <Route exact path="/" component={Index} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
};

export default Routes;
