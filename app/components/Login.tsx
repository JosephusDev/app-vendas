import { Lock } from "lucide-react-native";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Text } from "./ui/text";
import { View } from "react-native";



export default function LoginScreem(){


    return(
        <View className="flex justify-center items-center h-screen px-10">
            <Card className="w-full py-4">
                <CardHeader className="gap-3 flex items-center mb-2">
                    <View className="bg-primary w-14 h-14 flex items-center justify-center rounded-full">
                        <Lock color={"#FFFFFF"} size={30}/>
                    </View>
                    <CardTitle className="text-primary font-regular">Login</CardTitle>
                </CardHeader>
                <CardContent className="gap-2">
                    <Text className="font-bold">Utilizador:</Text>
                    <Input placeholder="Digite o utilizador"/>
                    <Text className="font-bold">Palavra Passe:</Text>
                    <Input secureTextEntry placeholder="Digite a palavra passe"/>
                    <Button className="mt-5">
                        <Text className="text-white">Entrar</Text>
                    </Button>
                </CardContent>
                <CardDescription className="text-center">
                    <Text className="text-primary">Esqueceu a senha?</Text>
                </CardDescription>
            </Card>
        </View>
    )
}