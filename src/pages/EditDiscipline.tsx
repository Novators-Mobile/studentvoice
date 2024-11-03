import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Search from "../components/Search";
import Select from "../components/Select";
import Button from "../components/Button";

const options = ["ИРИТ-РТФ", "ИНМиТ", "ФТИ", "ИНЭУ", "ИСА", "УГИ"];
const inputWidth = "602px";

function EditDiscipline() {
  const navigate = useNavigate();

  const location = useLocation();
  let title: string = "";

  if (location.pathname.endsWith("edit")) {
    title = "Редактировать дисциплину";
  } else if (location.pathname.endsWith("new-discipline")) {
    title = "Новая дисциплина";
  }

  return (
    <>
      <h1 className="edit__title header-text">{title}</h1>

      <form className="edit-discipline__form">
        <fieldset className="edit-discipline__fieldset">
          <Input label="Название" width={inputWidth} />

          <Select
            label="Интститут"
            options={options}
            width={inputWidth}
          />
        </fieldset>

        <h2 className="edit-disipline__title medium-big-text">Преподаватели</h2>

        <fieldset className="edit-discipline__fieldset">
          <Search label="Лекции" width={inputWidth} />
          <Search label="Практики" width={inputWidth} />
        </fieldset>

        <div className="edit__form-btns">
          <Button
            text="Отменить"
            type="reset"
            onClick={() => navigate(-1)}
          />
          <Button text="Сохранить" type="submit" />
        </div>
      </form>
    </>
  );
}

export default React.memo(EditDiscipline);
