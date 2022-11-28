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
import { GetPosts } from '../Data/Post';
import { GetProfiles } from '../Data/Profile';

export const PostPage = (props: any) => {
  const [width, setWidth] = React.useState<number>(10);
  const postData = GetPosts()[0];
  const profileData = GetProfiles()[0];
  const incidentDate = format(postData.incidentDate, 'dd.MM.yyyy');

  return (
    <MainContainer>
      <ScrollView>
        <MainTitle>{postData.title}</MainTitle>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <SecondaryButton
            label={'Rozpocznij czat'}
            onPress={() =>
              props.navigation.push('Chat', { username: profileData.username })
            }
          />
          <Text
            style={
              postData.votesScore > 0
                ? styles.positiveScore
                : styles.negativeScore
            }>
            {postData.votesScore > 0
              ? `+${postData.votesScore}`
              : postData.votesScore}
          </Text>
        </View>
        <View
          onLayout={event => setWidth(event.nativeEvent.layout.width)}
          style={{ alignContent: 'center' }}>
          <MaterialIconsIcon name="add-a-photo" size={width - 20} />
        </View>
        <Text style={styles.infoContainer}>{postData.location}</Text>
        <Text style={styles.infoContainer}>{incidentDate}</Text>
        <Text style={styles.infoContainer}>{postData.category}</Text>
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
        <Text style={{ fontSize: 14 }}>{postData.description}</Text>
        <Pressable
          style={styles.userContainer}
          onPress={() => props.navigation.push('Home', { screen: 'Profile' })}>
          <IoniconsIcon name="person" size={25} />
          <Text style={{ fontSize: 18 }}>{profileData.username}</Text>
          <ScoreView score={profileData.averageScore} />
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
