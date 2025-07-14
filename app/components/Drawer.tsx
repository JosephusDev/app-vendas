import { Button } from '~/components/ui/button';
import { Drawer } from 'expo-router/drawer';
import Feather from "@expo/vector-icons/Feather";
import { ThemeToggle } from '~/components/ThemeToggle';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface IProps {
    isDarkColorScheme: boolean;
}

interface DrawerScreenConfig {
    name: string;
    title: string;
    icon: keyof typeof Feather.glyphMap;
}

export default function DrawerComponent({ isDarkColorScheme }: IProps) {
    const iconColor = isDarkColorScheme ? '#FFFFFF' : '#000000';
    
    const renderMenuButton = (navigation: any) => (
        <Button variant={'ghost'} onPress={() => navigation.toggleDrawer()}>
            <Feather
                color={iconColor}
                size={20}
                name="menu"
                backgroundColor="transparent"
            />
        </Button>
    );

    const renderDrawerIcon = (iconName: keyof typeof Feather.glyphMap) => (
        <Feather color={iconColor} size={20} name={iconName} />
    );

    const getScreenOptions = (navigation: any) => ({
        headerLeft: () => renderMenuButton(navigation),
        headerRight: () => <ThemeToggle />,
        headerTitleStyle: { fontFamily: 'Inter_700Bold', fontSize: 16 },
        drawerLabelStyle: { fontFamily: 'Inter_700Bold', fontSize: 14 },
    });

    const screens: DrawerScreenConfig[] = [
        { name: 'index', title: 'Início', icon: 'home' },
        { name: 'clientes', title: 'Clientes', icon: 'users' },
        { name: '(vendas)', title: 'Vendas', icon: 'shopping-cart' },
        { name: 'produtos', title: 'Produtos', icon: 'shopping-bag' },
        { name: 'categorias', title: 'Categorias', icon: 'tag' },
        { name: 'utilizadores', title: 'Utilizadores', icon: 'users' },
        { name: 'relatorios', title: 'Relatórios', icon: 'file-text' },
    ];

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{
                    drawerStyle: { width: 220 },
                    headerRight: () => <ThemeToggle />,
                    headerLeft: () => renderMenuButton(undefined),
                }}
            >
                {screens.map((screen) => (
                    <Drawer.Screen
                        key={screen.name}
                        name={screen.name}
                        options={({ navigation }) => ({
                            title: screen.title,
                            drawerIcon: () => renderDrawerIcon(screen.icon),
                            ...getScreenOptions(navigation),
                        })}
                    />
                ))}
            </Drawer>
        </GestureHandlerRootView>
    );
}