import React from "react";
import { NavLink } from "react-router-dom";
import { useViewContext } from "../../state/viewContext";

const AdminDropDown: React.FC = () => {
  const { setViewMode, viewMode } = useViewContext();
  return (
    <>
      <div className="sidebar__section">
        <h3
          className="header--center header--orange header--link"
          onClick={() =>
            setViewMode((prev) => (prev === "admin" ? "client" : "admin"))
          }
        >
          {viewMode === "admin"
            ? "Switch to client view"
            : "Switch to admin view"}
        </h3>
      </div>

      {viewMode === "admin" && (
        <div className="sidebar__section sidebar__section--nav">
          <li className="list">
            <NavLink to="/admin/manage-products" className="list-link">
              Manage Products
            </NavLink>
          </li>
          <li className="list">
            <NavLink to="/admin/manage-orders" className="list-link">
              Manage Orders
            </NavLink>
          </li>
          <li className="list">
            <NavLink to="/admin/manage-users" className="list-link">
              Manage Users
            </NavLink>
          </li>
        </div>
      )}
    </>
  );
};

export default AdminDropDown;
