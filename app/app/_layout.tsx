import '../global.css';
import { StatusBar } from 'expo-status-bar';
import { NAV_THEME } from '~/lib/constants';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '~/lib/useColorScheme';
import * as SplashScreen from 'expo-splash-screen';
import { Platform } from 'react-native';
import { 
  Inter_900Black, 
  Inter_700Bold, 
  Inter_500Medium, 
  Inter_400Regular, 
  useFonts 
} from '@expo-google-fonts/inter';
import Toast from 'react-native-toast-message';
import DrawerComponent from '~/components/Drawer'; 
import LoginScreen from '~/components/LoginScreen'; 
import { AuthProvider, useAuth } from '~/context/AuthContext';

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};

const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export default function Layout () {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false); 

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

  if (!fontsLoaded || !isColorSchemeLoaded) {
    return null;
  }

  return ( 
    <AuthProvider>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
        <View className='w-screen bg-background h-full'>
          <Content />
        </View>
        <Toast />
      </ThemeProvider>  
    </AuthProvider>
  );
};

const Content: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { isDarkColorScheme } = useColorScheme();
  
  return isAuthenticated ? (
    <DrawerComponent isDarkColorScheme={isDarkColorScheme}/>
  ) : (
    <LoginScreen/>
  ); 
};
 