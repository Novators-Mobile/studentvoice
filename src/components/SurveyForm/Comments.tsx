import React from "react";
import { FormData, questionType } from "../../pages/SurveyForm";

type CommentsProps = {
  comments: questionType[];
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

function Comments({ comments, formData, handleInputChange }: CommentsProps) {
  return (
    <div className="form__comments-block">
      <h1 className="header-text question-header">Комментарии</h1>

      <div className="comments__list">
        {comments.map((comment, index) => (
          <div key={index} className="item__wrap">
            <p className="logo-text question-text-wrap">{comment.text}</p>

            <textarea
              className="question-text-wrap form__comment regular-big-text"
              placeholder="Введите свой ответ здесь"
              rows={10}
              value={formData[comment.name as keyof FormData]}
              onChange={handleInputChange}
              name={comment.name}
              required
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(Comments);