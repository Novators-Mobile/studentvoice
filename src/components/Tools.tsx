import React, { useEffect, useRef, useState } from 'react';
import FilterModal from './FilterModal';

type Props = {
  isEditing?: boolean,
  editBtn?: boolean,
  editBtnHandler?: () => void,
  saveBtnHandler?: () => void
}

function Tools({ isEditing, editBtn, editBtnHandler, saveBtnHandler }: Props) {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const modalRef = useRef<HTMLFormElement | null>(null);

  const toggleFilterModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setFilterModalOpen(!isFilterModalOpen);
  };

  const handleEscPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setFilterModalOpen(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setFilterModalOpen(false);
    }
  };

  useEffect(() => {
    if (isFilterModalOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscPress);
    } 

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [isFilterModalOpen]);

  return (
    <div className="tools">

      <button className="dropdown__icon filter-btn" onClick={toggleFilterModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="20" viewBox="0 0 23 20" fill="none">
          <path d="M5.46967 19.5303C5.76256 19.8232 6.23744 19.8232 6.53033 19.5303L11.3033 14.7574C11.5962 14.4645 11.5962 13.9896 11.3033 13.6967C11.0104 13.4038 10.5355 13.4038 10.2426 13.6967L6 17.9393L1.75736 13.6967C1.46447 13.4038 0.989592 13.4038 0.696699 13.6967C0.403806 13.9896 0.403806 14.4645 0.696699 14.7574L5.46967 19.5303ZM5.25 1L5.25 19H6.75L6.75 1H5.25Z" fill="#366AF3"/>
          <path d="M17.5303 0.46967C17.2374 0.176777 16.7626 0.176777 16.4697 0.46967L11.6967 5.24264C11.4038 5.53553 11.4038 6.01041 11.6967 6.3033C11.9896 6.59619 12.4645 6.59619 12.7574 6.3033L17 2.06066L21.2426 6.3033C21.5355 6.59619 22.0104 6.59619 22.3033 6.3033C22.5962 6.01041 22.5962 5.53553 22.3033 5.24264L17.5303 0.46967ZM17.75 19L17.75 1H16.25L16.25 19H17.75Z" fill="#366AF3"/>
        </svg>
      </button>

      {isFilterModalOpen && <FilterModal modalRef={modalRef} setFilterModalOpen={setFilterModalOpen} />}

      <input type="text" className="tools_search search-small" placeholder='Поиск' />
      <button className="tools_excel-btn excel-btn">Перенести в Excel</button>

      {editBtn && !isEditing && (
        <button className="dropdown__tools_edit-btn" onClick={editBtnHandler}>
          Редактировать
        </button>
      )}
      
      {isEditing &&(
        <button className="dropdown__save-btn" onClick={saveBtnHandler}>
          Готово
        </button>
      )}  

      {isEditing || !editBtn && 
      <button className="dropdown__icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
          <path d="M21 12H12V21H9V12H0V9H9V0H12V9H21V12Z" fill="#366AF3"/>
        </svg>
      </button>}
    </div>
  );
}

export default React.memo(Tools);