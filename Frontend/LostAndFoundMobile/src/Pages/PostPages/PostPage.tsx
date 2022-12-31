import { format } from 'date-fns';
import React from 'react';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  SecondaryButton,
  MainContainer,
  MainTitle,
  ScoreView,
  DeleteButton,
} from '../../Components';
import {
  CategoryType,
  deletePublication,
  deletePublicationPhoto,
  editPublicationRating,
  getCategories,
  getProfileDetails,
  getPublication,
  ProfileResponseType,
  PublicationResponseType,
  PublicationState,
  PublicationType,
  SinglePublicationVote,
} from 'commons';
import { getAccessToken, getUserId } from '../../SecureStorage';

const deletePost = async (publicationId: string) => {
  let isDeleted: boolean = false;
  const accessToken = await getAccessToken();
  if (accessToken) {
    isDeleted = Boolean(await deletePublication(publicationId, accessToken));
  }
  return isDeleted;
};

const deleteImage = async (publicationId: string) => {
  let isDeleted: boolean = false;
  const accessToken = await getAccessToken();
  if (accessToken) {
    isDeleted = Boolean(
      await deletePublicationPhoto(publicationId, accessToken),
    );
  }
  return isDeleted;
};

const giveVote = async (publicationId: string, vote: SinglePublicationVote) => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    await editPublicationRating(publicationId, vote, accessToken);
  }
};

export const PostPage = (props: any) => {
  const publicationId = props.route.params?.publicationId;
  const [myUserId, setMyUserId] = React.useState<string | null>();
  const [width, setWidth] = React.useState<number>(10);
  const [postData, setPostData] = React.useState<
    PublicationResponseType | undefined
  >();
  const [incidentDate, setIncidentDate] = React.useState<string>('');
  const [profile, setProfile] = React.useState<
    ProfileResponseType | undefined
  >();
  const [categories, setCategories] = React.useState<CategoryType[]>([]);
  const [category, setCategory] = React.useState<CategoryType | undefined>();
  const [update, setUpdate] = React.useState<boolean>(false);
  const [imageDisplayedSize, setImageDisplayedSize] = React.useState<{
    width: number;
    height: number;
  }>();

  React.useEffect(() => {
    const getData = async () => {
      const accessToken = await getAccessToken();
      setMyUserId(await getUserId());
      if (accessToken) {
        setPostData(await getPublication(publicationId, accessToken));
        setCategories(await getCategories(accessToken));
      }
    };

    getData();
  }, [publicationId, update]);

  React.useEffect(() => {
    const getData = async () => {
      const accessToken = await getAccessToken();
      if (accessToken && postData) {
        setIncidentDate(format(postData.incidentDate, 'dd.MM.yyyy'));
        setProfile(await getProfileDetails(postData.author.id, accessToken));
      }
    };

    getData();
  }, [postData]);

  React.useEffect(() => {
    const getData = async () => {
      if (postData) {
        setCategory(
          categories?.find(
            category => category.id === postData.subjectCategoryId,
          ),
        );
      }
    };

    getData();
  }, [categories]);

  React.useEffect(() => {
    if (postData?.subjectPhotoUrl) {
      let imageSize = { width: 100, height: 100 };
      Image.getSize(
        postData?.subjectPhotoUrl,
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
  }, [postData, width]);

  return (
    <ScrollView>
      <MainContainer>
        <View style={{ alignSelf: 'center', marginBottom: 10 }}>
          {postData?.publicationState === PublicationState.Closed ? (
            <MainTitle>Ogłoszenie zamknięte</MainTitle>
          ) : (
            <></>
          )}
        </View>
        <MainTitle>
          {postData?.publicationType === PublicationType.FoundSubject
            ? 'Znaleziono'
            : 'Zgubiono'}
        </MainTitle>
        <MainTitle>{postData?.title}</MainTitle>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {myUserId === profile?.userId ? (
            <SecondaryButton
              label={'Edytuj Ogłoszenie'}
              onPress={() => props.navigation.push('EditPost', { postData })}
            />
          ) : (
            <SecondaryButton
              label={'Rozpocznij czat'}
              onPress={() =>
                props.navigation.push('Chat', { username: profile?.username })
              }
            />
          )}
          <Text
            style={
              postData && postData.aggregateRating >= 0
                ? styles.positiveScore
                : styles.negativeScore
            }>
            {postData && postData.aggregateRating > 0
              ? `+${postData?.aggregateRating}`
              : postData?.aggregateRating}
          </Text>
        </View>
        <View
          onLayout={event => setWidth(event.nativeEvent.layout.width)}
          style={{ alignContent: 'center' }}>
          {postData && postData.subjectPhotoUrl ? (
            <View>
              <Image
                source={{ uri: postData?.subjectPhotoUrl }}
                style={{
                  alignSelf: 'center',
                  marginVertical: 10,
                  width: imageDisplayedSize?.width,
                  height: imageDisplayedSize?.height,
                }}
              />
              <DeleteButton
                label="Usuń zdjęcie"
                onPress={async () => {
                  const isDeleted = await deleteImage(publicationId);
                  if (isDeleted) {
                    setUpdate(!update);
                  }
                }}
              />
            </View>
          ) : (
            <MaterialIconsIcon name="add-a-photo" size={width - 20} />
          )}
        </View>
        <Text style={styles.infoContainer}>{postData?.incidentAddress}</Text>
        <Text style={styles.infoContainer}>{incidentDate}</Text>
        <Text style={styles.infoContainer}>{category?.displayName}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ fontSize: 20, fontWeight: '600', color: 'black' }}>
            Opis
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Pressable
              onPress={() => {
                if (postData) {
                  if (postData?.userVote !== SinglePublicationVote.Up) {
                    giveVote(postData?.publicationId, SinglePublicationVote.Up);
                    setUpdate(!update);
                  } else {
                    giveVote(
                      postData?.publicationId,
                      SinglePublicationVote.NoVote,
                    );
                    setUpdate(!update);
                  }
                }
              }}>
              <MaterialCommunityIcon
                style={{
                  marginRight: 20,
                  color:
                    postData?.userVote === SinglePublicationVote.Up
                      ? 'green'
                      : 'grey',
                }}
                name="thumb-up"
                size={20}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                if (postData) {
                  if (postData?.userVote !== SinglePublicationVote.Down) {
                    giveVote(
                      postData?.publicationId,
                      SinglePublicationVote.Down,
                    );
                    setUpdate(!update);
                  } else {
                    giveVote(
                      postData?.publicationId,
                      SinglePublicationVote.NoVote,
                    );
                    setUpdate(!update);
                  }
                }
              }}>
              <MaterialCommunityIcon
                style={{
                  color:
                    postData?.userVote === SinglePublicationVote.Down
                      ? 'red'
                      : 'grey',
                }}
                name="thumb-down"
                size={20}
              />
            </Pressable>
          </View>
        </View>
        <Text style={{ fontSize: 14 }}>{postData?.description}</Text>
        <Pressable
          style={styles.userContainer}
          onPress={async () => {
            if (myUserId === profile?.userId) {
              props.navigation.push('Home', {
                screen: 'ProfileMe',
              });
            } else {
              props.navigation.push('Home', {
                screen: 'Profile',
                params: { userId: profile?.userId },
              });
            }
          }}>
          <IoniconsIcon name="person" size={25} />
          <Text style={{ fontSize: 18 }}>{profile?.username}</Text>
          <ScoreView score={profile?.averageProfileRating} />
        </Pressable>
        {myUserId === profile?.userId ? (
          <DeleteButton
            label="Usuń Ogłoszenie"
            onPress={async () => {
              const isDeleted = await deletePost(publicationId);
              if (isDeleted) {
                props.navigation.push('Home', {
                  screen: 'Posts',
                });
              }
            }}
          />
        ) : (
          <></>
        )}
      </MainContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'light-grey',
    padding: 10,
    marginBottom: 10,
  },
  positiveScore: {
    fontSize: 24,
    color: 'green',
  },
  negativeScore: {
    fontSize: 24,
    color: 'red',
  },
  infoContainer: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'light-grey',
    marginBottom: 15,
  },
  userContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'light-grey',
    borderRadius: 10,
    padding: 10,
    paddingVertical: 15,
  },
});
