import React from "react";
import { ToggleButton } from "../ToggleButtons";
import { FormData, questionType } from "../../pages/SurveyForm";


type QuestionsProps = {
  questions: questionType[];
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

function Questions({ questions, formData, handleInputChange }: QuestionsProps) {
  return (
    <div className="form__questions-block">
      <h1 className="header-text question-header">Опрос по итогам занятия</h1>

      <div className="form__questions-list">
        {questions.map((question, index) => (
          <div key={index} className="item__wrap">
            <p className="logo-text question-text-wrap">{question.text}</p>

            <p className="regular-big-text question-text-wrap">
              Оцените свои впечатления по&nbsp;шкале от&nbsp;1&nbsp;до&nbsp;5
            </p>

            <fieldset className="form__answers_wrap">
              {[1, 2, 3, 4, 5].map((value) => (
                <ToggleButton
                  key={`${question.name}-${value}`}
                  id={`${question.name}-${value}`}
                  text={String(value)}
                  name={question.name}
                  checked={
                    formData[question.name as keyof FormData] === String(value)
                  }
                  value={String(value)}
                  onChange={handleInputChange}
                  role="answer"
                />
              ))}
            </fieldset>
          </div>
        ))}
      </div>
    </div>
  );
}
export default React.memo(Questions);