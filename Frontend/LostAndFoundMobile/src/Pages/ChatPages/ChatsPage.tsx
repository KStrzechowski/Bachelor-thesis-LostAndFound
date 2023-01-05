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
import { MainContainer, Subtitle } from '../../Components';
import { getAccessToken } from '../../SecureStorage';
import { Appbar } from 'react-native-paper';

const GetChats = async (
  accessToken: string,
): Promise<BaseProfileChatType[]> => {
  const chatsData = await getChats(accessToken);
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
  const [imageProfileDisplayedSize, setImageProfileDisplayedSize] =
    React.useState<{
      width: number;
      height: number;
    }>();

  React.useEffect(() => {
    if (item?.lastMessage?.creationTime)
      setDate(
        format(new Date(item.lastMessage.creationTime), 'dd.MM.yyyy HH:mm'),
      );
    if (item?.pictureUrl) {
      let imageSize = { width: width / 4, height: width / 4 };
      Image.getSize(
        item.pictureUrl,
        (width, height) => (imageSize = { width, height }),
      );
      const displayedWidth = width / 4;
      const displayedHeight =
        (imageSize.height * displayedWidth) / imageSize.width;
      setImageProfileDisplayedSize({
        width: displayedWidth,
        height: displayedHeight,
      });
    }
  }, [item, width]);

  return (
    <Pressable
      onLayout={event => setWidth(event.nativeEvent.layout.width)}
      onPress={props.onPress}
      style={styles.chatItem}>
      {item?.pictureUrl ? (
        <Image
          source={{ uri: item.pictureUrl }}
          style={{
            width: imageProfileDisplayedSize?.width,
            height: imageProfileDisplayedSize?.height,
            marginRight: 10,
          }}
        />
      ) : (
        <IoniconsIcon
          name="person"
          size={width / 4}
          style={{ marginRight: 10 }}
        />
      )}
      <View style={{ width: (width * 3) / 4 - 10, paddingRight: 15 }}>
        <Text style={{ fontSize: 18, fontWeight: '500' }}>
          {item?.username}
        </Text>
        <Subtitle>{date}</Subtitle>
        <Text numberOfLines={2}>{item?.lastMessage.content}</Text>
      </View>
    </Pressable>
  );
};

export const ChatsPage = (props: any) => {
  const [chatsData, setChatsData] = React.useState<BaseProfileChatType[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        setChatsData(await GetChats(accessToken));
      }
    };

    getData();
  }, []);

  return (
    <MainContainer>
      <Appbar.Header style={{ backgroundColor: '#abd699' }}>
        <Appbar.BackAction
          color="#2e1c00"
          onPress={() => props.navigation.pop()}
        />
        <Appbar.Content
          title="Czaty"
          titleStyle={{
            textAlign: 'center',
            color: '#2e1c00',
            fontWeight: 'bold',
          }}
        />
        <Appbar.Action icon="flask-empty" color="#abd699"></Appbar.Action>
      </Appbar.Header>
      <FlatList
        style={{ padding: 30 }}
        data={chatsData}
        contentContainerStyle={{ paddingBottom: 20 }}
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
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'light-grey',
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
  },
});
