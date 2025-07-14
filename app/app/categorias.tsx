import { Trash } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import Toast from "react-native-toast-message";
import api from "~/api";
import { AddButton } from "~/components/AddButton";
import MyInput from "~/components/MyInput";
import MyModal from "~/components/MyModal";
import { MyTable } from "~/components/MyTable";
import PrivateNavigation from "~/components/PrivateNavigation";
import { Button } from "~/components/ui/button";
import { Categoria } from "~/types";

export default function Categorias(){
      
    const [open, setOpen] = useState(false)    
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [descricao, setDescricao] = useState('')
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)

    const getAll = async () => {
      setLoading(true)
      await api.get('/categoria')
      .then((response)=>setCategorias(response.data))
      .catch((error) =>console.error(error))
      .finally(()=>setLoading(false))
    }

    const Create = async () => {
      setLoading(true)
      await api.post('/categoria', { descricao })
      .then(()=>{
        getAll()
        setDescricao('')
        Toast.show({
          text1: 'Aviso',
          text2: 'Cadastrado com sucesso.',
          position: 'bottom',
          visibilityTime: 3000,
          type: 'success'
        })
      })
      .catch((error)=>{
        console.log(error.response.data.message)
        Toast.show({
          text1: 'Aviso',
          text2: error.response.data.message ?? 'Erro ao cadastrar',
          position: 'bottom',
          visibilityTime: 3000,
          type: 'error'
        })
      })
      .finally(()=>{
        setOpen(false)
        setLoading(false)
      })
    }

    const Delete = (id: string) => {
      Alert.alert('Aviso', 'Deseja remover esta categoria?', [
        {
          text: 'Sim',
          onPress: async () => {
            await api.delete(`/categoria/${id}`)
            .then(()=>{
              Toast.show({
                text1: 'Aviso',
                text2: 'Registro excluído com sucesso.',
                position: 'bottom',
                visibilityTime: 3000,
                type: 'success'
              })
              getAll()
            })
            .catch(()=>{
              Toast.show({
                text1: 'Aviso',
                text2: 'Algo deu errado, tente novamente.',
                position: 'bottom',
                visibilityTime: 3000,
                type: 'error'
              })
            })
          },
        },
        {
          text: 'Não',
          style: 'cancel',
        },
      ])
    }

    useEffect(()=>{
      getAll()
    }, [])
    
    const columns = [
        { key: 'descricao', label: 'Descrição', minWidth: 200 },
        {
            key: 'eliminar',
            label: 'Eliminar',
            minWidth: 80,
            renderCell: (item: Categoria) => (
              <Button
                variant="outline"
                size="icon"
                className="shadow-sm shadow-foreground/10 bg-red-500"
                onPress={() => Delete(item.id)}
              >
                <Trash size={14} color={"#FFFFFF"} />
              </Button>
            ),
          },
      ];

    const categoriasFiltradas = search ? categorias.filter((categoria)=>categoria.descricao.toLowerCase().includes(search.toLowerCase())) : categorias

    return (
      <PrivateNavigation>
        <View>
            <View className="flex items-center h-screen">
              <View className="w-3/4">
                <MyInput
                  onChangeText={setSearch}
                  dica="Pesquisar..."
                  valor={search}
                />
              </View>
                {
                  loading ? <View className="mt-40"><ActivityIndicator size='large' color={"#7032D3"} /></View> : <MyTable data={categoriasFiltradas} columns={columns} />
                }
                <MyModal
                  visivel={open}
                  aoConfirmar={Create}
                  aoFechar={()=>setOpen(false)}
                  loading={loading}
                >
                  <MyInput onChangeText={setDescricao} dica="Descrição da categoria"/>
                </MyModal>
            </View>
            <AddButton aoClicar={()=>setOpen(true)}/>
        </View>
      </PrivateNavigation>
    )
}
