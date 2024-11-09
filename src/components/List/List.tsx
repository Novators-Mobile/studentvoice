import React, { useState } from "react";
import ListItem from "./ListItem";
import Tools from "../Tools";

type TListItem = {
  title: string;
  rating: number;
};

type Props = {
  type: string;
  title: string;
  list: TListItem[];
  onPlusClick?: () => void;
};

function List({ type, title, list, onPlusClick }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const editBtnHandler = (): void => {
    setIsEditing(true);
  };

  const saveBtnHandler = (): void => {
    setIsEditing(false);
  };

  return (
    <>
      <div className="list__wrapper">
        <div className="list">
          <p className="dropdown__title medium-big-text">{title}</p>
        </div>

        <Tools
          onPlusClick={onPlusClick}
          isEditing={isEditing}
          editBtnHandler={editBtnHandler}
          saveBtnHandler={saveBtnHandler}
          isList={true}
        />
      </div>

      <div className="list__items_wrap">
        <p className="medium-middle-text">Лекции</p>
        <ul className="list__items">
          {list.map((item, index) => (
            <ListItem
              key={index}
              id={index}
              type={type}
              title={item.title}
              rating={item.rating}
              isEditing={isEditing}
            />
          ))}
        </ul>

        <p className="medium-middle-text">Практики</p>
        <ul className="list__items">
          {list.map((item, index) => (
            <ListItem
              key={index}
              id={index}
              type={type}
              title={item.title}
              rating={item.rating}
              isEditing={isEditing}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default React.memo(List);
