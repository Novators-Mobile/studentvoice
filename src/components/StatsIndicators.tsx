import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";

type DataType = {
  subject: string;
  value: number;
}

const data: DataType[] = [
  { subject: "Взаимодействие с аудиторией", value: 4.1 },
  { subject: "Информативность", value: 3.5 },
  { subject: "Доступность", value: 2.9 },
  { subject: "Интерес", value: 3.3 },
  { subject: "Подача материала", value: 3.7 },
];

function StatsIndicators() {
  return (
    <div className="radar-chart">
      <RadarChart outerRadius="70%" width={1100} height={700} data={data}>
        <PolarGrid />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "#292929" }}
          tickSize={25}
        />
        <PolarRadiusAxis scale="pow" angle={90} domain={[1, 5]} />
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
