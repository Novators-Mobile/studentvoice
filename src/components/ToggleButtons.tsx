import React from "react";

type Props = {
  buttons: TToggleButton[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
};

type TToggleButton = {
  id: string;
  text: string;
  name: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  checked?: boolean;
  value?: string;
  role?: "answer" | "";
  error?: string;
};

const ToggleButtons = React.forwardRef<HTMLFieldSetElement, Props>(
  ({ buttons, value, onChange, error }, ref) => {
    return (
      <>
        <fieldset className="toggle-buttons" ref={ref}>
          {buttons.map((button, index) => (
            <ToggleButton
              key={index}
              id={button.id}
              text={button.text}
              name={button.name}
              onChange={() => onChange(button.id)}
              checked={value === button.id}
              value={button.id}
              role={button.role}
              error={error}
            />
          ))}
        </fieldset>
        <p className="error-input-msg">{error}</p>
      </>
    );
  }
);

export const ToggleButton = ({
  id,
  text,
  name,
  onChange,
  checked,
  value,
  role = "",
  error
}: TToggleButton) => (
  <>
    <input
      type="radio"
      id={id}
      name={name}
      className="radio-input"
      onChange={onChange}
      checked={checked}
      value={value}
    />
    <label
      htmlFor={id}
      className={`button toggle-button ${role} ${
        role ? "regular-big-text" : "medium-middle-text"
      } ${error && "error"}`}
    >
      {text}
    </label>
  </>
);

export default React.memo(ToggleButtons);
