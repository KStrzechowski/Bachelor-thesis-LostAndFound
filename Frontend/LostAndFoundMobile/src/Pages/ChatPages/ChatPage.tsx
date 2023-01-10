import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import {
  dark,
  dark2,
  light,
  light3,
  MainContainer,
  primary,
  secondary,
} from '../../Components';
import {
  addChatMessage,
  BaseProfileType,
  getChatMessages,
  MessageRequestType,
  MessageResponseType,
  readChat,
} from 'commons';
import { getAccessToken, getUserId } from '../../SecureStorage';
import { Appbar, Avatar } from 'react-native-paper';
import { ProfileContext } from '../../Context';

const GetMessages = async (
  recipentId: string,
  accessToken: string,
): Promise<MessageResponseType[]> =>
  await getChatMessages(recipentId, accessToken);

const SendMessage = async (
  recipentId: string,
  message: MessageRequestType,
  accessToken: string,
) => await addChatMessage(recipentId, message, accessToken);

const ReadChat = async (chatRecipent: BaseProfileType | undefined) => {
  const accessToken = await getAccessToken();
  if (chatRecipent && accessToken) {
    await readChat(chatRecipent.userId, accessToken);
  }
};

const MessageItem = (props: any) => {
  const currentUserId: string = props.currentUserId;
  const message: MessageResponseType = props.item;
  return (
    <View
      style={[
        styles.message,
        String(message.authorId) !== String(currentUserId)
          ? styles.messageLeft
          : styles.messageRight,
      ]}>
      <Text
        style={[
          styles.messageText,
          String(message.authorId) !== String(currentUserId)
            ? styles.messageTextLeft
            : styles.messageTextRight,
        ]}>
        {message.content}
      </Text>
    </View>
  );
};

export const ChatPage = (props: any) => {
  const chatRecipent: BaseProfileType = props.route.params?.chatRecipent;
  const { updateChats, updateUnreadChatsCount, updateChatsValue } =
    React.useContext(ProfileContext);
  const [messageContent, setMessageContent] = React.useState<string>('');
  const [currentUserId, setCurrentUserId] = React.useState<string | null>();
  const [messagesData, setMessagesData] = React.useState<MessageResponseType[]>(
    [],
  );
  const [flatListRef, setFlatListRef] =
    React.useState<KeyboardAwareFlatList | null>(null);

  React.useEffect(() => {
    const getData = async () => {
      setCurrentUserId(await getUserId());
    };
    getData();
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        setMessagesData(
          (await GetMessages(chatRecipent?.userId, accessToken)).reverse(),
        );
        flatListRef?.scrollToEnd();
      }
    };

    getData();
  }, [updateChatsValue]);

  return (
    <MainContainer>
      <Appbar.Header style={{ backgroundColor: secondary }}>
        <Appbar.BackAction
          color={light}
          onPress={() => props.navigation.pop()}
        />
        <Appbar.Content
          title={<Text>{chatRecipent?.username}</Text>}
          titleStyle={{
            textAlign: 'center',
            color: light,
            fontWeight: 'bold',
          }}
        />
        <Pressable
          onPress={() => {
            props.navigation.push('Home', {
              screen: 'Profile',
              params: { userId: chatRecipent?.userId },
            });
          }}>
          {chatRecipent?.pictureUrl ? (
            <Avatar.Image
              source={{
                uri: chatRecipent?.pictureUrl,
              }}
              style={{
                alignSelf: 'center',
                marginRight: 30,
                backgroundColor: light3,
              }}
              size={40}
            />
          ) : (
            <Avatar.Icon
              icon={'account'}
              size={40}
              style={{
                alignSelf: 'center',
                marginRight: 30,
                backgroundColor: light3,
              }}
            />
          )}
        </Pressable>
      </Appbar.Header>
      <KeyboardAwareFlatList
        style={{ padding: 30, marginBottom: 70, flex: 1 }}
        contentContainerStyle={{ paddingBottom: 50 }}
        data={messagesData}
        renderItem={({ item }) => (
          <MessageItem item={item} currentUserId={currentUserId} />
        )}
        ref={setFlatListRef}
        onKeyboardDidShow={() => {
          setTimeout(() => {
            flatListRef?.scrollToEnd();
          }, 10);
        }}
        onEndReached={async () => {
          await ReadChat(chatRecipent);
          updateChats();
          updateUnreadChatsCount();
        }}
      />
      <View style={styles.sendMessageContainer}>
        <TextInput
          onChangeText={setMessageContent}
          value={messageContent}
          placeholder="Podaj tytuł"
          style={styles.inputMessage}
        />

        <Pressable
          style={styles.sendButton}
          onPress={async () => {
            const accessToken = await getAccessToken();
            if (accessToken && messageContent.length > 0) {
              const message: MessageRequestType = {
                content: messageContent,
              };
              const response = await SendMessage(
                chatRecipent?.userId,
                message,
                accessToken,
              );
              console.log(response);
              if (response) {
                setMessagesData([...messagesData, response]);
                setMessageContent('');
                setTimeout(() => {
                  flatListRef?.scrollToEnd();
                }, 10);
              }
            }
          }}>
          <Text style={{ color: light, fontWeight: '600', fontSize: 18 }}>
            Wyślij
          </Text>
        </Pressable>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  sendMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    backgroundColor: secondary,
    padding: 10,
  },
  inputMessage: {
    borderRadius: 20,
    borderWidth: 1,
    flex: 4,
    marginRight: 10,
    paddingLeft: 4,
    backgroundColor: light,
  },
  sendButton: {
    borderRadius: 20,
    backgroundColor: primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
  message: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: dark2,
    padding: 10,
    marginBottom: 10,
    maxWidth: '70%',
  },
  messageLeft: {
    alignSelf: 'flex-start',
    backgroundColor: light,
  },
  messageRight: {
    alignSelf: 'flex-end',
    backgroundColor: secondary,
  },
  messageText: {},
  messageTextLeft: {
    color: dark,
  },
  messageTextRight: {
    color: light,
  },
});

/**/
