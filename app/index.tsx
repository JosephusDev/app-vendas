import { ScrollView, View } from "react-native";
import BarChartHome from "~/components/BarChartHome";
import CardHome from "~/components/CardHome";
import PieChartHome from "~/components/PieChartHome";


export default function Index(){

    return (
        <ScrollView>
            <View className="flex items-center gap-y-1 mx-4"> 
                <CardHome
                    title="Produtos"
                    icon="shopping-bag"
                    description="Total de produtos em stock"
                    content="5 produtos"
                />
                <CardHome
                    title="Vendas"
                    icon="shopping-cart"
                    description="Total arrecadado nas vendas"
                    content="20.000,00 Kz"
                />
                <CardHome
                    title="Clientes"
                    icon="users"
                    description="Total de clientes"
                    content="2000 Clientes"
                />
                <BarChartHome/>
                <PieChartHome/>
            </View>
        </ScrollView>
    )
}