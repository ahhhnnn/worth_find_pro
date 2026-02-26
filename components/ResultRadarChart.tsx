"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { DimensionScores } from "@/lib/types";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export function ResultRadarChart({ dimensions }: { dimensions: DimensionScores }) {
  const option = useMemo(
    () => ({
      radar: {
        indicator: [
          { name: "含金量", max: 100 },
          { name: "养生度", max: 100 },
          { name: "逍遥值", max: 100 },
          { name: "人和值", max: 100 }
        ],
        radius: 85,
        splitNumber: 4,
        axisLine:  { lineStyle: { color: "#9a7d3a", opacity: 0.4 } },
        splitLine: { lineStyle: { color: "#9a7d3a", opacity: 0.25 } },
        splitArea: {
          areaStyle: {
            color: ["rgba(237,224,196,0.5)", "rgba(224,206,170,0.4)"]
          }
        },
        name: {
          textStyle: {
            color: "#3d2b1f",
            fontFamily: "Noto Serif SC, serif",
            fontSize: 12
          }
        }
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: [
                dimensions.valuePower,
                dimensions.wellness,
                dimensions.freedom,
                dimensions.harmony
              ],
              areaStyle: { color: "rgba(155, 35, 53, 0.18)" },
              lineStyle: { color: "#9b2335", width: 2 },
              itemStyle: { color: "#9b2335" }
            }
          ]
        }
      ]
    }),
    [dimensions]
  );

  return <ReactECharts option={option} style={{ height: 260 }} />;
}
