import { Link, useLocation } from "react-router-dom";
import Rating from "../Rating";
import React, { useMemo } from "react";
import ToolsBtn from "../ToolsBtn";
import MinusIcon from "../Icons/MinusIcon";

type Props = {
  id: number;
  title: string;
  rating: number;
  type: string;
  isEditing: boolean;
};

function DropdownItem({ id, title, rating, type, isEditing }: Props) {
  const location = useLocation();
  const linkPath = useMemo(
    () => `${location.pathname}/${type}/${id}`,
    [location.pathname, type, id]
  );

  return (
    <li className="dropdown__item">
      <Link to={linkPath} className="dropdown__item_link medium-middle-text">
        {title}
      </Link>

      <div className="dropdown__item_icons-wrap">
        <Rating rating={rating} />

        {isEditing && <ToolsBtn icon={<MinusIcon />} />}
      </div>
    </li>
  );
}

export default React.memo(DropdownItem);
