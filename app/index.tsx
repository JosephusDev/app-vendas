import { View } from "react-native";
import CardHome from "~/components/CardHome";


export default function Index(){

    return (
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
        </View>
    )
}