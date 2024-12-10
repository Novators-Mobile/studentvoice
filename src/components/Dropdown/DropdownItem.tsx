import { useNavigate } from "react-router-dom";
import Rating from "../Rating";
import React from "react";
import ToolsBtn from "../ToolsBtn";
import DeleteIcon from "../../Icons/DeleteIcon";

type Props = {
  id: number;
  title: string;
  rating: number;
  type: string;
  onDelete?: (id: string) => void;
};

function DropdownItem({ id, title, rating, type, onDelete }: Props) {
  const navigate = useNavigate();
  const handleDelete = () => {
    onDelete!(String(id));
  };

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

        <ToolsBtn icon={<DeleteIcon />} onClick={handleDelete}/>
      </div>
    </li>
  );
}

export default React.memo(DropdownItem);
