import React, { useEffect, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";
import { TPoll } from "../api/polls/pollsApi";

interface Props {
  stats: TPoll;
}

type DataType = {
  subject: string;
  value: number;
}

function StatsIndicators({ stats }: Props) {
  const [data, setData] = useState<DataType[]>([
    { subject: "Информативность", value: 0 },
    { subject: "Доступность", value: 0 },
    { subject: "Взаимодействие с аудиторией", value: 0 },
    { subject: "Интерес", value: 0 },
    { subject: "Подача материала", value: 0 },
  ]);

  useEffect(() => {
    const round = (value: number | null): number =>
      value !== null ? parseFloat(value.toFixed(1)) : 1;

    const formattedData: DataType[] = [
      { subject: "Информативность", value: round(stats.question1_avg_mark) },
      { subject: "Доступность", value: round(stats.question2_avg_mark) },
      { subject: "Взаимодействие с аудиторией", value: round(stats.question3_avg_mark) },
      { subject: "Интерес", value: round(stats.question4_avg_mark) },
      { subject: "Подача материала", value: round(stats.question5_avg_mark) },
    ];
    setData(formattedData);
  }, [stats]);

  return (
    <div className="radar-chart">
      <RadarChart outerRadius="70%" width={1100} height={700} data={data}>
        <PolarGrid />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "#292929" }}
          tickSize={25}
        />
        <PolarRadiusAxis scale="pow" angle={90} domain={[0, 5]} />
        <Radar
          name="Рейтинг"
          dataKey="value"
          stroke="#1E4391"
          fill="#1E4391"
          fillOpacity={0.3}
        />
        <Tooltip
          cursor={{ stroke: "none" }}
          contentStyle={{ fontSize: "16px" }}
        />
      </RadarChart>
    </div>
  );
}

export default React.memo(StatsIndicators);
