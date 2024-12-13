import React from "react";

type Props = {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  margin?: string;
  disabled?: boolean;
};

function LoginButton({ text, type = "button", onClick, margin = "0 0 0 0", disabled = false }: Props) {
  const style = {
    margin: margin,
  };

  return (
    <button
      className={`login__submit-btn medium-middle-text ${disabled && "disabled"}`}
      type={type}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default React.memo(LoginButton);
