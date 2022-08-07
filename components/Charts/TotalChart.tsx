import { useMemo } from "react";
import { PieChart } from "@revolut/ui-kit";
import { Mark, Mood } from "../../types";

type Props = {
  marks: Mark[];
};

const colorMatrix = {
  [Mood.Bad]: "warning",
  [Mood.Terrible]: "error",
  [Mood.Ok]: "blue",
  [Mood.Good]: "teal-opaque-80",
  [Mood.Great]: "success",
};

export const TotalChart = ({ marks }: Props) => {
  const data = useMemo(() => {
    const counts = marks.reduce((acc, v) => {
      if (!acc[v.mood]) {
        acc[v.mood] = {
          title: v.mood,
          color: colorMatrix[v.mood],
          value: Math.floor(100 / marks.length),
          label: `${Math.floor(100 / marks.length)}%`,
          count: 1,
        };

        return acc;
      }

      acc[v.mood].count = acc[v.mood].count + 1;
      acc[v.mood].value = Math.floor((acc[v.mood].count * 100) / marks.length);
      acc[v.mood].label = `${acc[v.mood].value}%`;

      return acc;
    }, {});

    return counts;
  }, [marks]);

  return (
    <PieChart data={Object.values(data)} role="img" aria-label="Mood Dynamic" />
  );
};
