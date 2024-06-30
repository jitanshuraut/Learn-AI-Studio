"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { DollarSign } from "lucide-react";

export type LineGraphProps = {
  data: { week: string; credit: number }[];
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white text-black p-2">
        <p className="label">{`Weeks: ${label}`}</p>
        <p className="label">{`Credits: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default function LineGraph({ data }: LineGraphProps) {
  return (
    <div className="bg-secondary dark:bg-secondary/50 shadow flex w-full flex-col gap-3 rounded-lg p-5">
      <section className="flex justify-between gap-2 pb-2">
        <p>Credit</p>
        <DollarSign className="h-4 w-4" />
      </section>
      <ResponsiveContainer width={"100%"} height={350}>
        <LineChart
          data={data}
          margin={{ top: 0, left: -15, right: 0, bottom: 0 }}
        >
          <Line
            type="monotone"
            dataKey="credit"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
          />
          <XAxis
            dataKey="week"
            tickLine={false}
            axisLine={true}
            stroke={"#8678F9"}
            fontSize={13}
            padding={{ left: 0, right: 0 }}
          />
          <YAxis
            tickLine={false}
            axisLine={true}
            stroke={"#fff"}
            fontSize={13}
            padding={{ top: 0, bottom: 0 }}
            allowDecimals={false}
          />
          <CartesianGrid
            stroke={"#fff"}
            strokeDasharray="2 2"
            className="opacity-25"
          />
          <Tooltip content={CustomTooltip} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
