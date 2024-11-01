import React from "react";
import TitleBlock from "../components/TitleBlock";
import List from "../components/List/List";
import { useLocation } from "react-router-dom";

const subjectsList = [
  {
    title: "Основы проектной деятельности",
    rating: 8.3,
    lecture: true,
    practive: true,
  },
  {
    title: "Программирование C# 1Ч.",
    rating: 7.5,
    lecture: false,
    practive: true,
  },
  {
    title: "Управление требованиями",
    rating: 8.6,
    lecture: false,
    practive: true,
  },
];

const teachersList = [
  {
    title: "Новиков Максим Юрьевич",
    rating: 8.3,
    lecture: true,
    practive: true,
  },
  {
    title: "Шадрин Денис Борисович",
    rating: 7.5,
    lecture: false,
    practive: true,
  },
  {
    title: "Астафьева Анна Викторовна",
    rating: 8.6,
    lecture: false,
    practive: true,
  },
];

const lessonsList = [
  {
    title: "Основы проектной деятельности (17.09.24)",
    rating: 8.3,
    type: "lecture",
  },
  {
    title: "Основы проектной деятельности (17.09.24)",
    rating: 8.3,
    type: "practice",
  },
  {
    title: "Основы проектной деятельности (17.09.24)",
    rating: 8.3,
    type: "practice",
  },
  {
    title: "Основы проектной деятельности (17.09.24)",
    rating: 8.3,
    type: "practice",
  },
];

function ItemInfo() {
  const location = useLocation();

  let mainTitle: string = "";
  let decryption: string = "";
  let type: string = "";
  let subTitle: string = "";
  let list = subjectsList;

  if (location.pathname.includes("teacher")) {
    mainTitle = "Новиков Максим Юрьевич";
    type = "discipline";
    subTitle = "Дисциплины";
  } else if (location.pathname.includes("discipline")) {
    mainTitle = "ОПД";
    decryption = "Основы проектной деятельности";
    type = "teacher";
    subTitle = "Преподаватели";
    list = teachersList;
  }

  return (
    <div className="item-info">
      <TitleBlock title={mainTitle} decryption={decryption} rating={8.4} />

      <List type={type} title={subTitle} list={list} />

      <List type="lesson" title="Пары" list={lessonsList} />
    </div>
  );
}

export default React.memo(ItemInfo);
