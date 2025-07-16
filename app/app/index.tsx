import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import api from "~/api";
import BarChartHome from "~/components/BarChartHome";
import CardHome from "~/components/CardHome";
import { TotalVendidoPorProduto } from "~/types";


export default function Index(){

    const [loading, setLoading] = useState(true)
    const [clientes, setClientes] = useState(0)
    const [produtos, setProdutos] = useState(0)
    const [totalArrecadado, setTotalArrecadado] = useState(0);
    const [produtosMaisVendidosPorTotal, setProdutosMaisVendidosPorTotal] = useState<TotalVendidoPorProduto>([])
    const [produtosMaisVendidosPorQtd, setProdutosMaisVendidosPorQtd] = useState<TotalVendidoPorProduto>([])

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
            const response = await api.get('/venda/total')
            setTotalArrecadado(response.data.total_arrecadado)
        } catch (err) {
            console.error('Erro ao carregar vendas:', err)
        }
    }

    const carregarProdutosMaisVendidosPorTotal = async () => {
        try {
            const response = await api.get<TotalVendidoPorProduto>('/produto/total')
            setProdutosMaisVendidosPorTotal(response.data)

        } catch (err) {
            console.error('Erro ao carregar produtos por total vendido:', err)
        }
    }

    const carregarProdutosMaisVendidosPorQtd = async () => {
        try {
            const response = await api.get<TotalVendidoPorProduto>('/produto/qtd')
            setProdutosMaisVendidosPorQtd(response.data)
        } catch (err) {
            console.error('Erro ao carregar produtos por qtd vendida:', err)
        }
    }

    const navigation = useNavigation()

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        setLoading(true)
        carregarProdutos()
        carregarClientes()
        carregarVendas()
        carregarProdutosMaisVendidosPorTotal()
        carregarProdutosMaisVendidosPorQtd()
        setLoading(false)
      })

      return unsubscribe
    }, [navigation])

    return (
        <ScrollView>
            <View className="flex items-center gap-y-1 mx-4 mb-8"> 
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
                    content={`${totalArrecadado.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}`}
                />
                <CardHome
                    title="Clientes"
                    icon="users"
                    description="Total de clientes"
                    content={`${clientes} cliente(s)`}
                />
                <BarChartHome type="total" data={produtosMaisVendidosPorTotal} />
                <BarChartHome type="qtd" data={produtosMaisVendidosPorQtd} />
            </View>
        </ScrollView>
    )
}