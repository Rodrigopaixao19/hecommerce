import React, { ReactElement } from "react";
import { Redirect, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { useAuthContext } from "../state/authContext";

const PrivateRoutes: React.FC = ({ children }) => {
  const location = useLocation();

  const {
    authState: { authUser, userRole, authChecked },
  } = useAuthContext();

  if (!authChecked && (!authUser || !userRole))
    return <Spinner color="grey" height={50} width={50} />;

  if (authChecked && (!authUser || !userRole))
    return (
      <Redirect
        to={{
          pathname: "/",
          state: {
            from: location.pathname,
          },
        }}
      />
    );

  return (
    <>
      {React.Children.map(children as ReactElement, (child) =>
        React.cloneElement(child, { userRole })
      )}
    </>
  );
};

export default PrivateRoutes;
