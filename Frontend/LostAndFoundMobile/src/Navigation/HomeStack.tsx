import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LoginPage, RegistrationPage } from '../Pages';

const HomeStack = createNativeStackNavigator();
export function HomeScreenStack() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Login" component={LoginPage} />
      <HomeStack.Screen name="Registration" component={RegistrationPage} />
    </HomeStack.Navigator>
  );
}
