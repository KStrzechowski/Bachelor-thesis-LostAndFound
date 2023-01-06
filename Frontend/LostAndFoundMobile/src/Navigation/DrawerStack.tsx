import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { PublicationSearchRequestType } from 'commons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  Button,
  Caption,
  Drawer,
  Paragraph,
  Title,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext, ProfileContext } from '../../Config';
import { light3, mainStyles, primary } from '../Components';
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
import {
  getName,
  getSurname,
  getUsername,
  getUserPhotoUrl,
  getUserRating,
} from '../SecureStorage/Profile';

const CustomDrawerContent = (props: any) => {
  const { signOut } = React.useContext(AuthContext);
  const { updatePhotoUrlValue } = React.useContext(ProfileContext);
  const [username, setUsername] = React.useState<string | null>();
  const [name, setName] = React.useState<string | null>();
  const [surname, setSurname] = React.useState<string | null>();
  const [userRating, setUserRating] = React.useState<string | null>();
  const [userPhotoUrl, setUserPhotoUrl] = React.useState<string | null>();

  React.useEffect(() => {
    const getData = async () => {
      setUsername(await getUsername());
      setName(await getName());
      setSurname(await getSurname());
      setUserRating(await getUserRating());
      setUserPhotoUrl(await getUserPhotoUrl());
    };
    getData();
  }, [updatePhotoUrlValue]);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          {userPhotoUrl ? (
            <Avatar.Image
              source={{
                uri: userPhotoUrl,
              }}
              style={{
                alignSelf: 'center',
                marginTop: 10,
                marginRight: 30,
                backgroundColor: light3,
              }}
              size={70}
            />
          ) : (
            <Avatar.Icon
              icon={'account'}
              style={{
                alignSelf: 'center',
                marginTop: 10,
                marginRight: 30,
                backgroundColor: light3,
              }}
            />
          )}

          <Title style={styles.title}>{username}</Title>
          {name || surname ? (
            <Caption style={styles.caption}>{`${name ? `${name} ` : ''}${
              surname ? surname : ''
            }`}</Caption>
          ) : (
            <></>
          )}
          <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                {userRating}
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
                color={primary}
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
              <MaterialCommunityIcons name="post" color={primary} size={size} />
            )}
            label="Ogłoszenia"
            onPress={() => props.navigation.push('Home', { screen: 'Posts' })}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="post-outline"
                color={primary}
                size={size}
              />
            )}
            label="Moje ogłoszenia"
            onPress={() => {
              const searchPublication: PublicationSearchRequestType = {
                onlyUserPublications: true,
              };
              props.navigation.push('Home', {
                screen: 'Posts',
                params: { searchPublication: searchPublication },
              });
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="chat" color={primary} size={size} />
            )}
            label="Czaty"
            onPress={() => props.navigation.push('Home', { screen: 'Chats' })}
          />
        </Drawer.Section>
        <Drawer.Section style={{ padding: 15 }}>
          <Button
            icon="logout"
            mode="contained"
            style={[mainStyles.secondaryButton, { paddingVertical: 5 }]}
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
