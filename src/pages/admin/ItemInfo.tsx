import React, { useEffect, useState } from "react";
import TitleBlock from "../../components/TitleBlock";
import List from "../../components/List/List";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getTeacher, getTeachers, TTeacher } from "../../api/teacherApi";
import {
  getDiscipline,
  getDisciplines,
  TDiscipline,
} from "../../api/disciplineApi";
import {
  disciplineToListItem,
  lessonsToListItem,
  teachersToListItem,
} from "../../utils/adapter";
import { getLessons, TLesson } from "../../api/lessonApi";

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

  const { disciplineId, teacherId } = useParams();
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
          const teachersData = await getTeachers({ subjectId: disciplineId });
          const lessonsLecture = await getLessons({
            subjectId: disciplineId,
            type: "lecture",
          });
          const lessonsPractice = await getLessons({
            subjectId: disciplineId,
            type: "practice",
          });

          setTeachers(teachersData);
          setPageInfo({
            mainTitle: "Аббревиатура",
            decryption: disciplineData.name,
            type: "teacher",
            subTitle: "Преподаватели",
          });
          setLessons({
            practice: lessonsPractice,
            lecture: lessonsLecture,
          });
        } else if (location.pathname.includes("teacher")) {
          const teacherData = await getTeacher(teacherId!);
          const disciplinesData = await getDisciplines({
            teacherId: teacherId,
          });
          const lessonsLecture = await getLessons({
            teacherId: teacherId,
            type: "lecture",
          });
          const lessonsPractice = await getLessons({
            teacherId: teacherId,
            type: "practice",
          });

          setDisciplines(disciplinesData);
          setPageInfo({
            mainTitle: `${teacherData.second_name} ${teacherData.first_name} ${teacherData.patronymic}`,
            decryption: "",
            type: "discipline",
            subTitle: "Дисциплины",
          });
          setLessons({
            practice: lessonsPractice,
            lecture: lessonsLecture,
          });
        }
      } catch (err) {
        console.error("Ошибка при получении данных: ", err);
      }
    };

    fetchData();
  }, [disciplineId, teacherId, location.pathname]);

  return (
    <div className="item-info">
      <TitleBlock
        title={pageInfo.mainTitle}
        decryption={pageInfo.decryption}
        rating={4}
      />

      <List
        type={pageInfo.type}
        title={pageInfo.subTitle}
        firstList={
          location.pathname.includes("discipline")
            ? teachersToListItem(teachers)
            : disciplineToListItem(disciplines)
        }
        secondList={
          location.pathname.includes("discipline")
            ? teachersToListItem(teachers)
            : disciplineToListItem(disciplines)
        }
        onPlusClick={() =>
          navigate(
            `/new-${pageInfo.type === "discipline" ? pageInfo.type : "profile"}`
          )
        }
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

export default React.memo(ItemInfo);
