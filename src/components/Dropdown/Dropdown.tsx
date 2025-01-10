import { useState } from "react";
import Rating from "../Rating";
import DropdownItem from "./DropdownItem";
import React from "react";
import Tools from "../Tools/Tools";

export type DropdownListItem = {
  id: number;
  title: string;
  rating: number;
};

type Props = {
  type: string;
  title: string;
  list: DropdownListItem[];
  onPlusClick?: () => void;
  onSortClick?: () => void;
  isSortReversed?: boolean;
  onSearch?: (query: string) => void;
  debounceDelay?: number;
  onDelete?: (id: string) => void;
  onExcelClick?: () => Promise<Blob>;
  disableExcelBtn?: boolean;
  listRating?: number;
};

function Dropdown({
  type,
  title,
  list,
  onPlusClick,
  onSearch,
  debounceDelay,
  onSortClick,
  isSortReversed,
  onDelete,
  disableExcelBtn,
  onExcelClick,
  listRating
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownStatusHandler = (): void => {
    setIsOpen((prev) => !prev);
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

        {!isOpen && <Rating rating={listRating || 0} />}

        {isOpen && (
          <Tools
            onPlusClick={onPlusClick}
            onSearch={onSearch}
            debounceDelay={debounceDelay}
            onSortClick={onSortClick}
            isSortReversed={isSortReversed}
            onExcelClick={onExcelClick}
            disableExcelBtn={disableExcelBtn}
          />
        )}
      </div>

      {isOpen && (
        <>
          {list.length === 0 && ("Список пуст")}
          <ul className="dropdown__list">
            {list.map((item) => (
              <DropdownItem
                key={item.id}
                id={item.id}
                type={type}
                title={item.title}
                rating={item.rating}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default React.memo(Dropdown);
