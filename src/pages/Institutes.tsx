import React from "react";
import { useNavigate } from "react-router-dom";
import Rating from "../components/Rating";

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

type InstItemProps = {
  id: number;
  name: string;
  rating: number;
};

function InstitutesItem({ id, name, rating }: InstItemProps) {
  const navigate = useNavigate();

  return (
    <li className="institutes__item_wrap">
      <div
        className="institutes__item"
        onClick={() => navigate(`/institutes/${id}`)}
      >
        <p className="institutes__item_text medium-middle-text">{name}</p>
      </div>

      <Rating rating={rating} type="medium" />
    </li>
  );
}

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
