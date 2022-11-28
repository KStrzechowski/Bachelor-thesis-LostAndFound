import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  ChatPage,
  ChatsPage,
  PostPage,
  PostsPage,
  ProfilePage,
  SearchPostsPage,
} from '../Pages';
import { DrawerScreenStack } from './DrawerStack';

const HomeStack = createNativeStackNavigator();
export function HomeScreenStack() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name="Drawer"
        component={DrawerScreenStack}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Profile" component={ProfilePage} />
      <HomeStack.Screen name="Posts" component={PostsPage} />
      <HomeStack.Screen name="Post" component={PostPage} />
      <HomeStack.Screen name="SearchPosts" component={SearchPostsPage} />
      <HomeStack.Screen name="Chats" component={ChatsPage} />
      <HomeStack.Screen name="Chat" component={ChatPage} />
    </HomeStack.Navigator>
  );
}
