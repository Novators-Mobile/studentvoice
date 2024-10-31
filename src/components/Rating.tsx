import React from "react";

const getRatingColor = (rating: number): string => {
  if (rating >= 8) {
    return "#38C321"; // Зеленый
  } else if (rating >= 5) {
    return "#E8D31C"; // Желтый
  } else if (rating > 0) {
    return "#EF302B"; // Красный
  } else {
    return "#C7C7C7"; // Серый
  }
};

type Props = {
  rating: number;
  isBig?: boolean;
};

function InstitutesItem({ rating, isBig = false }: Props) {
  const ratingStyle = { 
    backgroundColor: getRatingColor(rating),
    padding: isBig ? "10px 17px" : "7px 15px",
    minWidth: isBig ? "84px" : "67px",
  };

  return (
    <p className={`rating medium-${isBig ? "big" : "middle"}-text`} style={ratingStyle}>
      {rating.toFixed(1)}
    </p>
  );
}

export default React.memo(InstitutesItem);
