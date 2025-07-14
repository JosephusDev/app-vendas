import { Edit, Plus, Trash } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, View, ActivityIndicator } from "react-native";
import Toast from 'react-native-toast-message';
import { FloatButton } from "~/components/FloatButton";
import MyInput from "~/components/MyInput";
import MyModal from "~/components/MyModal";
import { MyTable } from "~/components/MyTable";
import { Button } from "~/components/ui/button";
import api from "~/api";
import { Text } from "~/components/ui/text";
import { Cliente } from "~/types";

export default function Clientes(){
      
    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [search, setSearch] = useState('')
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [clienteAtual, setClienteAtual] = useState<Cliente>({
        id: '',
        nome: '',
        email: '',
        telefone: '',
        bi: ''
    })

    // Carregar todos os clientes
    const carregarClientes = async () => {
        try {
            setLoading(true)
            setError('')
            const response = await api.get('/cliente')
            setClientes(response.data)
        } catch (err) {
            console.error('Erro ao carregar clientes:', err)
            setError('Falha ao carregar clientes. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    // Adicionar novo cliente
    const adicionarCliente = async () => {
        try {
            await api.post('/cliente', {
                nome: clienteAtual.nome,
                bi: clienteAtual.bi,
                email: clienteAtual.email,
                telefone: clienteAtual.telefone
            })
            Toast.show({
              text1: 'Aviso',
              text2: 'Cliente adicionado com sucesso',
              type: 'success',
              visibilityTime: 3000
            })
            setOpen(false)
            limparFormulario()
            carregarClientes()
        } catch (err) {
            console.error('Erro ao adicionar cliente:', err)
            Alert.alert('Erro', 'Falha ao adicionar cliente')
        }
    }

    // Atualizar cliente existente
    const atualizarCliente = async () => {
        try {
            await api.put(`/cliente/${clienteAtual.id}`, {
                nome: clienteAtual.nome,
                bi: clienteAtual.bi,
                email: clienteAtual.email,
                telefone: clienteAtual.telefone
            })
            Toast.show({
              text1: 'Aviso',
              text2: 'Cliente atualizado com sucesso',
              type: 'success',
              visibilityTime: 3000
            })
            setOpen(false)
            limparFormulario()
            carregarClientes()
        } catch (err) {
            console.error('Erro ao atualizar cliente:', err)
            Alert.alert('Erro', 'Falha ao atualizar cliente')
        }
    }

    // Excluir cliente
    const excluirCliente = async (id: string) => {
        try {
            await api.delete(`/cliente/${id}`)
            Toast.show({
              text1: 'Aviso',
              text2: 'Cliente excluído com sucesso',
              type: 'success',
              visibilityTime: 3000
            })
            carregarClientes()
        } catch (err) {
            console.error('Erro ao excluir cliente:', err)
            Alert.alert('Erro', 'Falha ao excluir cliente')
        }
    }

    // Confirmar exclusão
    const confirmarExclusao = (id: string) => {
        Alert.alert(
            'Aviso',
            'Deseja eliminar este cliente?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir', onPress: () => excluirCliente(id), style: 'destructive' }
            ]
        )
    }

    // Abrir modal para edição
    const abrirEdicao = (cliente: Cliente) => {
        setClienteAtual(cliente)
        setEditMode(true)
        setOpen(true)
    }

    // Limpar formulário
    const limparFormulario = () => {
        setClienteAtual({
            id: '',
            nome: '',
            email: '',
            telefone: '',
            bi: ''
        })
        setEditMode(false)
    }

    // Abrir modal para adicionar
    const abrirAdicao = () => {
        limparFormulario()
        setOpen(true)
    }

    // Carregar clientes ao iniciar
    useEffect(() => {
        carregarClientes()
    }, [])
    
    const columns = [
        { key: 'nome', label: 'Nome', minWidth: 150 },
        { key: 'bi', label: 'Nº BI', minWidth: 150 },
        { key: 'email', label: 'Email', minWidth: 200 },
        { key: 'telefone', label: 'Telefone', minWidth: 200 },
        {
          key: 'editar',
          label: 'Editar',
          minWidth: 80,
          renderCell: (item: Cliente) => (
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
            renderCell: (item: Cliente) => (
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

    const clientesFiltradas = search ? clientes.filter((cliente)=>cliente.nome.toLowerCase().includes(search.toLowerCase())) : clientes

    return (
        <View>
            <View className="flex justify-center items-center h-screen py-8">
              <View className="w-3/4">
                <MyInput
                  onChangeText={setSearch}
                  dica="Pesquisar..."
                  valor={search}
                />
              </View>
                {loading ? (
                  <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>
                ) : error ? (
                  <View className="flex-1 justify-center items-center">
                    <Text className="text-red-500">{error}</Text>
                    <Button onPress={carregarClientes} className="mt-4">
                      Tentar novamente
                    </Button>
                  </View>
                ) : (
                  <MyTable data={clientesFiltradas} columns={columns} />
                )}
                
                <MyModal
                  visivel={open}
                  titulo={editMode ? 'Editar Cliente' : 'Adicionar Cliente'}
                  aoConfirmar={editMode ? atualizarCliente : adicionarCliente}
                  aoFechar={() => {
                    setOpen(false)
                    limparFormulario()
                  }}
                >
                  <MyInput 
                    dica="Nome do cliente" 
                    valor={clienteAtual.nome} 
                    onChangeText={(texto) => setClienteAtual({...clienteAtual, nome: texto})}
                  />
                  <MyInput 
                    dica="Nº BI do cliente" 
                    valor={clienteAtual.bi} 
                    onChangeText={(texto) => setClienteAtual({...clienteAtual, bi: texto.toUpperCase()})}
                  />
                  <MyInput 
                    keyboardType="email-address" 
                    dica="Email do cliente" 
                    valor={clienteAtual.email} 
                    onChangeText={(texto) => setClienteAtual({...clienteAtual, email: texto})}
                  />
                  <MyInput 
                    keyboardType="phone-pad" 
                    dica="Contacto do cliente" 
                    valor={clienteAtual.telefone} 
                    onChangeText={(texto) => setClienteAtual({...clienteAtual, telefone: texto})}
                  />
                </MyModal>
            </View>
            <FloatButton icon={<Plus size={24} color={"#FFF"} />} aoClicar={abrirAdicao}/>
        </View>
    )
}