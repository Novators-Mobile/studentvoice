import React, { useEffect, useState } from "react";
import TitleBlock from "../../components/TitleBlock";
import List from "../../components/List/List";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getTeacher, getTeachers, TTeacher } from "../../api/admin/teacherApi";
import {
  deleteDisciplineFromTeacher,
  getDiscipline,
  getDisciplines,
  TDiscipline,
} from "../../api/admin/disciplineApi";
import {
  disciplineToListItem,
  lessonsToListItem,
  teachersToListItem,
} from "../../utils/adapter";
import { deleteLesson, getLessons, TLesson } from "../../api/admin/lessonApi";
import Skeleton from "../../components/Skeleton";
import { AlertLoading, AlertUpdate } from "../../utils/Notifications";
import { getDisciplinesFromTeacher, getLessonsFromDiscipline, getLessonsFromTeacher, getTeachersFromDiscipline } from "../../api/excel/excelApi";

type TPageInfo = {
  mainTitle: string;
  decryption: string;
  type: "discipline" | "teacher";
  subTitle: "Дисциплины" | "Преподаватели";
};

type TLessons = {
  practice: TLesson[];
  lecture: TLesson[];
};

function ItemInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { disciplineId, teacherId } = useParams();
  const [teacherInfo, setTeacherInfo] = useState<TTeacher>();
  const [disciplineInfo, setDisciplineInfo] = useState<TDiscipline>();
  const [pageInfo, setPageInfo] = useState<TPageInfo>({
    mainTitle: "",
    decryption: "",
    type: "teacher",
    subTitle: "Дисциплины",
  });
  const [teachers, setTeachers] = useState<TTeacher[]>([]);
  const [disciplines, setDisciplines] = useState<TDiscipline[]>([]);
  const [lessons, setLessons] = useState<TLessons>({
    practice: [],
    lecture: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location.pathname.includes("discipline")) {
          const disciplineData = await getDiscipline(disciplineId!);
          setDisciplineInfo(disciplineData);
          const teachersData = await getTeachers({ subjectId: disciplineId });
          const lessonsLecture = await getLessons({
            subjectId: disciplineId,
            type: "lecture",
          });
          const lessonsPractice = await getLessons({
            subjectId: disciplineId,
            type: "practice",
          });

          const sortedLectures = lessonsLecture.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          const sortedPractices = lessonsPractice.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );

          setTeachers(teachersData);
          setPageInfo({
            mainTitle: "Аббревиатура",
            decryption: disciplineData.name,
            type: "teacher",
            subTitle: "Преподаватели",
          });
          setLessons({
            practice: sortedPractices,
            lecture: sortedLectures,
          });
        } else if (location.pathname.includes("teacher")) {
          const teacherData = await getTeacher(teacherId!);
          setTeacherInfo(teacherData);
          const disciplinesData = await getDisciplines({teacherId: teacherId});
          const lessonsLecture = await getLessons({
            teacherId: teacherId,
            type: "lecture",
          });
          const lessonsPractice = await getLessons({
            teacherId: teacherId,
            type: "practice",
          });

          const sortedLectures = lessonsLecture.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          const sortedPractices = lessonsPractice.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );

          setDisciplines(disciplinesData);
          setPageInfo({
            mainTitle: `${teacherData.second_name} ${teacherData.first_name} ${teacherData.patronymic}`,
            decryption: "",
            type: "discipline",
            subTitle: "Дисциплины",
          });
          setLessons({
            practice: sortedPractices,
            lecture: sortedLectures,
          });
        }
      } catch (err) {
        setError("Не удалось загрузить данные. Попробуйте позже.");
        console.error("Ошибка при получении данных: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [disciplineId, teacherId, location.pathname]);

  const handleDeleteLesson = async (id: string) => {
    const loadingToast = AlertLoading("Удаление...");
    try {
      await deleteLesson(id);
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

  const handleDeleteItem = async (id: string, secondId: string, type: string) => {
    const loadingToast = AlertLoading("Удаление...");
    try {
      await deleteDisciplineFromTeacher(id, secondId, type);
      if (location.pathname.includes("discipline")) {
        setTeachers((prev => prev.filter((item) => String(item.id) !== secondId)));
      } else {
        setDisciplines((prev => prev.filter((item) => String(item.id) !== id)));
      }
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
      <TitleBlock
        title={pageInfo.mainTitle}
        decryption={pageInfo.decryption}
        rating={
          location.pathname.includes("discipline")
            ? (disciplineInfo?.rating || 0)
            : (teacherInfo?.rating || 0)
        }
      />

      <List
        type={pageInfo.type}
        title={pageInfo.subTitle}
        firstList={
          location.pathname.includes("discipline")
            ? teachersToListItem(teachers.filter(teacher => disciplineInfo?.lecture_teachers?.includes(teacher.id!)))
            : disciplineToListItem(disciplines.filter(discipline => teacherInfo?.lecture_subjects?.includes(discipline.id!)))
        }
        secondList={
          location.pathname.includes("discipline")
            ? teachersToListItem(teachers.filter(teacher => disciplineInfo?.practice_teachers?.includes(teacher.id!)))
            : disciplineToListItem(disciplines.filter(discipline => teacherInfo?.practice_subjects?.includes(discipline.id!)))
        }
        onPlusClick={() =>
          navigate(
            `/new-${pageInfo.type === "discipline" ? pageInfo.type : "profile"}`
          )
        }
        disableExcelBtn={
          location.pathname.includes("discipline")
            ? !teachers.length
            : !disciplines.length
        }
        onExcelClick={
          location.pathname.includes("discipline")
            ? () => getTeachersFromDiscipline(disciplineId!)
            : () => getDisciplinesFromTeacher(teacherId!)
        }
        secondId={
          location.pathname.includes("discipline")
            ? disciplineId
            : teacherId
        }
        onDeleteItem={handleDeleteItem}
      />

      <List
        type="lesson"
        title="Пары"
        firstList={lessonsToListItem(lessons.lecture)}
        secondList={lessonsToListItem(lessons.practice)}
        onPlusClick={() => navigate("./new-lesson")}
        onDelete={handleDeleteLesson}
        disablePlusBtn={!teachers.length && !disciplines.length}
        disableExcelBtn={!lessons.lecture.length && !lessons.practice.length}
        onExcelClick={
          location.pathname.includes("discipline")
            ? () => getLessonsFromDiscipline(disciplineId!)
            : () => getLessonsFromTeacher(teacherId!)
        }
      />
    </div>
  );
}

export default React.memo(ItemInfo);
