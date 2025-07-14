import React from 'react';
import { useAuth } from '~/context/AuthContext';
import { View } from 'react-native';
import { Text } from './ui/text';
import { XCircle } from 'lucide-react-native';

interface PrivateNavigationProps {
  children: React.ReactNode;
}

export default function PrivateNavigation({ children }: PrivateNavigationProps) {
  const { data: user } = useAuth();

  // Redirecionar para a página inicial se o usuário não for administrador
  if (!user || user.nivel !== 'ADMIN') {
    return (
        <View className='w-full h-screen justify-center items-center gap-5'>
            <XCircle size={30} color={"#E54858"} />
            <Text className='text-xl'>Acesso Negado</Text>
        </View>
    )
  }

  // Se o usuário for administrador, renderiza o conteúdo normalmente
  return <>{children}</>;
}