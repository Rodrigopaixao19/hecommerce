import React from "react";
import { NavLink } from "react-router-dom";

const ClientDropDown: React.FC = () => {
  return (
    <div className="sidebar__section sidebar__section--nav">
      <li className="list">
        <NavLink to="/products" className="list-link">
          Products
        </NavLink>
      </li>
      <li className="list">
        <NavLink to="/buy/my-cart" className="list-link">
          My cart
        </NavLink>
      </li>
      <li className="list">
        <NavLink to="/orders/my-orders" className="list-link">
          My orders
        </NavLink>
      </li>
    </div>
  );
};

export default ClientDropDown;
