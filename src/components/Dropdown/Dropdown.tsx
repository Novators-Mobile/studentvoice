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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownStatusHandler = (): void => {
    setIsOpen((prev) => (!prev));
  };

  return (
    <>
      <div className="dropdown">
        <p
          className="dropdown__title medium-big-text"
          onClick={dropdownStatusHandler}
        >
          {title}
        </p>

        {!isOpen && <Rating rating={4.5} />}

        {isOpen && <Tools onPlusClick={onPlusClick} />}
      </div>

      {isOpen && (
        <ul className="dropdown__list">
          {list.map((item, index) => (
            <DropdownItem
              key={index}
              id={index}
              type={type}
              title={item.title}
              rating={item.rating}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default React.memo(Dropdown);
