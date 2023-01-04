import { DefaultTheme } from '@react-navigation/native';
import React from 'react';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { MainContainer, MainTitle } from '../../Components';
import {
  addChatMessage,
  BaseProfileChatType,
  getChatMessages,
  MessageRequestType,
  MessageResponseType,
} from 'commons';
import { getAccessToken, getUserId } from '../../SecureStorage';

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
  const currentUserId: string = props.userId;
  const message: MessageResponseType = props.item;
  return (
    <View
      style={[
        styles.message,
        String(message.authorId) === String(currentUserId)
          ? styles.messageLeft
          : styles.messageRight,
      ]}>
      <Text style={[styles.messageText]}>{message.content}</Text>
    </View>
  );
};

export const ChatPage = (props: any) => {
  const chatRecipentId: string = props.route.params.chatRecipentId;
  const chatRecipentUsername: string = props.route.params.chatRecipentUsername;
  const [width, setWidth] = React.useState<number>(10);
  const [messageContent, setMessageContent] = React.useState<string>('');
  const [currentUserId, setCurrentUserId] = React.useState<string | null>();
  const [messagesData, setMessagesData] = React.useState<MessageResponseType[]>(
    [],
  );
  const [update, setUpdate] = React.useState<boolean>(false);

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
        setMessagesData(await GetMessages(chatRecipentId, accessToken));
      }
    };

    getData();
  }, [update]);

  return (
    <MainContainer>
      <View>
        <FlatList
          ListHeaderComponent={
            <View
              onLayout={event => setWidth(event.nativeEvent.layout.width)}
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <IoniconsIcon
                name="person"
                size={width / 6}
                style={{ marginRight: 20 }}
              />
              <MainTitle>{chatRecipentUsername}</MainTitle>
            </View>
          }
          ListHeaderComponentStyle={{
            marginBottom: 10,
            backgroundColor: DefaultTheme.colors.background,
          }}
          stickyHeaderIndices={[0]}
          data={messagesData.reverse()}
          renderItem={({ item }) => (
            <MessageItem item={item} currentUserId={currentUserId} />
          )}
          ListFooterComponentStyle={{ marginTop: 10 }}
          ListFooterComponent={
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TextInput
                onChangeText={setMessageContent}
                value={messageContent}
                placeholder="Podaj tytuł"
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  flex: 4,
                  marginRight: 10,
                }}
              />
              <Pressable
                style={{
                  borderRadius: 20,
                  backgroundColor: 'orange',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  flex: 1,
                }}
                onPress={async () => {
                  const accessToken = await getAccessToken();
                  if (accessToken && messageContent.length > 0) {
                    const message: MessageRequestType = {
                      content: messageContent,
                    };
                    await SendMessage(chatRecipentId, message, accessToken);
                    setUpdate(!update);
                    setMessageContent('');
                  }
                }}>
                <Text
                  style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>
                  Wyślij
                </Text>
              </Pressable>
            </View>
          }
        />
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
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
