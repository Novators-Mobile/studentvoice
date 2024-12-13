import React from "react";
import Input from "../Input";
import { FormData } from "../../pages/SurveyForm";

type GreetingProps = {
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

function Greeting({ formData, handleInputChange }: GreetingProps) {
  const inputWidth = "448px";

  return (
    <div className="form__greeting-block">
      <h1 className="header-text question-header">Приветствие</h1>

      <p className="logo-text question-text-wrap">
        Пожалуйста, введите своё ФИО, чтобы начать опрос по результатам занятия.
      </p>

      <div className="form__greeting--inner-wrap">
        <div className="form__greeting_inputs-wrap">
          <Input
            label="Фамилия"
            width={inputWidth}
            value={formData.lastName}
            onChange={handleInputChange}
            name="lastName"
          />

          <Input
            label="Имя"
            width={inputWidth}
            value={formData.firstName}
            onChange={handleInputChange}
            name="firstName"
          />

          <Input
            label="Отчество"
            width={inputWidth}
            value={formData.patronymic}
            onChange={handleInputChange}
            name="patronymic"
          />
        </div>

        <div className="form__lesson-info--wrap">
          <div className="form__lesson-info">
            <p className="regular-text">
              <span className="medium-middle-text">Дисциплина: </span> 
              Основы проектной деятельности
            </p>
            <p className="regular-text">
              <span className="medium-middle-text">Пара: </span> 
              Лабораторная работа 11
            </p>
            <p className="regular-text">
              <span className="medium-middle-text">Дата: </span> 
              23.09.2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Greeting);