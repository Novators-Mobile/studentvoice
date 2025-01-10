import React, { useEffect, useState } from "react";
import TitleBlock from "../../components/TitleBlock";
import { ToggleButton } from "../../components/ToggleButtons";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import StatsIndicators from "../../components/StatsIndicators";
import { getLesson, TLesson } from "../../api/admin/lessonApi";
import { getTeacher, TTeacher } from "../../api/admin/teacherApi";
import { getDiscipline, TDiscipline } from "../../api/admin/disciplineApi";
import dayjs from "dayjs";
import Skeleton from "../../components/Skeleton";
import Feedback from "../../components/Feedback/Feedback";
import { getPoll, getPollResults, TPoll, TPollResults } from "../../api/polls/pollsApi";

const STATS_MODE = {
  allStats: "allStats",
  feedback: "feedback",
};

function LessonInfo() {
  const [mode, setMode] = useState<string>(STATS_MODE.allStats);
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState<TLesson>();
  const [teacher, setTeacher] = useState<TTeacher>();
  const [discipline, setDiscipline] = useState<TDiscipline>();
  const [stats, setStats] = useState<TPoll>();
  const [results, setResults] = useState<TPollResults[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
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
      } catch (err) {
        setError("Не удалось загрузить данные. Попробуйте позже.");
        console.error("Ошибка при получении данных: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lessonId]);

  const handleQrClick = () => {
    navigate(`./qr?id=${lesson?.poll}`);
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
        decryption={discipline?.name}
        rating={0}
        editBtn={true}
      />

      <div className="lesson__info">
        <p className="regular-big-text">
          <span className="medium-big-text">Преподаватель: </span>
          {`${teacher?.second_name} ${teacher?.first_name} ${teacher?.patronymic}`}
        </p>
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

          <div className="control-btns__wrap">
            <Button
              text="Открыть QR"
              onClick={handleQrClick}
            />
            <Button text="Excel" type="excel" />
          </div>
        </div>

        <div className="lesson__stats">
          {mode === STATS_MODE.allStats ? <StatsIndicators stats={stats!} /> : <Feedback results={results!} />}
        </div>
      </div>
    </>
  );
}

export default React.memo(LessonInfo);
