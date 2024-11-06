import React from "react";
import Dropdown from "../components/Dropdown/Dropdown";
import TitleBlock from "../components/TitleBlock";
import { useNavigate } from "react-router-dom";

const subjectsList = [
  {
    title: "Основы проектной деятельности",
    rating: 4,
  },
  {
    title: "Программирование C# 1Ч.",
    rating: 4,
  },
  {
    title: "Управление требованиями",
    rating: 4,
  },
  {
    title: "Основы автоматического управления",
    rating: 3,
  },
];

const teachersList = [
  {
    title: "Новиков Максим Юрьевич ",
    rating: 3,
  },
  {
    title: "Шадрин Денис Борисович",
    rating: 2,
  },
  {
    title: "Мокрушин Андрей Анатольевич",
    rating: 4,
  },
  {
    title: "Белоусова Вероника Игоревна",
    rating: 4,
  },
];

function Institute() {
  const navigate = useNavigate();

  return (
    <div className="institute">
      <TitleBlock title="ИРИТ-РтФ" decryption="Институт радиоэлектроники и информационных технологий-РТФ" rating={5} editBtn={false} />

      <Dropdown type="discipline" title="Дисциплины" list={subjectsList} onPlusClick={() => navigate("/new-discipline")} />

      <Dropdown type="teacher" title="Преподаватели" list={teachersList} onPlusClick={() => navigate("/new-profile")} />
    </div>
  );
}

export default React.memo(Institute);
