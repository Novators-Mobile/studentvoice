import React from "react";
import ListItem from "./ListItem";
import Tools from "../Tools/Tools";

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
  onDelete?: (id: string) => void;
  onDeleteItem?: (id: string, secondId: string, type: string) => void;
  disablePlusBtn?: boolean;
  onExcelClick?: () => Promise<Blob>;
  disableExcelBtn?: boolean;
  secondId?: string;
};

function List({
  type,
  title,
  firstList,
  secondList,
  onPlusClick,
  onDelete,
  onDeleteItem,
  disablePlusBtn,
  disableExcelBtn,
  onExcelClick,
  secondId
}: Props) {
  return (
    <>
      <div className="list__wrapper">
        <div className="list">
          <p className="dropdown__title medium-big-text">{title}</p>
        </div>

        <Tools
          onPlusClick={onPlusClick}
          isList={true}
          disablePlusBtn={disablePlusBtn}
          onExcelClick={onExcelClick}
          disableExcelBtn={disableExcelBtn}
        />
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
                      id={item.id}
                      secondId={secondId}
                      type={type}
                      lessonType="lecture"
                      title={item.title}
                      rating={item.rating}
                      onDelete={onDelete}
                      onDeleteItem={onDeleteItem}
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
                      id={item.id}
                      secondId={secondId} 
                      type={type}
                      lessonType="practice"
                      title={item.title}
                      rating={item.rating}
                      onDelete={onDelete}
                      onDeleteItem={onDeleteItem}
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

export default React.memo(List);
