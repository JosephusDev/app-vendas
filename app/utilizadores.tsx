import { Edit, Trash } from "lucide-react-native";
import { useState } from "react";
import { Alert, View } from "react-native";
import { AddButton } from "~/components/AddButton";
import MyInput from "~/components/MyInput";
import MyModal from "~/components/MyModal";
import { MyTable } from "~/components/MyTable";
import { Button } from "~/components/ui/button";

export default function Utilizadores(){
      
    const [open, setOpen] = useState(false)    

    const data = [
        {
            id: 1,
            nome: 'Utilizador 1',
            email: 'email@example.com',
            telefone: '(123) 456-7890',
            nivel:'admin'
        },
        {
            id: 2,
            nome: 'Utilizador 2',
            email: 'email@example.com',
            telefone: '(987) 654-3210',
            nivel:'Caixa'
        },
        {
            id: 3,
            nome: 'Utilizador 3',
            email: 'email@example.com',
            telefone: '(987) 521-3210',
            nivel:'Admin'
        }
    ]
    
    const columns = [
        { key: 'id', label: 'ID', minWidth: 50 },
        { key: 'nome', label: 'Nome', minWidth: 200 },
        { key: 'email', label: 'Email', minWidth: 200 },
        { key: 'telefone', label: 'Telefone', minWidth: 150 },
        { key: 'nivel', label: 'Nivel', minWidth: 100 },
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
                    Alert.alert("Aviso", "Utilizador adicionado")
                    setOpen(false)
                  }}
                  aoFechar={()=>setOpen(false)}
                >
                  <MyInput dica="Nome do utilizador"/>
                  <MyInput keyboardType="email-address" dica="Email do utilizador"/>
                  <MyInput keyboardType="phone-pad" dica="Contacto do utilizador"/>
                  <MyInput dica="Nível do utilizador"/>
                </MyModal>
            </View>
            <AddButton aoClicar={()=>setOpen(true)}/>
        </>
    )
}