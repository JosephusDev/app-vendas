import { Calendar, Printer, Share, Tag, UserCircle, UserRound } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import DropdownComponent from "~/components/Dropdown";
import MyBadge from "~/components/MyBadge";
import { MyTable } from "~/components/MyTable";
import PrivateNavigation from "~/components/PrivateNavigation";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";

interface IData{
    id: number;
    nome: string;
}

type typeBadge = "Data" | "Categoria" | "Fornecedor" | "Utilizador" | null

export default function Relatorios() {



    const data = [
        {
            id: 1,
            nome: "Diário"
        },
        {
            id: 2,
            nome: "Semanal"
        },
        {
            id: 3,
            nome: "Mensal"
        },
        {
            id: 4,
            nome: "Anual"
        }
    ]
    
    const categoria = [
        {
            id: 1,
            nome: "Categoria 1"
        },
        {
            id: 2,
            nome: "Categoria 2"
        },
        {
            id: 3,
            nome: "Categoria 3"
        }
    ]
    
    const fornecedor = [
        {
            id: 1,
            nome: "Fornecedor 1"
        },
        {
            id: 2,
            nome: "Fornecedor 2"
        },
        {
            id: 3,
            nome: "Fornecedor 3"
        }
    ]
    
    const utilizador = [
        {
            id: 1,
            nome: "Utilizador 1"
        },
        {
            id: 2,
            nome: "Utilizador 2"
        },
        {
            id: 3,
            nome: "Utilizador 3"
        }
    ]

    const dados = [
        {
            nome: 'Ana Maria Conde',
            bi:'006202586UE045',
        },
        {
            nome: 'João Gomes',
            bi:'001452457LA014',
        },
        {
            nome: 'Paula Marcela',
            bi:'457812458CA041',
        }
    ]
    
    const columns = [
        { key: 'nome', label: 'Nome', minWidth: 150 },
        { key: 'bi', label: 'BI', minWidth: 100 },
      ];

    const [mySelectData, setSelectedData] = useState<IData[]>([])
    const [title, setTitle] = useState("Selecione")

    const onChangeBadge = (type: typeBadge) => {
        switch (type) {
            case "Data":
                setSelectedData(data)
                setTitle("Selecione a Data")
                break
            case "Categoria":
                setSelectedData(categoria)
                setTitle("Selecione a Categoria")
                break
            case "Fornecedor":
                setSelectedData(fornecedor)
                setTitle("Selecione o Fornecedor")
                break
            case "Utilizador":
                setSelectedData(utilizador)
                setTitle("Selecione o Utilizador")
                break
            default:
                break;
        }
    }


    return (
        <PrivateNavigation>
            <View className="flex items-center h-screen mt-4">
                <View className="flex flex-col gap-y-4">
                    <View className="flex flex-row gap-x-4">
                        <MyBadge onPressBadge={()=>onChangeBadge("Data")} text="Data" icon="calendar" />
                        <MyBadge onPressBadge={()=>onChangeBadge("Categoria")} text="Categoria" icon="tag" />
                    </View>
                    <View className="flex flex-row gap-x-4">
                        <MyBadge onPressBadge={()=>onChangeBadge("Fornecedor")} text="Fornecedor" icon="user" />
                        <MyBadge onPressBadge={()=>onChangeBadge("Utilizador")} text="Utilizador" icon="user" />
                    </View>
                </View>
                <Separator className="mt-4 bg-muted-foreground w-[90%]"/>
                <View className="w-[90%] gap-y-2">
                    <DropdownComponent options={mySelectData} title={title} />
                    <View className="flex flex-row justify-end gap-x-1 mt-2">
                        <Button  className="flex flex-row gap-x-1 border-primary">
                            <Printer size={18} color={"#FFFFFF"}/>
                        </Button>
                    </View>
                </View>
                <Text className="mt-4 font-regular text-lg">Relatório de Clientes</Text>
                <MyTable data={dados} columns={columns}/>
            </View>
        </PrivateNavigation>
    );
}
