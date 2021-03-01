import React from "react";
import { useModalContext } from "../../state/modalContext";
import Button from "../Button/Button";

const LoggedOutNav: React.FC = () => {
  const { setModalType } = useModalContext();

  return (
    <ul className="navbar">
      <div className="navbar__profile">
        <Button className="btn--sign" onClick={() => setModalType("signin")}>
          Sign in
        </Button>
        <Button className="btn--sign" onClick={() => setModalType("signup")}>
          Sign up
        </Button>
      </div>
    </ul>
  );
};

export default LoggedOutNav;
