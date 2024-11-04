import { useNavigate } from "react-router-dom";
import Rating from "../Rating";
import React from "react";

type Props = {
  id: number;
  title: string;
  rating: number;
  type: string;
};

function ListItem({ id, title, rating, type }: Props) {
  const navigate = useNavigate();

  return (
    <li className="list__item">
      <p
        onClick={() => navigate(`../${type}/${id}`)}
        className="list__item_link regular-text"
      >
        {title}
      </p>

      <Rating rating={rating} />
    </li>
  );
}

export default React.memo(ListItem);
