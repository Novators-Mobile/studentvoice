import React from "react";

type Props = {
  placeholder: string;
  type?: string;
  margin?: string;
};

function LoginInput({ placeholder, type = "text", margin = "0 0 0 0" }: Props) {
  const style = {
    margin: margin,
  };

  return (
    <div className="login-input__wrap" style={style}>
      <p className="error-input-msg"></p>
      <input
        type={type}
        className="login-input medium-middle-text"
        placeholder={placeholder}
      />
    </div>
  );
}

export default React.memo(LoginInput);
