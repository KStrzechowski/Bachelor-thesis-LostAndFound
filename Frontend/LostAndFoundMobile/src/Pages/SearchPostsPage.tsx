import { format } from 'date-fns';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View } from 'react-native';
import {
  SecondaryButton,
  MainContainer,
  MainTitle,
  InputSection,
  CustomTextInput,
  MainButton,
} from '../Components';
import { GetPosts } from '../Data/Post';

export const SearchPostsPage = (props: any) => {
  const [title, setTitle] = React.useState<string | null>(null);
  const [localization, setLocalization] = React.useState<string | null>(null);
  const [distance, setDistance] = React.useState<string>();
  const [category, setCategory] = React.useState<string>();
  const [postState, setPostState] = React.useState<string>();
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
      <InputSection title="Promień">
        <Picker
          selectedValue={distance}
          onValueChange={itemValue => setDistance(itemValue)}>
          <Picker.Item label="500 m" value="500m" />
          <Picker.Item label="1 km" value="1km" />
          <Picker.Item label="2 km" value="2km" />
          <Picker.Item label="5 km" value="5km" />
        </Picker>
      </InputSection>
      <InputSection title="Kategoria">
        <Picker
          selectedValue={category}
          onValueChange={itemValue => setCategory(itemValue)}>
          <Picker.Item label="Ubrania" value="ubrania" />
          <Picker.Item label="Elektronika" value="elektronika" />
        </Picker>
      </InputSection>
      <InputSection title="Stan ogłoszenia">
        <Picker
          selectedValue={postState}
          onValueChange={itemValue => setPostState(itemValue)}>
          <Picker.Item label="Otwarte" value="otwarte" />
          <Picker.Item label="Zakończone" value="zakończone" />
        </Picker>
      </InputSection>
      <View style={{ alignSelf: 'center', width: '80%', marginTop: 20 }}>
        <SecondaryButton
          label="Szukaj"
          onPress={() => props.navigation.navigate('Home', { screen: 'Posts' })}
        />
      </View>
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
