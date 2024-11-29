import { useState } from "react";
import { Link } from "expo-router";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import Toast from "react-native-toast-message";
import { useAuth } from "~/context/AuthContext";
import { Button } from "~/components/ui/button";
import Feather from "@expo/vector-icons/Feather";
import { View, ImageBackground } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

export default function Index() {

    const {login} = useAuth();

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const Logar = () => {
        if(user.trim() && password.trim()) {
            login();
        }else{
            Toast.show({
                type: 'error',
                text1: 'Alerta',
                text2: 'Preencha todos os campos.',
                text1Style:{fontFamily: "Inter_900Black"},
                text2Style:{fontFamily: "Inter_900Black"},
                position: "top",
            });
        }

    };

    return (
        <ImageBackground
            source={require('~/assets/images/back.png')}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            blurRadius={30}
        >
        <View className="flex-1 justify-center items-center">
            <Card className="w-11/12">
            <CardHeader className="items-center">
                <Avatar alt="US" className="mb-5">
                    <AvatarImage source={{uri:"https://lnuexeoxqeamcpfnenar.supabase.co/storage/v1/object/public/wana-documentos/others/a.jpg"}} />
                    <AvatarFallback>
                    <Text>US</Text>
                    </AvatarFallback>
                </Avatar>
                <CardTitle>
                    <Text className="text-2xl font-semibold">Uíge + Saúde</Text>
                </CardTitle>
                <CardDescription className="my-1">
                <Text className="text-sm text-muted-foreground">Bem-vindo a plataforma! Faça login.</Text>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Text className="my-2 text-muted-foreground"><Feather name="user" size={14}/> Utilizador</Text>
                <Input value={user} onChangeText={setUser} placeholder="Utilizador" />
                <Text className="my-2 text-muted-foreground"><Feather name="lock" size={14}/> Palavra-passe</Text>
                <Input value={password} onChangeText={setPassword} placeholder="Palavra-passe" secureTextEntry />
            </CardContent>
            <CardFooter>
                <Button onPress={Logar} className="w-full border-muted-foreground">
                    <Text><Feather name="log-in" size={14}/> Entrar</Text>
                </Button>
            </CardFooter>
            <Link href="/signup" asChild>
                <Button variant={"link"} className="justify-items-center">
                    <Text>Não tenho uma conta</Text>
                </Button>
            </Link>
            <Text className="text-muted-foreground text-sm text-center mb-5">Esqueci minha palavra-passe</Text>
            </Card>
        </View>
        <Toast />
        </ImageBackground>
    );
}
