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

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/buy">
        <BuyRoutes />
      </Route>
      <Route path="/orders">
        <OrderRoutes />
      </Route>
      <Route path="/admin">
        <AdminRoutes />
      </Route>
      <Route path="/products/:productId" component={ProductDetail} />
      <Route path="/products" component={Products} />
      <Route exact path="/" component={Index} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
};

export default Routes;
