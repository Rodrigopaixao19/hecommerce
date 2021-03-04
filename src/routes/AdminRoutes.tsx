import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { isAdmin } from "../helpers";

import ManageOrderDetail from "../pages/ManageOrderDetail";
import ManageOrders from "../pages/ManageOrders";
import ManageProducts from "../pages/ManageProducts";
import ManageUsers from "../pages/ManageUsers";
import PageNotFound from "../pages/PageNotFound";
import { Role } from "../types";

const AdminRoutes: React.FC = (props) => {
  const { userRole } = props as { userRole: Role | null };

  if (!isAdmin(userRole)) return <Redirect to="buy/my-cart" />;

  return (
    <Switch>
      <Route path="/admin/manage-products" component={ManageProducts} />
      <Route path="/admin/manage-orders/:id" component={ManageOrderDetail} />
      <Route path="/admin/manage-orders" component={ManageOrders} />
      <Route path="/admin/manage-users" component={ManageUsers} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
};

export default AdminRoutes;
