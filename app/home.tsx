import { Calculator } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";


export default function Home(){

    const [nota1, setNota1] = useState('')
    const [nota2, setNota2] = useState('')

    function calcularMedia(){
        if(nota1 && nota2){
            const media = (Number(nota1) + Number(nota2)) / 2
            Toast.show({
                type: 'success',
                text1: 'Notificação',
                text2: 'Média Final é ' + media
            })
        }else{
            Toast.show({
                type: 'error',
                text1: 'Notificação',
                text2: 'Preencha ambas as notas'
            })
        }
    }

    return (
        <View className="flex justify-center h-screen w-screen items-center gap-y-3">
            <Text className="text-2xl font-bold"><Calculator size={20} color="#000"/> Cálculo de Média</Text>
            <Input className="w-1/2" keyboardType="numeric" onChangeText={setNota1}/>
            <Input className="w-1/2" keyboardType="numeric" onChangeText={setNota2}/>
            <Button onPress={calcularMedia}>
                <Text>Calcular</Text>
            </Button>
        </View>
    )
}