import { Button } from '~/components/ui/button';
import { Drawer } from 'expo-router/drawer';
import Feather from "@expo/vector-icons/Feather";
import { ThemeToggle } from '~/components/ThemeToggle';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface IProps {
    isDarkColorScheme: boolean;
}

export default function DrawerComponent({ isDarkColorScheme }: IProps) {

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                    name="index"
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
                    name="clientes"
                    options={({ navigation }) => ({
                        title: 'Clientes',
                        drawerIcon: () => (
                            <Feather color={isDarkColorScheme ? '#FFFFFF' : '#000000'} size={20} name='users' />
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
                    name="vendas"
                    options={({ navigation }) => ({
                        title: 'Vendas',
                        drawerIcon: () => (
                            <Feather color={isDarkColorScheme ? '#FFFFFF' : '#000000'} size={20} name='shopping-cart' />
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
                    name="compras"
                    options={({ navigation }) => ({
                        title: 'Compras',
                        drawerIcon: () => (
                            <Feather color={isDarkColorScheme ? '#FFFFFF' : '#000000'} size={20} name='dollar-sign' />
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
                    name="produtos"
                    options={({ navigation }) => ({
                        title: 'Produtos',
                        drawerIcon: () => (
                            <Feather color={isDarkColorScheme ? '#FFFFFF' : '#000000'} size={20} name='shopping-bag' />
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
                    name="categorias"
                    options={({ navigation }) => ({
                        title: 'Categorias',
                        drawerIcon: () => (
                            <Feather color={isDarkColorScheme ? '#FFFFFF' : '#000000'} size={20} name='tag' />
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
                    name="fornecedores"
                    options={({ navigation }) => ({
                        title: 'Fornecedores',
                        drawerIcon: () => (
                            <Feather color={isDarkColorScheme ? '#FFFFFF' : '#000000'} size={20} name='users' />
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
                    name="utilizadores"
                    options={({ navigation }) => ({
                        title: 'Utilizadores',
                        drawerIcon: () => (
                            <Feather color={isDarkColorScheme ? '#FFFFFF' : '#000000'} size={20} name='users' />
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
                    name="relatorios"
                    options={({ navigation }) => ({
                        title: 'Relatorios',
                        drawerIcon: () => (
                            <Feather color={isDarkColorScheme ? '#FFFFFF' : '#000000'} size={20} name='file-text' />
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
            </Drawer>
        </GestureHandlerRootView>
    );
}
