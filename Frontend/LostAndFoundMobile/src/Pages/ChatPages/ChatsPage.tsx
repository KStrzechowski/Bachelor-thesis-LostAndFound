import { format } from 'date-fns';
import React from 'react';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  BaseProfileChatType,
  BaseProfileType,
  getBaseProfiles,
  getChats,
} from 'commons/';
import {
  danger,
  dark,
  dark2,
  light,
  light3,
  MainContainer,
  PageSelector,
  secondary,
  Subtitle,
} from '../../Components';
import { getAccessToken } from '../../SecureStorage';
import { Appbar, Avatar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProfileContext } from '../../Context';

const GetChats = async (
  accessToken: string,
  pageNumber: number,
): Promise<BaseProfileChatType[]> => {
  const chatsData = await getChats(accessToken, pageNumber);
  const userIds = chatsData.map(chatData => chatData.chatMember.id);
  const profilesData = await getBaseProfiles(userIds, accessToken);
  const chats: BaseProfileChatType[] = chatsData.map(chatData => ({
    userId: chatData.chatMember.id,
    ...chatData,
    ...profilesData.find(
      profileData => profileData.userId === chatData.chatMember.id,
    ),
  }));
  return chats;
};

const ChatItem = (props: any) => {
  const item: BaseProfileChatType = props.item;
  const [width, setWidth] = React.useState<number>(10);
  const [date, setDate] = React.useState<any>('');

  React.useEffect(() => {
    if (item?.lastMessage?.creationTime) {
      setDate(
        format(new Date(item.lastMessage.creationTime), 'dd.MM.yyyy HH:mm'),
      );
    }
  }, [item, width]);

  return (
    <Pressable
      onLayout={event => setWidth(event.nativeEvent.layout.width)}
      onPress={props.onPress}
      style={styles.chatItem}>
      {item?.pictureUrl ? (
        <Avatar.Image
          source={{
            uri: item.pictureUrl,
          }}
          style={{
            marginRight: 20,
            backgroundColor: light3,
          }}
          size={width / 4}
        />
      ) : (
        <Avatar.Icon
          icon={'account'}
          size={width / 4}
          style={{
            alignSelf: 'center',
            marginRight: 20,
            backgroundColor: light3,
          }}
        />
      )}
      <View
        style={{
          width: (width * 2) / 4,
        }}>
        <Text style={{ fontSize: 18, fontWeight: '500', color: dark }}>
          {item?.username}
        </Text>
        <Subtitle>{date}</Subtitle>
        <Text numberOfLines={2} style={{ color: dark2 }}>
          {item?.lastMessage.content}
        </Text>
      </View>
      <MaterialCommunityIcons
        name="chat"
        color={item?.containsUnreadMessage ? danger : light}
        size={25}></MaterialCommunityIcons>
    </Pressable>
  );
};

export const ChatsPage = (props: any) => {
  const { updateChatsValue } = React.useContext(ProfileContext);
  const [chatsData, setChatsData] = React.useState<BaseProfileChatType[]>([]);
  const [pageNumber, setPageNumber] = React.useState<number>(1);

  React.useEffect(() => {
    const getData = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        setChatsData(await GetChats(accessToken, pageNumber));
      }
    };

    getData();
  }, [updateChatsValue, pageNumber]);

  return (
    <MainContainer>
      <Appbar.Header style={{ backgroundColor: secondary }}>
        <Appbar.BackAction
          color={light}
          onPress={() => props.navigation.pop()}
        />
        <Appbar.Content
          title="Czaty"
          titleStyle={{
            textAlign: 'center',
            color: light,
            fontWeight: 'bold',
          }}
        />
        <Appbar.Action icon="flask-empty" color={secondary}></Appbar.Action>
      </Appbar.Header>
      <FlatList
        style={{ padding: 30 }}
        data={chatsData}
        contentContainerStyle={{ paddingBottom: 70 }}
        keyExtractor={item => item.userId}
        renderItem={({ item }) => (
          <ChatItem
            item={item}
            onPress={() => {
              const chatRecipent: BaseProfileType = {
                userId: item.userId,
                username: item.username,
                pictureUrl: item.pictureUrl,
              };
              props.navigation.push('Home', {
                screen: 'Chat',
                params: {
                  chatRecipent,
                },
              });
            }}
          />
        )}
        ListFooterComponent={() => PageSelector(pageNumber, 20, setPageNumber)}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: light,
    borderWidth: 1,
    borderColor: dark2,
    borderRadius: 20,
    padding: 15,
    marginTop: 20,
  },
});
