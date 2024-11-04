import React from "react";
import Search from "../components/Search";

const list = [
  "Белоусова Вероника Игоревна",
  "Новиков Максим Юрьевич",
  "Белоусова Вероника Игоревна",
  "Белоусова Вероника Игоревна",
  "Белоусова Вероника Игоревна",
  "Основы проектной деятельности",
];

function SearchPage() {
  return (
    <>
      <div className="search-title header-text">Поиск сотрудников и&nbsp;дисциплин</div> 

      <Search isBig={true} />

      <ul className="search__items-list">
        {list?.map((item, index) => (
          <li key={index} className="search__item medium-big-text">{item}</li>
        ))}
      </ul>
      
    </>
  );
}

export default React.memo(SearchPage);  