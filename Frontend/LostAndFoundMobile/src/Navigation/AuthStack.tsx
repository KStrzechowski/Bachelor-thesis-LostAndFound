import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerScreenStack } from './DrawerStack';
import {
  ChatPage,
  ChatsPage,
  LoginPage,
  PostPage,
  PostsPage,
  ProfilePage,
  RegistrationPage,
  SearchPostsPage,
} from '../Pages';

const AuthStack = createNativeStackNavigator();
export const AuthScreenStack = (props: any) => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name="Home"
        component={DrawerScreenStack}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen name="Login" component={LoginPage} />
      <AuthStack.Screen name="Registration" component={RegistrationPage} />
      <AuthStack.Screen name="Profile" component={ProfilePage} />
      <AuthStack.Screen name="Posts" component={PostsPage} />
      <AuthStack.Screen name="Post" component={PostPage} />
      <AuthStack.Screen name="SearchPosts" component={SearchPostsPage} />
      <AuthStack.Screen name="Chats" component={ChatsPage} />
      <AuthStack.Screen name="Chat" component={ChatPage} />
    </AuthStack.Navigator>
  );
};
