import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable, View } from 'react-native';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { MoonStar } from '~/lib/icons/MoonStar';
import { Sun } from '~/lib/icons/Sun';
import { useColorScheme } from '~/lib/useColorScheme';
import { cn } from '~/lib/utils';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { Text } from './ui/text';

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  const toggleTheme = () => {
    const newTheme = isDarkColorScheme ? 'light' : 'dark';
    setColorScheme(newTheme);
    setAndroidNavigationBar(newTheme);
    AsyncStorage.setItem('theme', newTheme);
  };

  return (
    <View
      className='
        flex flex-row aspect-square pt-0.5 justify-center items-start px-20 gap-x-8
        web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2'
    >
      <Pressable
        onPress={toggleTheme}
        className='mt-1 mx-5'
      >
        {({ pressed }) =>
          isDarkColorScheme ? (
            <Sun
              className={cn('text-foreground', pressed && 'opacity-70')}
              size={30}
              strokeWidth={1.25}
            />
          ) : (
            <MoonStar
              className={cn('text-foreground', pressed && 'opacity-70')}
              size={30}
              strokeWidth={1.25}
            />
          )
        }
      </Pressable>
      <Avatar className='w-10 h-10' alt="Utilizador">
        <AvatarFallback className='bg-muted-foreground'>
          <Text className='font-regular text-secondary'>JC</Text>
        </AvatarFallback>
      </Avatar>
    </View>
  );
}
