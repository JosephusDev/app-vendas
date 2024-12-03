import { VictoryPie, VictoryTheme } from "victory-native";

const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
  ];

export default function PieChartHome(){
    return (
        <VictoryPie
            innerRadius={50}
            padAngle={5}
            data={data}
            x="quarter" 
            y="earnings" 
            theme={VictoryTheme.material}
            width={300}
            style={{
                data: {
                  fillOpacity: 0.9,
                  stroke: "#8040BF",
                  strokeWidth: 1,
                },
                labels: {
                  fontSize: 14,
                  fill: "#8040BF",
                },
            }}
        />
    )
}