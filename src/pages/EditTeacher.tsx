import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import CustomInput from '../components/CustomInput';
import CustomSelect from '../components/CustomSelect';
import CustomSearch from '../components/CustomSearch';
import BtnMinus from '../components/BtnMinus';
import BtnPlus from '../components/BtnPlus';
import CustomBtn from '../components/CustomBtn';

const departaments = [
  'Школа бакалавриата',
  'Кафедра вкусных булочек',
  'Департамент ИТиА',
  'Департамент ИИТ'
];

const posts = [
  'Доцент',
  'Кандидат наук',
  'Старший преподаватель',
  'Преподаватель',
  'Стажер'
];

const institutes = [
  'ИРИТ-РТФ',
  'ИНМиТ',
  'ФТИ',
  'ИНЭУ',
  'ИСА',
  'УГИ'
];

function EditTeacher() {
  const navigate = useNavigate();
  const location = useLocation();
  let title: string = '';
  let isEdit: boolean = false;

  if (location.pathname.endsWith('edit')) {
    title = 'Редактировать профиль';
    isEdit = true;
  } else if (location.pathname.endsWith('new-profile')) {
    title = 'Новый профиль преподавателя';
  }
  
  return (
    <>
      <h1 className="edit__title title">{title}</h1>

      <form className="edit-teacher__form">
        <fieldset className="edit-teacher__fieldset">
          <legend className="edit-teacher__fieldset_legend">Персональная информация</legend>

          <div className='edit-teacher__fieldset_container'>
            <CustomInput label='Имя' />
            <CustomInput label='Отчество' />
            <CustomInput label='Фамилия' />
          </div>
        </fieldset>

        <fieldset className="edit-teacher__fieldset">
          <legend className="edit-teacher__fieldset_legend">Профессиональная информация</legend>

          <div className="edit-teacher__big-wrap">
            <div className='edit-teacher__fieldset_wrap'>
              <CustomSelect label='Институт' options={departaments} placeholder='Выберите институт' /> 
              <CustomSelect label='Должность' options={posts} placeholder='Выберите должность' /> 
              <CustomSelect label='Кафедра' options={institutes} placeholder='Выберите кафедру' /> 
            </div>

            <div className="edit-teacher__fieldset_wrap">
              <CustomSearch label='Дисциплины' />

              <div className="edit__control-btns">
                <BtnPlus />
                <BtnMinus />
              </div>
            </div>

            <div className='edit-teacher__fieldset_wrap'>
              <CustomInput label='Лекции' />
              <CustomInput label='Практики' />
            </div>
          </div>
        </fieldset>      

        <fieldset className="edit-teacher__fieldset">
          <legend className="edit-teacher__fieldset_legend">Профессиональная информация</legend>

          <div className='edit-teacher__fieldset_wrap'>
            <CustomInput label='Почта' />
            <CustomInput label='Логин' />

            <div className="edit-teacher__inner-wrap">
              <CustomInput label='Пароль' type='password'/>
              {!isEdit && <CustomBtn text='Сгенерировать пароль' />}
            </div>
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

export default React.memo(EditTeacher);