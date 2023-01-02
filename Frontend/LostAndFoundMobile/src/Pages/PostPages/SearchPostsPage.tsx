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
} from '../../Components';
import {
  CategoryType,
  PublicationState,
  PublicationType,
  getCategories,
  Order,
  PublicationSortType,
} from 'commons';
import { getAccessToken } from '../../SecureStorage';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { PublicationSearchRequestType } from 'commons';

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
  const [firstArgumentSort, setFirstArgumentSort] = React.useState<string>();
  const [secondArgumentSort, setSecondArgumentSort] = React.useState<string>();
  const [firstArgumentSortOrder, setFirstArgumentSortOrder] =
    React.useState<Order>(Order.Ascending);
  const [secondArgumentSortOrder, setSecondArgumentSortOrder] =
    React.useState<Order>(Order.Ascending);

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
        <InputSection title="Sortuj">
          <Picker
            selectedValue={firstArgumentSort}
            onValueChange={itemValue => setFirstArgumentSort(itemValue)}>
            <Picker.Item label="Brak" value={undefined} />
            <Picker.Item label="Tytuł" value={'Title'} />
            <Picker.Item label="Kategoria" value={'SubjectCategoryId'} />
            <Picker.Item label="Data zdarzenia" value={'IncidentDate'} />
            <Picker.Item label="Średnia ocena" value={'AggregateRating'} />
            <Picker.Item label="Stan ogłoszenia" value={'PublicationState'} />
            <Picker.Item label="Typ ogłoszenia" value={'PublicationType'} />
          </Picker>
          <Picker
            selectedValue={firstArgumentSortOrder}
            onValueChange={itemValue => setFirstArgumentSortOrder(itemValue)}>
            <Picker.Item label="Rosnąco" value={Order.Ascending} />
            <Picker.Item label="Malejąco" value={Order.Descending} />
          </Picker>
        </InputSection>
        <InputSection title="Sortuj po 2 wartości">
          <Picker
            selectedValue={secondArgumentSort}
            onValueChange={itemValue => setSecondArgumentSort(itemValue)}>
            <Picker.Item label="Brak" value={undefined} />
            <Picker.Item label="Tytuł" value={'Title'} />
            <Picker.Item label="Kategoria" value={'SubjectCategoryId'} />
            <Picker.Item label="Data zdarzenia" value={'IncidentDate'} />
            <Picker.Item label="Średnia ocena" value={'AggregateRating'} />
            <Picker.Item label="Stan ogłoszenia" value={'PublicationState'} />
            <Picker.Item label="Typ ogłoszenia" value={'PublicationType'} />
          </Picker>
          <Picker
            selectedValue={secondArgumentSortOrder}
            onValueChange={itemValue => setSecondArgumentSortOrder(itemValue)}>
            <Picker.Item label="Rosnąco" value={Order.Ascending} />
            <Picker.Item label="Malejąco" value={Order.Descending} />
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
              const firstSort: PublicationSortType | undefined =
                firstArgumentSort
                  ? { type: firstArgumentSort, order: firstArgumentSortOrder }
                  : undefined;
              const secondSort: PublicationSortType | undefined =
                secondArgumentSort
                  ? { type: secondArgumentSort, order: secondArgumentSortOrder }
                  : undefined;

              props.navigation.navigate('Home', {
                screen: 'Posts',
                params: {
                  publication: searchPublication,
                  orderBy: {
                    firstArgumentSort: firstSort,
                    secondArgumentSort: secondSort,
                  },
                },
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
