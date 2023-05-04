import { Card, Color, Metric, Title } from "@tremor/react";

type Props = {
  title: string;
  metric: string;
  color: Color | undefined;
};

function Statcard({ title, metric, color }: Props) {
  return (
    <Card decorationColor={color} decoration="top">
      <Title>{title}</Title>
      <Metric>{metric}</Metric>
    </Card>
  );
}

export default Statcard;
