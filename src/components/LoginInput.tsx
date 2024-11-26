import React, { forwardRef } from "react";

type Props = {
  placeholder: string;
  type?: string;
  error?: string;
};

const LoginInput = forwardRef<HTMLInputElement, Props>(({ placeholder, type = "text", error = '', ...rest }, ref) => {
    return (
      <div className="login-input__wrap">
        <input
          type={type}
          placeholder={placeholder}
          className={`login-input medium-middle-text ${error && 'error'}`}
          ref={ref}
          {...rest}
        />
        <p className="error-input-msg">{error}</p>
      </div>
    );
  }
);

export default React.memo(LoginInput);
