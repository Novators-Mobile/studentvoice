import React from "react";
import Search from "../components/Search";
import Select from "../components/Select";
import Input from "../components/Input";
import { useLocation } from "react-router-dom";
import ToggleButtons from "../components/ToggleButtons";
import DatePicker from "../components/DatePicker";

const time = [
  "Не повторять",
  "Ежедневно",
  "Еженедельно",
  "Каждый будний день",
];

const toggleButtons = [
  {
    id: "lecture",
    text: "Лекция"
  },
  {
    id: "practice",
    text: "Практика"
  }
];

function EditLesson() {
  const location = useLocation();
  let title: string = "";
  let decryption: string = "";

  const normalizedPath = location.pathname.replace(/\/$/, "");

  if (normalizedPath.endsWith("edit")) {
    title = "Название пары";
    decryption = "Расшифровка аббревиатуры"
  } else if (normalizedPath.endsWith("new-lesson")) {
    title = "Новая пара";
  }
  return (
    <>
      <div className="title-block__wrap">
        <h1 className="header-text">{title}</h1>

        <p className="title__decryption medium-middle-text">{decryption}</p>
      </div>

      <form action="" className="edit-lesson__form">
        <fieldset className="fieldset-container">
          <DatePicker label="Дата" />
          <Search label="Дисциплина" />
          <Search label="Преподаватель" />
        </fieldset>

        <fieldset className="fieldset-container">
          <div className="edit-lesson__inner_wrap">
            <p className="medium-middle-text">Время</p>

            <div className="edit-lesson__time_wrap">
              <Input type="time" /> 
              <span>—</span>
              <Input type="time" />            
            </div>

            <Select options={time} />
          </div>

          <div className="edit-lesson__inner_wrap">
            <p className="medium-middle-text">Формат</p>

            <ToggleButtons buttons={toggleButtons} name="format" />
            
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default React.memo(EditLesson);