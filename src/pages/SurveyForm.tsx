import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import Comments from "../components/SurveyForm/Comments";
import Greeting from "../components/SurveyForm/Greeting";
import Questions from "../components/SurveyForm/Questions";

export type questionType = {
  type: "question" | "comment";
  text: string;
  name: string;
};

const questionsList: questionType[] = [
  {
    type: "question",
    text: "Насколько информативным было содержание пары (сколько новой информации вы для себя подчерпнули)?",
    name: "question1",
  },
  {
    type: "question",
    text: "Насколько понятно и доступно преподаватель донес информацию?",
    name: "question2",
  },
  {
    type: "question",
    text: "Как бы Вы оценили взаимодействие преподавателя со студентами (дискуссии, ответы на возникшие вопросы, интерактивы и т.д.)? ?",
    name: "question3",
  },
  {
    type: "question",
    text: "Как сильно Вас заинтересовал материал занятия?",
    name: "question4",
  },
  {
    type: "question",
    text: "Как бы Вы оценили подачу материала (насколько уверенным и подробным было повествование)?",
    name: "question5",
  },
];

const commentsList: questionType[] = [
  {
    type: "comment",
    text: "Опишите подробнее позитивные впечатления от занятия и чем они вызваны.",
    name: "comment1",
  },
  {
    type: "comment",
    text: "Опишите подробнее негативные впечатления от занятия и чем они вызваны.",
    name: "comment2",
  },
];

const questionsInfo = {
  questions: questionsList,
  comments: commentsList,
};

export type FormData = {
  lastName: string;
  firstName: string;
  patronymic: string;
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  comment1: string;
  comment2: string;
};

function SurveyForm() {
  const { formId } = useParams();

  const savedPageNumber = Number(localStorage.getItem("pageNumber") || 1);
  const savedFormData = JSON.parse(localStorage.getItem("formData") || "{}");

  const [pageNumber, setPageNumber] = useState<number>(savedPageNumber);
  const [formData, setFormData] = useState<FormData>({
    lastName: "",
    firstName: "",
    patronymic: "",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    comment1: "",
    comment2: "",
    ...savedFormData,
  });

  useEffect(() => {
    const savedFormID = localStorage.getItem("formId");
    if (savedFormID !== formId) {
      // localStorage.clear();
      localStorage.setItem("formId", formId || "");
      setFormData({
        lastName: "",
        firstName: "",
        patronymic: "",
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
        comment1: "",
        comment2: "",
      });
      setPageNumber(1);
    }
  }, [formId]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("pageNumber", String(pageNumber));
  }, [formData, pageNumber]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const clearForm = () => {
    localStorage.removeItem("formData");
    localStorage.removeItem("pageNumber");

    setFormData({
      lastName: "",
      firstName: "",
      patronymic: "",
      question1: "",
      question2: "",
      question3: "",
      question4: "",
      question5: "",
      comment1: "",
      comment2: "",
    });
    setPageNumber(1);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearForm();
  };

  const isGreetingComplete = Boolean(
    formData.lastName && formData.firstName && formData.patronymic
  );

  const isSurveyComplete = [
    "question1",
    "question2",
    "question3",
    "question4",
    "question5",
  ].every((key) => formData[key as keyof FormData]);

  return (
    <form
      className={`form-wrap ${pageNumber === 1 && "crutch-wrap"}`}
      onSubmit={handleFormSubmit}
    >
      {pageNumber === 1 && (
        <Greeting formData={formData} handleInputChange={handleInputChange} />
      )}

      {pageNumber === 2 && (
        <Questions
          questions={questionsInfo.questions}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}

      {pageNumber === 2 && (
        <Comments
          comments={questionsInfo.comments}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}

      <div className="form__btns_wrap">
        {pageNumber === 1 && (
          <Button
            text="Перейти к опросу"
            disabled={!isGreetingComplete}
            onClick={() => {
              setPageNumber((prev) => prev + 1);
              window.scrollTo(0, 0);
            }}
          />
        )}

        {pageNumber === 2 && (
          <Button
            text="Завершить опрос"
            type="submit"
            disabled={!isSurveyComplete}
          />
        )}
      </div>
    </form>
  );
}

export default React.memo(SurveyForm);
