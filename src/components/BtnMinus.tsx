import React from 'react'

function BtnMinus() {
  return (
    <button className="dropdown__icon">
      <svg width="14" height="3" viewBox="0 0 14 3" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="1.5" x2="14" y2="1.5" stroke="#366AF3" strokeWidth="3"/>
      </svg>
    </button>
  );
}

export default React.memo(BtnMinus);