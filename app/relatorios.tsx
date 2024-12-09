import { Calendar, Printer, Tag, UserCircle, UserRound } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import MyBadge from "~/components/MyBadge";
import MySelect from "~/components/MySelect";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";

type typeBadge = "Data" | "Categoria" | "Fornecedor" | "Utilizador" | null

export default function Relatorios() {
    const {isDarkColorScheme} = useColorScheme()
    const [badgeSelected, setBadgeSelected] = useState<typeBadge>(null)
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


    const onChangeBadge = (type: typeBadge) => {
        setBadgeSelected(type)
    }


    return (
        <View className="flex items-center h-screen mt-4">
            <View className="flex flex-col gap-y-4">
                <View className="flex flex-row gap-x-4">
                    <MyBadge onPressBadge={()=>onChangeBadge("Data")} text="Data" icon={<Calendar color={"#FFFFFF"} size={15}/>} />
                    <MyBadge onPressBadge={()=>onChangeBadge("Categoria")} text="Categoria" icon={<Tag color={"#FFFFFF"} size={15}/>} />
                </View>
                <View className="flex flex-row gap-x-4">
                    <MyBadge onPressBadge={()=>onChangeBadge("Fornecedor")} text="Fornecedor" icon={<UserRound color={"#FFFFFF"} size={15}/>} />
                    <MyBadge onPressBadge={()=>onChangeBadge("Utilizador")} text="Utilizador" icon={<UserCircle color={"#FFFFFF"} size={15}/>} />
                </View>
            </View>
            <Separator className="mt-4 bg-muted-foreground w-[90%]"/>
            <View className="w-[90%] gap-y-2">
                <MySelect title="Selecione" options={data}/>
                <Button variant={"outline"} className="flex flex-row gap-x-1">
                    <Printer size={15} color={isDarkColorScheme ? "#FFFFFF" : "#000000"}/>
                    <Text className="text-xl font-regular">Imprimir</Text>
                </Button>
            </View>
        </View>
    );
}
