import React, { useEffect, useState } from "react";
import List from "../../components/List/List";
import { useNavigate } from "react-router-dom";
import { getDisciplines, TDiscipline } from "../../api/disciplineApi";
import {
  disciplineToListItem,
  lessonsToListItem,
} from "../../utils/adapter";
import { getLessons, TLesson } from "../../api/lessonApi";

type TLessons = {
  practice: TLesson[];
  lecture: TLesson[];
};

function Profile() {
  const navigate = useNavigate();

  const [disciplines, setDisciplines] = useState<TDiscipline[]>([]);
  const [lessons, setLessons] = useState<TLessons>({
    practice: [],
    lecture: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const disciplinesData = await getDisciplines({ teacherId: localStorage.getItem("userId")! });
        const lessonsLecture = await getLessons({
          teacherId: localStorage.getItem("userId")!,
          type: "lecture",
        });
        const lessonsPractice = await getLessons({
          teacherId: localStorage.getItem("userId")!,
          type: "practice",
        });

        setDisciplines(disciplinesData);
        setLessons({
          practice: lessonsPractice,
          lecture: lessonsLecture,
        });
      } catch (err) {
        console.error("Ошибка при получении данных: ", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="item-info">
      <h1 className="institutes__title header-text">Профиль преподавателя</h1>

      <List
        type="discipline"
        title="Дисциплины"
        firstList={disciplineToListItem(disciplines)}
        secondList={disciplineToListItem(disciplines)}
      />

      <List
        type="lesson"
        title="Пары"
        firstList={lessonsToListItem(lessons.lecture)}
        secondList={lessonsToListItem(lessons.practice)}
        onPlusClick={() => navigate("/new-lesson")}
      />
    </div>
  );
}

export default React.memo(Profile);
