import { Edit, Trash } from "lucide-react-native";
import { useState } from "react";
import { Alert, View } from "react-native";
import { AddButton } from "~/components/AddButton";
import MyInput from "~/components/MyInput";
import MyModal from "~/components/MyModal";
import MySelect from "~/components/MySelect";
import { MyTable } from "~/components/MyTable";
import { Button } from "~/components/ui/button";

export default function Produtos(){
      
    const [open, setOpen] = useState(false)    

    const categorias = [
      {
        id: 1,
        nome: "Higiene"
      },
      {
        id: 2,
        nome: "Alimentar"
      }
    ]

    const data = [
        {
            id: 1,
            nome: 'Produto 1',
            descricao: 'descrição 1',
            preco: 15000 +' Kz',
            quantidade:20,
            categoria:'categoria 3',
            fornecedor:'fornecedor 2',
            iva:14 +'%'
        },
        {
            id: 2,
            nome: 'Produto 2',
            descricao: 'descrição 2',
            preco: 240 +' Kz',
            quantidade:20,
            categoria:'categoria 2',
            fornecedor:'fornecedor 3',
            iva:0 +'%'
        },
        {
            id: 3,
            nome: 'Produto 3',
            descricao: 'descrição 3',
            preco: 2000 +' Kz',
            quantidade:20,
            categoria:'categoria 2',
            fornecedor:'fornecedor 3',
            iva:14 +'%'
        }
    ]
    
    const columns = [
        { key: 'id', label: 'ID', minWidth: 50 },
        { key: 'nome', label: 'Nome', minWidth: 200 },
        { key: 'descricao', label: 'Descrição', minWidth: 200 },
        { key: 'preco', label: 'Preço', minWidth: 100 },
        { key: 'quantidade', label: 'Quantidade', minWidth: 100 },
        { key: 'categoria', label: 'categoria', minWidth: 200 },
        { key: 'fornecedor', label: 'Fornecedor', minWidth: 200 },
        {key:'iva', label:'IVA', minWidth: 50},
        {
          key: 'editar',
          label: 'Editar',
          minWidth: 80,
          renderCell: () => (
            <Button
              variant="outline"
              size="icon"
              className="shadow-sm shadow-foreground/10 mr-3 bg-primary"
              onPress={() => {}}
            >
              <Edit size={14} color={"#FFFFFF"} />
            </Button>
          ),
        },
        {
            key: 'eliminar',
            label: 'Eliminar',
            minWidth: 80,
            renderCell: () => (
              <Button
                variant="outline"
                size="icon"
                className="shadow-sm shadow-foreground/10 mr-3 bg-red-500"
                onPress={() => {}}
              >
                <Trash size={14} color={"#FFFFFF"} />
              </Button>
            ),
          },
      ];

    return (
        <>
            <View className="flex justify-center items-center h-screen">
                <View className="mt-20 w-2/3">
                  <MyInput/>
                </View>
                <MyTable data={data} columns={columns} />
                <MyModal
                  visivel={open}
                  aoConfirmar={()=>{
                    Alert.alert("Aviso", "Produto adicionado")
                    setOpen(false)
                  }}
                  aoFechar={()=>setOpen(false)}
                >
                  <MyInput dica="Nome do produto"/>
                  <MyInput dica="Descrição do produto"/>
                  <MyInput keyboardType="phone-pad" dica="Preço do produto"/>
                  <MyInput keyboardType="phone-pad" dica="Quantidade do produto"/>
                  <MySelect title="Selecione a Categoria" options={categorias}/>
                  
                </MyModal>
            </View>
            <AddButton aoClicar={()=>setOpen(true)}/>
        </>
    )
}