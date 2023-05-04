"use client";
import { Card, AreaChart, Title } from "@tremor/react";
type Props = {
  results: Root;
};

function TempChart({ results }: Props) {
  const hourly = results?.hourly?.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(0, 24);
  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    "UV index": results.hourly.uv_index[i],
    "Temparature (°C)": results.hourly.temperature_2m[i],
  }));

  const dataFormatter = (number: Number) => `${number}`;
  //     return "$ " + Intl.NumberFormat("us").format(number).toString();
  //   const dataFormatter = (number: number) => {
  //   return "$ " + Intl.NumberFormat("us").format(number).toString();
  // };

  return (
    <Card>
      <Title>Temparature Chart</Title>
      <AreaChart
        className="mt-6"
        index="time"
        categories={["Temparature (°C)", "UV index"]}
        colors={["yellow", "rose"]}
        minValue={0}
        maxValue={100}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
        data={data}
      />
    </Card>
  );
}

export default TempChart;
