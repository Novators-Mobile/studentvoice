import React from 'react'

type Props = {
  text: string,
  type?: "button" | "submit" | "reset",
  onClick?: () => void
}

function CustomBtn({ text, type = 'button', onClick }: Props) {
  return (
    <button className='custom-btn' type={type} onClick={onClick} >{text}</button>
  );
}

export default React.memo(CustomBtn);