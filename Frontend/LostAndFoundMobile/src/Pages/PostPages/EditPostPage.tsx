import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import {
  CategoryType,
  editPublication,
  editPublicationPhoto,
  getCategories,
  PublicationRequestType,
  PublicationResponseType,
  PublicationState,
  PublicationType,
} from 'commons';
import { format } from 'date-fns';
import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import {
  CustomTextInput,
  DeleteButton,
  DocumentSelector,
  InputSection,
  MainContainer,
  MainTitle,
  SecondaryButton,
} from '../../Components';
import { getAccessToken } from '../../SecureStorage';
import { ScrollView } from 'react-native-gesture-handler';
import { DocumentPickerResponse } from 'react-native-document-picker';

const editPost = async (
  publicationId: string,
  publication: PublicationRequestType,
): Promise<PublicationResponseType | undefined> => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    const response = await editPublication(
      publicationId,
      publication,
      accessToken,
    );
    return response;
  }
};

const updatePostPhoto = async (
  publicationId: string,
  photo: DocumentPickerResponse,
) => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    const photoRequest = {
      name: photo.name,
      type: photo.type,
      uri: photo.uri,
      size: photo.size,
    };
    const response = await editPublicationPhoto(
      publicationId,
      photoRequest,
      accessToken,
    );
    return response;
  }
};

export const EditPostPage = (props: any) => {
  const postData: PublicationResponseType = props.route.params?.postData;

  const [show, setShow] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<CategoryType[]>([]);

  const [fileResponse, setFileResponse] = React.useState<
    DocumentPickerResponse[]
  >([]);
  const [title, setTitle] = React.useState<string | undefined>('');
  const [description, setDescription] = React.useState<string | undefined>('');
  const [incidentAddress, setIncidentAddress] = React.useState<
    string | undefined
  >('');
  const [incidentDate, setIncidentDate] = React.useState<Date>(new Date());
  const [category, setCategory] = React.useState<CategoryType | undefined>({
    id: 'Other',
    displayName: 'Inne',
  });
  const [publicationType, setPublicationType] = React.useState<PublicationType>(
    PublicationType.LostSubject,
  );
  const [publicationState, setPublicationState] =
    React.useState<PublicationState>(PublicationState.Open);

  React.useEffect(() => {
    const getData = async () => {
      setTitle(postData.title);
      setDescription(postData.description);
      setIncidentAddress(postData.incidentAddress);
      setIncidentDate(postData.incidentDate);
      setPublicationType(postData.publicationType);
      setPublicationState(postData.publicationState);

      const accessToken = await getAccessToken();
      if (accessToken) {
        setCategories(await getCategories(accessToken));
      }
    };

    getData();
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      if (postData) {
        setCategory(
          categories?.find(
            category => category.id === postData.subjectCategoryId,
          ),
        );
      }
    };

    getData();
  }, [categories]);

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
    const currentDate = selectedDate || postData.incidentDate;
    setShow(false);
    setIncidentDate(currentDate);
  };

  return (
    <ScrollView>
      <MainContainer>
        <View style={{ alignSelf: 'center', marginBottom: 10 }}>
          <MainTitle>Edytuj Ogłoszenie</MainTitle>
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
          <Picker selectedValue={category} onValueChange={setCategory}>
            {mapCategories}
          </Picker>
        </InputSection>
        <InputSection title="Typ ogłoszenia">
          <Picker
            selectedValue={publicationType}
            onValueChange={setPublicationType}>
            <Picker.Item label="Zgubione" value={PublicationType.LostSubject} />
            <Picker.Item
              label="Znalezione"
              value={PublicationType.FoundSubject}
            />
          </Picker>
        </InputSection>
        <InputSection title="Status ogłoszenia">
          <Picker
            selectedValue={publicationState}
            onValueChange={setPublicationState}>
            <Picker.Item label="Otwarte" value={PublicationState.Open} />
            <Picker.Item label="Zamknięte" value={PublicationState.Closed} />
          </Picker>
        </InputSection>
        <InputSection title="Opis">
          <TextInput
            onChangeText={setDescription}
            keyboardType={'default'}
            value={description}
          />
        </InputSection>
        <DocumentSelector
          fileResponse={fileResponse}
          setFileResponse={setFileResponse}
          label={postData?.subjectPhotoUrl ? 'Edytuj zdjęcie' : 'Dodaj zdjęcie'}
        />
        <View style={{ alignSelf: 'center', width: '80%', marginTop: 20 }}>
          <SecondaryButton
            label="Zapisz zmiany"
            onPress={async () => {
              const newPostData: PublicationRequestType = {
                title,
                description,
                incidentAddress,
                incidentDate,
                subjectCategoryId: category?.id,
                publicationType,
                publicationState,
              };

              const response = await editPost(
                postData.publicationId,
                newPostData,
              );
              if (response) {
                if (fileResponse.length > 0)
                  await updatePostPhoto(
                    postData.publicationId,
                    fileResponse[0],
                  );
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
