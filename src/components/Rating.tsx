import React from "react";
// import { useNavigate } from "react-router-dom";

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
  type?: "common" | "medium" | "big"
  size?: React.CSSProperties;
};

function Rating({ rating, type = "common", size }: Props) {
  // const navigate = useNavigate();

  let style = "";

  switch(type) {
    case "medium": 
      style = "medium medium-middle-text";
      break;
    case "big": 
      style = "big medium-big-text";
      break;
    default:
      style = "medium-middle-text";
      break;
  }

  return (
    <p
      className={`rating ${getRatingColor(rating)} ${style}`} 
      // onClick={() => navigate("/statistics")}
      style={size}
    >
      {rating.toFixed(1)}
    </p>
  );
}

export default React.memo(Rating);
