import '~/global.css';
import { Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { NAV_THEME } from '~/lib/constants';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '~/context/AuthContext';
import { PortalHost } from '@rn-primitives/portal';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '~/lib/useColorScheme';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  Inter_900Black, 
  Inter_700Bold, 
  Inter_500Medium, 
  Inter_400Regular, 
  useFonts 
} from '@expo-google-fonts/inter';
import Home from './home';
import Toast from 'react-native-toast-message';

// Define the light and dark themes
const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};

const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

// Prevent the splash screen from auto-hiding before loading completes
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  // Load fonts using useFonts hook from expo-google-fonts
  const [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_700Bold,
    Inter_500Medium,
    Inter_400Regular,
  });

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      
      if (Platform.OS === 'web') {
        document.documentElement.classList.add('bg-background');
      }
      
      if (!storedTheme) {
        await AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      
      const colorTheme = storedTheme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setAndroidNavigationBar(colorTheme);
      }
      
      setAndroidNavigationBar(colorTheme);
      setIsColorSchemeLoaded(true);
    };

    loadTheme().finally(() => {
      if (fontsLoaded && isColorSchemeLoaded) {
        SplashScreen.hideAsync();
      }
    });
  }, [colorScheme, setColorScheme, fontsLoaded, isColorSchemeLoaded]);

  // Show nothing while fonts and color scheme are loading
  if (!fontsLoaded || !isColorSchemeLoaded) {
    return null;
  }

  

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <Home/>
      <Toast/>
      <PortalHost />
    </ThemeProvider>
  );
}
