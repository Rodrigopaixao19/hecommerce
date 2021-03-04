import React, { useEffect } from "react";
import Nav from "../Nav/Nav";

import { useModalContext } from "../../state/modalContext";
import Sidebar from "../Sidebar/Sidebar";
import UserDropDown from "../Sidebar/UserDropDown";

import { useAuthContext, openUserDropdown } from "../../state/authContext";
import { useLocation } from "react-router-dom";
import ViewContextProvider from "../../state/viewContext";

const Layout: React.FC = ({ children }) => {
  const {
    authState: { isUserDropdownOpen },
    authDispatch,
  } = useAuthContext();

  const location = useLocation();

  useEffect(() => {
    if (isUserDropdownOpen) authDispatch(openUserDropdown(false));
  }, [location.pathname]);

  const { modal } = useModalContext();

  return (
    <div>
      {/* <Sidebar /> */}

      <ViewContextProvider>
        <Nav />
        {isUserDropdownOpen && <UserDropDown />}
      </ViewContextProvider>
      <div className="page">{children}</div>

      {modal && modal}
    </div>
  );
};

export default Layout;
