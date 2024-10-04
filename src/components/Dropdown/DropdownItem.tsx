import { Link, useLocation } from "react-router-dom"
import Rating from "../Rating"
import React, { useMemo } from "react";

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

        {isEditing && 
        <button className="dropdown__icon">
          <svg width="14" height="3" viewBox="0 0 14 3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="1.5" x2="14" y2="1.5" stroke="#366AF3" strokeWidth="3"/>
          </svg>
        </button>}
      </div>
      
    </li>
  )
}

export default React.memo(DropdownItem)