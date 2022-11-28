import { format } from 'date-fns';
import React from 'react';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { MainContainer, MainTitle, Subtitle } from '../Components';
import { Chat, GetChats } from '../Data/Chat';

export const ChatItem = (props: any) => {
  const item: Chat = props.item;
  const [width, setWidth] = React.useState<number>(10);
  const date = format(item.lastMessage.sentDateTime, 'dd.MM.yyyy');

  return (
    <Pressable
      onLayout={event => setWidth(event.nativeEvent.layout.width)}
      onPress={props.onPress}
      style={styles.chatItem}>
      <IoniconsIcon name="person" size={width / 4} />
      <View style={{ width: (width * 3) / 4, paddingRight: 15 }}>
        <Text style={{ fontSize: 18, fontWeight: '500' }}>{item.username}</Text>
        <Subtitle>{date}</Subtitle>
        <Text numberOfLines={3}>{item.lastMessage.content}</Text>
      </View>
    </Pressable>
  );
};

export const ChatsPage = (props: any) => {
  const chatsData = GetChats();

  return (
    <MainContainer>
      <MainTitle>Czaty</MainTitle>
      <FlatList
        data={chatsData}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }) => (
          <ChatItem
            item={item}
            onPress={() =>
              props.navigation.push('Home', {
                screen: 'Chat',
                params: { username: item.username },
              })
            }
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
