import React from "react";
import { NavLink } from "react-router-dom";

import { useAuthContext } from "../../state/authContext";
import Button from "../Button/Button";

const Sidebar: React.FC = () => {
  const {
    authState: { authUser },
  } = useAuthContext();

  return (
    <div className="page page--sidebar">
      <div className="backdrop"></div>
      <div className="sidebar sidebar-show">
        <div className="sidebar__section sidebar__section--profile">
          <h3 className="header--center header--sidebar">
            {authUser?.displayName}
          </h3>
          <h3 className="header--center header--sidebar">{authUser?.email}</h3>
        </div>

        <div className="sidebar__section sidebar__section--nav">
          <li className="list">
            <NavLink to="/product" className="list-link">
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

        {/* <div className="sidebar__section">

        </div> */}

        <div className="sidebar__section">
          <Button className="btn--sidebar--signout">Sign out</Button>
        </div>

        <div className="sidebar__section">
          <Button className="sidebar__close">&times;</Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
