import React from "react";
import Rating from "../../components/Rating";
import { Link } from "react-router-dom";

type Props = {
  id: number;
  name: string;
  rating: number;
};

function InstitutesItem({ id, name, rating }: Props) {
  return (
    <li>
      <Link to={`/institutes/${id}`} className="institutes__item">
        <p className="medium-middle-text">{name}</p>
        <Rating rating={rating} />
      </Link>
    </li>
  );
}

export default React.memo(InstitutesItem);
