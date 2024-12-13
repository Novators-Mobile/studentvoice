import React from "react";
import FeedbackItem from "./FeedbackItem";
import { TPollResults } from "../../api/polls/pollsApi";

interface Props {
  results: TPollResults[];
}

function Feedback({ results }: Props) {
  return (
    <div className="feedback">
      <div className="feedback__wrap">
        <p className="feedback__text medium-middle-text">
          Позитивные впечатления от занятия и чем они вызваны:
        </p>

        <ul className="feedback__list">
          {results.map((item) => (
            <FeedbackItem key={item.id} comment={item.comment1} />
          ))}
        </ul>
      </div>

      <div className="feedback__wrap">
        <p className="feedback__text medium-middle-text">
          Негативные впечатления от занятия и чем они вызваны:
        </p>

        <ul className="feedback__list">
          {results.map((item) => (
            <FeedbackItem key={item.id} comment={item.comment2} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default React.memo(Feedback);