import React from "react";
import Button from "../Button/Button";

import { useForm } from "react-hook-form";
import Input from "../Input/Input";

import { SignUpData } from "../../types/index";
import { useAuthentiate } from "../../hooks/index";
import { useModalContext } from "../../state/modalContext";

const ResetPassword: React.FC = () => {
  const { setModalType } = useModalContext();

  const { error, loading, resetpassword, successMsg } = useAuthentiate();

  const { register, errors, handleSubmit } = useForm<
    Omit<SignUpData, "username" | "password">
  >();

  const handleResetPassword = handleSubmit((data) => resetpassword(data));

  return (
    <>
      <div className="backdrop" onClick={() => setModalType("close")}></div>

      <div className="modal modal--auth-form">
        <div className="modal-close" onClick={() => setModalType("close")}>
          &times;
        </div>
        <h5 className="header--center paragraph--orange">
          Enter your email below to reset your password
        </h5>

        <form onSubmit={handleResetPassword} className="form">
          <Input
            name="email"
            error={errors.email?.message}
            placeholder="Your email"
            ref={register({
              required: "Email is required.",
            })}
          />

          <Button loading={loading} width="100%" style={{ margin: "0.5rem 0" }}>
            Submit
          </Button>
          {error && <p className="paragraph paragraph--error  ">{error}</p>}
        </form>

        {successMsg && (
          <p className="paragraph--success paragraph--small">{successMsg}</p>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
