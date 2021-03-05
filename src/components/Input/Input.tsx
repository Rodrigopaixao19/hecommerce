import React, { InputHTMLAttributes, forwardRef, Ref } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef(
  (
    { label, error, type = "text", ...props }: IInput,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div className="form__input-container">
        <label htmlFor={label} className="form__input-label">
          {label}
        </label>
        <input type={type} className="input" {...props} ref={ref} />
        {error && <p className="paragraph--error-small">{error}</p>}
      </div>
    );
  }
);

export default Input;
