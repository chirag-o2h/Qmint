import React from "react";
import { LineChart, Line, Tooltip, ResponsiveContainer, YAxis } from "recharts";

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
      <LineChart data={data.map((item: number) => ({ price: item }))}>
        <Line 
        // type="linear"
        type="monotone"
         dataKey="price" stroke={color} strokeWidth={3} dot={false} />
        <YAxis domain={[min, max]} hide={true} />
        <Tooltip labelFormatter={value => {
          return ``;
        }} 
        formatter={(value) =>{
          return [`${value}`]}} // Show only the value
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ChartMenuChart