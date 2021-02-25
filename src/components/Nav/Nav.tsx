import React from "react";
import { NavLink } from "react-router-dom";
import { useModalContext } from "../../state/modalContext";
import Button from "../Button/Button";

const Nav: React.FC = () => {
  const { modal, setModalType } = useModalContext();

  return (
    <header className="head">
      <div className="head__section">
        <div className="head__logo">
          <NavLink to="/">
            <h2 className="header header--logo">Ecommerce Shop</h2>
          </NavLink>
        </div>
        <div className="head__search">
          <div className="search-input">
            <input type="text" placeholder="Search" className="search" />
          </div>
          <Button className="btn--search">Search</Button>
        </div>
        <nav className="head__navbar">
          <ul className="navbar">
            <div className="navbar__list">
              <div className="navbar__profile">
                <Button className="btn--sign">Sign in</Button>
                <Button
                  className="btn--sign"
                  onClick={() => setModalType("signup")}
                >
                  Sign up
                </Button>
              </div>
            </div>
          </ul>
        </nav>

        {/* <NavLink to="/" className="list-link">
          Home
        </NavLink>
        <NavLink to="/products" className="list-link">
          Products
        </NavLink>
        <NavLink to="/buy/my-cart" className="list-link">
          Cart
        </NavLink>
        <NavLink to="/buy/select-address" className="list-link">
          Select Address
        </NavLink>
        <NavLink to="/buy/checkout" className="list-link">
          Checkout
        </NavLink>
        <NavLink to="/orders/my-orders" className="list-link">
          Orders
        </NavLink>
        <NavLink to="/admin/manage-products" className="list-link">
          Manage Products
        </NavLink>
        <NavLink to="/admin/manage-orders" className="list-link">
          Manage Orders
        </NavLink>
        <NavLink to="/admin/manage-users" className="list-link">
          Manage Users
        </NavLink> */}
      </div>
    </header>
  );
};

export default Nav;
