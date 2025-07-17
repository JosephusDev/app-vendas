
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast from 'react-native-toast-message';
import api from '~/api';
import { Usuario } from '~/types';

interface AuthContextType {
    data: Usuario | null
    token: string | null
    isAuthenticated: boolean;
    isLoading: boolean
    login: (username: string, password: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [data, setData] = useState<Usuario | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false)
    const login = async (usuario: string, senha: string) =>{
        setIsLoading(true)
        await api.post('/usuarios/login', {usuario, senha})
        .then(async (response)=>{

            const data = response.data
            if(data){
                setAuthenticated(true);
                setData(data.data);
                setToken(data.token);
                await AsyncStorage.setItem('token', data.token);
            }else{
                Toast.show({
                    text1: 'Aviso',
                    text2: 'Usuário ou senha incorrectos',
                    type: 'error',
                    visibilityTime: 3000
                })
            }
        })
        .catch((error) => console.log(error))
        .finally(()=>setIsLoading(false))
    }

    const logout = () =>{
         setAuthenticated(false);
         setData(null);
         setToken(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, data, token }}>   
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useLogin deve estar dentro do AuthProvider');
    }
    return context;
};