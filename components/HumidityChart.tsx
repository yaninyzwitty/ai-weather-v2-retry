"use client";
import { Card, Title, AreaChart, BarChart } from "@tremor/react";
type Props = {
  results: Root;
};
function HumidityChart({ results }: Props) {
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
    Humidity: results.hourly.relativehumidity_2m[i],
  }));

  const dataFormatter = (number: Number) => `${number}%`;
  return (
    <Card>
      <Title>Humidity Chart</Title>
      <AreaChart
        className="mt-6"
        data={data}
        index="time"
        categories={["Humidity"]}
        colors={["teal"]}
        minValue={0}
        maxValue={100}
        showLegend
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default HumidityChart;
