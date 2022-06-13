import { useMemo } from "react";
import { HorizontalBarChart } from "@revolut/ui-kit";
import { Mood, MyMarksQuery } from "../../api/generated/graphql";

type Props = {
  marks: MyMarksQuery["marks"];
};

export const TotalChart = ({ marks }: Props) => {
  const data = useMemo(() => {
    const counts = marks.reduce((acc, v) => {
      if (!acc[v.mood]) {
        acc[v.mood] = {
          labelLeft: v.mood,
          color: "deep-grey",
          value: Math.floor(100 / marks.length),
          labelRight: `${Math.floor(100 / marks.length)}%`,
          count: 1,
        };

        return acc;
      }

      acc[v.mood].count = acc[v.mood].count + 1;
      acc[v.mood].value = Math.floor((acc[v.mood].count * 100) / marks.length);
      acc[v.mood].labelRight = `${acc[v.mood].value}%`;

      return acc;
    }, {});

    return counts;
  }, [marks]);

  return (
    <HorizontalBarChart
      data={Object.values(data)}
      role="img"
      aria-label="Horizontal bar chart"
    />
  );
};
