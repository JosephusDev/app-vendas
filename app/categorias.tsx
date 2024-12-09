import { Edit, Trash } from "lucide-react-native";
import { useState } from "react";
import { Alert, View } from "react-native";
import { AddButton } from "~/components/AddButton";
import MyInput from "~/components/MyInput";
import MyModal from "~/components/MyModal";
import { MyTable } from "~/components/MyTable";
import { Button } from "~/components/ui/button";

export default function Categorias(){
      
    const [open, setOpen] = useState(false)    

    const data = [
        {
            id: 1,
            descricao: 'Categoria 1'
        },
        {
            id: 2,
            descricao: 'Categoria 2'
        },
        {
            id: 3,
            descricao: 'Categoria 3'
        }
    ]
    
    const columns = [
        { key: 'id', label: 'ID', minWidth: 50 },
        { key: 'descricao', label: 'Descrição', minWidth: 150 },
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
                    Alert.alert("Aviso", "Categoria adicionada")
                    setOpen(false)
                  }}
                  aoFechar={()=>setOpen(false)}
                >
                  <MyInput dica="Descrição da categoria"/>
                </MyModal>
            </View>
            <AddButton aoClicar={()=>setOpen(true)}/>
        </>
    )
}