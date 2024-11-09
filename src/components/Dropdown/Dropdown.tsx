import { useState } from "react";
import Rating from "../Rating";
import DropdownItem from "./DropdownItem";
import React from "react";
import Tools from "../Tools";

type DropdownListItem = {
  title: string;
  rating: number;
};

type Props = {
  type: string;
  title: string;
  list: DropdownListItem[];
  onPlusClick?: () => void;
};

function Dropdown({ type, title, list, onPlusClick }: Props) {
  const [state, setState] = useState({
    isOpen: false,
    isEditing: false,
  });

  const dropdownStatusHandler = (): void => {
    setState((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
      isEditing: prevState.isOpen ? false : prevState.isEditing,
    }));
  };

  const editBtnHandler = (): void => {
    setState((prevState) => ({ ...prevState, isEditing: true }));
  };

  const saveBtnHandler = (): void => {
    setState((prevState) => ({ ...prevState, isEditing: false }));
  };

  return (
    <>
      <div className="dropdown">
        <p className="dropdown__title medium-big-text" onClick={dropdownStatusHandler}>{title}</p>

        {!state.isOpen && <Rating rating={4.5} />}

        {state.isOpen && (
          <Tools
            isEditing={state.isEditing}
            editBtnHandler={editBtnHandler}
            saveBtnHandler={saveBtnHandler}
            onPlusClick={onPlusClick}
          />
        )}
      </div>

      {state.isOpen && (
        <ul className="dropdown__list">
          {list.map((item, index) => (
            <DropdownItem
              key={index}
              id={index}
              type={type}
              title={item.title}
              rating={item.rating}
              isEditing={state.isEditing}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default React.memo(Dropdown);
