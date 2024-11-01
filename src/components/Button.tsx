import React from "react";

type Props = {
  text: string;
  type?: "button" | "submit" | "reset" | "excel";
  disabled?: boolean;
  onClick?: () => void;
};

function Button({ text, type = "button", disabled = false, onClick }: Props) {
  return (
    <button
      className={`button regular-text ${disabled ? "disabled" : type}`}
      disabled={disabled}
      type={type === "excel" ? "button" : type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default React.memo(Button);
