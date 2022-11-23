import { format } from 'date-fns';
import React from 'react';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SecondaryButton, MainContainer, MainTitle } from '../Components';
import { GetPosts } from '../Data/Post';

export const PostPage = (props: { navigation: string[] }) => {
  const [width, setWidth] = React.useState<number>(10);
  const postData = GetPosts()[0];
  const incidentDate = format(postData.incidentDate, 'dd.MM.yyyy');

  return (
    <MainContainer>
      <ScrollView>
        <MainTitle>{postData.title}</MainTitle>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
          }}>
          <SecondaryButton
            label={'Rozpocznij czat'}
            onPress={() => props.navigation.push('Chat')}
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
          <IoniconsIcon name="person" size={width - 20} />
        </View>
        <Text style={styles.infoContainer}>{postData.location}</Text>
        <Text style={styles.infoContainer}>{incidentDate}</Text>
        <Text style={styles.infoContainer}>{postData.category}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
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
      </ScrollView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
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
});
