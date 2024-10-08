import React from 'react';

type Props = {
  label: string,
}

function CustomSearch({ label }: Props) {
  return (
    <div className='input__wrap'>
      <p className="input__label">{label}</p>
      <input type="search" className="custom-search search-small" placeholder='Поиск' />
    </div>
  );
}

export default React.memo(CustomSearch);