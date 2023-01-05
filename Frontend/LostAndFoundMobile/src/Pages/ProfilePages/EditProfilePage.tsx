import {
  editProfile,
  editProfilePhoto,
  ProfileRequestType,
  ProfileResponseType,
} from 'commons';
import React from 'react';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { ProfileContext } from '../../../Config';
import {
  CustomTextInput,
  DocumentSelector,
  InputSection,
  MainContainer,
} from '../../Components';
import {
  getAccessToken,
  removeUserPhotoUrl,
  saveUserPhotoUrl,
} from '../../SecureStorage';
import { MainScrollContainer } from '../../Components/MainComponents';
import { Appbar } from 'react-native-paper';

const editProfileDetails = async (profile: ProfileRequestType) => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    const response = await editProfile(profile, accessToken);
    return response;
  }
};

const updateProfilePhoto = async (photo: DocumentPickerResponse) => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    const photoRequest = {
      name: photo.name,
      type: photo.type,
      uri: photo.uri,
      size: photo.size,
    };
    const response = await editProfilePhoto(photoRequest, accessToken);
    return response;
  }
};

export const EditProfilePage = (props: any) => {
  const { updatePhotoUrl } = React.useContext(ProfileContext);
  const user: ProfileResponseType = props.route.params.user;
  const [fileResponse, setFileResponse] = React.useState<
    DocumentPickerResponse[]
  >([]);
  const [name, setName] = React.useState<string | undefined>(user.name);
  const [surname, setSurname] = React.useState<string | undefined>(
    user.surname,
  );
  const [city, setCity] = React.useState<string | undefined>(user.city);
  const [description, setDescription] = React.useState<string | undefined>(
    user.description,
  );

  return (
    <MainContainer>
      <Appbar.Header style={{ backgroundColor: '#abd699' }}>
        <Appbar.BackAction
          color="#2e1c00"
          onPress={() => props.navigation.pop()}
        />
        <Appbar.Content
          title="Edytuj Profil"
          titleStyle={{
            textAlign: 'center',
            color: '#2e1c00',
            fontWeight: 'bold',
          }}
        />
        <Appbar.Action
          size={30}
          icon="content-save"
          color="#2e1c00"
          onPress={async () => {
            const profile: ProfileRequestType = {
              name,
              surname,
              city,
              description,
            };

            if (fileResponse.length > 0) {
              const updatePhotoResponse = await updateProfilePhoto(
                fileResponse[0],
              );
              if (updatePhotoResponse) {
                if (updatePhotoResponse.pictureUrl) {
                  await saveUserPhotoUrl(updatePhotoResponse.pictureUrl);
                } else {
                  await removeUserPhotoUrl();
                }
                await updatePhotoUrl();
              }
            }

            const response = await editProfileDetails(profile);
            if (response) {
              props.navigation.push('Home', { screen: 'ProfileMe' });
            }
          }}
        />
      </Appbar.Header>
      <MainScrollContainer>
        <DocumentSelector
          fileResponse={fileResponse}
          setFileResponse={setFileResponse}
          label="Ustaw zdjęcie profilowe"
        />
        <InputSection title="Imię">
          <CustomTextInput
            onChangeText={setName}
            keyboardType={'default'}
            value={name}
          />
        </InputSection>
        <InputSection title="Nazwisko">
          <CustomTextInput
            onChangeText={setSurname}
            keyboardType={'default'}
            value={surname}
          />
        </InputSection>

        <InputSection title="Miasto">
          <CustomTextInput
            onChangeText={setCity}
            keyboardType={'default'}
            value={city}
          />
        </InputSection>
        <InputSection title="Opis">
          <CustomTextInput
            onChangeText={setDescription}
            keyboardType={'default'}
            value={description}
          />
        </InputSection>
      </MainScrollContainer>
    </MainContainer>
  );
};
