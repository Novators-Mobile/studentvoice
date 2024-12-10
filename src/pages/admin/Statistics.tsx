import React from "react";
import StatisticsGraph from "../../components/StatisticsGraph";

const data = [
  { name: "Сентябрь", rating: 2 },
  { name: "Октябрь", rating: 3.4 },
  { name: "Ноябрь", rating: 1.8 },
  { name: "Декабрь", rating: 4.2 },
  { name: "Январь", rating: 4.5 },
];

function Statistics() {
  return (
    <div className="statistics">
      <h1 className="statistics-header header-text">Общая статистика</h1>

      <StatisticsGraph data={data} />
    </div>
  );
}

export default React.memo(Statistics);
