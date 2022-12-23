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
import { GetMessages, Message } from '../../Data/Chat';

const MessageItem = (props: any) => {
  const message: Message = props.item;
  return (
    <View
      style={[
        styles.message,
        message.userId === '1' ? styles.messageLeft : styles.messageRight,
      ]}>
      <Text style={[styles.messageText]}>{message.content}</Text>
    </View>
  );
};

export const ChatPage = (props: any) => {
  const username = props.route.params.username;
  const [width, setWidth] = React.useState<number>(10);
  const messagesData = GetMessages();

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
              <MainTitle>{username}</MainTitle>
            </View>
          }
          ListHeaderComponentStyle={{
            marginBottom: 10,
            backgroundColor: DefaultTheme.colors.background,
          }}
          stickyHeaderIndices={[0]}
          data={messagesData}
          renderItem={({ item }) => <MessageItem item={item} />}
          ListFooterComponentStyle={{ marginTop: 10 }}
          ListFooterComponent={
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TextInput
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  flex: 4,
                  marginRight: 10,
                }}>
                Nowa Wiadomość
              </TextInput>

              <Pressable
                style={{
                  borderRadius: 20,
                  backgroundColor: 'orange',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  flex: 1,
                }}
                onPress={undefined}>
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
