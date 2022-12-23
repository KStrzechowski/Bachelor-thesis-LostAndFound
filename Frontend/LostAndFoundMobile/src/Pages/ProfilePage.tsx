import {
  getProfileDetails,
  getProfileComments,
  ProfileCommentsSectionResponseType,
  ProfileResponseType,
  ProfileCommentResponseType,
  addProfileComment,
  ProfileCommentRequestType,
  editProfileComment,
} from 'commons';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {
  MainContainer,
  MainTitle,
  ScoreView,
  SecondaryButton,
} from '../Components';
import { getAccessToken } from '../SecureStorage';
import { TextInput } from 'react-native-gesture-handler';

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
          {item.author.username}
        </Text>
        <ScoreView score={item.profileRating} />
      </View>
      <Text>{item.content}</Text>
    </View>
  );
};

async function leaveComment(
  userId: string,
  content: ProfileCommentRequestType,
  commentExists: boolean,
) {
  const accessToken = await getAccessToken();
  if (accessToken) {
    if (commentExists) {
      editProfileComment(userId, content, accessToken);
    } else {
      addProfileComment(userId, content, accessToken);
    }
  }
}

const MyComment = (props: {
  item?: ProfileCommentResponseType;
  userId: string;
}) => {
  const item = props.item;
  const userId = props.userId;
  const [profileRating, setProfileRating] = React.useState<number | undefined>(
    props.item?.profileRating,
  );
  const [commentContent, setCommentContent] = React.useState<
    string | undefined
  >(props.item?.content);

  React.useEffect(() => {
    setProfileRating(item?.profileRating);
    setCommentContent(item?.content);
  }, [item]);

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
        <SecondaryButton
          label={item ? 'Edytuj komentarz' : 'Zostaw komentarz'}
          onPress={() => {
            const myComment: ProfileCommentRequestType = {
              content: commentContent,
              profileRating: profileRating ? profileRating : 0,
            };
            if (item) {
              leaveComment(userId, myComment, true);
            } else {
              leaveComment(userId, myComment, false);
            }
          }}
        />
        {item ? <ScoreView score={profileRating ? profileRating : 0} /> : <></>}
      </View>
      <TextInput
        onChangeText={setCommentContent}
        value={commentContent}
        keyboardType={'default'}
        placeholder="Zostaw komentarz"
      />
    </View>
  );
};

export const ProfilePage = (props: any) => {
  const userId = props.route.params?.userId;
  const [width, setWidth] = React.useState<number>(10);
  const [profile, setProfile] = React.useState<ProfileResponseType>();
  const [profileComments, setProfileComments] =
    React.useState<ProfileCommentsSectionResponseType>();
  const [update, setUpdate] = React.useState<boolean>();

  React.useEffect(() => {
    const getData = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        setProfile(await getProfileDetails(userId, accessToken));
        if (profile) {
          setProfileComments(
            await getProfileComments(profile.userId, accessToken),
          );
        }
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
            label={'Rozpocznij czat'}
            onPress={() =>
              props.navigation.navigate('Home', {
                screen: 'Chat',
                params: { username: profile?.username },
              })
            }></SecondaryButton>
        </View>
      </View>
      <Text>{profile?.description}</Text>
      <MyComment item={profileComments?.myComment} userId={userId} />
      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        data={profileComments?.comments}
        keyExtractor={item => item.author.id.toString()}
        renderItem={({ item }) => <CommentItem item={item} />}
      />
    </MainContainer>
  );
};
