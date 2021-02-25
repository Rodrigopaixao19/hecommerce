import React from "react";
import Nav from "../Nav/Nav";

import { useModalContext } from "../../state/modalContext";

const Layout: React.FC = ({ children }) => {
  const { modal } = useModalContext();
  return (
    <div>
      <Nav />
      <div className="page">{children}</div>

      {modal && modal}
    </div>
  );
};

export default Layout;
