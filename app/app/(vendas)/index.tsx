import { Edit, Eye, Plus, Printer, Trash } from "lucide-react-native";
import { Fragment, useEffect, useState } from "react";
import { Alert, View, ActivityIndicator } from "react-native";
import { FloatButton } from "~/components/FloatButton";
import MyInput from "~/components/MyInput";
import MyModal from "~/components/MyModal";
import { MyTable } from "~/components/MyTable";
import { Button } from "~/components/ui/button";
import api from "~/api";
import { Text } from "~/components/ui/text";
import { Venda, Cliente } from "~/types";
import Toast from "react-native-toast-message";
import PrivateNavigation from "~/components/PrivateNavigation";
import { router, useNavigation } from "expo-router";
import { useAuth } from "~/context/AuthContext";
import DropdownComponent from "~/components/Dropdown";

type VendaDetalhada = Venda & {
  cliente: { nome: string };
  usuario: { nome: string };
  total_geral: number;
};

type VendasResponse = {
  vendas: VendaDetalhada[];
  total_arrecadado: number;
};

export default function Vendas() {
  const {data: user} = useAuth()
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [vendas, setVendas] = useState<VendaDetalhada[]>([]);
  const [totalArrecadado, setTotalArrecadado] = useState(0);
  const [clientes, setClientes] = useState<Pick<Cliente, 'id' | 'nome'>[]>([]);
  const [vendaAtual, setVendaAtual] = useState<Venda>({
    id: '',
    clienteId: '',
    usuarioId: '',
    dataVenda: new Date().toISOString().split('T')[0],
    status: 'PENDENTE'
  });

  const carregarClientes = async () => {
    try {
      const response = await api.get('/cliente');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
  };

  // Carregar todas as vendas
  const carregarVendas = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/venda');
      const data: VendasResponse = response.data;
      setVendas(data.vendas);
      setTotalArrecadado(data.total_arrecadado);
    } catch (err) {
      console.error('Erro ao carregar vendas:', err);
      setError('Falha ao carregar vendas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Adicionar nova venda
  const adicionarVenda = async () => {
    try {
      await api.post('/venda', {
        clienteId: vendaAtual.clienteId,
        usuarioId: user?.id
      });
      Toast.show({
        text1: 'Aviso',
        text2: 'Venda cadastrada com sucesso.',
        position: 'bottom',
        visibilityTime: 3000,
        type: 'success'
      });
      setOpen(false);
      limparFormulario();
      carregarVendas();
    } catch (err) {
      console.error('Erro ao adicionar venda:', err);
      Alert.alert('Erro', 'Falha ao adicionar venda');
    }
  };

  // Atualizar venda existente
  const atualizarVenda = async () => {
    try {
      await api.put(`/venda/${vendaAtual.id}`, {
        clienteId: vendaAtual.clienteId,
        usuarioId: user?.id,
        status: vendaAtual.status
      });
      Toast.show({
        text1: 'Aviso',
        text2: 'Venda atualizada com sucesso.',
        position: 'bottom',
        visibilityTime: 3000,
        type: 'success'
      });
      setOpen(false);
      limparFormulario();
      carregarVendas();
    } catch (err) {
      console.error('Erro ao atualizar venda:', err);
      Alert.alert('Erro', 'Falha ao atualizar venda');
    }
  };

  // Excluir venda
  const excluirVenda = async (id: string) => {
    try {
      await api.delete(`/venda/${id}`);
      Toast.show({
        text1: 'Aviso',
        text2: 'Venda excluída com sucesso.',
        position: 'bottom',
        visibilityTime: 3000,
        type: 'success'
      });
      carregarVendas();
    } catch (err) {
      console.error('Erro ao excluir venda:', err);
      Alert.alert('Erro', 'Falha ao excluir venda');
    }
  };

  // Confirmar exclusão
  const confirmarExclusao = (id: string) => {
    Alert.alert(
      'Aviso',
      'Deseja excluir esta venda?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => excluirVenda(id), style: 'destructive' }
      ]
    );
  };

  // Abrir modal para edição
  const abrirEdicao = (venda: VendaDetalhada) => {
    setVendaAtual({
      id: venda.id,
      clienteId: venda.clienteId,
      usuarioId: venda.usuarioId,
      dataVenda: new Date(venda.dataVenda).toISOString().split('T')[0],
      status: venda.status
    });
    setEditMode(true);
    setOpen(true);
  };

  // Limpar formulário
  const limparFormulario = () => {
    setVendaAtual({
      id: '',
      clienteId: '',
      usuarioId: '',
      dataVenda: new Date().toISOString().split('T')[0],
      status: 'PENDENTE'
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
      carregarVendas();
      carregarClientes();
    });

    return unsubscribe;
  }, [navigation]);

    // Navegar para itens da venda
  const abrirItensVenda = (vendaId: string) => {
    router.push(`/(vendas)/item?id=${vendaId}`);
  };

  const columns = [
    { 
      key: 'cliente', 
      label: 'Cliente', 
      minWidth: 200,
      renderCell: (item: VendaDetalhada) => <Text>{item.cliente.nome}</Text>
    },
    { 
      key: 'usuario', 
      label: 'Usuário', 
      minWidth: 150,
      renderCell: (item: VendaDetalhada) => <Text>{item.usuario.nome}</Text>
    },
    { 
      key: 'dataVenda', 
      label: 'Data da Venda', 
      minWidth: 150,
      renderCell: (item: VendaDetalhada) => <Text>{new Date(item.dataVenda).toLocaleDateString('pt-BR')}</Text>
    },
    { 
      key: 'status', 
      label: 'Status', 
      minWidth: 120,
      renderCell: (item: VendaDetalhada) => (
        <Text className={`px-2 py-1 rounded-full text-xs ${
          item.status === 'PENDENTE' ? 'bg-yellow-100 text-yellow-800' :
          item.status === 'CONCLUIDA' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          {item.status}
        </Text>
      )
    },
    { 
      key: 'total_geral', 
      label: 'Total', 
      minWidth: 150,
      renderCell: (item: VendaDetalhada) => (
        <Text className="font-semibold">
          {item.total_geral.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })}
        </Text>
      )
    },
    {
      key: 'itens',
      label: 'Itens',
      minWidth: 80,
      renderCell: (item: VendaDetalhada) => (
        <Button
          variant="outline"
          size="icon"
          className="shadow-sm shadow-foreground/10 mr-3 bg-blue-500"
          onPress={() => abrirItensVenda(item.id)}
          disabled={item.status === 'CONCLUIDA' && user?.nivel === 'USUARIO'}
        >
          <Eye size={14} color={"#FFFFFF"} />
        </Button>
      ),
    },
    {
      key: 'editar',
      label: 'Editar',
      minWidth: 80,
      renderCell: (item: VendaDetalhada) => (
        <Button
          variant="outline"
          size="icon"
          className="shadow-sm shadow-foreground/10 mr-3 bg-primary"
          onPress={() => abrirEdicao(item)}
          disabled={item.status === 'CONCLUIDA' && user?.nivel === 'USUARIO'}
        >
          <Edit size={14} color={"#FFFFFF"} />
        </Button>
      ),
    },
    {
      key: 'eliminar',
      label: 'Eliminar',
      minWidth: 80,
      renderCell: (item: VendaDetalhada) => (
        <Button
          variant="outline"
          size="icon"
          className="shadow-sm shadow-foreground/10 mr-3 bg-red-500"
          onPress={() => confirmarExclusao(item.id)}
          disabled={item.status === 'CONCLUIDA' && user?.nivel === 'USUARIO'}
        >
          <Trash size={14} color={"#FFFFFF"} />
        </Button>
      ),
    },
    {
      key: 'imprimir',
      label: 'Imprimir',
      minWidth: 80,
      renderCell: (item: VendaDetalhada) => (
        <Button
          variant="outline"
          size="icon"
          className="shadow-sm shadow-foreground/10 mr-3 bg-green-500"
          onPress={() => {}}
        >
          <Printer size={14} color={"#FFFFFF"} />
        </Button>
      ),
    },
  ];

  const vendasFiltradas = search 
    ? vendas.filter((venda) =>
        venda.cliente.nome.toLowerCase().includes(search.toLowerCase()) ||
        venda.usuario.nome.toLowerCase().includes(search.toLowerCase())
      )
    : vendas;

  const statusOptions = [
    { id: 'PENDENTE', nome: 'Pendente' },
    { id: 'CONCLUIDA', nome: 'Concluída' },
    { id: 'CANCELADA', nome: 'Cancelada' }
  ];

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
              <Button onPress={carregarVendas} className="mt-4">
                Tentar novamente
              </Button>
            </View>
          ) : (
            <Fragment>
              <View className="mt-20 w-2/3">
                <MyInput 
                  dica="Pesquisar venda"
                  valor={search}
                  onChangeText={setSearch}
                />
              </View>
              <MyTable data={vendasFiltradas} columns={columns} />
            </Fragment>
          )}
          
          <MyModal
            visivel={open}
            titulo={editMode ? 'Editar Venda' : 'Adicionar Venda'}
            aoConfirmar={editMode ? atualizarVenda : adicionarVenda}
            aoFechar={() => {
              setOpen(false);
              limparFormulario();
            }}
          >
            <View className="gap-4">
              <DropdownComponent
                title="Selecione o Cliente" 
                options={clientes.map(cliente => ({
                  id: cliente.id,
                  nome: cliente.nome
                }))}
                selected={vendaAtual.clienteId}
                onChange={clienteId => setVendaAtual({...vendaAtual, clienteId: String(clienteId)})}
              />
              {editMode && (
                <DropdownComponent
                  title="Status da Venda" 
                  options={statusOptions}
                  selected={vendaAtual.status}
                  onChange={status => setVendaAtual({...vendaAtual, status: String(status)})}
                />
              )}
            </View>
          </MyModal>
        </View>
        <FloatButton icon={<Plus size={24} color={"#FFF"} />} aoClicar={abrirAdicao}/>
      </View>
  );
}