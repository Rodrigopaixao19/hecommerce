import React from "react";

import {
  useAuthContext,
  openUserDropdown,
  signoutRedirect,
} from "../../state/authContext";
import Button from "../Button/Button";
import AdminDropDown from "./AdminDropDown";
import ClientDropDown from "./ClientDropDown";
import { useAuthentiate } from "../../hooks/useAuthenticate";
import { isAdmin, isClient } from "../../helpers";
import { useViewContext } from "../../state/viewContext";

const UserDropDown: React.FC = () => {
  const {
    authState: { authUser, userRole },
    authDispatch,
  } = useAuthContext();

  const { viewMode } = useViewContext();

  const { signout } = useAuthentiate();

  return (
    <div className="page page--sidebar">
      <div className="sidebar sidebar-show">
        <div className="sidebar__section sidebar__section--profile">
          <h3 className="header--center header--sidebar">
            {authUser?.displayName}
          </h3>
          <h3 className="header--center header--sidebar">{authUser?.email}</h3>
        </div>

        {isAdmin(userRole) && <AdminDropDown />}

        {(isClient(userRole) ||
          (isAdmin(userRole) && viewMode === "client")) && <ClientDropDown />}

        <div className="sidebar__section">
          <Button
            className="btn--sidebar--signout"
            onClick={() => {
              signout();
              authDispatch(signoutRedirect(true));
            }}
          >
            Sign out
          </Button>
        </div>

        <div className="sidebar__section">
          <Button
            className="sidebar__close"
            onClick={() => authDispatch(openUserDropdown(false))}
          >
            &times;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDropDown;
