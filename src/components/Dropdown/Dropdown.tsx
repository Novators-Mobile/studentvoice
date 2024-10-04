import { useState } from 'react'
import Rating from '../Rating'
import DropdownItem from './DropdownItem'
import React from 'react'

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
          <div className="dropdown__tools">
            <button className="dropdown__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="20" viewBox="0 0 23 20" fill="none">
                <path d="M5.46967 19.5303C5.76256 19.8232 6.23744 19.8232 6.53033 19.5303L11.3033 14.7574C11.5962 14.4645 11.5962 13.9896 11.3033 13.6967C11.0104 13.4038 10.5355 13.4038 10.2426 13.6967L6 17.9393L1.75736 13.6967C1.46447 13.4038 0.989592 13.4038 0.696699 13.6967C0.403806 13.9896 0.403806 14.4645 0.696699 14.7574L5.46967 19.5303ZM5.25 1L5.25 19H6.75L6.75 1H5.25Z" fill="#366AF3"/>
                <path d="M17.5303 0.46967C17.2374 0.176777 16.7626 0.176777 16.4697 0.46967L11.6967 5.24264C11.4038 5.53553 11.4038 6.01041 11.6967 6.3033C11.9896 6.59619 12.4645 6.59619 12.7574 6.3033L17 2.06066L21.2426 6.3033C21.5355 6.59619 22.0104 6.59619 22.3033 6.3033C22.5962 6.01041 22.5962 5.53553 22.3033 5.24264L17.5303 0.46967ZM17.75 19L17.75 1H16.25L16.25 19H17.75Z" fill="#366AF3"/>
              </svg>
            </button>

            <input type="text" className="dropdown__tools_search search-small" placeholder='Поиск' />
            <button className="dropdown__tools_excel-btn excel-btn">Перенести в Excel</button>

            {!state.isEditing ? (
              <button className="dropdown__tools_edit-btn" onClick={() => setState((prevState) => ({ ...prevState, isEditing: true }))}>
                Редактировать
              </button>
            ) : (
              <button className="dropdown__save-btn" onClick={() => setState((prevState) => ({ ...prevState, isEditing: false }))}>
                Готово
              </button>
            )}

            {state.isEditing && 
            <button className="dropdown__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                <path d="M21 12H12V21H9V12H0V9H9V0H12V9H21V12Z" fill="#366AF3"/>
              </svg>
            </button>}
          </div>}
      </div>

      {state.isOpen && 
        <ul className="dropdown__list">
          {list.map((item, index) => (
            <DropdownItem key={index} id={index} type={type} title={item.title} rating={item.rating} isEditing={state.isEditing} />
          ))}
        </ul>}
    </>
  )
}

export default React.memo(Dropdown)