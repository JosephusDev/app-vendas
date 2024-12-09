import { Edit, Trash } from "lucide-react-native";
import { useState } from "react";
import { Alert, View } from "react-native";
import { AddButton } from "~/components/AddButton";
import MyInput from "~/components/MyInput";
import MyModal from "~/components/MyModal";
import { MyTable } from "~/components/MyTable";
import { Button } from "~/components/ui/button";

export default function Fornecedores(){
      
    const [open, setOpen] = useState(false)    

    const data = [
        {
            id: 1,
            nome: 'Fornecedor 1',
            nif: '878ue65',
            email: 'email@example.com',
            telefone: '(123) 456-7890',
            endereco:'Luanda'
        },
        {
            id: 2,
            nome: 'Fornecedor 2',
            nif: '878ue65',
            email: 'email@example.com',
            telefone: '(987) 654-3210',
            endereco:'Benguela'
        },
        {
            id: 3,
            nome: 'Fornecedor 3',
            nif: '878ue65',
            email: 'email@example.com',
            telefone: '(987) 521-3210',
            endereco:'Uige'
        },
        {
            id:4,
            nome: 'Fornecedor 4',
            nif: '878ue65',
            email: 'email@example.com',
            telefone: '(987) 521-3210',
            endereco:'Huíla'
        }
    ]
    
    const columns = [
        { key: 'id', label: 'ID', minWidth: 50 },
        { key: 'nome', label: 'Nome', minWidth: 200 },
        { key: 'nif', label: 'NIF', minWidth: 150 },
        { key: 'email', label: 'Email', minWidth: 200 },
        { key: 'telefone', label: 'Telefone', minWidth: 200 },
        { key: 'endereco', label: 'Endereço', minWidth: 200 },
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
                    Alert.alert("Aviso", "Fornecedor adicionado")
                    setOpen(false)
                  }}
                  aoFechar={()=>setOpen(false)}
                >
                  <MyInput dica="Nome do fornecedor"/>
                  <MyInput dica="NIF do fornecedor"/>
                  <MyInput keyboardType="email-address" dica="Email do fornecedor"/>
                  <MyInput keyboardType="phone-pad" dica="Contacto do fornecedor"/>
                  <MyInput dica="Endereço do fornecedor"/>
                </MyModal>
            </View>
            <AddButton aoClicar={()=>setOpen(true)}/>
        </>
    )
}