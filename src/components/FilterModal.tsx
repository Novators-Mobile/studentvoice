import React, { useEffect, useRef } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function FilterModal({ isOpen, onClose }: Props) {
  const modalRef = useRef<HTMLFormElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleEscPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscPress);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <form ref={modalRef} className="filter-modal regular-text">
      <fieldset className="modal__radio-wrap">
        <div className='modal__radio_inner-wrap'>
          <input 
            className='custom-radio' 
            type="radio" 
            name="filter" 
            id="from-best"
            value='best' />
          <label htmlFor="from-best" className="modal__radio_label">От большей</label>
        </div>
        
        <div className='modal__radio_inner-wrap'>
          <input 
            className='custom-radio' 
            type="radio" 
            name="filter" 
            id="from-worst"
            value='worst' />
          <label htmlFor="from-worst" className="modal__radio_label">От меньшей</label>
        </div>
      </fieldset>

      <fieldset className="modal__points-wrap">
        <p className="modal__points_label">Баллы: </p>
        <input 
          className='modal__points_range'
          type="number" 
          name="points" 
          id="points-from"
          min={0}
          max={100}
          placeholder='От' />

        <span> - </span>

        <input 
          className='modal__points_range'
          type="number" 
          name="points" 
          id="points-to"
          min={0}
          max={100}
          placeholder='До' />
      </fieldset>

      <div className="modal__buttons-wrap">
        <button className="modal__btn medium-small-text" type='reset' onClick={onClose}>Отменить</button>
        <button className="modal__btn medium-small-text" type='submit'>Применить</button>
      </div>
    </form>
  );
}

export default React.memo(FilterModal);
