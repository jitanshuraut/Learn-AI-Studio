import LineGraph from "@/components/ui/DashBoard/line-chart";
import React from "react";

function page() {
  const Data: { week: string; credit: number }[] = [
    {
      week: "1",
      credit: 100,
  },
  {
      week: "2",
      credit: 120,
  },
  {
      week: "3",
      credit: 80,
  },
  {
      week: "4",
      credit: 150,
  },
  {
      week: "5",
      credit: 90,
  },
  {
      week: "6",
      credit: 110,
  },
  {
      week: "7",
      credit: 130,
  },
  {
      week: "8",
      credit: 70,
  },
  {
      week: "9",
      credit: 140,
  },
  {
      week: "10",
      credit: 10,
  }
  ];
  return (
    <div>
      <LineGraph data={Data} />
    </div>
  );
}

export default page;
