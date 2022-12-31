import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';
import { Image, View } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { AuthContext, ProfileContext } from '../../Config';
import { SecondaryButton } from '../Components';
import {
  ChatPage,
  ChatsPage,
  PostPage,
  PostsPage,
  ProfilePage,
  ProfilePageMe,
  EditProfilePage,
  SearchPostsPage,
  AddPostPage,
  EditPostPage,
} from '../Pages';
import { getUserPhotoUrl } from '../SecureStorage/Profile';

const CustomDrawerContent = (props: any) => {
  const { signOut } = React.useContext(AuthContext);
  const { updatePhotoUrlValue } = React.useContext(ProfileContext);
  const [userPhotoUrl, setUserPhotoUrl] = React.useState<string | null>();
  const [width, setWidth] = React.useState<number>(10);
  const [imageDisplayedSize, setImageDisplayedSize] = React.useState<{
    width: number;
    height: number;
  }>();

  React.useEffect(() => {
    const getData = async () => {
      setUserPhotoUrl(await getUserPhotoUrl());
    };
    getData();
  }, [updatePhotoUrlValue]);

  React.useEffect(() => {
    if (userPhotoUrl) {
      let imageSize = { width: 100, height: 100 };
      Image.getSize(
        userPhotoUrl,
        (width, height) => (imageSize = { width, height }),
      );
      const displayedWidth = width / 3;
      const displayedHeight =
        (imageSize.height * displayedWidth) / imageSize.width;
      setImageDisplayedSize({
        width: displayedWidth,
        height: displayedHeight,
      });
    }
  }, [userPhotoUrl, width]);

  return (
    <DrawerContentScrollView
      {...props}
      onLayout={event => setWidth(event.nativeEvent.layout.width)}>
      <View style={{ flex: 1 }}>
        {userPhotoUrl ? (
          <Image
            source={{ uri: userPhotoUrl }}
            style={{
              alignSelf: 'center',
              marginTop: 60,
              marginBottom: 20,
              height: imageDisplayedSize?.height,
              width: imageDisplayedSize?.width,
            }}
          />
        ) : (
          <IoniconsIcon
            style={{
              alignSelf: 'center',
              marginTop: 60,
              marginBottom: 20,
            }}
            name="person"
            size={width / 3}
          />
        )}
        <DrawerItem
          label="Profil"
          onPress={() => props.navigation.push('Home', { screen: 'ProfileMe' })}
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
            onPress={async () => await signOut()}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerStack = createDrawerNavigator();
export const DrawerScreenStack = () => {
  return (
    <DrawerStack.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <DrawerStack.Screen name="Posts" component={PostsPage} />
      <DrawerStack.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      <DrawerStack.Screen name="ProfileMe" component={ProfilePageMe} />
      <DrawerStack.Screen
        name="EditProfile"
        component={EditProfilePage}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      <DrawerStack.Screen name="AddPost" component={AddPostPage} />
      <DrawerStack.Screen name="EditPost" component={EditPostPage} />
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
};
