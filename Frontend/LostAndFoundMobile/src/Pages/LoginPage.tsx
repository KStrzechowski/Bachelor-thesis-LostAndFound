import { LoginRequestType, login } from 'commons';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { AuthContext } from '../../Config';
import {
  CustomTextInput,
  InputSection,
  MainButton,
  MainContainer,
  MainTitle,
  PressableText,
  Subtitle,
} from '../Components/MainComponents';
import { Logo } from '../Images';
import { saveAccessToken, saveRefreshToken } from '../SecureStorage';

const loginUser = async (email: string, password: string) => {
  const loginRequest: LoginRequestType = {
    email,
    password,
  };

  const loginResponse = await login(loginRequest);
  if (loginResponse) {
    await saveAccessToken(
      loginResponse.accessToken,
      loginResponse.accessTokenExpirationTime,
    );
    await saveRefreshToken(loginResponse.refreshToken);
  }
};

export const LoginPage = (props: { navigation: string[] }) => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const { signIn } = React.useContext(AuthContext);

  const onUsernameChange = (email: string) => {
    setEmail(email);
  };

  const onPasswordChange = (password: string) => {
    setPassword(password);
  };

  return (
    <MainContainer>
      <Image
        source={Logo}
        style={{ width: '100%', resizeMode: 'stretch', marginBottom: 20 }}
      />
      <MainTitle>Zaloguj się</MainTitle>
      <Subtitle>Hej! Dobrze cię znowu widzieć</Subtitle>
      <InputSection title="E-mail">
        <CustomTextInput
          onChangeText={onUsernameChange}
          keyboardType={'email-address'}
          placeholder="Podaj swój adres e-mail"
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
      <MainButton
        label="Zaloguj się"
        onPress={async () => {
          await loginUser(email, password);
          await signIn();
        }}
      />
      <View style={{ alignItems: 'center' }}>
        <Text>Nie masz konta?</Text>
        <PressableText
          text="Zarejestruj się"
          onPress={() => props.navigation.push('Registration')}
        />
      </View>
    </MainContainer>
  );
};
