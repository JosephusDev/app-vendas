import React from "react";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useColorScheme } from "~/lib/useColorScheme";
import { TotalVendidoPorProduto } from "~/types";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { TrendingDown, TrendingUp } from "lucide-react-native";

export default function BarChartHome(props: { data: TotalVendidoPorProduto, type: 'mais' | 'menos' }) {
  const { isDarkColorScheme } = useColorScheme();
  const {data, type} = props
  
  const colors = type === 'menos' 
  ? ['#FF6B6B', '#A0EACD', '#1DD1A1'] 
  : ['#1DD1A1', '#A0EACD', '#FF6B6B'];

  
  const chartData = data.map((item, index) => ({
    value: item.total,
    label: item.nome,
    frontColor: colors[index % colors.length]
  }));

  return (
    <Card className="w-full bg-secondary mt-5">
      <CardHeader>
        <CardTitle className="flex flex-row justify-center items-center gap-4">
          {type === 'mais' ? (
            <TrendingUp size={15} color={isDarkColorScheme ? '#fff' : '#000'} />
          ) : (
            <TrendingDown size={15} color={isDarkColorScheme ? '#fff' : '#000'} />
          )}
          <Text className="font-medium text-xl ml-2"> {type === 'mais' ? 'Mais Vendidos' : 'Menos Vendidos'}</Text>
        </CardTitle>
        <CardDescription>
          <View>
            <BarChart
              data={chartData.map(item => ({
                ...item,
                value: item.value ?? 0
              }))}
              width={350}
              height={250}
              barWidth={15}
              spacing={80}
              roundedTop
              roundedBottom
              hideRules
              hideYAxisText
              xAxisThickness={0}
              yAxisThickness={0}
              noOfSections={4}
              maxValue={Math.max(...data.map(item => item.total!)) * 1.1}
              initialSpacing={40}
              endSpacing={20}
              xAxisLabelTextStyle={{
                fontSize: 11,
                fontFamily: 'Nunito_700Bold',
                rotation: 45,
                textAlign: 'center',
                color: isDarkColorScheme ? '#FFF' : '#000'
              }}
              renderTooltip={(item: { value: number }) => (
                <Text style={{
                  fontSize: 10,
                  fontFamily: 'Nunito_700Bold',
                  color: isDarkColorScheme ? '#FFF' : '#000',
                  width: 100,
                  textAlign: 'center'
                }}>
                  {item.value?.toLocaleString('pt-AO', {
                    style: 'currency',
                    currency: 'AOA'
                  })}
                </Text>
              )}
            />
          </View>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}