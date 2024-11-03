import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Search from "../components/Search";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";

import GenerateIcon from "../components/Icons/GenerateIcon";

const departaments = [
  "Школа бакалавриата",
  "Кафедра вкусных булочек",
  "Департамент ИТиА",
  "Департамент ИИТ",
];

const institutes = ["ИРИТ-РТФ", "ИНМиТ", "ФТИ", "ИНЭУ", "ИСА", "УГИ"];

function EditTeacher() {
  const navigate = useNavigate();
  const location = useLocation();
  let title: string = "";
  let isEdit: boolean = false;

  if (location.pathname.endsWith("edit")) {
    title = "Редактировать профиль";
    isEdit = true;
  } else if (location.pathname.endsWith("new-profile")) {
    title = "Новый профиль преподавателя";
  }

  return (
    <>
      <h1 className="edit__title header-text">{title}</h1>

      <form className="edit-teacher__form">
        <fieldset className="edit-teacher__fieldset">
          <legend className="edit-teacher__fieldset_legend medium-small-text">
            Персональная информация
          </legend>

          <div className="edit-teacher__fieldset_container">
            <Input label="Имя" />
            <Input label="Отчество" />
            <Input label="Фамилия" />
          </div>
        </fieldset>

        <fieldset className="edit-teacher__fieldset">
          <legend className="edit-teacher__fieldset_legend medium-small-text">
            Профессиональная информация
          </legend>

          <div className="edit-teacher__big-wrap">
            <div className="edit-teacher__fieldset_wrap">
              <Select label="Институт" options={departaments} />
              <Select label="Кафедра" options={institutes} />
            </div>

            <div className="edit-teacher__fieldset_wrap">
              <Search label="Дисциплины" />
              <Search label="Лекции" />
              <Search label="Практики" />
            </div>
          </div>
        </fieldset>

        <fieldset className="edit-teacher__fieldset">
          <legend className="edit-teacher__fieldset_legend medium-small-text">
            Профессиональная информация
          </legend>

          <div className="edit-teacher__fieldset_wrap">
            <Input label="Почта" placeholder="example@mail.com" />
            <Input label="Логин" placeholder="Логин" />

            <div className="generate-password__wrap">
              <Input label="Пароль" type="password" placeholder="Пароль" />
              
              <div className="generate-password__inner-wrap">
                {!isEdit && <Button text="Сгенерировать" icon={<GenerateIcon />} />}
              </div>
            </div>
          </div>
        </fieldset>

        <div className="edit__form-btns">
          <Button text="Отменить" type="reset" onClick={() => navigate(-1)} />
          <Button text="Сохранить" type="submit" />
        </div>
      </form>
    </>
  );
}

export default React.memo(EditTeacher);
