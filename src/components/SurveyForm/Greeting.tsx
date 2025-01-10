import React from "react";
import Input from "../Input";
import { FormData } from "../../pages/SurveyForm";
import { TPollMeeting } from "../../api/polls/pollsApi";
import dayjs from "dayjs";

type GreetingProps = {
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  meetingInfo: TPollMeeting;
};

function Greeting({ formData, handleInputChange, meetingInfo }: GreetingProps) {
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
            value={formData.student_second_name}
            onChange={handleInputChange}
            name="student_second_name"
          />

          <Input
            label="Имя"
            width={inputWidth}
            value={formData.student_first_name}
            onChange={handleInputChange}
            name="student_first_name"
          />

          <Input
            label="Отчество"
            width={inputWidth}
            value={formData.student_patronymic}
            onChange={handleInputChange}
            name="student_patronymic"
          />
        </div>

        <div className="form__lesson-info--wrap">
          <div className="form__lesson-info">
            <p className="regular-text">
              <span className="medium-middle-text">Дисциплина: </span> 
              {meetingInfo.subject_name}
            </p>
            <p className="regular-text">
              <span className="medium-middle-text">Преподаватель: </span> 
              {meetingInfo.teacher_name}
            </p>
            <p className="regular-text">
              <span className="medium-middle-text">Пара: </span> 
              {meetingInfo.name}
            </p>
            <p className="regular-text">
              <span className="medium-middle-text">Дата: </span> 
              {dayjs(meetingInfo.date).format("DD.MM.YYYY")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Greeting);