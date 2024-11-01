import React from "react";
import Dropdown from "../components/Dropdown/Dropdown";
import TitleBlock from "../components/TitleBlock";

const subjectsList = [
  {
    title: "Основы проектной деятельности",
    rating: 8.3,
  },
  {
    title: "Программирование C# 1Ч.",
    rating: 7.5,
  },
  {
    title: "Управление требованиями",
    rating: 8.6,
  },
  {
    title: "Основы автоматического управления",
    rating: 6.7,
  },
];

const teachersList = [
  {
    title: "Новиков Максим Юрьевич ",
    rating: 8.3,
  },
  {
    title: "Шадрин Денис Борисович",
    rating: 7.5,
  },
  {
    title: "Мокрушин Андрей Анатольевич",
    rating: 8.6,
  },
  {
    title: "Белоусова Вероника Игоревна",
    rating: 6.7,
  },
];

function Institute() {
  return (
    <div className="institute">
      <TitleBlock title="ИРИТ-РтФ" decryption="Институт радиоэлектроники и информационных технологий-РТФ" rating={7.1} editBtn={false} />

      <Dropdown type="discipline" title="Дисциплины" list={subjectsList} />

      <Dropdown type="teacher" title="Преподаватели" list={teachersList} />
    </div>
  );
}

export default React.memo(Institute);
