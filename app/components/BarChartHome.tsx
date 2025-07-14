import React from "react";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

const data = [
  { produto: "Laptop", total: 13000 },
  { produto: "Mouse", total: 16500 },
  { produto: "Teclado", total: 14250 },
  { produto: "SSD", total: 19000 }
];

export default function BarChartHome() {
  return (
      <VictoryChart  width={300} theme={VictoryTheme.material}>
        <VictoryBar 
            alignment="start" 
            data={data} 
            x="produto" 
            y="total"
            style={{
                data: {
                    fill: "#8040BF",
                    stroke: "#8040BF",
                    strokeWidth: 1,
                },
            }}
            cornerRadius={5}
        />
      </VictoryChart>
  );
}