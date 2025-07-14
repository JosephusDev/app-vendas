import { Edit, Plus, Trash } from "lucide-react-native";
import { Fragment, useEffect, useState } from "react";
import { Alert, View, ActivityIndicator } from "react-native";
import { FloatButton } from "~/components/FloatButton";
import MyInput from "~/components/MyInput";
import MyModal from "~/components/MyModal";
import { MyTable } from "~/components/MyTable";
import { Button } from "~/components/ui/button";
import api from "~/api";
import { Text } from "~/components/ui/text";
import { Categoria, Produto } from "~/types";
import Toast from "react-native-toast-message";
import PrivateNavigation from "~/components/PrivateNavigation";
import { useNavigation } from "expo-router";
import DropdownComponent from "~/components/Dropdown";

export default function Produtos(){
      
    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [search, setSearch] = useState('')
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [categorias, setCategorias] = useState<Pick<Categoria, 'descricao'>[]>([])
    const [produtoAtual, setProdutoAtual] = useState<Produto>({
        id: '',
        nome: '',
        descricao: '',
        preco: '',
        iva: '',
        quantidade: '',
        categoria: ''
    })

    const carregarCategorias = async () => {
      setLoading(true)
      await api.get('/categoria?q=descricao')
      .then((response)=>setCategorias(response.data))
      .catch((error) =>console.error(error))
      .finally(()=>setLoading(false))
    }

    // Carregar todos os produtos
    const carregarProdutos = async () => {
        try {
            setLoading(true)
            setError('')
            const response = await api.get('/produto')
            setProdutos(response.data)
        } catch (err) {
            console.error('Erro ao carregar produtos:', err)
            setError('Falha ao carregar produtos. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }


    // Adicionar novo produto
    const adicionarProduto = async () => {
        try {
            await api.post('/produto', {
              nome: produtoAtual.nome,
              descricao: produtoAtual.descricao,
              preco: Number(produtoAtual.preco),
              iva: Number(produtoAtual.iva),
              quantidade: Number(produtoAtual.quantidade),
              categoria: produtoAtual.categoria
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
            carregarProdutos()
        } catch (err) {
            console.error('Erro ao adicionar produto:', err)
            Alert.alert('Erro', 'Falha ao adicionar produto')
        }
    }

    // Atualizar produto existente
    const atualizarProduto = async () => {
        try {            
            await api.put(`/produto/${produtoAtual.id}`, {
              nome: produtoAtual.nome,
              descricao: produtoAtual.descricao,
              preco: Number(produtoAtual.preco),
              iva: Number(produtoAtual.iva),
              quantidade: Number(produtoAtual.quantidade),
              categoria: produtoAtual.categoria
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
            carregarProdutos()
        } catch (err) {
            console.error('Erro ao atualizar produto:', err)
            Alert.alert('Erro', 'Falha ao atualizar produto')
        }
    }

    // Excluir produto
    const excluirProduto = async (id: string) => {
        try {
            await api.delete(`/produto/${id}`)
            Toast.show({
              text1: 'Aviso',
              text2: 'Excluído com sucesso.',
              position: 'bottom',
              visibilityTime: 3000,
              type: 'success'
            })
            carregarProdutos()
        } catch (err) {
            console.error('Erro ao excluir produto:', err)
            Alert.alert('Erro', 'Falha ao excluir produto')
        }
    }

    // Confirmar exclusão
    const confirmarExclusao = (id: string) => {
        Alert.alert(
            'Aviso',
            'Deseja excluir este produto?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir', onPress: () => excluirProduto(id), style: 'destructive' }
            ]
        )
    }

    // Abrir modal para edição
    const abrirEdicao = (produto: Produto) => {
        setProdutoAtual(produto)
        setEditMode(true)
        setOpen(true)
    }

    // Limpar formulário
    const limparFormulario = () => {
        setProdutoAtual({
            id: '',
            nome: '',
            descricao: '',
            preco: '',
            iva: '',
            quantidade: '',
            categoria: ''
        })
        setEditMode(false)
    }

    // Abrir modal para adicionar
    const abrirAdicao = () => {
        limparFormulario()
        setOpen(true)
    }

    const navigation = useNavigation()

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        carregarProdutos()
        carregarCategorias()
      })

      return unsubscribe
    }, [navigation])
    
    const columns = [
        { key: 'nome', label: 'Nome', minWidth: 150 },
        { key: 'descricao', label: 'Descrição', minWidth: 200 },
        { key: 'quantidade', label: 'Quantidade', minWidth: 100 },
        { key: 'preco', label: 'Preço', minWidth: 200, 
          renderCell: (item: Produto) => <Text>{Number(item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })}</Text> 
        },
        { key: 'iva', label: 'IVA', minWidth: 80,
          renderCell: (item: Produto) => <Text>{item.iva}%</Text>
        },
        { key: 'total', label: 'Total', minWidth: 200, 
          renderCell: (item: Produto) => <Text>{(Number(item.preco) * (1 + Number(item.iva) / 100)).toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })}</Text>
        },
        { key: 'categoria', label: 'Categoria', minWidth: 150,
          renderCell: (item: Produto) => <Text>{item.categoria || 'N/A'}</Text>
        },
        {
          key: 'editar',
          label: 'Editar',
          minWidth: 80,
          renderCell: (item: Produto) => (
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
            renderCell: (item: Produto) => (
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
    
    const produtosFiltradas = search ? produtos.filter((produto)=>produto.nome.toLowerCase().includes(search.toLowerCase())) : produtos


    return (
      <PrivateNavigation>
        <View>
            <View className="flex justify-center items-center h-screen">
                {loading ? (
                  <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>
                ) : error ? (
                  <View className="flex-1 justify-center items-center">
                    <Text className="text-red-500">{error}</Text>
                    <Button onPress={carregarProdutos} className="mt-4">
                      Tentar novamente
                    </Button>
                  </View>
                ) : (
                  <Fragment>
                    <View className="mt-20 w-2/3">
                      <MyInput 
                        dica="Pesquisar produto"
                        valor={search}
                        onChangeText={setSearch}
                      />
                    </View>
                    <MyTable data={produtosFiltradas} columns={columns} />
                  </Fragment>
                )}
                
                <MyModal
                  visivel={open}
                  titulo={editMode ? 'Editar Produto' : 'Adicionar Produto'}
                  aoConfirmar={editMode ? atualizarProduto : adicionarProduto}
                  aoFechar={() => {
                    setOpen(false)
                    limparFormulario()
                  }}
                >
                  <View className="gap-4">
                    <MyInput 
                      dica="Nome do produto" 
                      valor={produtoAtual.nome} 
                      onChangeText={(texto) => setProdutoAtual({...produtoAtual, nome: texto})}
                    />
                    <MyInput 
                      dica="Descrição" 
                      valor={produtoAtual.descricao} 
                      onChangeText={(texto) => setProdutoAtual({...produtoAtual, descricao: texto})}
                    />
                    <MyInput 
                      dica="Preço" 
                      valor={produtoAtual.preco.toString()}
                      onChangeText={(texto) => setProdutoAtual({...produtoAtual, preco: texto})}
                      keyboardType="numeric"
                    />
                    <MyInput 
                      dica="IVA" 
                      valor={produtoAtual.iva.toString()}
                      onChangeText={(texto) => setProdutoAtual({...produtoAtual, iva: texto})}
                      keyboardType="numeric"
                    />
                    <MyInput 
                      dica="Quantidade" 
                      valor={produtoAtual.quantidade.toString()}
                      onChangeText={(texto) => setProdutoAtual({...produtoAtual, quantidade: texto})}
                      keyboardType="numeric"
                    />
                    <DropdownComponent 
                      title="Selecione a Categoria" 
                      options={categorias.map(cat => ({
                        id: cat.descricao,
                        nome: cat.descricao
                      }))}
                      selected={produtoAtual.categoria}
                      onChange={categoria => setProdutoAtual({...produtoAtual, categoria: String(categoria)})}
                    />
                  </View>
                </MyModal>
            </View>
            <FloatButton icon={<Plus size={24} color={"#FFF"} />} aoClicar={abrirAdicao}/>
        </View>
      </PrivateNavigation>
    )
}