import React, { useEffect, useRef, useImperativeHandle } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Russian } from "flatpickr/dist/l10n/ru";

type Props = {
  label?: string;
  error?: string;
  onChange?: (date: Date | Date[]) => void;
  value?: string; 
};

const DatePicker = React.forwardRef<HTMLInputElement, Props>(
  ({ label, error, onChange, value }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const flatpickrInstance = useRef<flatpickr.Instance | null>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    useEffect(() => {
      if (inputRef.current) {
        flatpickrInstance.current = flatpickr(inputRef.current, {
          locale: Russian,
          dateFormat: "d.m.Y",
          onChange: (selectedDates) => {
            if (onChange) {
              onChange(selectedDates[0]);
            }
          },
        });
      }

      return () => {
        flatpickrInstance.current?.destroy();
      };
    }, [onChange]);

    useEffect(() => {
      if (flatpickrInstance.current && value) {
        flatpickrInstance.current.setDate(value, false); 
      }
    }, [value]);

    return (
      <div className="input__wrap">
        {label && <p className="input-label medium-middle-text">{label}</p>}
        <div className="calendar">
          <input
            ref={inputRef}
            type="text"
            className={`input medium-middle-text ${error && "error"}`}
            placeholder="дд.мм.гггг"
          />
          <span className="calendar-icon" />
        </div>
        <p className="error-input-msg">{error}</p>
      </div>
    );
  }
);

export default React.memo(DatePicker);
