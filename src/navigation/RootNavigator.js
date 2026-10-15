import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import ProfileInformationScreen from '../screens/ProfileInformationScreen';
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
      <Stack.Screen name="ProfileInformation" component={ProfileInformationScreen} />
      <Stack.Screen name="MainTabs" component={AppNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
