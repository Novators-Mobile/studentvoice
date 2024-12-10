import React, { useEffect, useState } from "react";
import TitleBlock from "../../components/TitleBlock";
import { ToggleButton } from "../../components/ToggleButtons";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import StatsIndicators from "../../components/StatsIndicators";
import { getLesson, TLesson } from "../../api/lessonApi";
import { getTeacher, TTeacher } from "../../api/teacherApi";
import { getDiscipline, TDiscipline } from "../../api/disciplineApi";
import dayjs from "dayjs";

const STATS_MODE = {
  allStats: "allStats",
  feedback: "feedback",
};

function FeedbackItem() {
  return (
    <div className="feedback__item">
      <div className="circle"></div>

      <p className="regular-text">
        Lorem ipsum dolor sit amet consectetur. Amet metus feugiat ut
        pellentesque et lacus in volutpat. Arcu quis sit arcu facilisis. Euismod
        tellus ac sit mauris. Urna accumsan molestie consequat arcu.
      </p>
    </div>
  );
}

function Feedback() {
  return (
    <div className="feedback">
      <div className="feedback__wrap">
        <p className="feedback__text medium-middle-text">
          Позитивные впечатления от занятия и чем они вызваны:
        </p>

        <ul className="feedback__list">
          {[1, 2, 3].map((item) => (
            <FeedbackItem key={item} />
          ))}
        </ul>
      </div>

      <div className="feedback__wrap">
        <p className="feedback__text medium-middle-text">
          Негативные впечатления от занятия и чем они вызваны:
        </p>

        <ul className="feedback__list">
          {[1, 2, 3].map((item) => (
            <FeedbackItem key={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function LessonInfo() {
  const [mode, setMode] = useState<string>(STATS_MODE.allStats);
  const [qrGenerated, setQrGenerated] = useState(false);
  const navigate = useNavigate();

  const { lessonId } = useParams();
  const [lesson, setLesson] = useState<TLesson>();
  const [teacher, setTeacher] = useState<TTeacher>();
  const [discipline, setDiscipline] = useState<TDiscipline>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lesson = await getLesson(lessonId!);

        const [teacher, discipline] = await Promise.all([
          getTeacher(String(lesson.teacher)),
          getDiscipline(String(lesson.subject)),
        ]);

        setLesson(lesson);
        setTeacher(teacher);
        setDiscipline(discipline);
      } catch (err) {
        console.error("Ошибка при получении данных: ", err);
      }
    };

    fetchData();
  }, [lessonId]);

  const handleQrClick = () => {
    if (!qrGenerated) {
      setQrGenerated(true);
    } else {
      navigate("./qr");
    }
  };

  return (
    <>
      <TitleBlock
        title={dayjs(lesson?.date).format("DD.MM.YYYY") || ""}
        decryption={discipline?.name}
        rating={2}
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
              text={qrGenerated ? "Открыть QR" : "Сгенерировать QR"}
              onClick={handleQrClick}
            />
            <Button text="Excel" type="excel" />
          </div>
        </div>

        <div className="lesson__stats">
          {mode === STATS_MODE.allStats ? <StatsIndicators /> : <Feedback />}
        </div>
      </div>
    </>
  );
}

export default React.memo(LessonInfo);
