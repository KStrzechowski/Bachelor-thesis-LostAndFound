import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  LoginPage,
  PostPage,
  PostsPage,
  RegistrationPage,
  SearchPostsPage,
} from './src/Pages';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={LoginPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Registration" component={RegistrationPage} />
        <Stack.Screen name="Posts" component={PostsPage} />
        <Stack.Screen name="Post" component={PostPage} />
        <Stack.Screen name="SearchPosts" component={SearchPostsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
