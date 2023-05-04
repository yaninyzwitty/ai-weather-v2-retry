"use client";
import { Callout } from "@tremor/react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

type Props = {
  message: string;
  warning?: boolean;
};
function CalloutCard({ message, warning }: Props) {
  return (
    <Callout
      className="mt-2 "
      title={message}
      icon={warning ? ExclamationTriangleIcon : CheckCircleIcon}
      color={warning ? "red" : "green"}
    />
  );
}

export default CalloutCard;
