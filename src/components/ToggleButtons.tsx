import React from "react";

type Props = {
  buttons: TToggleButton[];
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
};

const ToggleButtons = React.forwardRef<HTMLFieldSetElement, Props>(({ buttons }, ref) => {
  return (
    <fieldset className="toggle-buttons" ref={ref}>
      {buttons.map((button, index) => (
        <ToggleButton
          key={index}
          id={button.id}
          text={button.text}
          name={button.name}
          onChange={button.onChange}
          checked={button.checked}
          value={button.value}
          role={button.role}
        />
      ))}
    </fieldset>
  );
});

export const ToggleButton = ({
  id,
  text,
  name,
  onChange,
  checked,
  value,
  role = ""
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
    <label htmlFor={id} className={`button toggle-button ${role} ${role ? "regular-big-text" : "medium-middle-text"}`}>
      {text}
    </label>
  </>
);

export default React.memo(ToggleButtons);
