import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable, View } from 'react-native';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { LogOut, Moon, Sun } from "lucide-react-native";
import { useColorScheme } from '~/lib/useColorScheme';
import { cn } from '~/lib/utils';
import { useAuth } from '~/context/AuthContext';

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const { logout } = useAuth()

  const toggleTheme = () => {
    const newTheme = isDarkColorScheme ? 'light' : 'dark';
    setColorScheme(newTheme);
    setAndroidNavigationBar(newTheme);
    AsyncStorage.setItem('theme', newTheme);
  };

  return (
    <View
      className='
        flex flex-row aspect-square pt-0.5 justify-center items-center px-20 gap-x-8
        web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2'
    >
      <Pressable
        onPress={toggleTheme}
        className='mt-1 mx-4'
      >
        {({ pressed }) =>
          isDarkColorScheme ? (
            <Sun
              className={cn('text-foreground', pressed && 'opacity-70')}
              size={30}
              strokeWidth={1.25}
              color="#FFFFFF"
            />
          ) : (
            <Moon
              className={cn('text-foreground', pressed && 'opacity-70')}
              size={30}
              color="#000000"
              strokeWidth={1.25}
            />
          )
        }
      </Pressable>
      <Pressable className='mt-1' onPress={logout}>
        <LogOut color={isDarkColorScheme ? "#FFFFFF" : "#000000"}/>
      </Pressable>
    </View>
  );
}
