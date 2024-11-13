import React from "react";

type Props = {
  placeholder: string;
  type?: string;
};

function LoginInput({ placeholder, type = "text"}: Props) {
  return (
    <div className="login-input__wrap">
      <input
        type={type}
        className="login-input medium-middle-text"
        placeholder={placeholder}
      />
      <p className="error-input-msg"></p>
    </div>
  );
}

export default React.memo(LoginInput);
