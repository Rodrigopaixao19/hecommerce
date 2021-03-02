import React from "react";
import Button from "../Button/Button";

import { useForm } from "react-hook-form";
import Input from "../Input/Input";

import { SignUpData } from "../../types/index";
import { useAuthentiate } from "../../hooks/index";
import { useModalContext } from "../../state/modalContext";
import SocialMediaForm from "./SocialMediaForm";
import { useHistory } from "react-router-dom";

const SignIn: React.FC = () => {
  const { setModalType } = useModalContext();

  const { error, loading, signin, socialLogin } = useAuthentiate();

  const { register, errors, handleSubmit } = useForm<
    Omit<SignUpData, "username">
  >();

  const history = useHistory();

  const handleSignIn = handleSubmit(async (data) => {
    const response = await signin(data);

    if (response) setModalType("close");
  });

  return (
    <>
      <div
        className="backdrop"
        onClick={() => {
          history.replace("/", undefined);
          setModalType("close");
        }}
      ></div>

      <div className="modal modal--auth-form">
        <div
          className="modal-close"
          onClick={() => {
            history.replace("/", undefined);
            setModalType("close");
          }}
        >
          &times;
        </div>
        <h3 className="header--center paragraph--orange">Sign in to Awesome</h3>

        <SocialMediaForm socialLogin={socialLogin} loading={loading} />

        <hr />

        <p className="paragraph--center paragraph--focus paragraph--small">
          Or Sign up with an email
        </p>

        <form onSubmit={handleSignIn} className="form">
          <Input
            label="Email"
            name="email"
            error={errors.email?.message}
            placeholder="Your email"
            ref={register({
              required: "Email is required.",
              // pattern: {
              //   value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              //   message: "Email is incorrect",
              // },
            })}
          />

          <Input
            type="password"
            label="Password"
            name="password"
            error={errors.password?.message}
            placeholder="Your password"
            ref={register({
              required: "Password is required.",
              // minLength: {
              //   value: 12,
              //   message: "Password must be at least 12 characters.",
              // },
              // maxLength: {
              //   value: 60,
              //   message: "Password cannot exceed 20 characters.",
              // },
            })}
          />

          <Button loading={loading} width="100%" style={{ margin: "0.5rem 0" }}>
            Submit
          </Button>
          {error && <p className="paragraph paragraph--error  ">{error}</p>}
        </form>
        <p className="paragraph paragraph--focus paragraph--small">
          Don't have an account yet?{" "}
          <span
            className="paragraph--orange paragraph--link"
            onClick={() => setModalType("signup")}
          >
            Sign up
          </span>{" "}
          instead
        </p>
        <p className="paragraph paragraph--focus paragraph--small">
          Forgot your password? Reset it{" "}
          <span
            className="paragraph--orange paragraph--link"
            onClick={() => setModalType("reset_password")}
          >
            here
          </span>
        </p>
      </div>
    </>
  );
};

export default SignIn;
