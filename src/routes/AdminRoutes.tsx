import React from "react";
import { Route, Switch } from "react-router-dom";

import ManageOrderDetail from "../pages/ManageOrderDetail";
import ManageOrders from "../pages/ManageOrders";
import ManageProducts from "../pages/ManageProducts";
import ManageUsers from "../pages/ManageUsers";
import PageNotFound from "../pages/PageNotFound";

interface Props {}

const AdminRoutes: React.FC = (props: Props) => {
  const {} = props;

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
