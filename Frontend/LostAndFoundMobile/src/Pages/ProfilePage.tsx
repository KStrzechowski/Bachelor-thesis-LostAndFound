import React from 'react';
import { FlatList, Text, View } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {
  MainContainer,
  MainTitle,
  ScoreView,
  SecondaryButton,
} from '../Components';
import { GetProfiles, GetVotes, Vote } from '../Data/Profile';

const VoteItem = (props: any) => {
  const item: Vote = props.item;

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
          {item.username}
        </Text>
        <ScoreView score={item.score} />
      </View>
      <Text>{item.comment}</Text>
    </View>
  );
};

export const ProfilePage = (props: any) => {
  const [width, setWidth] = React.useState<number>(10);
  const profileData = GetProfiles()[0];
  const votesData = GetVotes();

  return (
    <MainContainer>
      <MainTitle>{profileData.username}</MainTitle>
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
              {profileData.city}
            </Text>
            <ScoreView score={profileData.averageScore} />
          </View>
          <SecondaryButton
            label={'Rozpocznij czat'}
            onPress={() =>
              props.navigation.navigate('Home', {
                screen: 'Chat',
                params: { username: profileData.username },
              })
            }></SecondaryButton>
        </View>
      </View>
      <Text>{profileData.profileDescription}</Text>
      <View
        style={{
          marginTop: 30,
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <Text style={{ fontSize: 20, fontWeight: '600' }}>Komentarze</Text>
        <SecondaryButton label={'Zostaw komentarz'} onPress={undefined} />
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        data={votesData}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }) => <VoteItem item={item} />}
      />
    </MainContainer>
  );
};
