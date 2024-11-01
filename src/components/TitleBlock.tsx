import React from "react";
import Rating from "./Rating";
import { Link, useLocation } from "react-router-dom";
import EditIcon from "./Icons/EditIcon";

type Props = {
  title: string;
  decryption?: string;
  rating: number;
  editBtn?: boolean;
};

function TitleBlock({ title, decryption, rating, editBtn = true }: Props) {
  const location = useLocation();
  const path = `${location.pathname}/edit`;

  return (
    <div className="title-block__wrap">
      <div className="title-block">
        <h1 className="header-text">{title}</h1>

        <div className="title-block__icons_wrap">
          {editBtn && 
            <Link to={path} className="title-block__edit-btn">
              <EditIcon />
            </Link>
          }

          <Rating rating={rating} isBig={true} />
        </div>
      </div>

      <p className="title__decryption medium-middle-text">{decryption}</p>
    </div>
    
  );
}

export default React.memo(TitleBlock);
