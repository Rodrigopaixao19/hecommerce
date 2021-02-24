import React from "react";
import Nav from "../Nav/Nav";
import SignUp from "../auth/SignUp";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Nav />
      <div className="page">{children}</div>

      <SignUp />
    </div>
  );
};

export default Layout;
