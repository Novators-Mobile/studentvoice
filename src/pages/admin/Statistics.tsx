import React, { useEffect, useState } from "react";
import { getStatsByWeek, TStatsWeekItem } from "../../api/admin/statsApi";
import { statsWeekToGraph } from "../../utils/adapter";
import StatisticsGraph from "../../components/StatisticsGraph";
import { useSearchParams } from "react-router-dom";

function Statistics() {
  const [stats, setStats] = useState<TStatsWeekItem[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await getStatsByWeek({
          instituteId: searchParams.get("instituteId")!,
          year: searchParams.get("year")!,
          month: searchParams.get("month")!,
        });
        setStats(statsData);
      } catch (err) {
        console.error("Ошибка при получении данных: ", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="statistics">
      <h1 className="statistics-header header-text">Статистика по неделям</h1>

      <StatisticsGraph data={statsWeekToGraph(stats!)} />
    </div>
  );
}

export default React.memo(Statistics);
