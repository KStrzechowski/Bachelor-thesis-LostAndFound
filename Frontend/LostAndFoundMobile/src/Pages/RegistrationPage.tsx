import { register, RegisterRequestType } from 'commons';
import React from 'react';
import { DevSettings, Text, View } from 'react-native';
import {
  CustomTextInput,
  InputSection,
  MainButton,
  MainContainer,
  MainTitle,
  PressableText,
} from '../Components/MainComponents';

async function registerAccount(
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
) {
  console.log('AAA');
  if (!email || !password || !username || !confirmPassword) return;
  const registerRequest: RegisterRequestType = {
    username,
    email,
    password,
    confirmPassword,
  };

  console.log(registerRequest);
  const registerResponse = await register(registerRequest);
  if (registerResponse) {
    console.log(registerResponse);
    DevSettings.reload();
  }
}

export const RegistrationPage = (props: { navigation: string[] }) => {
  const [email, setEmail] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');

  const onEmailChange = (email: string) => {
    setEmail(email);
  };

  const onUsernameChange = (email: string) => {
    setUsername(email);
  };

  const onPasswordChange = (password: string) => {
    setPassword(password);
  };

  const onConfirmPasswordChange = (password: string) => {
    setConfirmPassword(password);
  };

  return (
    <MainContainer>
      <MainTitle>Zarejestruj się</MainTitle>
      <InputSection title="E-mail">
        <CustomTextInput
          onChangeText={onEmailChange}
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
          onChangeText={onConfirmPasswordChange}
          secureTextEntry={true}
          keyboardType={'default'}
          placeholder="********"
        />
      </InputSection>
      <MainButton
        label="Zarejestruj się"
        onPress={async () =>
          await registerAccount(username, email, password, confirmPassword)
        }
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
