import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import api from "~/api";
import BarChartHome from "~/components/BarChartHome";
import CardHome from "~/components/CardHome";


export default function Index(){

    const [loading, setLoading] = useState(true)
    const [clientes, setClientes] = useState(0)
    const [produtos, setProdutos] = useState(0)
    const [totalArrecadado, setTotalArrecadado] = useState(0);

    const carregarProdutos = async () => {
        try {
            const response = await api.get('/produto')
            setProdutos(response.data.length)
        } catch (err) {
            console.error('Erro ao carregar produtos:', err)
        }
    }

    const carregarClientes = async () => {
        try {
            const response = await api.get('/cliente')
            setClientes(response.data.length)
        } catch (err) {
            console.error('Erro ao carregar clientes:', err)
        }
    }

    const carregarVendas = async () => {
    try {
      const response = await api.get('/venda');
      const data = response.data;
      setTotalArrecadado(data.total_arrecadado);
    } catch (err) {
      console.error('Erro ao carregar vendas:', err);
    }
  };

    const navigation = useNavigation()

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        setLoading(true)
        carregarProdutos()
        carregarClientes()
        carregarVendas()
        setLoading(false)
      })

      return unsubscribe
    }, [navigation])

    return (
        <ScrollView>
            <View className="flex items-center gap-y-1 mx-4"> 
                <CardHome
                    title="Produtos"
                    icon="shopping-bag"
                    description="Total de produtos em stock"
                    content={`${produtos} produtos`}
                />
                <CardHome
                    title="Vendas"
                    icon="shopping-cart"
                    description="Total arrecadado nas vendas"
                    content={`${totalArrecadado.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })}`}
                />
                <CardHome
                    title="Clientes"
                    icon="users"
                    description="Total de clientes"
                    content={`${clientes} cliente(s)`}
                />
                <BarChartHome/>
            </View>
        </ScrollView>
    )
}