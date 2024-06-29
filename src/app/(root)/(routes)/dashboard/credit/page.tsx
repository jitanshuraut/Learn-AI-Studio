import LineGraph from "@/components/ui/line-chart";
import React from "react";

function page() {
  const Data: { week: string; credit: number }[] = [
    {
      week: "1",
      credit: 100,
    },
    {
      week: "10",
      credit: 10,
    },
  ];
  return (
    <div>
      <LineGraph data={Data} />
    </div>
  );
}

export default page;
