import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomInput from '../components/CustomInput';
import CustomSearch from '../components/CustomSearch';
import BtnPlus from '../components/BtnPlus';
import BtnMinus from '../components/BtnMinus';
import CustomBtn from '../components/CustomBtn';
import CustomSelect from '../components/CustomSelect';

const options = [
  'ИРИТ-РТФ',
  'ИНМиТ',
  'ФТИ',
  'ИНЭУ',
  'ИСА',
  'УГИ'
];

function EditDiscipline() {
  const navigate = useNavigate();

  const location = useLocation();
  let title: string = '';

  if (location.pathname.endsWith('edit')) {
    title = 'Редактировать дисциплину';
  } else if (location.pathname.endsWith('new-discipline')) {
    title = 'Новая дисциплина';
  }
  

  return (
    <>
      <h1 className="edit__title title">{title}</h1>

      <form className="edit-discipline__form">
        <fieldset className="edit-discipline__fieldset">
          <CustomInput label='Название' />

          <CustomSelect label='Интститут' options={options} placeholder='Выберите институт'/>

        </fieldset>  
        
        <h2 className="edit-disipline__title title">Преподаватели</h2>

        <fieldset className="edit-discipline__fieldset">
          <CustomSearch label='Лекции' />
          <CustomSearch label='Практики' />

          <div className="edit__control-btns">
            <BtnPlus />
            <BtnMinus />
          </div>
        </fieldset>

        <div className="edit__form-btns">
          <CustomBtn text='Отменить' type='reset' onClick={() => navigate(-1)} />
          <CustomBtn text='Сохранить' type='submit' />
        </div>
      </form>
    </>
  );
}

export default React.memo(EditDiscipline);