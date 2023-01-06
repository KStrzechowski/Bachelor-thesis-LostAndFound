import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { MainContainer } from '../../Components';
import {
  addChatMessage,
  BaseProfileType,
  getChatMessages,
  MessageRequestType,
  MessageResponseType,
} from 'commons';
import { getAccessToken, getUserId } from '../../SecureStorage';
import { Appbar, Avatar } from 'react-native-paper';

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
      <Text style={[styles.messageText]}>{message.content}</Text>
    </View>
  );
};

export const ChatPage = (props: any) => {
  const chatRecipent: BaseProfileType = props.route.params?.chatRecipent;
  const [width, setWidth] = React.useState<number>(10);
  const [messageContent, setMessageContent] = React.useState<string>('');
  const [currentUserId, setCurrentUserId] = React.useState<string | null>();
  const [messagesData, setMessagesData] = React.useState<MessageResponseType[]>(
    [],
  );
  const [imageProfileDisplayedSize, setImageProfileDisplayedSize] =
    React.useState<{
      width: number;
      height: number;
    }>();
  const [update, setUpdate] = React.useState<boolean>(false);
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
  }, [update]);

  React.useEffect(() => {
    if (chatRecipent.pictureUrl) {
      let imageSize = { width: width / 5, height: width / 5 };
      Image.getSize(
        chatRecipent.pictureUrl,
        (width, height) => (imageSize = { width, height }),
      );
      const displayedWidth = width / 5;
      const displayedHeight =
        (imageSize.height * displayedWidth) / imageSize.width;
      setImageProfileDisplayedSize({
        width: displayedWidth,
        height: displayedHeight,
      });
    }
  }, [chatRecipent, width]);

  return (
    <MainContainer>
      <Appbar.Header style={{ backgroundColor: '#abd699' }}>
        <Appbar.BackAction
          color="#2e1c00"
          onPress={() => props.navigation.pop()}
        />
        <Appbar.Content
          title={<Text>{chatRecipent?.username}</Text>}
          titleStyle={{
            textAlign: 'center',
            color: '#2e1c00',
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
                marginTop: 10,
                marginRight: 30,
                backgroundColor: '#2e1c00',
              }}
              size={40}
            />
          ) : (
            <Avatar.Icon
              icon={'account'}
              size={40}
              style={{
                alignSelf: 'center',
                marginTop: 10,
                marginRight: 30,
                backgroundColor: '#2e1c00',
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
              await SendMessage(chatRecipent?.userId, message, accessToken);
              setUpdate(!update);
              setMessageContent('');
            }
          }}>
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>
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
    backgroundColor: '#abd699',
    padding: 10,
  },
  inputMessage: {
    borderRadius: 20,
    borderWidth: 1,
    flex: 4,
    marginRight: 10,
    paddingLeft: 4,
    backgroundColor: 'white',
  },
  sendButton: {
    borderRadius: 20,
    backgroundColor: '#2e1c00',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
  messageText: {},
  message: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'light-grey',
    padding: 10,
    marginBottom: 10,
    maxWidth: '70%',
  },
  messageLeft: {
    alignSelf: 'flex-start',
  },
  messageRight: {
    alignSelf: 'flex-end',
  },
});

/**/
