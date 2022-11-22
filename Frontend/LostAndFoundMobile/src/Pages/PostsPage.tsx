import React, { Children, PropsWithChildren } from 'react';
import {
  FlatList,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';
import { MainContainer, MainTitle } from '../Components';
import { GetPosts, Post } from '../Data/Post';

const PostItem = (props: any) => {
  const item: Post = props.item;
  const incidentDate = format(item.incidentDate, 'dd.MM.yyyy');
  const [width, setWidth] = React.useState<number>(10);

  return (
    <Pressable
      onLayout={event => {
        setWidth(event.nativeEvent.layout.width);
      }}
      onPress={props.onPress}
      style={styles.postItem}>
      <Text style={{ fontSize: 20, fontWeight: '600', color: 'black' }}>
        {item.title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center',
        }}>
        <Text style={{ fontSize: 16 }}>{incidentDate}</Text>
        <Text
          style={
            item.votesScore > 0 ? styles.positiveScore : styles.negativeScore
          }>
          {item.votesScore > 0 ? `+${item.votesScore}` : item.votesScore}
        </Text>
      </View>
      <Text numberOfLines={3}>{item.description}</Text>
      <MaterialIconsIcon name="add-a-photo" size={width - 20} />
    </Pressable>
  );
};

export const PostsPage = (props: { navigation: string[] }) => {
  const postsData = GetPosts();

  return (
    <MainContainer>
      <View style={styles.titleSection}>
        <MainTitle>Ogłoszenia</MainTitle>
        <AntDesignIcon
          name="search1"
          size={30}
          onPress={() => props.navigation.push('SearchPosts')}
        />
      </View>
      <FlatList
        data={postsData}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 15,
        }}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }) => (
          <PostItem item={item} onPress={() => props.navigation.push('Post')} />
        )}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'light-grey',
    padding: 10,
    marginBottom: 10,
  },
  postsList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  postItem: {
    width: '49%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'light-grey',
    padding: 10,
    marginBottom: 10,
  },
  positiveScore: {
    fontSize: 16,
    color: 'green',
  },
  negativeScore: {
    fontSize: 16,
    color: 'red',
  },
});
