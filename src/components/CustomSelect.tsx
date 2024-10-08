import React, { useEffect, useRef, useState } from 'react';

type Props = {
  label: string,
  options: string[],
  placeholder?: string
}

function CustomSelect({ label, options, placeholder = 'Select...' }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleEscPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscPress);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [isOpen]);

  return (
    <div className='input__wrap'>
      <p className="input__label">{label}</p>

      <div className={`custom-select ${isOpen ? 'open' : ''}`} onClick={handleToggle} ref={selectRef}>
        <span className={`select-box ${!selectedOption && 'empty'}`}>
          {selectedOption ? selectedOption : placeholder}
        </span>
        <svg className={`select__arrow-icon ${isOpen ? 'open' : ''}`}
          xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
          <rect width="33" height="33" rx="16" fill="#366AF3"/>
          <path d="M16.5 25L8.70577 11.5L24.2942 11.5L16.5 25Z" fill="white"/>
        </svg>

        <ul className="select-options">
          {options.map((option, id) => (
            <li 
              className='select-option' 
              key={id} 
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>

      
    </div>
  );
}

export default React.memo(CustomSelect);