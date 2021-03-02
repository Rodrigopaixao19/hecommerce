import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { useAuthContext } from "../state/authContext";

const PrivateRoutes: React.FC = ({ children }) => {
  const [authCheck, setAuthCheck] = useState(false);
  const location = useLocation();

  const {
    authState: { authUser },
  } = useAuthContext();

  useEffect(() => {
    const checkAuth = setTimeout(() => {
      setAuthCheck(true);
    }, 2000);

    return () => clearTimeout(checkAuth);
  }, [authUser]);

  if (!authCheck && !authUser)
    return <Spinner color="grey" height={50} width={50} />;

  if (authCheck && !authUser)
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

  return <>{children}</>;
};

export default PrivateRoutes;
