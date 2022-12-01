import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { SecondaryButton } from '../Components';
import {
  ChatPage,
  ChatsPage,
  PostPage,
  PostsPage,
  ProfilePage,
  SearchPostsPage,
} from '../Pages';

const CustomDrawerContent = (props: any) => {
  const [width, setWidth] = React.useState<number>(10);

  return (
    <DrawerContentScrollView
      {...props}
      onLayout={event => setWidth(event.nativeEvent.layout.width)}>
      <View style={{ flex: 1 }}>
        <IoniconsIcon
          style={{
            alignSelf: 'center',
            marginTop: 60,
            marginBottom: 20,
          }}
          name="person"
          size={width / 3}
        />
        <DrawerItem
          label="Profil"
          onPress={() => props.navigation.push('Home', { screen: 'Profile' })}
        />
        <DrawerItem
          label="Ogłoszenia"
          onPress={() => props.navigation.push('Home', { screen: 'Posts' })}
        />
        <DrawerItem
          label="Czaty"
          onPress={() => props.navigation.push('Home', { screen: 'Chats' })}
        />
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <SecondaryButton
            label="Wyloguj się"
            onPress={() => props.navigation.push('Login')}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerStack = createDrawerNavigator();
export function DrawerScreenStack() {
  return (
    <DrawerStack.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <DrawerStack.Screen name="Posts" component={PostsPage} />
      <DrawerStack.Screen name="Profile" component={ProfilePage} />
      <DrawerStack.Screen
        name="Post"
        component={PostPage}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      <DrawerStack.Screen
        name="SearchPosts"
        component={SearchPostsPage}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      <DrawerStack.Screen name="Chats" component={ChatsPage} />
      <DrawerStack.Screen
        name="Chat"
        component={ChatPage}
        options={{
          drawerItemStyle: { height: 0 },
        }}
      />
    </DrawerStack.Navigator>
  );
}