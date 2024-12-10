import React, { useEffect, useRef, useState } from "react";
import SelectIcon from "../Icons/SelectIcon";

type Props = {
  label?: string;
  options: TSelectOption[];
  placeholder?: string;
  width?: string;
  onChange?: (id: number) => void;
  error?: string;
};

export type TSelectOption = {
  id: number;
  name: string;
};

const Select = React.forwardRef<HTMLDivElement, Props>(
  ({ label, options, placeholder = "Выбор...", width, onChange, error }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<TSelectOption>();
    const selectRef = useRef<HTMLDivElement>(null);

    const style = {
      width: width,
    };

    const handleToggle = (event: React.MouseEvent) => {
      event.stopPropagation();
      setIsOpen(!isOpen);
    };

    const handleSelect = (option: TSelectOption) => {
      setSelectedOption(option);
      setIsOpen(false);
      if (onChange) {
        onChange(option.id);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      if (isOpen) {
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleEscPress);
      }

      return () => {
        document.removeEventListener("click", handleClickOutside);
        document.removeEventListener("keydown", handleEscPress);
      };
    }, [isOpen]);

    return (
      <div className="input__wrap">
        {label && <p className="medium-middle-text">{label}</p>}

        <div className={`select-options__wrap ${isOpen ? "open" : ""}`}>
          <div
            className="select"
            onClick={handleToggle}
            ref={ref}
            style={style}
          >
            <span
              className={`select-box medium-middle-text ${
                !selectedOption && "empty"
              }`}
            >
              {selectedOption?.name ? selectedOption.name : placeholder}
            </span>

            <div className={`select-icon__wrap ${isOpen ? "open" : ""}`}>
              <SelectIcon />
            </div>
          </div>

          <p className="error-input-msg">{error}</p>

          <ul className="select-options" style={style}>
            {options.map((option, index) => (
              <li
                className="select-option medium-small-text"
                key={index}
                onClick={() => handleSelect(option)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
);

export default React.memo(Select);
