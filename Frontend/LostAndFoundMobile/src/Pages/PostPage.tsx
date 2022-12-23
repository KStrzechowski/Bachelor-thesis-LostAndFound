import { format } from 'date-fns';
import React from 'react';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  SecondaryButton,
  MainContainer,
  MainTitle,
  ScoreView,
} from '../Components';
import {
  CategoryType,
  editPublicationRating,
  getCategories,
  getProfileDetails,
  getPublication,
  ProfileResponseType,
  PublicationResponseType,
  SinglePublicationVote,
} from 'commons';
import { getAccessToken } from '../SecureStorage';
import { getUserId } from '../SecureStorage/Authorization';

const giveVote = async (publicationId: string, vote: SinglePublicationVote) => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    await editPublicationRating(publicationId, vote, accessToken);
  }
};

export const PostPage = (props: any) => {
  const publicationId = props.route.params?.publicationId;
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

  React.useEffect(() => {
    const getData = async () => {
      const accessToken = await getAccessToken();
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

  return (
    <ScrollView>
      <MainContainer>
        <MainTitle>{postData?.title}</MainTitle>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <SecondaryButton
            label={'Rozpocznij czat'}
            onPress={() =>
              props.navigation.push('Chat', { username: profile?.username })
            }
          />
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
          <MaterialIconsIcon name="add-a-photo" size={width - 20} />
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
            const myUserId = await getUserId();
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
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'light-grey',
    borderRadius: 10,
    padding: 10,
    paddingVertical: 15,
  },
});
