import { Link } from "react-router-dom";
import Rating from "../Rating";
import React from "react";
import ToolsBtn from "../Tools/ToolsBtn";
import DeleteIcon from "../../Icons/DeleteIcon";

type Props = {
  id: number;
  secondId?: string;
  title: string;
  rating: number;
  type: string;
  lessonType?: "lecture" | "practice";
  onDelete?: (id: string) => void;
  onDeleteItem?: (id: string, secondId: string, type: string) => void;
};

function ListItem({
  id,
  secondId,
  title,
  rating,
  type,
  lessonType,
  onDelete,
  onDeleteItem,
}: Props) {
  const handleDelete = () => {
    if (secondId && lessonType) {
      if (type === "discipline") {
        onDeleteItem!(String(id), secondId, lessonType);
      } else {
        onDeleteItem!(secondId, String(id), lessonType);
      }
    } else {
      onDelete!(String(id));
    }
  };

  return (
    <li className="list__item">
      <Link
        to={
          localStorage.getItem("role") === "teacher"
            ? `./${type}/${id}`
            : `../${type}/${id}`
        }
        className="list__item_link regular-text"
      >
        {title}
      </Link>

      <div className="dropdown__item_icons-wrap">
        {!(localStorage.getItem("role") === "teacher") && (
          <Rating rating={rating} />
        )}

        <ToolsBtn icon={<DeleteIcon />} onClick={handleDelete} />
      </div>
    </li>
  );
}

export default React.memo(ListItem);
