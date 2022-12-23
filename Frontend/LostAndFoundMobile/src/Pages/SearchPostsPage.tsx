import { format } from 'date-fns';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  SecondaryButton,
  MainContainer,
  MainTitle,
  InputSection,
  CustomTextInput,
} from '../Components';
import {
  CategoryType,
  PublicationRequestType,
  PublicationResponseType,
  PublicationState,
  PublicationType,
  getCategories,
} from 'commons';
import { getAccessToken } from '../SecureStorage';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { PublicationSearchRequestType } from 'commons/lib/Services/PublicationService/publicationTypes';

export const SearchPostsPage = (props: any) => {
  const [show1, setShow1] = React.useState<boolean>(false);
  const [show2, setShow2] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<CategoryType[]>([]);

  const [title, setTitle] = React.useState<string | undefined>();
  const [incidentAddress, setIncidentAddress] = React.useState<
    string | undefined
  >();
  const [distance, setDistance] = React.useState<number>(1000);
  const [incidentFromDate, setIncidentFromDate] = React.useState<Date>(
    new Date(),
  );
  const [incidentToDate, setIncidentToDate] = React.useState<Date>(new Date());
  const [subjectCategory, setSubjectCategory] = React.useState<
    CategoryType | undefined
  >({ id: 'Other', displayName: 'Inne' });
  const [publicationType, setPublicationType] = React.useState<PublicationType>(
    PublicationType.LostSubject,
  );
  const [publicationState, setPublicationState] =
    React.useState<PublicationState>(PublicationState.Open);

  React.useEffect(() => {
    const getData = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        setCategories(await getCategories(accessToken));
        if (categories.length > 0) setSubjectCategory(categories[0]);
      }
    };

    getData();
  }, []);

  const mapCategories = categories.map(category => {
    return (
      <Picker.Item
        key={category.id}
        label={category.displayName}
        value={category}
      />
    );
  });

  const onChangeFromDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || incidentFromDate;
    setShow1(false);
    setIncidentFromDate(currentDate);
  };

  const onChangeToDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || incidentToDate;
    setShow2(false);
    setIncidentToDate(currentDate);
  };

  return (
    <ScrollView>
      <MainContainer>
        <View style={{ alignSelf: 'center', marginBottom: 10 }}>
          <MainTitle>Szukaj Ogłoszeń</MainTitle>
        </View>
        <InputSection title="Tytuł">
          <CustomTextInput
            onChangeText={setTitle}
            keyboardType={'default'}
            placeholder="Podaj tytuł"
          />
        </InputSection>
        <InputSection title="Lokalizacja">
          <CustomTextInput
            onChangeText={setIncidentAddress}
            keyboardType={'default'}
            placeholder="Podaj adres"
          />
        </InputSection>
        <InputSection title="Promień">
          <Picker
            selectedValue={distance}
            onValueChange={itemValue => setDistance(itemValue)}>
            <Picker.Item label="500 m" value={500} />
            <Picker.Item label="1 km" value={1000} />
            <Picker.Item label="2 km" value={2000} />
            <Picker.Item label="5 km" value={5000} />
          </Picker>
        </InputSection>
        <InputSection title="Data od">
          <Pressable onPress={() => setShow1(true)}>
            <Text
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'light-grey',
                paddingVertical: 10,
              }}>
              {format(incidentFromDate, 'dd.MM.yyyy')}
            </Text>
            <View>
              {show1 && (
                <RNDateTimePicker
                  value={incidentFromDate}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChangeFromDate}
                />
              )}
            </View>
          </Pressable>
        </InputSection>
        <InputSection title="Data do">
          <Pressable onPress={() => setShow2(true)}>
            <Text
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'light-grey',
                paddingVertical: 10,
              }}>
              {format(incidentToDate, 'dd.MM.yyyy')}
            </Text>
            <View>
              {show2 && (
                <RNDateTimePicker
                  value={incidentToDate}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChangeToDate}
                />
              )}
            </View>
          </Pressable>
        </InputSection>
        <InputSection title="Kategoria">
          <Picker
            selectedValue={subjectCategory}
            onValueChange={setSubjectCategory}>
            {mapCategories}
          </Picker>
        </InputSection>
        <InputSection title="Typ ogłoszenia">
          <Picker
            selectedValue={publicationType}
            onValueChange={itemValue => setPublicationType(itemValue)}>
            <Picker.Item label="Zgubione" value={PublicationType.LostSubject} />
            <Picker.Item
              label="Znalezione"
              value={PublicationType.FoundSubject}
            />
          </Picker>
        </InputSection>
        <InputSection title="Stan ogłoszenia">
          <Picker
            selectedValue={publicationState}
            onValueChange={itemValue => setPublicationState(itemValue)}>
            <Picker.Item label="Otwarte" value={PublicationState.Open} />
            <Picker.Item label="Zakończone" value={PublicationState.Closed} />
          </Picker>
        </InputSection>
        <View style={{ alignSelf: 'center', width: '80%', marginTop: 20 }}>
          <SecondaryButton
            label="Szukaj"
            onPress={() => {
              const searchPublication: PublicationSearchRequestType = {
                title: title,
                incidentAddress: incidentAddress,
                incidentDistance: distance,
                incidentFromDate: incidentFromDate,
                incidentToDate: incidentToDate,
                subjectCategoryId: subjectCategory?.id,
                publicationType: publicationType,
                publicationState: publicationState,
              };
              props.navigation.navigate('Home', {
                screen: 'Posts',
                params: { publication: searchPublication },
              });
            }}
          />
        </View>
      </MainContainer>
    </ScrollView>
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
