import React from "react";

const getRatingColor = (rating: number): string => {
  if (rating >= 4) {
    return "excellent"; // Зеленый
  } else if (rating >= 2.5) {
    return "good"; // Желтый
  } else if (rating > 0) {
    return "bad"; // Красный
  } else {
    return ""; // Стандартный (серый)
  }
};

type Props = {
  rating: number;
  isBig?: boolean;
};

function Rating({ rating, isBig = false }: Props) {
  return (
    <p
      className={`rating 
        ${getRatingColor(rating)} 
        ${isBig && "big"}  
        medium-${isBig ? "big" : "middle"}-text`}
    >
      {rating.toFixed(1)}
    </p>
  );
}

export default React.memo(Rating);
