import React from 'react';
import { Text, View } from 'react-native';
import {
  CustomTextInput,
  InputSection,
  MainButton,
  MainContainer,
  MainTitle,
  PressableText,
} from '../Components/MainComponents';

export const RegistrationPage = (props: { navigation: string[] }) => {
  const [email, setEmail] = React.useState<String | null>(null);
  const [password, setPassword] = React.useState<String | null>(null);

  const onUsernameChange = (email: String) => {
    setEmail(email);
  };

  const onPasswordChange = (password: String) => {
    setPassword(password);
  };

  return (
    <MainContainer>
      <MainTitle>Zarejestruj się</MainTitle>
      <InputSection title="E-mail">
        <CustomTextInput
          onChangeText={onUsernameChange}
          keyboardType={'email-address'}
          placeholder="Podaj swój adres e-mail"
        />
      </InputSection>
      <InputSection title="Nazwa użytkownika">
        <CustomTextInput
          onChangeText={onUsernameChange}
          keyboardType={'default'}
          placeholder="Podaj swoją nazwę użytkownika"
        />
      </InputSection>
      <InputSection title="Hasło">
        <CustomTextInput
          onChangeText={onPasswordChange}
          secureTextEntry={true}
          keyboardType={'default'}
          placeholder="********"
        />
      </InputSection>
      <InputSection title="Powtórz hasło">
        <CustomTextInput
          onChangeText={onPasswordChange}
          secureTextEntry={true}
          keyboardType={'default'}
          placeholder="********"
        />
      </InputSection>
      <MainButton
        label="Zarejestruj się"
        onPress={() => props.navigation.push('Login')}
      />
      <View style={{ alignItems: 'center' }}>
        <Text>Masz konto?</Text>
        <PressableText
          text="Zaloguj się"
          onPress={() => props.navigation.push('Login')}
        />
      </View>
    </MainContainer>
  );
};
