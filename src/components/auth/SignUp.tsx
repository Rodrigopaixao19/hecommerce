import React from "react";
import Button from "../Button/Button";

import { useForm } from "react-hook-form";
import Input from "../Input/Input";

import { SignUpData } from "../../types/index";
import { useAuthentiate } from "../../hooks/index";
import { useModalContext } from "../../state/modalContext";
import SocialMediaForm from "./SocialMediaForm";

const SignUp: React.FC = () => {
  const { setModalType } = useModalContext();

  const { error, loading, signup, socialLogin } = useAuthentiate();

  const { register, errors, handleSubmit } = useForm<SignUpData>();

  const handleSignup = handleSubmit(async (data) => {
    const response = await signup(data);

    if (response) setModalType("close");
  });

  return (
    <>
      <div className="backdrop" onClick={() => setModalType("close")}></div>

      <div className="modal modal--auth-form">
        <div className="modal-close" onClick={() => setModalType("close")}>
          &times;
        </div>
        <h3 className="header--center paragraph--orange">Sign up to Awesome</h3>

        <SocialMediaForm socialLogin={socialLogin} loading={loading} />

        <hr />
        <p className="paragraph--center paragraph--focus paragraph--small">
          Or Sign up with an email
        </p>

        <form onSubmit={handleSignup} className="form">
          <Input
            label="Username"
            name="username"
            error={errors.username?.message}
            placeholder="Your username"
            ref={register({
              required: "Username is required.",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters.",
              },
              maxLength: {
                value: 20,
                message: "Username cannot exceed 20 characters.",
              },
            })}
          />
          <Input
            label="Email"
            name="email"
            error={errors.email?.message}
            placeholder="Your email"
            ref={register({
              required: "Email is required.",
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email is incorrect",
              },
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
              minLength: {
                value: 12,
                message: "Password must be at least 12 characters.",
              },
              maxLength: {
                value: 60,
                message: "Password cannot exceed 20 characters.",
              },
            })}
          />

          <Button loading={loading} width="100%" style={{ margin: "0.5rem 0" }}>
            Submit
          </Button>
          {error && <p className="paragraph paragraph--error  ">{error}</p>}
        </form>
        <p className="paragraph paragraph--focus paragraph--small">
          Already have an account yet?{" "}
          <span
            className="paragraph--orange paragraph--link"
            onClick={() => setModalType("signin")}
          >
            Sign in
          </span>{" "}
          instead
        </p>
      </div>
    </>
  );
};

export default SignUp;
