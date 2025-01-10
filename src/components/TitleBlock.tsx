import React from "react";
import Rating from "./Rating";
import { useNavigate } from "react-router-dom";
import EditIcon from "../Icons/EditIcon";

type Props = {
  title?: string;
  decryption?: string;
  rating: number | null;
  editBtn?: boolean;
};

function TitleBlock({ title, decryption, rating, editBtn = true }: Props) {
  const navigate = useNavigate();

  return (
    <div className="title-block__wrap">
      <div className="title-block">
        <h1 className="header-text">{title}</h1>

        <div className="title-block__icons_wrap">
          {editBtn && (
            <div
              onClick={() => {
                navigate("./edit");
              }}
              className="title-block__edit-btn"
            >
              <EditIcon />
            </div>
          )}

          <Rating rating={rating || 0} type="big" />
        </div>
      </div>

      <p className="title__decryption medium-middle-text">{decryption}</p>
    </div>
  );
}

export default React.memo(TitleBlock);
