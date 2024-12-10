import React from "react";

type Props = {
  label?: string;
  placeholder?: string;
  type?: string;
  width?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  isRequired?: boolean;
  error?: string;
};

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ label, placeholder = "Введите текст", type = "text", width, value, onChange, name, isRequired = false, error }, ref) => (
    <div className="input__wrap">
      {label && <p className="medium-middle-text">{label}</p>}

      <input
        ref={ref}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className={`input ${type === "time" ? "regular-text" : "medium-middle-text"}`}
        placeholder={placeholder}
        style={{ width: width }}
        required={isRequired}
      />
      <p className="error-input-msg">{error}</p>
    </div>
  )
);

export default React.memo(Input);
