import React from "react";

type Props = {
  label?: string;
  placeholder?: string;
  type?: string;
  width?: string;
};

function Input({ label, placeholder = "Введите текст", type = "text", width }: Props) {
  return (
    <div className="input__wrap">
      {label && <p className="medium-middle-text">{label}</p>}
      
      <input 
        type={type} 
        className={`input ${type === "time" ? "regular-text" : "medium-middle-text"}`}
        defaultValue={type === "time" ? "00:00" : ""}
        placeholder={placeholder} 
        style={{ width: width }}
      />
    </div>
  );
}

export default React.memo(Input);
