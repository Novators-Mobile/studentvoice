import React from 'react';

type Props = {
  label: string
}

function CustomInput({ label }: Props) {
  return (
    <div className='input__wrap'>
      <p className="input__label">{label}</p>
      <input type="text" className="custom-input" placeholder='Введите текст' />
    </div>
  );
}

export default React.memo(CustomInput);