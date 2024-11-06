import React from "react";
import InstitutesItem from "./InstitutesItem";

const institutesList = [
  {
    name: "Институт радиоэлектроники и информационных технологий - РТФ",
    rating: 4,
  },
  {
    name: "Физико-технологический институт",
    rating: 3,
  },
  {
    name: "Институт экономики и управления",
    rating: 0,
  },
  {
    name: "Институт строительства и архитектуры",
    rating: 2,
  },
  {
    name: "Уральский гуманитарный институт",
    rating: 1,
  },
];

function Institutes() {
  return (
    <div className="institutes">
      <h1 className="institutes__title header-text">Институты</h1>
      <ul className="institutes__list">
        {institutesList.map((item, index) => (
          <InstitutesItem
            key={index}
            id={index}
            name={item.name}
            rating={item.rating}
          />
        ))}
      </ul>
    </div>
  );
}

export default React.memo(Institutes);
