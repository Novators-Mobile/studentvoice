import React from "react";

function Skeleton() {
  return (
    <div className="card">
      <div className="card__skeleton card__title"></div>
      <div className="card__skeleton card__second-title"></div>
      <div className="card__item--wrap">
        <div className="card__skeleton card__subtitle"></div>

        <div className="card__skeleton card__item"></div>
        <div className="card__skeleton card__item"></div>
        <div className="card__skeleton card__item"></div>
      </div>
      <div className="card__item--wrap">
        <div className="card__skeleton card__subtitle"></div>

        <div className="card__skeleton card__item"></div>
        <div className="card__skeleton card__item"></div>
        <div className="card__skeleton card__item"></div>
      </div>
    </div>
  );
}

export default React.memo(Skeleton);
