import React from 'react';

type Props = {
  modalRef: React.RefObject<HTMLFormElement>;
  setFilterModalOpen: (state: boolean) => void;
}

function FilterModal({ modalRef, setFilterModalOpen }: Props) {
  const closeModal = () => {
    setFilterModalOpen(false);
  };

  return (
    <form ref={modalRef} className="filter-modal">
      <fieldset className="modal__radio-wrap">
        <div>
          <input 
            className='modal__radio' 
            type="radio" 
            name="filter" 
            id="from-best"
            value='best' />
          <label htmlFor="from-best" className="modal__radio_label">От лучшего</label>
        </div>
        
        <div>
          <input 
            className='modal__radio' 
            type="radio" 
            name="filter" 
            id="from-worst"
            value='worst' />
          <label htmlFor="from-worst" className="modal__radio_label">От худшего</label>
        </div>
      </fieldset>

      <div className="modal__points-wrap">
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
      </div>

      <div className="modal__buttons-wrap">
        <button className="modal__btn" type='reset' onClick={closeModal}>Отменить</button>
        <button className="modal__btn" type='submit'>Применить</button>
      </div>
    </form>
  );
}

export default React.memo(FilterModal);
