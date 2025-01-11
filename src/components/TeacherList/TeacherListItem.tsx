import React from "react";

type Props = {
  title: string;
};

function TeacherListItem({ title }: Props) {
  return (
    <li className="list__item">
      <p className="list__item_link regular-text">
        {title}
      </p>
    </li>
  );
}

export default React.memo(TeacherListItem);
