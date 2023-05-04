"use client";

import { AreaChart, Card, Title } from "@tremor/react";

type Props = {
  results: Root;
};
function RainChart({ results }: Props) {
  const hourly = results.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(0, 24);

  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    "Rain (%)": results.hourly.precipitation_probability[i],
  }));

  const dataFormatter = (number: Number) => `${number}%`;

  return (
    <Card>
      <Title>Rain Chart</Title>
      <AreaChart
        className="mt-6"
        data={data}
        valueFormatter={dataFormatter}
        index="time"
        categories={["Rain (%)"]}
        minValue={0}
        maxValue={100}
        showLegend
        yAxisWidth={40}
      />
    </Card>
  );
}

export default RainChart;
