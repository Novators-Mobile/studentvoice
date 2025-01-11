import React, { useEffect, useState } from "react";
import TitleBlock from "../../components/TitleBlock";
import { ToggleButton } from "../../components/ToggleButtons";
import Button from "../../components/Button";
import { Link, useParams } from "react-router-dom";
import StatsIndicators from "../../components/StatsIndicators";
import { getLesson, TLesson } from "../../api/admin/lessonApi";
import { getTeacher, TTeacher } from "../../api/admin/teacherApi";
import { getDiscipline, TDiscipline } from "../../api/admin/disciplineApi";
import dayjs from "dayjs";
import Skeleton from "../../components/Skeleton";
import Feedback from "../../components/Feedback/Feedback";
import {
  getPoll,
  getPollResults,
  TPoll,
  TPollResults,
} from "../../api/polls/pollsApi";
import { getLessonReport } from "../../api/excel/excelApi";
import {
  getLessonParticipants,
  getTeacherLesson,
  TParticipant,
} from "../../api/teacher/teacherApi";

const STATS_MODE = {
  allStats: "allStats",
  feedback: "feedback",
};

function LessonInfo() {
  const [mode, setMode] = useState<string>(STATS_MODE.allStats);
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState<TLesson>();
  const [teacher, setTeacher] = useState<TTeacher>();
  const [discipline, setDiscipline] = useState<TDiscipline>();
  const [stats, setStats] = useState<TPoll>();
  const [results, setResults] = useState<TPollResults[]>();
  const [participants, setParticipants] = useState<TParticipant[]>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem("role") === "admin") {
          const lesson = await getLesson(lessonId!);
          const [teacher, discipline] = await Promise.all([
            getTeacher(String(lesson.teacher)),
            getDiscipline(String(lesson.subject)),
          ]);

          const stats = await getPoll(String(lesson.poll));
          const results = await getPollResults(String(lesson.poll));

          setResults(results);
          setStats(stats);
          setLesson(lesson);
          setTeacher(teacher);
          setDiscipline(discipline);
        } else {
          const lesson = await getTeacherLesson(lessonId!);
          const participantsInfo = await getLessonParticipants(lessonId!);
          setParticipants(participantsInfo);
          setLesson(lesson);
        }
      } catch (err) {
        setError("Не удалось загрузить данные. Попробуйте позже.");
        console.error("Ошибка при получении данных: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lessonId]);

  const excelClickHandler = async () => {
    try {
      const fileBlob = await getLessonReport(lessonId!);
      const fileURL = URL.createObjectURL(fileBlob);

      const a = document.createElement("a");
      a.href = fileURL;
      a.download = `report.xlsx`;
      a.click();

      URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.error("Ошибка при скачивании файла:", error);
    }
  };

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <TitleBlock
        title={`${lesson?.name} (${dayjs(lesson?.date).format("DD.MM.YYYY")})`}
        decryption={discipline?.name || lesson?.subject_name}
        rating={lesson?.rating || 0}
        editBtn={true}
      />

      <div className="lesson__info">
        {localStorage.getItem("role") === "admin" && (
          <p className="regular-big-text">
            <span className="medium-big-text">Преподаватель: </span>
            {`${teacher?.second_name} ${teacher?.first_name} ${teacher?.patronymic}`}
          </p>
        )}
        <p className="regular-big-text">
          <span className="medium-big-text">Формат: </span>
          {lesson?.type === "lecture" ? "лекция" : "практика"}
        </p>
        <p className="regular-big-text">
          <span className="medium-big-text">Время: </span>
          {dayjs(lesson?.date).format("HH:mm")}
        </p>
      </div>

      <div className="lesson__statistics">
        <div className="lesson__statistics_control-btns">
          {localStorage.getItem("role") === "admin" && (
            <div className="control-btns__wrap">
              <ToggleButton
                id={STATS_MODE.allStats}
                text="Общая статистика"
                name="statistics"
                checked={mode === STATS_MODE.allStats}
                onChange={() => setMode(STATS_MODE.allStats)}
              />
              <ToggleButton
                id={STATS_MODE.feedback}
                text="Отдельные отзывы"
                name="statistics"
                checked={mode === STATS_MODE.feedback}
                onChange={() => setMode(STATS_MODE.feedback)}
              />
            </div>
          )}

          <div className="control-btns__wrap">
            <Link
              to={`./qr?id=${lesson?.poll}`}
              className="button link medium-middle-text"
              target="_blank"
            >
              Открыть QR
            </Link>
            {localStorage.getItem("role") === "admin" && (
              <Button text="Excel" type="excel" onClick={excelClickHandler} />
            )}
          </div>
        </div>

        {localStorage.getItem("role") === "admin" ? (
          <div className="lesson__stats">
            {mode === STATS_MODE.allStats ? (
              <StatsIndicators stats={stats!} />
            ) : (
              <Feedback results={results!} />
            )}
          </div>
        ) : (
          <>
            <p className="lesson__participants-wrap medium-middle-text">
              Участники опроса:
            </p>
            {participants?.length !== 0 ? (
              <ul className="lesson__participants_list">
                {participants?.map((item, index) => (
                  <li
                    key={index}
                    className="regular-text"
                  >{`${item.student_second_name} ${item.student_first_name} ${item.student_patronymic}`}</li>
                ))}
              </ul>
            ) : (
              <p>Никто пока не оценил пару</p>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default React.memo(LessonInfo);
