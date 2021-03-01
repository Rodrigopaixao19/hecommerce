import React from "react";

import { useAuthContext, openUserDropdown } from "../../state/authContext";
import Button from "../Button/Button";
import AdminDropDown from "./AdminDropDown";
import ClientDropDown from "./ClientDropDown";
import { useAuthentiate } from "../../hooks/useAuthenticate";

const UserDropDown: React.FC = () => {
  const {
    authState: { authUser },
    authDispatch,
  } = useAuthContext();

  const { signout } = useAuthentiate();

  return (
    <div className="page page--sidebar">
      <div
        className="sidebar sidebar-show"
        onMouseLeave={() => authDispatch(openUserDropdown(false))}
      >
        <div className="sidebar__section sidebar__section--profile">
          <h3 className="header--center header--sidebar">
            {authUser?.displayName}
          </h3>
          <h3 className="header--center header--sidebar">{authUser?.email}</h3>
        </div>

        <ClientDropDown />

        {/* <AdminDropDown/> */}

        <div className="sidebar__section">
          <Button className="btn--sidebar--signout" onClick={() => signout()}>
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
