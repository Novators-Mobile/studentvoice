import React from 'react'

function BtnPlus() {
  return (
    <button className="dropdown__icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
        <path d="M21 12H12V21H9V12H0V9H9V0H12V9H21V12Z" fill="#366AF3"/>
      </svg>
    </button>
  );
}

export default React.memo(BtnPlus);