import React from "react";
import Nav from "../Nav/Nav";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Nav />
      <div className="page">{children}</div>
    </div>
  );
};

export default Layout;
