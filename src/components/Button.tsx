import React from "react";

type Props = {
  text: string;
  type?: "button" | "submit" | "reset" | "excel";
  disabled?: boolean;
  onClick?: (e: React.FormEvent) => void;
  icon?: JSX.Element;
};

function Button({ text, type = "button", disabled = false, onClick, icon }: Props) {
  return (
    <button
      className={`button medium-middle-text ${disabled ? "disabled" : type} ${icon && "icon"} `}
      disabled={disabled}
      type={type === "excel" ? "button" : type}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}

export default React.memo(Button);
