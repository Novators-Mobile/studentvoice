import { useNavigate } from "react-router-dom";
import Rating from "../Rating";
import React from "react";
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
  const navigate = useNavigate();

  return (
    <li className="dropdown__item">
      <p
        onClick={() => navigate(`./${type}/${id}`)}
        className="dropdown__item_link medium-middle-text"
      >
        {title}
      </p>

      <div className="dropdown__item_icons-wrap">
        <Rating rating={rating} />

        {isEditing && <ToolsBtn icon={<MinusIcon />} />}
      </div>
    </li>
  );
}

export default React.memo(DropdownItem);
