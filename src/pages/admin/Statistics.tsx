import React, { useEffect, useState } from "react";
import { getStatsByWeek, TStatsWeekItem } from "../../api/admin/statsApi";
import { statsWeekToGraph } from "../../utils/adapter";
import StatisticsGraph from "../../components/StatisticsGraph";
import { useSearchParams } from "react-router-dom";
import { getInstitute, TInstitute } from "../../api/admin/institutesApi";

function Statistics() {
  const [stats, setStats] = useState<TStatsWeekItem[]>([]);
  const [searchParams] = useSearchParams();
  const [institute, setInstitute] = useState<TInstitute>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await getStatsByWeek({
          instituteId: searchParams.get("instituteId")!,
          year: searchParams.get("year")!,
          month: searchParams.get("month")!,
        });
        const instituteInfo = await getInstitute(searchParams.get("instituteId")!);
        setInstitute(instituteInfo);
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

      <div className="stats-weeks__info">
        <p><b>Институт:</b> {institute?.short_name}</p>
        <p><b>Год:</b> {searchParams.get("year")}</p>
        <p><b>Месяц:</b> {searchParams.get("month")}</p>
      </div>

      <StatisticsGraph data={statsWeekToGraph(stats!)} />
    </div>
  );
}

export default React.memo(Statistics);
