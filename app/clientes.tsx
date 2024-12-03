import { Edit, Plus, Printer, Trash } from "lucide-react-native";
import { useState } from "react";
import { Alert, View } from "react-native";
import { FloatButton } from "~/components/FloatButton";
import MyInput from "~/components/MyInput";
import MyModal from "~/components/MyModal";
import { MyTable } from "~/components/MyTable";
import { Button } from "~/components/ui/button";

export default function Clientes(){
      
    const [open, setOpen] = useState(false)    

    const data = [
        {
            id: 1,
            nome: 'Cliente 1',
            email: 'email@example.com',
            telefone: '(123) 456-7890'
        },
        {
            id: 2,
            nome: 'Cliente 2',
            email: 'email@example.com',
            telefone: '(987) 654-3210'
        },
        {
            id: 3,
            nome: 'Cliente 3',
            email: 'email@example.com',
            telefone: '(987) 521-3210'
        }
    ]
    
    const columns = [
        { key: 'id', label: 'ID', minWidth: 50 },
        { key: 'nome', label: 'Nome', minWidth: 100 },
        { key: 'email', label: 'Email', minWidth: 200 },
        { key: 'telefone', label: 'Telefone', minWidth: 200 },
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
                    Alert.alert("Aviso", "Cliente adicionado")
                    setOpen(false)
                  }}
                  aoFechar={()=>setOpen(false)}
                >
                  <MyInput dica="Nome do cliente"/>
                  <MyInput keyboardType="email-address" dica="Email do cliente"/>
                  <MyInput keyboardType="phone-pad" dica="Contacto do cliente"/>
                </MyModal>
            </View>
            <FloatButton icon={<Plus size={24} color={"#FFF"} />} aoClicar={()=>setOpen(true)}/>
        </>
    )
}