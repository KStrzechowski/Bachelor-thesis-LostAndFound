import { ProfileResponseType } from 'commons';
import React from 'react';
import { TextInput, View } from 'react-native';
import {
  CustomTextInput,
  InputSection,
  MainContainer,
  MainTitle,
  SecondaryButton,
} from '../Components';

export const EditProfilePage = (props: any) => {
  const user: ProfileResponseType = props.route.params.user;
  const [email, setEmail] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [surname, setSurname] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [city, setCity] = React.useState<string>('');

  return (
    <MainContainer>
      <View style={{ alignSelf: 'center', marginBottom: 10 }}>
        <MainTitle>Edytuj Profil</MainTitle>
      </View>
      <InputSection title="E-mail">
        <CustomTextInput
          onChangeText={setEmail}
          keyboardType={'email-address'}
          defaultValue={user.email}
          placeholder="Podaj nowy adres e-mail"
        />
      </InputSection>
      <InputSection title="Nazwa użytkownika">
        <CustomTextInput
          onChangeText={setUsername}
          keyboardType={'default'}
          defaultValue={user.email}
          placeholder="Podaj nową nazwę użytkownika"
        />
      </InputSection>
      <InputSection title="Imię">
        <CustomTextInput
          onChangeText={setName}
          keyboardType={'default'}
          defaultValue={user.name}
          placeholder="Podaj swoje imię"
        />
      </InputSection>
      <InputSection title="Nazwisko">
        <CustomTextInput
          onChangeText={setSurname}
          keyboardType={'default'}
          defaultValue={user.surname}
          placeholder="Podaj swoje nazwisko"
        />
      </InputSection>

      <InputSection title="Miasto">
        <CustomTextInput
          onChangeText={setCity}
          keyboardType={'default'}
          defaultValue={user.city}
          placeholder="Podaj miasto, w którym się znajdujesz"
        />
      </InputSection>
      <InputSection title="Opis">
        <TextInput
          onChangeText={setDescription}
          keyboardType={'default'}
          placeholder={'Opisz siebie'}
        />
      </InputSection>
    </MainContainer>
  );
};
