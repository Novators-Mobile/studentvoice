import React, { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Russian } from "flatpickr/dist/l10n/ru";

type Props = {
  label?: string;
};

function DatePicker({ label }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const fp = flatpickr(inputRef.current, {
        locale: Russian,
        dateFormat: "d.m.Y",
        // disableMobile: true
      });

      return () => {
        fp.destroy();
      };
    }
  }, []);

  return (
    <div className="input__wrap">
      {label && <p className="medium-middle-text">{label}</p>}
      
      <div className="calendar">
        <input 
          ref={inputRef}
          type="text"
          className="input medium-middle-text"
          placeholder="дд.мм.гггг"
        />
        <span className="calendar-icon" />
      </div>
    </div>
  );
}

export default React.memo(DatePicker);