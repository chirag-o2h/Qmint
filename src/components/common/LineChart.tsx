import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 907,
  },
  {
    name: "Page B",
    uv: 120,
  },
  {
    name: "Page C",
    uv: 1100,
  },
  {
    name: "Page D",
    uv: 910,
  },
  {
    name: "Page E",
    uv: 1130,
  },
];

export default function LineBarChart({ value }: { value: any[] }) {
  // Calculate the minimum and maximum values for the yAxis domain
  const minValue = value?.length ? Math.min(...value?.map((v) => v.uv)) : 0;
  const maxValue = value?.length ? Math.max(...value?.map((v) => v.uv)) : 0;
  return (
    <ResponsiveContainer width="100%" height={108}>
      <AreaChart data={value}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00800159" stopOpacity={0.35} />
            {/* change stopColor to red #FF1F1F and stopOpacity to 1 */}
            <stop offset="95%" stopColor="#00800100" stopOpacity={0} />
            {/* change stopColor to red #FF1F1F00 */}
          </linearGradient>
        </defs>
        {/* <XAxis dataKey="name" /> */}
        <YAxis hide domain={[minValue, maxValue]} />
        <Tooltip labelFormatter={value => {
          return ``;
        }}
          formatter={(value) => {
            return [`${value}`]
          }} // Show only the value
        />
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#008001" //change stroke color to red #FF1F1F
          strokeWidth={1.5}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
