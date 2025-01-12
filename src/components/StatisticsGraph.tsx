import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export type TGraphItem = {
  name: string;
  rating: number;
  year?: string;
}

type Props = {
  data: TGraphItem[];
  width?: number;
  height?: number;
};

type CustomTickProps = {
  x: number;
  y: number;
  payload: { value: string };
}
  
function StatisticsGraph({ data, width = 1000, height = 400 }: Props) {
  const { instituteId } = useParams();
  
  const renderCustomTick = (props: CustomTickProps) => {
    const { x, y, payload } = props;

    const matchingData = data.find(item => item.name === payload.value);
    const year = matchingData?.year || "unknown";

    const url = `/statistics?month=${payload.value}&year=${year}&instituteId=${instituteId}`; 

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={40} textAnchor="middle">
          <Link to={url} className="regular-text">
            {payload.value}
          </Link>
        </text>
      </g>
    );
  };

  return (
    <div className="stats__wrap">
      <ResponsiveContainer width={width} height={height}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 40,
            left: 30,
            bottom: 35,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey="name" tickLine={false} tick={renderCustomTick}  />
          <YAxis
            tickLine={false}
            tickCount={5}
            domain={[1, 5]}
            tickSize={35}
            tick={{ fill: "#292929" }}
          />
          <Tooltip
            cursor={{ stroke: "none" }}
            contentStyle={{ fontSize: "16px" }}
          />
          <Line
            name="Рейтинг"
            type="linear" // monotone
            dataKey="rating"
            stroke="#1E4391"
            dot={{ strokeWidth: 2, r: 4 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default React.memo(StatisticsGraph);
