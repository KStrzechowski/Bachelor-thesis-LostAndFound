import {
  getProfile,
  getProfileComments,
  ProfileCommentResponseType,
  ProfileCommentsSectionResponseType,
  ProfileResponseType,
} from 'commons';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {
  MainContainer,
  MainTitle,
  ScoreView,
  SecondaryButton,
} from '../../Components';
import { getAccessToken } from '../../SecureStorage';

const CommentItem = (props: any) => {
  const item: ProfileCommentResponseType = props.item;

  return (
    <View
      style={{
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'light-grey',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>
          {item.author.username ? item.author.username : 'Anonim'}
        </Text>
        <ScoreView score={item.profileRating} />
      </View>
      <Text>{item.content}</Text>
    </View>
  );
};

export const ProfilePageMe = (props: any) => {
  const [width, setWidth] = React.useState<number>(10);
  const [profile, setProfile] = React.useState<ProfileResponseType>();
  const [profileComments, setProfileComments] =
    React.useState<ProfileCommentsSectionResponseType>();

  React.useEffect(() => {
    const getData = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        setProfile(await getProfile(accessToken));
      }
    };

    getData();
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      const accessToken = await getAccessToken();
      if (accessToken && profile) {
        setProfileComments(
          await getProfileComments(profile.userId, accessToken),
        );
      }
    };

    getData();
  }, [profile]);

  return (
    <MainContainer>
      <MainTitle>{profile?.username}</MainTitle>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: 10,
        }}
        onLayout={event => setWidth(event.nativeEvent.layout.width)}>
        <IoniconsIcon name="person" size={(width * 3) / 8} />
        <View
          style={{
            alignSelf: 'flex-end',
            width: (width * 5) / 8,
            paddingBottom: 10,
          }}>
          <View
            style={{
              flex: 1,
              padding: 20,
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <Text numberOfLines={3} style={{ fontSize: 18, flex: 3 }}>
              {profile?.city}
            </Text>
            <ScoreView score={profile?.averageProfileRating} />
          </View>
          <SecondaryButton
            label={'Edytuj profil'}
            onPress={() =>
              props.navigation.navigate('Home', {
                screen: 'EditProfile',
                params: { user: profile },
              })
            }></SecondaryButton>
        </View>
      </View>
      <Text>{profile?.description}</Text>
      <View
        style={{
          marginTop: 30,
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <Text style={{ fontSize: 20, fontWeight: '600' }}>Komentarze</Text>
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        data={profileComments?.comments}
        keyExtractor={item => item.author.id.toString()}
        renderItem={({ item }) => <CommentItem item={item} />}
      />
    </MainContainer>
  );
};