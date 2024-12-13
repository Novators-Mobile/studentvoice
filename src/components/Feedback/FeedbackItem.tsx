import React from "react";

interface Props {
  comment: string;
}

function FeedbackItem({ comment }: Props) {
  return (
    <div className="feedback__item">
      <div className="circle"></div>

      <p className="regular-text">{comment}</p>
    </div>
  );
}

export default React.memo(FeedbackItem);
