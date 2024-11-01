import { useState } from "react";
import Rating from "../Rating";
import DropdownItem from "./DropdownItem";
import React from "react";
import Tools from "../Tools";
import ToolsBtn from "../ToolsBtn";

import ArrowIcon from "../Icons/ArrowIcon";

type DropdownListItem = {
  title: string;
  rating: number;
};

type Props = {
  type: string;
  title: string;
  list: DropdownListItem[];
};

function Dropdown({ type, title, list }: Props) {
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
        <p className="dropdown__title medium-big-text">{title}</p>

        <ToolsBtn icon={<ArrowIcon />} isOpen={state.isOpen} onClick={dropdownStatusHandler} />

        {!state.isOpen && <Rating rating={7.1} />}

        {state.isOpen && (
          <Tools
            isEditing={state.isEditing}
            editBtn={true}
            editBtnHandler={editBtnHandler}
            saveBtnHandler={saveBtnHandler}
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
