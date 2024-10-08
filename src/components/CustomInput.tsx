import React from 'react';

type Props = {
  label: string,
  type?: string
}

function CustomInput({ label, type='text' }: Props) {
  return (
    <div className='input__wrap'>
      <p className="input__label">{label}</p>
      <input type={type} className="custom-input" placeholder='Введите текст' />
    </div>
  );
}

export default React.memo(CustomInput);