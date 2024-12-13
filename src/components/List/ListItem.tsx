import { Link } from "react-router-dom";
import Rating from "../Rating";
import React from "react";
import ToolsBtn from "../Tools/ToolsBtn";
import DeleteIcon from "../../Icons/DeleteIcon";

type Props = {
  id: number;
  title: string;
  rating: number;
  type: string;
  onDelete?: (id: string) => void;
};

function ListItem({ id, title, rating, type, onDelete }: Props) {
  const handleDelete = () => {
    onDelete!(String(id));
  };

  return (
    <li className="list__item">
      <Link to={`../${type}/${id}`} className="list__item_link regular-text">
        {title}
      </Link>

      <div className="dropdown__item_icons-wrap">
        <Rating rating={rating} />

        <ToolsBtn icon={<DeleteIcon />} onClick={handleDelete} />
      </div>
    </li>
  );
}

export default React.memo(ListItem);
