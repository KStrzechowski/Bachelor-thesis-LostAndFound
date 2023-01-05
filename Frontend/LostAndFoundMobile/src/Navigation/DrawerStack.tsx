import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';
import { Image, StyleSheet, Switch, Text, View } from 'react-native';
import {
  Avatar,
  Button,
  Caption,
  Drawer,
  Paragraph,
  Title,
  TouchableRipple,
} from 'react-native-paper';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
  const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      marginTop: 20,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri:
                userPhotoUrl ??
                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
            style={{ alignSelf: 'center', marginTop: 10, marginRight: 30 }}
            size={70}
          />
          <Title style={styles.title}>Imie Nazwisko</Title>
          <Caption style={styles.caption}>@username</Caption>
          <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                4
              </Paragraph>
              <Caption style={styles.caption}>Ocena</Caption>
            </View>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Profil"
            onPress={() =>
              props.navigation.push('Home', { screen: 'ProfileMe' })
            }
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="post" color={color} size={size} />
            )}
            label="Ogłoszenia"
            onPress={() => props.navigation.push('Home', { screen: 'Posts' })}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="post-outline"
                color={color}
                size={size}
              />
            )}
            label="Moje ogłoszenia"
            onPress={() => props.navigation.push('Home', { screen: 'Posts' })}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="chat" color={color} size={size} />
            )}
            label="Czaty"
            onPress={() => props.navigation.push('Home', { screen: 'Chats' })}
          />
        </Drawer.Section>
        <Drawer.Section title="Akcje" style={{ padding: 15 }}>
          <Button
            icon="logout"
            mode="contained"
            style={{ backgroundColor: '#2e1c00' }}
            onPress={async () => await signOut()}>
            Wyloguj się
          </Button>
        </Drawer.Section>
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
