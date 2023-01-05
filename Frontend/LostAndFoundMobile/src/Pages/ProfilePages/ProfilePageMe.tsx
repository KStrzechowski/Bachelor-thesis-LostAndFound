import {
  deleteProfilePhoto,
  getProfile,
  getProfileComments,
  ProfileCommentResponseType,
  ProfileCommentsSectionResponseType,
  ProfileResponseType,
} from 'commons';
import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { ProfileContext } from '../../../Config';
import { DeleteButton, MainContainer, ScoreView } from '../../Components';
import { getAccessToken, removeUserPhotoUrl } from '../../SecureStorage';

const deleteImage = async () => {
  let isDeleted: boolean = false;
  const accessToken = await getAccessToken();
  if (accessToken) {
    isDeleted = Boolean(await deleteProfilePhoto(accessToken));
  }
  return isDeleted;
};

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
  const { updatePhotoUrl } = React.useContext(ProfileContext);
  const [width, setWidth] = React.useState<number>(10);
  const [profile, setProfile] = React.useState<ProfileResponseType>();
  const [profileComments, setProfileComments] =
    React.useState<ProfileCommentsSectionResponseType>();
  const [update, setUpdate] = React.useState<boolean>(false);
  const [imageDisplayedSize, setImageDisplayedSize] = React.useState<{
    width: number;
    height: number;
  }>();

  React.useEffect(() => {
    const getData = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        setProfile(await getProfile(accessToken));
      }
    };

    getData();
  }, [update]);

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

  React.useEffect(() => {
    if (profile?.pictureUrl) {
      let imageSize = { width: 100, height: 100 };
      Image.getSize(
        profile?.pictureUrl,
        (width, height) => (imageSize = { width, height }),
      );
      const displayedWidth = (width * 3.5) / 9;
      const displayedHeight =
        (imageSize.height * displayedWidth) / imageSize.width;
      setImageDisplayedSize({
        width: displayedWidth,
        height: displayedHeight,
      });
    }
  }, [profile, width]);

  return (
    <MainContainer>
      <Appbar.Header style={{ backgroundColor: '#abd699' }}>
        <Appbar.BackAction
          color="#2e1c00"
          onPress={() => props.navigation.pop()}
        />
        <Appbar.Content
          title={profile?.username}
          titleStyle={{
            textAlign: 'center',
            color: '#2e1c00',
            fontWeight: 'bold',
          }}
        />
        <Appbar.Action
          size={30}
          icon="file-document-edit-outline"
          color="#2e1c00"
          onPress={() =>
            props.navigation.navigate('Home', {
              screen: 'EditProfile',
              params: { user: profile },
            })
          }
        />
      </Appbar.Header>
      <View style={{ padding: 30 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            marginBottom: 10,
          }}
          onLayout={event => setWidth(event.nativeEvent.layout.width)}>
          {profile?.pictureUrl ? (
            <View
              style={{
                alignContent: 'flex-start',
                alignItems: 'flex-start',
                alignSelf: 'flex-start',
              }}>
              <Image
                source={{ uri: profile.pictureUrl }}
                style={{
                  height: imageDisplayedSize?.width,
                  width: imageDisplayedSize?.height,
                  marginBottom: 10,
                }}
              />
              <DeleteButton
                label="Usuń zdjęcie"
                onPress={async () => {
                  const isDeleted = await deleteImage();
                  if (isDeleted) {
                    await removeUserPhotoUrl();
                    await updatePhotoUrl();
                    setUpdate(!update);
                  }
                }}
                style={{ alignSelf: 'center' }}
              />
            </View>
          ) : (
            <IoniconsIcon name="person" size={(width * 3) / 8} />
          )}
          <View
            style={{
              alignSelf: 'flex-end',
              width: (width * 5) / 9,
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
      </View>
    </MainContainer>
  );
};
