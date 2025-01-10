import React, { ChangeEvent, useCallback, useMemo } from "react";
import debounce from "lodash/debounce";

type Props = {
  label?: string;
  isBig?: boolean;
  width?: string;
  query?: string;
  onSearch?: (query: string) => void;
  debounceDelay?: number;
};

function Search({ label, isBig = false, width, query, onSearch, debounceDelay = 500 }: Props) {
  const debouncedChange = useMemo(() =>
    debounce((value: string) => {
      if (onSearch) {
        onSearch(value);
      }
    }, debounceDelay),
    [onSearch, debounceDelay]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      debouncedChange(value);
    },
    [debouncedChange]
  );

  return (
    <div className="input__wrap">
      {label && <p className="input-label medium-middle-text">{label}</p>}

      <input
        type="search"
        className={`search medium-middle-text ${isBig && "big"}`}
        placeholder="Поиск"
        style={{ width }}
        defaultValue={query}
        onChange={handleChange}
      />
    </div>
  );
}

export default React.memo(Search);
