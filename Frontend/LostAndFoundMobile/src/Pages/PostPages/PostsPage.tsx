import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';
import { MainContainer } from '../../Components';
import { getPublications, PublicationResponseType } from 'commons';
import { getAccessToken } from '../../SecureStorage';
import { PublicationSearchRequestType } from 'commons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { Appbar } from 'react-native-paper';

const PostItem = (props: any) => {
  const item: PublicationResponseType = props.item;
  const incidentDate = format(item.incidentDate, 'dd.MM.yyyy');
  const [width, setWidth] = React.useState<number>(10);
  const [imageDisplayedSize, setImageDisplayedSize] = React.useState<{
    width: number;
    height: number;
  }>();

  React.useEffect(() => {
    if (item?.subjectPhotoUrl) {
      let imageSize = { width: 100, height: 100 };
      Image.getSize(
        item.subjectPhotoUrl,
        (width, height) => (imageSize = { width, height }),
      );
      const displayedWidth = width - 20;
      const displayedHeight =
        (imageSize.height * displayedWidth) / imageSize.width;
      setImageDisplayedSize({
        width: displayedWidth,
        height: displayedHeight,
      });
    }
  }, [item, width]);

  return (
    <Pressable
      onLayout={event => {
        setWidth(event.nativeEvent.layout.width);
      }}
      onPress={props.onPress}
      style={styles.postItem}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: '600', color: 'black' }}>
          {item.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ fontSize: 16 }}>{incidentDate}</Text>
          <Text
            style={
              item.aggregateRating >= 0
                ? styles.positiveScore
                : styles.negativeScore
            }>
            {item.aggregateRating > 0
              ? `+${item.aggregateRating}`
              : item.aggregateRating}
          </Text>
        </View>
        <Text numberOfLines={3}>{item.description}</Text>
      </View>
      <View style={{}}>
        {item?.subjectPhotoUrl ? (
          <Image
            source={{
              uri: item?.subjectPhotoUrl,
            }}
            style={{
              width: imageDisplayedSize?.width
                ? imageDisplayedSize.width
                : width - 20,
              height: imageDisplayedSize?.height
                ? imageDisplayedSize.height
                : 100,
            }}
          />
        ) : (
          <MaterialIconsIcon name="add-a-photo" size={width - 20} />
        )}
      </View>
    </Pressable>
  );
};

export const PostsPage = (props: any) => {
  const searchPublication: PublicationSearchRequestType =
    props.route.params?.publication;
  const orderBy = props.route.params?.orderBy;
  const [postsData, setPostsData] = React.useState<PublicationResponseType[]>(
    [],
  );

  React.useEffect(() => {
    const getData = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        setPostsData(
          await getPublications(1, accessToken, searchPublication, orderBy),
        );
      }
    };

    getData();
  }, [searchPublication, orderBy]);

  const win = Dimensions.get('window');
  const buttonStyles = StyleSheet.create({
    circle: {
      backgroundColor: '#c4d68d',
      width: 70,
      height: 70,
      position: 'absolute',
      bottom: 30,
      right: 0.5 * win.width - 35,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <MainContainer>
      <Appbar.Header style={{ backgroundColor: '#abd699' }}>
        <Appbar.BackAction
          color="#2e1c00"
          onPress={() => props.navigation.pop()}
        />
        <Appbar.Content
          title="Ogłoszenia"
          titleStyle={{
            textAlign: 'center',
            color: '#2e1c00',
            fontWeight: 'bold',
          }}
        />
        <Appbar.Action
          size={30}
          icon="archive-search-outline"
          color="#2e1c00"
          onPress={() =>
            props.navigation.navigate('Home', { screen: 'SearchPosts' })
          }
        />
      </Appbar.Header>
      <FlatList
        style={{ padding: 30 }}
        data={postsData}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 15,
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyExtractor={item => item.publicationId.toString()}
        renderItem={({ item }) => (
          <PostItem
            item={item}
            onPress={() =>
              props.navigation.navigate('Home', {
                screen: 'Post',
                params: { publicationId: item.publicationId },
              })
            }
          />
        )}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={buttonStyles.circle}
        testID="AddPostButton"
        onPress={() => {
          props.navigation.push('Home', {
            screen: 'AddPost',
          });
        }}>
        <IoniconsIcon name="add" size={55} color="#FFFF" />
      </TouchableOpacity>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'light-grey',
    padding: 10,
    marginBottom: 10,
  },
  postsList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
  },
  postItem: {
    width: '49%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'light-grey',
    padding: 10,
    marginBottom: 10,
    alignContent: 'space-between',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
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
