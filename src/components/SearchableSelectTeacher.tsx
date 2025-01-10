import React, { forwardRef, useEffect, useState } from "react";
import Search from "./Search";
import { getTeachers, TTeacher } from "../api/admin/teacherApi";

type TProps = {
  label?: string;
  width?: string;
  onChange?: (ids: number[]) => void;
  value?: number[];
  error?: string;
  teachers?: TTeacher[];
};

type TSelectOption = {
  id: number;
  name: string;
};

const SearchableSelectTeacher = forwardRef<HTMLDivElement, TProps>(
  ({ label, width, onChange, error, value = [], teachers }, ref) => {
    const [list, setList] = useState<TTeacher[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<TSelectOption[]>([]);

    const style = {
      width: width,
    };

    useEffect(() => {
      if (teachers && value) {
        const updatedSelectedItems = teachers
          .filter((teacher) => value.includes(teacher.id!))
          .map((teacher) => ({
            id: teacher.id!,
            name: `${teacher.second_name} ${teacher.first_name} ${teacher.patronymic}`,
          }));
    
        setSelectedItems(updatedSelectedItems);
      }
    }, [value, teachers]);

    const handleSearch = async (searchText: string) => {
      try {
        const listData = await getTeachers({ search: searchText });
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

    const handleOptionClick = (teacher: TTeacher) => {
      const newOption: TSelectOption = {
        id: teacher.id!,
        name: `${teacher.second_name} ${teacher.first_name} ${teacher.patronymic}`,
      };
    
      setSelectedItems((prev) =>
        prev.some((item) => item.id === newOption.id)
          ? prev
          : [...prev, newOption]
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
              {`${item.second_name} ${item.first_name} ${item.patronymic}`}
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
