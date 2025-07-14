import { Stack } from 'expo-router';
import { ThemeToggle } from '~/components/ThemeToggle';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function StackComponent(){
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: '',
                    headerRight: () => <ThemeToggle />,
                }}
            />
            <Stack.Screen
                name="signup"
                options={{
                    title: '',
                    headerRight: () => <ThemeToggle />,
                }}
            />
        </Stack>
      </GestureHandlerRootView>
    )
}