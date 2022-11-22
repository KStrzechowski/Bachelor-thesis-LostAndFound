import { format } from 'date-fns';
import React from 'react';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';
import {
  SecondaryButton,
  MainContainer,
  MainTitle,
  InputSection,
  CustomTextInput,
} from '../Components';
import { GetPosts } from '../Data/Post';

export const SearchPostsPage = (props: { navigation: string[] }) => {
  const [title, setTitle] = React.useState<string | null>(null);
  const [localization, setLocalization] = React.useState<string | null>(null);
  const postData = GetPosts()[0];
  const incidentDate = format(postData.incidentDate, 'dd.MM.yyyy');

  return (
    <MainContainer>
      <View style={{ alignSelf: 'center', marginBottom: 10 }}>
        <MainTitle>Szukaj Ogłoszeń</MainTitle>
      </View>
      <InputSection title="Tytuł">
        <CustomTextInput
          onChangeText={setTitle}
          keyboardType={'email-address'}
          placeholder="Podaj tytuł"
        />
      </InputSection>
      <InputSection title="Lokalizacja">
        <CustomTextInput
          onChangeText={setLocalization}
          keyboardType={'default'}
          placeholder="Podaj adres"
        />
      </InputSection>

      <Text style={{ fontSize: 14 }}>{postData.description}</Text>
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
