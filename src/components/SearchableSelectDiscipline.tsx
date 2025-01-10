import React, { forwardRef, useEffect, useState } from "react";
import Search from "./Search";
import { getDisciplines, TDiscipline } from "../api/admin/disciplineApi";

type TProps = {
  label?: string;
  width?: string;
  onChange?: (ids: number[]) => void;
  value?: number[];
  error?: string;
  disciplines?: TDiscipline[];
};

type TSelectOption = {
  id: number;
  name: string;
};

const SearchableSelectTeacher = forwardRef<HTMLDivElement, TProps>(
  ({ label, width, onChange, error, value = [], disciplines }, ref) => {
    const [list, setList] = useState<TDiscipline[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<TSelectOption[]>([]);

    const style = {
      width: width,
    };

    useEffect(() => {
      if (disciplines && value.length > 0) {
        const matchedItems = disciplines
          .filter((discipline) => value.includes(discipline.id!))
          .map((discipline) => ({
            id: discipline.id!,
            name: discipline.name,
          }));

        setSelectedItems(matchedItems);
      }
    }, [disciplines, value]);

    const handleSearch = async (searchText: string) => {
      try {
        const listData = await getDisciplines({ search: searchText });
        if (searchText === "" || listData.length === 0) {
          setIsOpen(false);
          setList([]);
        } else {
          setIsOpen(true);
          setList(listData);
        }
      } catch (err) {
        setList([]);
        console.error("Ошибка при получении данных: ", err);
      }
    };

    useEffect(() => {
      if (onChange) {
        const newIds = selectedItems.map((item) => item.id);
        if (JSON.stringify(newIds) !== JSON.stringify(value)) {
          onChange(newIds);
        }
      }
    }, [selectedItems, onChange, value]);

    const handleOptionClick = (item: TDiscipline) => {
      const newSelectedItem: TSelectOption = {
        id: item.id!,
        name: item.name,
      };

      setSelectedItems((prev) =>
        prev.some((item) => item.id === newSelectedItem.id)
          ? prev
          : [...prev, newSelectedItem]
      );

      setIsOpen(false);
    };

    const handleDeleteItem = (id: number) => {
      setSelectedItems((prev) => {
        const updatedItems = prev.filter((item) => item.id !== id);
        if (onChange) {
          onChange(updatedItems.map((item) => item.id));
        }
        return updatedItems;
      });
    };

    return (
      <div
        className={`input__wrap select-options__wrap ${isOpen && "open"}`}
        ref={ref}
      >
        {label && <p className="input-label medium-middle-text">{label}</p>}
        <Search onSearch={handleSearch} width={width} />

        <p className="error-input-msg">{error}</p>

        <ul className="select-options" style={style}>
          {list.map((item, index) => (
            <li
              className="select-option medium-small-text"
              key={index}
              onClick={() => handleOptionClick(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>

        <ul className="" style={style}>
          {selectedItems.map((item) => (
            <div className="selected-item medium-small-text" key={item.id}>
              <li>{item.name}</li>
              <div
                className="selected-item__delete"
                onClick={() => handleDeleteItem(item.id)}
              >
                x
              </div>
            </div>
          ))}
        </ul>
      </div>
    );
  }
);

export default React.memo(SearchableSelectTeacher);
