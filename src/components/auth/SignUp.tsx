import React from "react";
import Button from "../Button/Button";

import { useForm } from "react-hook-form";
import Input from "../Input/Input";

import { SignUpData } from "../../types/index";
import { useAuthentiate } from "../../hooks/index";

const SignUp: React.FC = () => {
  const { error, loading, signup } = useAuthentiate();

  const { register, errors, handleSubmit } = useForm<SignUpData>();

  const handleSignup = handleSubmit((data) => signup(data));

  return (
    <>
      <div className="backdrop"></div>

      <div className="modal modal--auth-form">
        <div className="modal-close">&times;</div>
        <h3 className="header--center paragraph--orange">Sign up to Awesome</h3>

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
        </form>

        {error && <p className="paragraph paragraph--error  ">{error}</p>}
      </div>
    </>
  );
};

export default SignUp;
