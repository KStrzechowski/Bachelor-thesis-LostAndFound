import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';
import { MainContainer, MainTitle, SecondaryButton } from '../../Components';
import { getPublications, PublicationResponseType } from 'commons';
import { getAccessToken } from '../../SecureStorage';
import { PublicationSearchRequestType } from 'commons/lib/Services/PublicationService/publicationTypes';

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
  const [postsData, setPostsData] = React.useState<PublicationResponseType[]>(
    [],
  );

  React.useEffect(() => {
    const getData = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        setPostsData(await getPublications(1, accessToken, searchPublication));
      }
    };

    getData();
  }, []);

  return (
    <MainContainer>
      <View style={styles.titleSection}>
        <MainTitle>Ogłoszenia</MainTitle>
        <AntDesignIcon
          name="search1"
          size={30}
          onPress={() =>
            props.navigation.navigate('Home', { screen: 'SearchPosts' })
          }
        />
      </View>
      <View style={{ alignSelf: 'center', width: '80%', marginVertical: 10 }}>
        <SecondaryButton
          testID="AddPostButton"
          label="Dodaj ogłoszenie"
          onPress={() => {
            props.navigation.push('Home', {
              screen: 'AddPost',
            });
          }}
        />
      </View>
      <FlatList
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
    </MainContainer>
  );
};

const styles = StyleSheet.create({
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
