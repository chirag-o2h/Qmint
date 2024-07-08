import React from "react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";

interface ChartMenuChart {
  data: any
  color: string
  max: number
  min: number
}

function ChartMenuChart(props: ChartMenuChart) {
  const { data, color, max, min } = props
  return (
    <ResponsiveContainer width="100%" height={60}>
      <LineChart data={data.map((item: number) => ({ amt: item }))}>
        <Line type="linear" dataKey="amt" stroke={color} strokeWidth={1} dot={false}/>
        <YAxis domain={[min, max]} hide={true}/>
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ChartMenuChart