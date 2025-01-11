import React, { useEffect, useState } from "react";
import List from "../../components/List/List";
import { useNavigate } from "react-router-dom";
import { TDiscipline } from "../../api/admin/disciplineApi";
import { disciplineToListItem, lessonsToListItem } from "../../utils/adapter";
import { TLesson } from "../../api/admin/lessonApi";
import {
  deleteTeacherLesson,
  getTeacherDisciplines,
  getTeacherInfo,
  getTeacherLessons,
} from "../../api/teacher/teacherApi";
import Skeleton from "../../components/Skeleton";
import { AlertLoading, AlertUpdate } from "../../utils/Notifications";
import { TTeacher } from "../../api/admin/teacherApi";
import TeacherList from "../../components/TeacherList/TeacherList";

type TLessons = {
  practice: TLesson[];
  lecture: TLesson[];
};

function Profile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [teacherInfo, setTeacherInfo] = useState<TTeacher>();
  const [disciplines, setDisciplines] = useState<TDiscipline[]>([]);
  const [lessons, setLessons] = useState<TLessons>({
    practice: [],
    lecture: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacher = await getTeacherInfo();
        const disciplinesData = await getTeacherDisciplines();
        const lessonsLecture = await getTeacherLessons({ type: "lecture" });
        const lessonsPractice = await getTeacherLessons({ type: "practice" });

        setTeacherInfo(teacher);
        setDisciplines(disciplinesData);
        setLessons({
          practice: lessonsPractice,
          lecture: lessonsLecture,
        });
      } catch (err) {
        setError("Не удалось загрузить данные. Попробуйте позже.");
        console.error("Ошибка при получении данных: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteLesson = async (id: string) => {
    const loadingToast = AlertLoading("Удаление...");
    try {
      await deleteTeacherLesson(id);
      setLessons((prev) => ({
        practice: prev.practice.filter((item) => String(item.id) !== id),
        lecture: prev.lecture.filter((item) => String(item.id) !== id),
      }));
      AlertUpdate(loadingToast, "success", "Успешно удалено!");
    } catch (error) {
      AlertUpdate(loadingToast, "error", "Ошибка при удалении");
      console.error("Ошибка при удалении: ", error);
    }
  };

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="item-info">
      <h1 className="institutes__title header-text">Профиль преподавателя</h1>

      <TeacherList
        title="Дисциплины"
        firstList={disciplineToListItem(disciplines.filter(discipline => teacherInfo?.lecture_subjects?.includes(discipline.id!)))}
        secondList={disciplineToListItem(disciplines.filter(discipline => teacherInfo?.practice_subjects?.includes(discipline.id!)))}
      />

      <List
        type="lesson"
        title="Пары"
        firstList={lessonsToListItem(lessons.lecture)}
        secondList={lessonsToListItem(lessons.practice)}
        onPlusClick={() => navigate("/new-lesson")}
        onDelete={handleDeleteLesson}
      />
    </div>
  );
}

export default React.memo(Profile);
