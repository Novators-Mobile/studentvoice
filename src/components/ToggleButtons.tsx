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

function ToggleButtons({ buttons }: Props) {
  return (
    <fieldset className="toggle-buttons">
      {buttons.map((button, index) => (
        <ToggleButton
          key={index}
          id={button.id}
          text={button.text}
          name={button.name}
        />
      ))}
    </fieldset>
  );
}

export default React.memo(ToggleButtons);
