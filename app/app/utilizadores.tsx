import { Edit, Plus, Trash } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, View, ActivityIndicator } from "react-native";
import { FloatButton } from "~/components/FloatButton";
import MyInput from "~/components/MyInput";
import MyModal from "~/components/MyModal";
import { MyTable } from "~/components/MyTable";
import { Button } from "~/components/ui/button";
import api from "~/api";
import { Text } from "~/components/ui/text";
import { Usuario } from "~/types";
import Toast from "react-native-toast-message";
import PrivateNavigation from "~/components/PrivateNavigation";
import DropdownComponent from "~/components/Dropdown";

export default function Utilizadores(){
      
    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [utilizadores, setUtilizadores] = useState<Usuario[]>([])
    const [utilizadorAtual, setUtilizadorAtual] = useState<Usuario>({
        id: '',
        nome: '',
        email: '',
        telefone: '',
        usuario: '',
        senha: '',
        nivel: 'USUARIO'
    })

    // Carregar todos os utilizadores
    const carregarUtilizadores = async () => {
        try {
            setLoading(true)
            setError('')
            const response = await api.get('/usuarios')
            setUtilizadores(response.data)
        } catch (err) {
            console.error('Erro ao carregar utilizadores:', err)
            setError('Falha ao carregar utilizadores. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    // Adicionar novo utilizador
    const adicionarUtilizador = async () => {
        try {
            await api.post('/usuarios', {
              nome: utilizadorAtual.nome,
              email: utilizadorAtual.email,
              telefone: utilizadorAtual.telefone,
              usuario: utilizadorAtual.usuario,
              senha: utilizadorAtual.senha,
              nivel: utilizadorAtual.nivel,
            })
            Toast.show({
              text1: 'Aviso',
              text2: 'Cadastrado com sucesso.',
              position: 'bottom',
              visibilityTime: 3000,
              type: 'success'
            })
            setOpen(false)
            limparFormulario()
            carregarUtilizadores()
        } catch (err) {
            console.error('Erro ao adicionar utilizador:', err)
            Alert.alert('Erro', 'Falha ao adicionar utilizador')
        }
    }

    // Atualizar utilizador existente
    const atualizarUtilizador = async () => {
        try {
            await api.put(`/usuarios/${utilizadorAtual.id}`, {
              nome: utilizadorAtual.nome,
              email: utilizadorAtual.email,
              telefone: utilizadorAtual.telefone,
              usuario: utilizadorAtual.usuario,
              senha: utilizadorAtual.senha,
              nivel: utilizadorAtual.nivel
            })
            Toast.show({
              text1: 'Aviso',
              text2: 'Atualizado com sucesso.',
              position: 'bottom',
              visibilityTime: 3000,
              type: 'success'
            })
            setOpen(false)
            limparFormulario()
            carregarUtilizadores()
        } catch (err) {
            console.error('Erro ao atualizar utilizador:', err)
            Alert.alert('Erro', 'Falha ao atualizar utilizador')
        }
    }

    // Excluir utilizador
    const excluirUtilizador = async (id: string) => {
        try {
            await api.delete(`/usuarios/${id}`)
            Toast.show({
              text1: 'Aviso',
              text2: 'Excluído com sucesso.',
              position: 'bottom',
              visibilityTime: 3000,
              type: 'success'
            })
            carregarUtilizadores()
        } catch (err) {
            console.error('Erro ao excluir utilizador:', err)
            Alert.alert('Erro', 'Falha ao excluir utilizador')
        }
    }

    // Confirmar exclusão
    const confirmarExclusao = (id: string) => {
        Alert.alert(
            'Aviso',
            'Deseja excluir este utilizador?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir', onPress: () => excluirUtilizador(id), style: 'destructive' }
            ]
        )
    }

    // Abrir modal para edição
    const abrirEdicao = (utilizador: Usuario) => {
        setUtilizadorAtual(utilizador)
        setEditMode(true)
        setOpen(true)
    }

    // Limpar formulário
    const limparFormulario = () => {
        setUtilizadorAtual({
            id: '',
            nome: '',
            email: '',
            telefone: '',
            usuario: '',
            senha: '',
            nivel: 'USUARIO'
        })
        setEditMode(false)
    }

    // Abrir modal para adicionar
    const abrirAdicao = () => {
        limparFormulario()
        setOpen(true)
    }

    // Carregar utilizadores ao iniciar
    useEffect(() => {
        carregarUtilizadores()
    }, [])
    
    const columns = [
        { key: 'nome', label: 'Nome', minWidth: 150 },
        { key: 'usuario', label: 'Utilizador', minWidth: 100 },
        { key: 'email', label: 'Email', minWidth: 250 },
        { key: 'telefone', label: 'Telefone', minWidth: 150 },
        {
          key: 'editar',
          label: 'Editar',
          minWidth: 80,
          renderCell: (item: Usuario) => (
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
            renderCell: (item: Usuario) => (
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

    return (
      <PrivateNavigation>
        <View>
            <View className="flex justify-center items-center h-screen">
                <View className="mt-20 w-3/4">
                  <MyInput 
                    dica="Pesquisar utilizador"
                    onChangeText={(texto) => {
                      // Implementar pesquisa futuramente
                    }}
                  />
                </View>
                
                {loading ? (
                  <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>
                ) : error ? (
                  <View className="flex-1 justify-center items-center">
                    <Text className="text-red-500">{error}</Text>
                    <Button onPress={carregarUtilizadores} className="mt-4">
                      Tentar novamente
                    </Button>
                  </View>
                ) : (
                  <MyTable data={utilizadores} columns={columns} />
                )}
                
                <MyModal
                  visivel={open}
                  titulo={editMode ? 'Editar Utilizador' : 'Adicionar Utilizador'}
                  aoConfirmar={editMode ? atualizarUtilizador : adicionarUtilizador}
                  aoFechar={() => {
                    setOpen(false)
                    limparFormulario()
                  }}
                >
                  <MyInput 
                    dica="Nome do utilizador" 
                    valor={utilizadorAtual.nome} 
                    onChangeText={(texto) => setUtilizadorAtual({...utilizadorAtual, nome: texto})}
                  />
                  <MyInput 
                    dica="Nome de usuário" 
                    valor={utilizadorAtual.usuario} 
                    onChangeText={(texto) => setUtilizadorAtual({...utilizadorAtual, usuario: texto})}
                  />
                  {!editMode && (
                    <MyInput 
                      dica="Senha" 
                      secureTextEntry
                      valor={utilizadorAtual.senha} 
                      onChangeText={(texto) => setUtilizadorAtual({...utilizadorAtual, senha: texto})}
                    />
                  )}
                  <MyInput 
                    keyboardType="email-address" 
                    dica="Email do utilizador" 
                    valor={utilizadorAtual.email} 
                    onChangeText={(texto) => setUtilizadorAtual({...utilizadorAtual, email: texto})}
                  />
                  <MyInput 
                    keyboardType="phone-pad" 
                    dica="Contacto do utilizador" 
                    valor={utilizadorAtual.telefone} 
                    onChangeText={(texto) => setUtilizadorAtual({...utilizadorAtual, telefone: texto})}
                  />
                  <DropdownComponent 
                    title="Selecione o Nível" 
                    options={[
                      {
                        id: 'USUARIO',
                        nome: 'Usuário'
                      },
                      {
                        id: 'ADMIN',
                        nome: 'Administrador'
                      }
                    ]}
                    selected={utilizadorAtual.nivel}
                    onChange={nivel => setUtilizadorAtual({...utilizadorAtual, nivel: String(nivel)})}
                  />
                </MyModal>
            </View>
            <FloatButton icon={<Plus size={24} color={"#FFF"} />} aoClicar={abrirAdicao}/>
        </View>
      </PrivateNavigation>
    )
}