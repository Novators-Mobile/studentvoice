import React from "react";

const getRatingColor = (rating: number): string => {
  if (rating >= 8) {
    return '#38C321'; // Зеленый
  } else if (rating >= 6) {
    return '#E8D31C'; // Желтый
  } else {
    return '#FF7171'; // Красный
  }
};

function InstitutesItem({ rating }: {rating: number}) {
  const ratingStyle = { backgroundColor: getRatingColor(rating) };

  return (
    <p className="rating" style={ ratingStyle }>{rating}</p>
  )
}

export default React.memo(InstitutesItem)