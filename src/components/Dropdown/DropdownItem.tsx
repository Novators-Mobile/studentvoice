import { Link, useLocation } from "react-router-dom"
import Rating from "../Rating"
import React, { useMemo } from "react";
import BtnMinus from "../BtnMinus";

type Props = {
  id: number;
  title: string;
  rating: number;
  type: string;
  isEditing: boolean;
}

function DropdownItem({ id, title, rating, type, isEditing }: Props) {
  const location = useLocation();
  const linkPath = useMemo(() => `${location.pathname}/${type}/${id}`, [location.pathname, type, id]);

  return (
    <li className="dropdown__item">
      <Link to={linkPath} className="dropdown__item_link">{title}</Link>

      <div className="dropdown__item_icons-wrap">
        <Rating rating={rating} />

        {isEditing && <BtnMinus />}
      </div>
      
    </li>
  )
}

export default React.memo(DropdownItem)