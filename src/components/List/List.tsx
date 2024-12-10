import React from "react";
import ListItem from "./ListItem";
import Tools from "../Tools";

export type TListItem = {
  id: number;
  title: string;
  rating: number;
};

type Props = {
  type: string;
  title: string;
  firstList: TListItem[];
  secondList: TListItem[];
  onPlusClick?: () => void;
};

function List({ type, title, firstList, secondList, onPlusClick }: Props) {
  return (
    <>
      <div className="list__wrapper">
        <div className="list">
          <p className="dropdown__title medium-big-text">{title}</p>
        </div>

        <Tools onPlusClick={onPlusClick} isList={true} />
      </div>

      <div className="list__items_wrap">
        <p className="medium-middle-text">Лекции</p>
        <ul className="list__items">
          {firstList.map((item, index) => (
            <ListItem
              key={index}
              id={item.id}
              type={type}
              title={item.title}
              rating={item.rating}
            />
          ))}
        </ul>

        <p className="medium-middle-text">Практики</p>
        <ul className="list__items">
          {secondList.map((item, index) => (
            <ListItem
              key={index}
              id={item.id}
              type={type}
              title={item.title}
              rating={item.rating}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default React.memo(List);
