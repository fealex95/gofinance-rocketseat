import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { Routes } from './src/routes';
import { AppRoutes } from './src/routes/app.routes';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme'
import { Dashboard } from './src/screens/Dashboard';
import { Register } from './src/screens/Register';
import { CategorySelect } from './src/screens/CategorySelect';
import { SignIn } from './src/screens/SignIn';

import { AuthProvider, useAuth } from './src/hooks/auth'

export default function App() {

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const {userStorageLoading} = useAuth();

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}

