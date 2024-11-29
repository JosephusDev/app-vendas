import { Button } from '~/components/ui/button';
import { Drawer } from 'expo-router/drawer';
import { useAuth } from '~/context/AuthContext';
import Feather from "@expo/vector-icons/Feather";
import { ThemeToggle } from '~/components/ThemeToggle';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface IProps {
    isDarkColorScheme: boolean;
}

export default function DrawerComponent({ isDarkColorScheme }: IProps) {
    const { logout } = useAuth();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                    name="home"
                    options={({ navigation }) => ({
                        title: 'Início',
                        drawerIcon: () => (
                            <Feather color={isDarkColorScheme ? '#FFFFFF' : '#000000'} size={20} name='home' />
                        ),
                        headerLeft: () => (
                            <Button variant={'ghost'} onPress={() => navigation.toggleDrawer()}>
                                <Feather
                                    color={isDarkColorScheme ? '#FFFFFF' : '#000000'}
                                    size={20}
                                    name="menu"
                                    backgroundColor="transparent"
                                />
                            </Button>
                        ),
                        headerRight: () => <ThemeToggle />,
                        headerTitleStyle: { fontFamily: 'Inter_900Black' },
                        drawerLabelStyle: { fontFamily: 'Inter_900Black' },
                    })}
                />
                <Drawer.Screen
                    name="agendamento"
                    options={({ navigation }) => ({
                        title: 'Agendamentos',
                        drawerIcon: () => (
                            <Feather color={isDarkColorScheme ? '#FFFFFF' : '#000000'} size={20} name='clock' />
                        ),
                        headerLeft: () => (
                            <Button variant={'ghost'} onPress={() => navigation.toggleDrawer()}>
                                <Feather
                                    color={isDarkColorScheme ? '#FFFFFF' : '#000000'}
                                    size={20}
                                    name="menu"
                                    backgroundColor="transparent"
                                />
                            </Button>
                        ),
                        headerRight: () => <ThemeToggle />,
                        headerTitleStyle: { fontFamily: 'Inter_900Black' },
                        drawerLabelStyle: { fontFamily: 'Inter_900Black' },
                    })}
                />
                <Drawer.Screen
                    name="localizacao"
                    options={({ navigation }) => ({
                        title: 'Serviços de Saúde',
                        drawerIcon: () => (
                            <Feather color={isDarkColorScheme ? '#FFFFFF' : '#000000'} size={20} name='map' />
                        ),
                        headerLeft: () => (
                            <Button variant={'ghost'} onPress={() => navigation.toggleDrawer()}>
                                <Feather
                                    color={isDarkColorScheme ? '#FFFFFF' : '#000000'}
                                    size={20}
                                    name="menu"
                                    backgroundColor="transparent"
                                />
                            </Button>
                        ),
                        headerRight: () => <ThemeToggle />,
                        headerTitleStyle: { fontFamily: 'Inter_900Black' },
                        drawerLabelStyle: { fontFamily: 'Inter_900Black' },
                    })}
                />
                <Drawer.Screen
                    name="saudia"
                    options={({ navigation }) => ({
                        title: 'ConsultorIA',
                        drawerIcon: () => (
                            <Feather color={isDarkColorScheme ? '#FFFFFF' : '#000000'} size={20} name='message-circle' />
                        ),
                        headerLeft: () => (
                            <Button variant={'ghost'} onPress={() => navigation.toggleDrawer()}>
                                <Feather
                                    color={isDarkColorScheme ? '#FFFFFF' : '#000000'}
                                    size={20}
                                    name="menu"
                                    backgroundColor="transparent"
                                />
                            </Button>
                        ),
                        headerRight: () => <ThemeToggle />,
                        headerTitleStyle: { fontFamily: 'Inter_900Black' },
                        drawerLabelStyle: { fontFamily: 'Inter_900Black' },
                    })}
                />
                <Drawer.Screen
                    name="perfil"
                    options={({ navigation }) => ({
                        title: 'Perfil de Utilizador',
                        drawerIcon: () => (
                            <Feather color={isDarkColorScheme ? '#FFFFFF' : '#000000'} size={20} name='user' />
                        ),
                        headerLeft: () => (
                            <Button variant={'ghost'} onPress={() => navigation.toggleDrawer()}>
                                <Feather
                                    color={isDarkColorScheme ? '#FFFFFF' : '#000000'}
                                    size={20}
                                    name="menu"
                                    backgroundColor="transparent"
                                />
                            </Button>
                        ),
                        headerRight: () => <ThemeToggle />,
                        headerTitleStyle: { fontFamily: 'Inter_900Black' },
                        drawerLabelStyle: { fontFamily: 'Inter_900Black' },
                    })}
                />
                <Drawer.Screen
                    name="politicas"
                    options={({ navigation }) => ({
                        title: 'Termos e Políticas',
                        drawerIcon: () => (
                            <Feather color={isDarkColorScheme ? '#FFFFFF' : '#000000'} size={20} name='info' />
                        ),
                        headerLeft: () => (
                            <Button variant={'ghost'} onPress={() => navigation.toggleDrawer()}>
                                <Feather
                                    color={isDarkColorScheme ? '#FFFFFF' : '#000000'}
                                    size={20}
                                    name="menu"
                                    backgroundColor="transparent"
                                />
                            </Button>
                        ),
                        headerRight: () => <ThemeToggle />,
                        headerTitleStyle: { fontFamily: 'Inter_900Black' },
                        drawerLabelStyle: { fontFamily: 'Inter_900Black' },
                    })}
                />
                <Drawer.Screen
                    name="logout"
                    options={{
                        title: 'Terminar sessão',
                        drawerIcon: () => (
                            <Feather color={isDarkColorScheme ? '#FFFFFF' : '#000000'} size={20} name='log-out' />
                        ),
                        headerRight: () => <ThemeToggle />,
                        headerTitleStyle: { fontFamily: 'Inter_900Black' },
                        drawerLabelStyle: { fontFamily: 'Inter_900Black' },
                    }}
                    listeners={{
                        drawerItemPress: (e) => {
                            e.preventDefault();
                            logout();
                        },
                    }}
                />
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerItemStyle: {display: 'none',}
                    }}
                />
                <Drawer.Screen
                    name="signup"
                    options={{
                        drawerItemStyle: {display: 'none',}
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
