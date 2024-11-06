import React from "react";

type Props = {
  label?: string;
  placeholder?: string;
  type?: string;
  width?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  name?: string;
  isRequired?: boolean;
};

function Input({
  label,
  placeholder = "Введите текст",
  type = "text",
  width,
  value,
  onChange,
  name,
  isRequired = false
}: Props) {
  return (
    <div className="input__wrap">
      {label && <p className="medium-middle-text">{label}</p>}

      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className={`input ${
          type === "time" ? "regular-text" : "medium-middle-text"
        }`}
        placeholder={placeholder}
        style={{ width: width }}
        required={isRequired}
      />
    </div>
  );
}

export default React.memo(Input);
