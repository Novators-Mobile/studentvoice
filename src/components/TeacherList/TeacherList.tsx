import React from "react";
import ListItem from "./TeacherListItem";

export type TListItem = {
  id: number;
  title: string;
  rating: number;
};

type Props = {
  title: string;
  firstList: TListItem[];
  secondList: TListItem[];
};

function TeacherList({
  title,
  firstList,
  secondList,
}: Props) {
  return (
    <>
      <div className="list__wrapper">
        <div className="list">
          <p className="dropdown__title medium-big-text">{title}</p>
        </div>
      </div>

      <div className="list__items_wrap">
        {firstList.length !== 0 || secondList.length !== 0 ? (
          <>
            {!!firstList.length && (
              <>
                <p className="medium-middle-text">Лекции</p>
                <ul className="list__items">
                  {firstList.map((item, index) => (
                    <ListItem
                      key={index}
                      title={item.title}
                    />
                  ))}
                </ul>
              </>
            )}

            {!!secondList.length && (
              <>
                <p className="medium-middle-text">Практики</p>
                <ul className="list__items">
                  {secondList.map((item, index) => (
                    <ListItem
                      key={index}
                      title={item.title}
                    />
                  ))}
                </ul>
              </>
            )}
          </>
        ) : (
          "Список пуст"
        )}
      </div>
    </>
  );
}

export default React.memo(TeacherList);
