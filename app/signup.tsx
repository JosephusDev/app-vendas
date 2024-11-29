import { useState } from "react";
import { Link } from "expo-router";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import Toast from "react-native-toast-message";
import { Button } from "~/components/ui/button";
import Feather from "@expo/vector-icons/Feather";
import { useAuth } from "~/context/AuthContext";
import { View, ImageBackground } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

export default function SignUp() {

    const {login} = useAuth();

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const Logar = () => {
        if(user.trim() && password.trim() && email.trim()) {
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
                <CardDescription className="my-2">
                <Text className="text-sm text-muted-foreground">Bem-vindo a plataforma! Cadastre-se.</Text>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Text className="my-2 text-muted-foreground"><Feather name="user" size={14}/> Utilizador</Text>
                <Input value={user} onChangeText={setUser} placeholder="Utilizador" />
                <Text className="my-2 text-muted-foreground"><Feather name="lock" size={14}/> Palavra-passe</Text>
                <Input value={password} onChangeText={setPassword} placeholder="Palavra-passe" secureTextEntry />
                <Text className="my-2 text-muted-foreground"><Feather name="phone-call" size={14}/> Nº de Telefone</Text>
                <Input value={email} onChangeText={setEmail} placeholder="Nº de Telefone" />
            </CardContent>
            <CardFooter>
                <Button onPress={Logar} className="w-full border-muted-foreground">
                    <Text><Feather name="user-plus" size={14}/> Cadastrar-me</Text>
                </Button>
            </CardFooter>
            <Link href="/" asChild>
                <Button variant={"link"} className="mb-5 -mt-3">
                    <Text>Já possuo uma conta</Text>
                </Button>
            </Link>
            </Card>
        </View>
        <Toast />
        </ImageBackground>
    );
}
