import { useState } from 'react'
import Rating from '../Rating'
import DropdownItem from './DropdownItem'
import React from 'react'
import Tools from '../Tools'

type DropdownListItem = {
  title: string,
  rating: number
}

type Props = {
  type: string, 
  title: string, 
  list: DropdownListItem[]
}

function Dropdown({ type, title, list }: Props) {
  const [state, setState] = useState({
    isOpen: false,
    isEditing: false
  });

  const dropdownStatusHandler = (): void => {
    setState((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
      isEditing: prevState.isOpen ? false : prevState.isEditing
    }));
  };

  const editBtnHandler = (): void => {
    setState((prevState) => ({ ...prevState, isEditing: true }));
  }

  const saveBtnHandler = (): void => {
    setState((prevState) => ({ ...prevState, isEditing: false }));
  }

  return (
    <>
      <div className="dropdown__wrapper">
        <div className="dropdown" onClick={dropdownStatusHandler}>
          <p className="dropdown__title">{title}</p>
          <div className={`dropdown__icon ${state.isOpen && 'open'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
              <path d="M7.29289 19.2071C7.68342 19.5976 8.31658 19.5976 8.70711 19.2071L15.0711 12.8431C15.4616 12.4526 15.4616 11.8195 15.0711 11.4289C14.6805 11.0384 14.0474 11.0384 13.6569 11.4289L8 17.0858L2.34315 11.4289C1.95262 11.0384 1.31946 11.0384 0.928932 11.4289C0.538408 11.8195 0.538408 12.4526 0.928932 12.8431L7.29289 19.2071ZM9 18.5L9 0.5H7L7 18.5H9Z" fill="#366AF3"/>
            </svg>
          </div>
          {!state.isOpen && <Rating rating={7.1} />}
        </div>

        {state.isOpen && 
        <Tools 
          isEditing={state.isEditing} 
          editBtn={true}
          editBtnHandler={editBtnHandler} 
          saveBtnHandler={saveBtnHandler} />}

      </div>

      {state.isOpen && 
        <ul className="dropdown__list">
          {list.map((item, index) => (
            <DropdownItem 
              key={index} 
              id={index} 
              type={type} 
              title={item.title} 
              rating={item.rating} 
              isEditing={state.isEditing} />
          ))}
        </ul>}
    </>
  )
}

export default React.memo(Dropdown)