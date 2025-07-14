import { Edit, Plus, Trash, ArrowLeft, ShoppingCart } from "lucide-react-native";
import { Fragment, useEffect, useState } from "react";
import { Alert, View, ActivityIndicator } from "react-native";
import { FloatButton } from "~/components/FloatButton";
import MyInput from "~/components/MyInput";
import MyModal from "~/components/MyModal";
import { MyTable } from "~/components/MyTable";
import { Button } from "~/components/ui/button";
import api from "~/api";
import { Text } from "~/components/ui/text";
import { Produto } from "~/types";
import Toast from "react-native-toast-message";
import PrivateNavigation from "~/components/PrivateNavigation";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { useColorScheme } from "~/lib/useColorScheme";
import DropdownComponent from "~/components/Dropdown";

type VendaItem = {
  id: string;
  vendaId: string;
  produtoId: string;
  quantidade: number;
  total: number;
  produto: {
    nome: string;
  };
};

type VendaItensResponse = {
  itens: VendaItem[];
  total_geral: number;
};

export default function Item() {
  const { isDarkColorScheme } = useColorScheme();
  const { id: vendaId } = useLocalSearchParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [itens, setItens] = useState<VendaItem[]>([]);
  const [totalGeral, setTotalGeral] = useState(0);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [itemAtual, setItemAtual] = useState<{
    id: string;
    vendaId: string;
    produtoId: string;
    quantidade: string;
    total: number;
  }>({
    id: '',
    vendaId: vendaId || '',
    produtoId: '',
    quantidade: '',
    total: 0
  });

  const carregarProdutos = async () => {
    try {
      const response = await api.get('/produto');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  // Carregar todos os itens da venda
  const carregarItens = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get(`/item-venda/${vendaId}`);
      const data: VendaItensResponse = response.data;
      setItens(data.itens);
      setTotalGeral(data.total_geral || 0);
    } catch (err) {
      console.error('Erro ao carregar itens:', err);
      setError('Falha ao carregar itens. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Calcular total baseado no produto selecionado e quantidade
  const calcularTotal = (produtoId: string, quantidade: number) => {
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) return 0;
    
    const preco = Number(produto.preco);
    const iva = Number(produto.iva);
    const precoComIva = preco * (1 + iva / 100);
    return quantidade * precoComIva;
  };

  // Atualizar o total quando produto ou quantidade mudar
  useEffect(() => {
    if (itemAtual.produtoId && itemAtual.quantidade) {
      const total = calcularTotal(itemAtual.produtoId, Number(itemAtual.quantidade));
      setItemAtual(prev => ({ ...prev, total }));
    }
  }, [itemAtual.produtoId, itemAtual.quantidade, produtos]);

  // Adicionar novo item
  const adicionarItem = async () => {
    try {
      await api.post('/item-venda', {
        vendaId: vendaId,
        produtoId: itemAtual.produtoId,
        quantidade: Number(itemAtual.quantidade),
        total: itemAtual.total
      });
      Toast.show({
        text1: 'Aviso',
        text2: 'Item adicionado com sucesso.',
        position: 'bottom',
        visibilityTime: 3000,
        type: 'success'
      });
      setOpen(false);
      limparFormulario();
      carregarItens();
    } catch (err) {
      Alert.alert('Erro', 'Stock insuficiente');
    }
  };

  // Atualizar item existente
  const atualizarItem = async () => {
    try {
      await api.put(`/item-venda/${itemAtual.id}`, {
        vendaId: vendaId,
        produtoId: itemAtual.produtoId,
        quantidade: Number(itemAtual.quantidade),
        total: itemAtual.total
      });
      Toast.show({
        text1: 'Aviso',
        text2: 'Item atualizado com sucesso.',
        position: 'bottom',
        visibilityTime: 3000,
        type: 'success'
      });
      setOpen(false);
      limparFormulario();
      carregarItens();
    } catch (err) {
      Alert.alert('Erro', 'Stock insuficiente');
    }
  };

  // Excluir item
  const excluirItem = async (id: string) => {
    try {
      await api.delete(`/item-venda/${id}`);
      Toast.show({
        text1: 'Aviso',
        text2: 'Item excluído com sucesso.',
        position: 'bottom',
        visibilityTime: 3000,
        type: 'success'
      });
      carregarItens();
    } catch (err) {
      console.error('Erro ao excluir item:', err);
      Alert.alert('Erro', 'Falha ao excluir item');
    }
  };

  // Confirmar exclusão
  const confirmarExclusao = (id: string) => {
    Alert.alert(
      'Aviso',
      'Deseja excluir este item?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => excluirItem(id), style: 'destructive' }
      ]
    );
  };

  // Abrir modal para edição
  const abrirEdicao = (item: VendaItem) => {
    setItemAtual({
      id: item.id,
      vendaId: item.vendaId,
      produtoId: item.produtoId,
      quantidade: item.quantidade.toString(),
      total: item.total
    });
    setEditMode(true);
    setOpen(true);
  };

  // Limpar formulário
  const limparFormulario = () => {
    setItemAtual({
      id: '',
      vendaId: vendaId || '',
      produtoId: '',
      quantidade: '',
      total: 0
    });
    setEditMode(false);
  };

  // Abrir modal para adicionar
  const abrirAdicao = () => {
    limparFormulario();
    setOpen(true);
  };

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarItens();
      carregarProdutos();
    });

    return unsubscribe;
  }, [navigation]);

  const columns = [
    { 
      key: 'produto', 
      label: 'Produto', 
      minWidth: 250,
      renderCell: (item: VendaItem) => <Text>{item.produto.nome}</Text>
    },
    { 
      key: 'quantidade', 
      label: 'Quantidade', 
      minWidth: 120,
      renderCell: (item: VendaItem) => <Text>{item.quantidade}</Text>
    },
    { 
      key: 'total', 
      label: 'Total', 
      minWidth: 150,
      renderCell: (item: VendaItem) => (
        <Text className="font-semibold">
          {item.total.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })}
        </Text>
      )
    },
    {
      key: 'editar',
      label: 'Editar',
      minWidth: 80,
      renderCell: (item: VendaItem) => (
        <Button
          variant="outline"
          size="icon"
          className="shadow-sm shadow-foreground/10 mr-3 bg-primary"
          onPress={() => abrirEdicao(item)}
        >
          <Edit size={14} color={"#FFFFFF"} />
        </Button>
      ),
    },
    {
      key: 'eliminar',
      label: 'Eliminar',
      minWidth: 80,
      renderCell: (item: VendaItem) => (
        <Button
          variant="outline"
          size="icon"
          className="shadow-sm shadow-foreground/10 mr-3 bg-red-500"
          onPress={() => confirmarExclusao(item.id)}
        >
          <Trash size={14} color={"#FFFFFF"} />
        </Button>
      ),
    },
  ];

  const itensFiltrados = search 
    ? itens.filter((item) =>
        item.produto.nome.toLowerCase().includes(search.toLowerCase())
      )
    : itens;

  return (
      <View>
        <View className="flex justify-center items-center h-screen">
          {loading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : error ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-red-500">{error}</Text>
              <Button onPress={carregarItens} className="mt-4">
                Tentar novamente
              </Button>
            </View>
          ) : (
            <Fragment>
              <View className="mt-40 w-2/3 flex-row items-center gap-4">
                <MyInput 
                  dica="Pesquisar item"
                  valor={search}
                  onChangeText={setSearch}
                />
              </View>
              <View className="px-8 mt-8 self-start flex flex-row justify-between items-center w-full">
                <Text className="text-md">
                  <Feather color={isDarkColorScheme ? '#FFFFFF' : '#000000'} size={18} name='dollar-sign' /> {totalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })}
                </Text>
                <Text className="text-md">
                  <Feather color={isDarkColorScheme ? '#FFFFFF' : '#000000'} size={18} name='shopping-cart' /> {itensFiltrados.length} {itensFiltrados.length === 1 ? 'item' : 'itens'}
                </Text>
              </View>
              <MyTable data={itensFiltrados} columns={columns} />
            </Fragment>
          )}
          
          <MyModal
            visivel={open}
            titulo={editMode ? 'Editar Item' : 'Adicionar Item'}
            aoConfirmar={editMode ? atualizarItem : adicionarItem}
            aoFechar={() => {
              setOpen(false);
              limparFormulario();
            }}
          >
            <View className="gap-4">
            <DropdownComponent 
                title="Selecione o Produto" 
                options={produtos.map(produto => ({
                    id: produto.id,
                    nome: produto.nome
                }))}
                selected={itemAtual.produtoId}
                onChange={produtoId => setItemAtual({...itemAtual, produtoId: String(produtoId)})}
            />
              <MyInput 
                dica="Quantidade" 
                valor={itemAtual.quantidade}
                onChangeText={(texto) => setItemAtual({...itemAtual, quantidade: texto})}
                keyboardType="numeric"
              />
              <MyInput 
                dica="Total" 
                valor={itemAtual.total.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })}
                onChangeText={() => {}} // Campo desabilitado
                editable={false}
              />
            </View>
          </MyModal>
        </View>
        <FloatButton icon={<Plus size={24} color={"#FFF"} />} aoClicar={abrirAdicao}/>
      </View>
  );
}