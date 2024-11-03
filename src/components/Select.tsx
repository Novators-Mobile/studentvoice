import React, { useEffect, useRef, useState } from 'react';
import SelectIcon from './Icons/SelectIcon';

type Props = {
  label: string,
  options: string[],
  placeholder?: string,
  width?: string
}

function Select({ label, options, placeholder = 'Выбор...', width }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const style = {
    width: width
  };

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
      <p className="medium-middle-text">{label}</p>

      <div className={`select-options__wrap ${isOpen ? 'open' : ''}`}>
        <div 
          className="select"
          onClick={handleToggle} 
          ref={selectRef}
          style={style}
        >
          <span className={`select-box medium-middle-text ${!selectedOption && 'empty'}`}>
            {selectedOption ? selectedOption : placeholder}
          </span>
          
          <div className={`select-icon__wrap ${isOpen ? 'open' : ''}`}>
            <SelectIcon />
          </div>
        </div>

        <ul className="select-options" style={style}>
          {options.map((option, id) => (
            <li 
              className='select-option medium-small-text' 
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

export default React.memo(Select);