import React, { useEffect, useState } from "react";
import TitleBlock from "../components/TitleBlock";
import { ToggleButton } from "../components/ToggleButtons";
import Button from "../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import StatsIndicators from "../components/StatsIndicators";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [mode, setMode] = useState<string>(
    searchParams.get("mode") || STATS_MODE.allStats
  );

  const [qrGenerated, setQrGenerated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchParams({ mode: mode });
  }, [mode]);

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
        title="ОПД (23.09.24)"
        decryption="Основы проектной деятельности"
        rating={3}
        editBtn={true}
      />

      <div className="lesson__info">
        <p className="regular-big-text">
          <span className="medium-big-text">Преподаватель: </span>
          Шадрин Денис Борисович, Астафьева Анна Викторовна
        </p>
        <p className="regular-big-text">
          <span className="medium-big-text">Формат: </span>
          лекция
        </p>
        <p className="regular-big-text">
          <span className="medium-big-text">Время: </span>
          17:40 (МСК+2)
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
