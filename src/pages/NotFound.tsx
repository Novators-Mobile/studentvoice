import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <p className="logo-text">Страница не найдена 😢</p>
      <Button text="На главную" onClick={() => navigate("/", { replace: true })} />
    </div>
  );
}

export default React.memo(NotFound);