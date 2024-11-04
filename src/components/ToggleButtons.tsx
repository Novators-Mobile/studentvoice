import React from "react";

type Button = {
  id: string;
  text: string;
};

type Props = {
  buttons: Button[];
  name: string;
}

type TToggleButton = {
  button: Button;
  name: string;
}

const ToggleButton = ({ button, name }: TToggleButton) => (
  <>
    <input type="radio" id={button.id} name={name} />
    <label htmlFor={button.id} className="button toggle-button regular-text">
      {button.text}
    </label>
  </>
);

function ToggleButtons({ buttons, name }: Props) {
  return (
    <fieldset className="toggle-buttons">
      {buttons.map((button, index) => (
        <ToggleButton key={index} button={button} name={name} />
      ))}
    </fieldset>
  );
}

export default React.memo(ToggleButtons);
