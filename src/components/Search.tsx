import React from "react";

type Props = {
  label?: string;
  isBig?: boolean;
  width?: string;
};

function Search({ label, isBig = false, width }: Props) {
  return (
    <div className="input__wrap">
      {label && <p className="medium-middle-text">{label}</p>}

      <input
        type="search"
        className={`search medium-middle-text ${isBig && "big"}`}
        placeholder="Поиск"
        style={{ width: width }}
      />
    </div>
  );
}

export default React.memo(Search);
