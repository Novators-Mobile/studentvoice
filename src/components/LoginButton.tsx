import React from "react";

type Props = {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  margin?: string;
};

function LoginButton({ text, type = "button", onClick, margin = "0 0 0 0" }: Props) {
  const style = {
    margin: margin,
  };

  return (
    <button
      className="login__submit-btn medium-middle-text"
      type={type}
      onClick={onClick}
      style={style}
    >
      {text}
    </button>
  );
}

export default React.memo(LoginButton);
