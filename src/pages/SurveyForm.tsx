import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

type pageType = {
  type: string;
  title: string;
  text: string;
  name?: string;
};

const content: pageType[] = [
  {
    type: "greeting",
    title: "Приветствие",
    text: "Пожалуйста, введите своё ФИО, чтобы начать опрос по результатам занятия.",
  },
  {
    type: "question",
    title: "Опрос по итогам занятия",
    text: "Насколько информативным было содержание пары (сколько новой информации вы для себя подчерпнули)?",
    name: "question1",
  },
  {
    type: "question",
    title: "Опрос по итогам занятия",
    text: "Насколько понятно и доступно преподаватель донес информацию?",
    name: "question2",
  },
  {
    type: "question",
    title: "Опрос по итогам занятия",
    text: "Как бы Вы оценили взаимодействие преподавателя со студентами (дискуссии, ответы на возникшие вопросы, интерактивы и т.д.)? ?",
    name: "question3",
  },
  {
    type: "question",
    title: "Опрос по итогам занятия",
    text: "Как сильно Вас заинтересовал материал занятия?",
    name: "question4",
  },
  {
    type: "question",
    title: "Опрос по итогам занятия",
    text: "Как бы Вы оценили подачу материала (насколько уверенным и подробным было повествование)?",
    name: "question5",
  },
  {
    type: "comment",
    title: "Комментарии",
    text: "Опишите подробнее позитивные впечатления от занятия и чем они вызваны.",
    name: "comment1"
  },
  {
    type: "comment",
    title: "Комментарии",
    text: "Опишите подробнее негативные впечатления от занятия и чем они вызваны.",
    name: "comment2"
  },
];

type FormData = {
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

type FormPageProps = {
  pageInfo: pageType;
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

function FormPage({ pageInfo, formData, handleInputChange }: FormPageProps) {
  return (
    <>
      <h1 className="header-text question-header">{pageInfo.title}</h1>

      <p className="logo-text question-text-wrap">{pageInfo.text}</p>

      {pageInfo.type === "greeting" && (
        <Greeting formData={formData} handleInputChange={handleInputChange} />
      )}

      {pageInfo.type === "question" && (
        <AnswerOptions
          name={pageInfo.name}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}

      {pageInfo.type === "comment" && (
        <Comments name={pageInfo.name} formData={formData} handleInputChange={handleInputChange} />
      )}
    </>
  );
}

type GreetingProps = {
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

function Greeting({ formData, handleInputChange }: GreetingProps) {
  const inputWidth = "448px";

  return (
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
  );
}

type AnswerOptionsProps = {
  name?: string;
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

function AnswerOptions({
  name,
  formData,
  handleInputChange,
}: AnswerOptionsProps) {
  return (
    <>
      <p className="regular-big-text question-text-wrap">
        Оцените свои впечатления по&nbsp;шкале от&nbsp;1&nbsp;до&nbsp;5
      </p>

      <fieldset className="form__questions_wrap">
        {[1, 2, 3, 4, 5].map((value) => (
          <div key={value} className="form__input_wrap regular-big-text">
            <input
              type="radio"
              id={String(value)}
              name={name}
              value={value}
              checked={name ? formData[name as keyof FormData] === String(value) : false}
              onChange={handleInputChange}
            />
            <label htmlFor={String(value)}>{value}</label>
          </div>
        ))}
      </fieldset>
    </>
  );
}

type CommentsProps = {
  name?: string;
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

function Comments({ name, formData, handleInputChange }: CommentsProps) {
  return (
    <div className="comments__wrap">
      <textarea
        className="question-text-wrap form__comments regular-big-text"
        placeholder="Введите свой ответ здесь"
        rows={10}
        value={name ? formData[name as keyof FormData] : ""}
        onChange={handleInputChange}
        name={name}
      />
    </div>
  );
}

function SurveyForm() {
  const savedFormData = JSON.parse(localStorage.getItem("formData") || '{}');
  const savedPageNumber = Number(localStorage.getItem("pageNumber") || 0);

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
    ...savedFormData
  });

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
    setPageNumber(0);
  };

  return (
    <form className="form-wrap" onSubmit={handleFormSubmit}>
      <FormPage
        pageInfo={content[pageNumber]}
        formData={formData}
        handleInputChange={handleInputChange}
      />

      <div className="form__btns_wrap">
        {pageNumber !== 0 && (
          <Button
            text="Назад"
            onClick={() => setPageNumber((prev) => prev - 1)}
          />
        )}

        <div className="form__btns_inner-wrap">
          {pageNumber !== content.length - 1 && (
            <Button
              text={`${
                pageNumber === 0 ? "Перейти к опросу" : "Следующий вопрос"
              }`}
              onClick={() => setPageNumber((prev) => prev + 1)}
            />
          )}

          {pageNumber === content.length - 1 && (
            <Button text="Завершить опрос" type="submit" />
          )}
        </div>
      </div>
    </form>
  );
}

export default React.memo(SurveyForm);
