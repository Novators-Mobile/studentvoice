import React from "react";
import Rating from "./Rating";
import { Link, useLocation } from "react-router-dom";

type Props = {
  title: string;
  decryption: string;
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

        {editBtn && 
          <Link to={path} className="title-block__edit-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="41" height="42" viewBox="0 0 41 42" fill="none">
              <path d="M2 39.5H9.92831L39 10.4283L31.0708 2.5L2 31.5717V39.5Z" stroke="#666666" strokeWidth="4" strokeLinejoin="round"/>
              <path d="M23.1426 10.4282L31.0709 18.3565" stroke="#666666" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        }

        <Rating rating={rating} isBig={true} />
      </div>

      <p className="title__decryption medium-middle-text">{decryption}</p>
    </div>
    
  );
}

export default React.memo(TitleBlock);
