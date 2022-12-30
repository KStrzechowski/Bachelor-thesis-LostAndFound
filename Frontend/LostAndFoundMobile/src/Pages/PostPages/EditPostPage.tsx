import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import {
  addPublication,
  CategoryType,
  getCategories,
  PublicationRequestType,
  PublicationResponseType,
  PublicationType,
} from 'commons';
import { format } from 'date-fns';
import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import {
  CustomTextInput,
  InputSection,
  MainContainer,
  MainTitle,
  SecondaryButton,
} from '../../Components';
import { getAccessToken } from '../../SecureStorage';
import { ScrollView } from 'react-native-gesture-handler';

const addNewPost = async (
  publication: PublicationRequestType,
): Promise<PublicationResponseType | undefined> => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    const response = await addPublication(publication, accessToken);
    return response;
  }
};

export const EditPostPage = (props: any) => {
  const [show, setShow] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<CategoryType[]>([]);

  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [incidentAddress, setIncidentAddress] = React.useState<string>('');
  const [incidentDate, setIncidentDate] = React.useState<Date>(new Date());
  const [subjectCategory, setSubjectCategory] = React.useState<
    CategoryType | undefined
  >({ id: 'Other', displayName: 'Inne' });
  const [publicationType, setPublicationType] = React.useState<PublicationType>(
    PublicationType.LostSubject,
  );

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

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || incidentDate;
    setShow(false);
    setIncidentDate(currentDate);
  };

  return (
    <ScrollView>
      <MainContainer>
        <View style={{ alignSelf: 'center', marginBottom: 10 }}>
          <MainTitle>Stwórz Ogłoszenie</MainTitle>
        </View>
        <InputSection title="Tytuł Ogłoszenia">
          <CustomTextInput
            testID="titlePlaceholder"
            onChangeText={setTitle}
            keyboardType={'default'}
            value={title}
          />
        </InputSection>
        <InputSection title="Lokalizacja">
          <CustomTextInput
            onChangeText={setIncidentAddress}
            keyboardType={'default'}
            value={incidentAddress}
          />
        </InputSection>
        <InputSection title="Data">
          <Pressable onPress={() => setShow(true)}>
            <Text
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'light-grey',
                paddingVertical: 10,
              }}>
              {format(incidentDate, 'dd.MM.yyyy')}
            </Text>
            <View>
              {show && (
                <RNDateTimePicker
                  value={incidentDate}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
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
        <InputSection title="Opis">
          <TextInput
            onChangeText={setDescription}
            keyboardType={'default'}
            value={description}
          />
        </InputSection>
        <View style={{ alignSelf: 'center', width: '80%', marginTop: 20 }}>
          <SecondaryButton
            label="Zapisz zmiany"
            onPress={async () => {
              const publication: PublicationRequestType = {
                title,
                description,
                incidentAddress,
                incidentDate,
                subjectCategoryId: subjectCategory?.id,
                publicationType,
              };
              console.log(publication);
              const response = await addNewPost(publication);
              if (response) {
                console.log(response);
                props.navigation.push('Home', {
                  screen: 'Post',
                  params: { publicationId: response?.publicationId },
                });
              }
            }}
          />
        </View>
      </MainContainer>
    </ScrollView>
  );
};