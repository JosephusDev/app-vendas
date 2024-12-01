import React from "react";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

export default function BarChartHome() {
  return (
      <VictoryChart  width={350} theme={VictoryTheme.material}>
        <VictoryBar 
            alignment="start" 
            data={data} 
            x="quarter" 
            y="earnings" 
            style={{
                data: {
                    fill: "#8040BF",
                    stroke: "#8040BF",
                    strokeWidth: 2,
                }
            }}
        />
      </VictoryChart>
  );
}