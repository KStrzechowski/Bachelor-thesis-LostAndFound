import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginPage } from './src/Pages/LoginPage';
import { RegistrationPage } from './src/Pages/RegistrationPage';


const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={LoginPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Registration" component={RegistrationPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
