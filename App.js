import React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import RootNavigator from './src/navigation/RootNavigator';
import LoadingView from './src/components/LoadingView';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FAFAFA',
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaProvider style={styles.root}>
        <LoadingView message="Initializing DocConnect..." />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider style={styles.root}>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="dark" />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    width: '100%',
    height: '100%',
  },
});
