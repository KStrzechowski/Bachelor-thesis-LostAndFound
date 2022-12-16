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
import { GetProfiles } from '../Data/Profile';
import {
  CategoryType,
  getCategories,
  getProfileDetails,
  getPublication,
  ProfileResponseType,
  PublicationResponseType,
} from 'commons';
import { getAccessToken } from '../SecureStorage';

export const PostPage = (props: any) => {
  const publicationId = props.route.params.publicationId;
  const [width, setWidth] = React.useState<number>(10);
  const [postData, setPostData] = React.useState<
    PublicationResponseType | undefined
  >();
  const [incidentDate, setIncidentDate] = React.useState<string>('');
  const [profile, setProfile] = React.useState<
    ProfileResponseType | undefined
  >();
  const [category, setCategory] = React.useState<CategoryType | undefined>();

  React.useEffect(() => {
    async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        setPostData(await getPublication(publicationId, accessToken));
        if (postData) {
          setIncidentDate(format(postData.incidentDate, 'dd.MM.yyyy'));
          setProfile(await getProfileDetails(postData.author.id, accessToken));

          const categories = await getCategories(accessToken);
          setCategory(
            categories?.find(
              category => category.id === postData.subjectCategoryId,
            ),
          );
        }
      }
    };
  }, []);

  return (
    <MainContainer>
      <ScrollView>
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
              postData?.aggregateRaing && postData?.aggregateRaing > 0
                ? styles.positiveScore
                : styles.negativeScore
            }>
            {postData?.aggregateRaing && postData?.aggregateRaing > 0
              ? `+${postData?.aggregateRaing}`
              : postData?.aggregateRaing}
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
            <MaterialCommunityIcon
              style={{ marginRight: 20, color: 'green' }}
              name="thumb-up"
              size={20}
            />
            <MaterialCommunityIcon
              style={{ color: 'red' }}
              name="thumb-down"
              size={20}
            />
          </View>
        </View>
        <Text style={{ fontSize: 14 }}>{postData?.description}</Text>
        <Pressable
          style={styles.userContainer}
          onPress={() =>
            props.navigation.push('Home', {
              screen: 'Profile',
              params: { userId: profile?.userId },
            })
          }>
          <IoniconsIcon name="person" size={25} />
          <Text style={{ fontSize: 18 }}>{profile?.username}</Text>
          <ScoreView score={profile?.averageProfileRating} />
        </Pressable>
      </ScrollView>
    </MainContainer>
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
