// LoginScreen.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Lock, Eye, EyeOff, User } from 'lucide-react-native';
import Toast from 'react-native-toast-message';
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Text } from "./ui/text";  
import { useAuth } from '~/context/AuthContext'; // Uso do contexto
import { useColorScheme } from "~/lib/useColorScheme";

export default function LoginScreen() { 
    const {login} = useAuth(); // Usar o contexto
    const [passwordVisible, setPasswordVisible] = useState(false); 
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async () => {
        setIsLoading(true)
            if(username.trim() && password.trim()){
                login(username.trim(), password.trim())
                setIsLoading(false)
                return
            }
            Toast.show({
                text1: 'Aviso',
                text2: 'Preencha todos os campos',
                type: 'error',
                visibilityTime: 5000
            })
            setIsLoading(false)
    }
    const { isDarkColorScheme } = useColorScheme();

    return ( 
        <View className="flex justify-center items-center h-screen px-5">
            <Card className="w-full py-4 border-0">
                <CardHeader className="gap-3 flex items-center mb-2">
                    <View className="bg-primary w-20 h-20 flex items-center justify-center rounded-full">
                        <Lock color={"#FFFFFF"} size={30} />
                    </View>
                    <CardTitle>
                        <Text className='text-xl'>Boutique Nubler</Text>
                    </CardTitle>
                </CardHeader>
                <CardContent className="gap-2 mt-5">
                    <Text>Utilizador:</Text>
                    <View className="relative mb-4">
                        <Input 
                            placeholder="Digite o utilizador" 
                            value={username} 
                            onChangeText={setUsername} 
                            style={{ paddingRight: 40 }}
                        />
                        <User 
                            color={isDarkColorScheme ? "#FFFFFF" : "#000000"}
                            size={20} 
                            style={{ position: 'absolute', right: 10, top: 10 }}
                        />
                    </View>
                    <Text>Palavra Passe:</Text>
                    <View className="relative mb-4">
                        <Input 
                            secureTextEntry={!passwordVisible} 
                            placeholder="Digite a palavra passe" 
                            value={password} 
                            onChangeText={setPassword} 
                            style={{ paddingRight: 40 }} 
                        />
                        <TouchableOpacity 
                            onPress={() => setPasswordVisible(!passwordVisible)} 
                            style={{ position: 'absolute', right: 10, top: 10 }}
                        >
                            {passwordVisible ? <Eye size={20}  color={isDarkColorScheme ? "#FFFFFF" : "#000000"}/> : <EyeOff color={isDarkColorScheme ? "#FFFFFF" : "#000000"} size={20} />}
                        </TouchableOpacity>
                    </View>
                    <Button className="mt-5" onPress={handleLogin} disabled={isLoading}>
                        <Text className="text-white">{isLoading ? 'Aguarde...' : 'Entrar'}</Text>
                    </Button>
                </CardContent>
            </Card>
        </View> 
    );
}